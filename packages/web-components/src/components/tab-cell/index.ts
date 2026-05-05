/**
 * <tarmac-tab-cell>
 *
 * Web Component equivalent of the React TabCell from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-tab-cell tab-type="regular" tab-style="black" size="lg" title="Tab 1"></tarmac-tab-cell>
 *   <tarmac-tab-cell tab-type="button" tab-style="blue" is-pressed title="Active">
 *     <svg slot="leading-icon" ...></svg>
 *     <span slot="badge">3</span>
 *   </tarmac-tab-cell>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type TabType = 'regular' | 'button';
export type TabOrientation = 'horizontal' | 'vertical';
export type TabStyle = 'black' | 'blue' | 'dlvRed';
export type TabSize = 'lg' | 'sm';

interface TabCellConfig {
  base?: { fontFamily?: string; gap?: string };
  variants?: Record<string, { color?: string; pressedColor?: string; pressedBg?: string }>;
  sizes?: Record<string, { fontSize?: string; lineHeight?: string; padding?: string }>;
  types?: { regular?: { borderWidth?: string }; button?: { borderRadius?: string } };
  states?: { disabled?: { color?: string }; ghost?: { backgroundColor?: string; textColor?: string } };
}

const DEFAULT_CONFIG: TabCellConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', gap: '8px' },
  variants: {
    black: { color: '#2b2b2b', pressedColor: '#000000', pressedBg: '#f5f5f5' },
    blue: { color: '#2b2b2b', pressedColor: '#2396fb', pressedBg: '#eef7ff' },
    dlvRed: { color: '#2b2b2b', pressedColor: '#ed1b36', pressedBg: '#fef2f2' },
  },
  sizes: {
    lg: { fontSize: '14px', lineHeight: '20px', padding: '12px' },
    sm: { fontSize: '12px', lineHeight: '16px', padding: '8px' },
  },
  types: { regular: { borderWidth: '2px' }, button: { borderRadius: '4px' } },
  states: {
    disabled: { color: '#cdcbcb' },
    ghost: { backgroundColor: '#dedede', textColor: 'transparent' },
  },
};

@customElement('tarmac-tab-cell')
export class TarmacTabCell extends LitElement {
  @property({ type: String, attribute: 'tab-type' }) tabType: TabType = 'regular';
  @property({ type: String }) orientation: TabOrientation = 'horizontal';
  @property({ type: String, attribute: 'tab-style' }) tabStyle: TabStyle = 'black';
  @property({ type: String }) size: TabSize = 'lg';
  @property({ type: Boolean, attribute: 'is-pressed' }) isPressed = false;
  @property({ type: Boolean, attribute: 'is-selected' }) isSelected = false;
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;
  @property({ type: String, attribute: 'title' }) tabTitle = '';
  @property({ type: String }) subtext = '';

  private _unsub?: () => void;
  private _cfg: TabCellConfig = DEFAULT_CONFIG;

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
    this._cfg = (t?.components?.tab_cell_tarmac as TabCellConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const vc = cfg.variants?.[this.tabStyle] || {};
    const fontSize = sc.fontSize || '14px';
    const lineHeight = sc.lineHeight || '20px';
    const padding = sc.padding || '12px';
    const fontFamily = cfg.base?.fontFamily || 'Noto Sans, sans-serif';
    const gap = cfg.base?.gap || '8px';
    const active = this.isPressed || this.isSelected;

    let color: string, bgColor: string, cursor: string, borderStyle: string, extra = '';

    if (this.isGhost) {
      const gs = cfg.states?.ghost || {};
      color = gs.textColor || 'transparent';
      bgColor = gs.backgroundColor || '#dedede';
      cursor = 'default';
      borderStyle = 'none';
      extra = 'pointer-events:none;';
    } else if (this.isDisabled) {
      const ds = cfg.states?.disabled || {};
      color = ds.color || '#cdcbcb';
      bgColor = 'transparent';
      cursor = 'default';
      borderStyle = 'none';
      extra = 'pointer-events:none;';
    } else if (active) {
      color = vc.pressedColor || '#000000';
      cursor = 'pointer';
      if (this.tabType === 'regular') {
        bgColor = 'transparent';
        const bw = cfg.types?.regular?.borderWidth || '2px';
        if (this.orientation === 'vertical') {
          borderStyle = `border-left: ${bw} solid ${color};`;
        } else {
          borderStyle = `border-bottom: ${bw} solid ${color};`;
        }
      } else {
        bgColor = vc.pressedBg || '#f5f5f5';
        const br = cfg.types?.button?.borderRadius || '4px';
        borderStyle = `border-radius: ${br};`;
      }
    } else {
      color = vc.color || '#2b2b2b';
      bgColor = 'transparent';
      cursor = 'pointer';
      borderStyle = this.tabType === 'regular' ? 'border-bottom: 2px solid transparent;' : '';
    }

    return html`
      <style>
        :host { display: inline-flex; }
        .tab-cell {
          display: inline-flex;
          align-items: center;
          gap: ${gap};
          font-family: ${fontFamily};
          font-size: ${fontSize};
          line-height: ${lineHeight};
          padding: ${padding};
          color: ${color};
          background-color: ${bgColor};
          cursor: ${cursor};
          border: none;
          outline: none;
          user-select: none;
          white-space: nowrap;
          ${typeof borderStyle === 'string' && borderStyle.includes(':') ? borderStyle : ''}
          ${extra}
        }
        .tab-cell:hover { opacity: ${this.isDisabled || this.isGhost ? '1' : '0.8'}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${fontSize}; height: ${fontSize}; }
        .content { display: flex; flex-direction: column; }
        .title { font-weight: ${active ? '600' : '400'}; }
        .subtext { font-size: calc(${fontSize} - 2px); color: ${this.isDisabled ? '#cdcbcb' : '#64739b'}; }
        .extras { display: inline-flex; align-items: center; gap: 4px; }
      </style>
      <button
        class="tab-cell"
        role="tab"
        aria-selected=${active}
        ?disabled=${this.isDisabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        <span class="content">
          <span class="title">${this.tabTitle}</span>
          ${this.subtext ? html`<span class="subtext">${this.subtext}</span>` : nothing}
        </span>
        <span class="extras">
          <slot name="badge"></slot>
          <slot name="pill"></slot>
          <slot name="status"></slot>
        </span>
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </button>
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
      detail: { originalEvent: e, title: this.tabTitle },
    }));
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-tab-cell': TarmacTabCell; } }
