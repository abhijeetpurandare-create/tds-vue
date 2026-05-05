/**
 * <tarmac-breadcrumb-cell>
 *
 * Web Component equivalent of the React BreadcrumbCell from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-breadcrumb-cell label="Home" cell-style="blue" size="lg" href="/"></tarmac-breadcrumb-cell>
 *   <tarmac-breadcrumb-cell label="Current" is-current></tarmac-breadcrumb-cell>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type BreadcrumbCellStyle = 'black' | 'blue' | 'dlvRed';
export type BreadcrumbCellSize = 'lg' | 'sm';

interface BreadcrumbCellConfig {
  base?: { fontFamily?: string; gap?: string };
  variants?: Record<string, { color?: string }>;
  sizes?: Record<string, { fontSize?: string; lineHeight?: string }>;
  states?: { disabled?: { color?: string }; ghost?: { backgroundColor?: string; textColor?: string }; current?: { fontWeight?: string } };
}

const DEFAULT_CONFIG: BreadcrumbCellConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', gap: '4px' },
  variants: {
    black: { color: '#2b2b2b' },
    blue: { color: '#2396fb' },
    dlvRed: { color: '#ed1b36' },
  },
  sizes: {
    lg: { fontSize: '14px', lineHeight: '20px' },
    sm: { fontSize: '12px', lineHeight: '16px' },
  },
  states: {
    disabled: { color: '#cdcbcb' },
    ghost: { backgroundColor: '#dedede', textColor: 'transparent' },
    current: { fontWeight: '600' },
  },
};

@customElement('tarmac-breadcrumb-cell')
export class TarmacBreadcrumbCell extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'cell-style' }) cellStyle: BreadcrumbCellStyle = 'black';
  @property({ type: String }) size: BreadcrumbCellSize = 'lg';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;
  @property({ type: Boolean, attribute: 'is-current' }) isCurrent = false;
  @property({ type: String }) href = '';

  private _unsub?: () => void;
  private _cfg: BreadcrumbCellConfig = DEFAULT_CONFIG;

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
    this._cfg = (t?.components?.breadcrumb_cell_tarmac as BreadcrumbCellConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const fontSize = sc.fontSize || '14px';
    const lineHeight = sc.lineHeight || '20px';
    const fontFamily = cfg.base?.fontFamily || 'Noto Sans, sans-serif';
    const gap = cfg.base?.gap || '4px';

    let color: string, cursor: string, fontWeight: string, bgColor: string, extra = '';

    if (this.isGhost) {
      const gs = cfg.states?.ghost || {};
      color = gs.textColor || 'transparent';
      bgColor = gs.backgroundColor || '#dedede';
      cursor = 'default';
      fontWeight = '400';
      extra = `background-color:${bgColor}; border-radius:4px; padding:2px 4px;`;
    } else if (this.isDisabled) {
      const ds = cfg.states?.disabled || {};
      color = ds.color || '#cdcbcb';
      cursor = 'default';
      fontWeight = '400';
      extra = 'pointer-events:none;';
    } else {
      const vc = cfg.variants?.[this.cellStyle] || {};
      color = vc.color || '#2b2b2b';
      cursor = 'pointer';
      fontWeight = this.isCurrent ? (cfg.states?.current?.fontWeight || '600') : '400';
    }

    const tag = this.href && !this.isDisabled && !this.isGhost ? 'a' : 'span';

    return html`
      <style>
        :host { display: inline-flex; align-items: center; }
        .cell {
          display: inline-flex;
          align-items: center;
          gap: ${gap};
          font-family: ${fontFamily};
          font-size: ${fontSize};
          line-height: ${lineHeight};
          color: ${color};
          cursor: ${cursor};
          font-weight: ${fontWeight};
          text-decoration: none;
          ${extra}
        }
        .cell:hover { text-decoration: ${this.isDisabled || this.isGhost ? 'none' : 'underline'}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${fontSize}; height: ${fontSize}; }
      </style>
      ${tag === 'a'
        ? html`<a class="cell" href=${this.href} @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </a>`
        : html`<span class="cell" @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </span>`
      }
    `;
  }

  private _handleClick(e: MouseEvent): void {
    if (this.isDisabled || this.isGhost) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent('tarmac-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e, label: this.label, href: this.href },
    }));
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-breadcrumb-cell': TarmacBreadcrumbCell; } }
