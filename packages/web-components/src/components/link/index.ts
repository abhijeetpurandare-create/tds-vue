/**
 * <tarmac-link>
 *
 * Web Component equivalent of the React Link from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-link href="https://example.com" link-style="blue" size="md">Click here</tarmac-link>
 *   <tarmac-link href="/page" target="_blank" is-disabled>
 *     <svg slot="leading-icon" ...></svg>
 *     Disabled link
 *   </tarmac-link>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type LinkStyle = 'blue' | 'black' | 'white';
export type LinkSize = 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface LinkConfig {
  base?: { fontFamily?: string };
  variants?: Record<string, { color?: string }>;
  sizes?: Record<string, { fontSize?: string; lineHeight?: string }>;
  states?: { disabled?: { color?: string; cursor?: string } };
}

const DEFAULT_CONFIG: LinkConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif' },
  variants: {
    blue: { color: '#2396fb' },
    black: { color: '#2b2b2b' },
    white: { color: '#ffffff' },
  },
  sizes: {
    xl: { fontSize: '20px', lineHeight: '28px' },
    lg: { fontSize: '16px', lineHeight: '24px' },
    md: { fontSize: '14px', lineHeight: '20px' },
    sm: { fontSize: '12px', lineHeight: '16px' },
    xs: { fontSize: '10px', lineHeight: '14px' },
  },
  states: { disabled: { color: '#cdcbcb', cursor: 'default' } },
};

@customElement('tarmac-link')
export class TarmacLink extends LitElement {
  @property({ type: String, attribute: 'link-style' }) linkStyle: LinkStyle = 'blue';
  @property({ type: String }) size: LinkSize = 'md';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: String }) text = '';
  @property({ type: String }) href = '';
  @property({ type: String }) target = '';
  @property({ type: String }) rel = '';

  private _unsub?: () => void;
  private _cfg: LinkConfig = DEFAULT_CONFIG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsub?.();
  }

  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.link_tarmac as LinkConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const fontSize = sc.fontSize || '14px';
    const lineHeight = sc.lineHeight || '20px';
    const fontFamily = cfg.base?.fontFamily || 'Noto Sans, sans-serif';

    let color: string, cursor: string, pointerEvents: string;

    if (this.isDisabled) {
      const ds = cfg.states?.disabled || {};
      color = ds.color || '#cdcbcb';
      cursor = ds.cursor || 'default';
      pointerEvents = 'none';
    } else {
      const vc = cfg.variants?.[this.linkStyle] || {};
      color = vc.color || '#2396fb';
      cursor = 'pointer';
      pointerEvents = 'auto';
    }

    return html`
      <style>
        :host { display: inline; }
        .link {
          font-family: ${fontFamily};
          font-size: ${fontSize};
          line-height: ${lineHeight};
          color: ${color};
          cursor: ${cursor};
          pointer-events: ${pointerEvents};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .link:hover { text-decoration: underline; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${fontSize}; height: ${fontSize}; }
      </style>
      <a
        class="link"
        href=${this.href || 'javascript:void(0)'}
        target=${this.target || ''}
        rel=${this.rel || ''}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || html`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </a>
    `;
  }

  private _handleClick(e: MouseEvent): void {
    if (this.isDisabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('tarmac-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e },
    }));
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-link': TarmacLink; } }
