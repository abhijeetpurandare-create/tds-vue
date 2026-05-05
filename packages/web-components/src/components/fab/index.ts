/**
 * <tarmac-fab>
 *
 * Web Component Floating Action Button with expandable menu.
 *
 * Usage:
 *   <tarmac-fab position="bottom-right" variant="dark">
 *     <svg slot="trigger">+</svg>
 *     <div slot="menu">
 *       <button>Action 1</button>
 *       <button>Action 2</button>
 *     </div>
 *   </tarmac-fab>
 */

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type FABPosition = 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
export type FABVariant = 'light' | 'dark' | 'info-blue';
export type FABPositionMode = 'fixed' | 'absolute' | 'relative';

interface FABConfig {
  base?: { size?: string; shadow?: string; transition?: string };
  variants?: Record<string, { backgroundColor?: string; iconColor?: string }>;
}

const DEFAULT_CFG: FABConfig = {
  base: { size: '56px', shadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.2s ease-in-out' },
  variants: {
    light: { backgroundColor: '#ffffff', iconColor: '#2b2b2b' },
    dark: { backgroundColor: '#2b2b2b', iconColor: '#ffffff' },
    'info-blue': { backgroundColor: '#2396fb', iconColor: '#ffffff' },
  },
};

const PLUS_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;

@customElement('tarmac-fab')
export class TarmacFab extends LitElement {
  @property({ type: String }) position: FABPosition = 'bottom-right';
  @property({ type: String }) variant: FABVariant = 'light';
  @property({ type: String, attribute: 'position-mode' }) positionMode: FABPositionMode = 'fixed';

  @state() private _isOpen = false;

  private _unsub?: () => void;
  private _cfg: FABConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.fab_tarmac as FABConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const vc = cfg.variants?.[this.variant] || cfg.variants?.light || {};
    const size = base.size || '56px';
    const shadow = base.shadow || '0 4px 12px rgba(0,0,0,0.2)';
    const transition = base.transition || 'all 0.2s ease-in-out';
    const bgColor = vc.backgroundColor || '#ffffff';
    const iconColor = vc.iconColor || '#2b2b2b';

    let posStyle = '';
    switch (this.position) {
      case 'bottom-right': posStyle = 'bottom: 24px; right: 24px;'; break;
      case 'bottom-left': posStyle = 'bottom: 24px; left: 24px;'; break;
      case 'top-right': posStyle = 'top: 24px; right: 24px;'; break;
      case 'top-left': posStyle = 'top: 24px; left: 24px;'; break;
    }

    const isBottom = this.position.startsWith('bottom');

    return html`
      <style>
        :host { display: contents; }
        .fab-wrapper {
          position: ${this.positionMode}; ${posStyle} z-index: 900;
          display: flex; flex-direction: ${isBottom ? 'column-reverse' : 'column'}; align-items: center; gap: 8px;
        }
        .fab-trigger {
          width: ${size}; height: ${size}; border-radius: 50%;
          background: ${bgColor}; color: ${iconColor};
          border: none; cursor: pointer; box-shadow: ${shadow};
          display: flex; align-items: center; justify-content: center;
          transition: ${transition}; padding: 0;
        }
        .fab-trigger:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.25); }
        .fab-trigger.open { transform: rotate(45deg); }
        .fab-trigger ::slotted(*) { width: 24px; height: 24px; }
        .fab-menu {
          display: ${this._isOpen ? 'flex' : 'none'};
          flex-direction: column; gap: 8px; align-items: center;
          animation: menuIn 0.2s ease-out;
        }
        @keyframes menuIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      </style>
      <div class="fab-wrapper">
        <button class="fab-trigger ${this._isOpen ? 'open' : ''}" @click=${this._toggle} aria-label="Toggle menu">
          <slot name="trigger"><span .innerHTML=${PLUS_SVG}></span></slot>
        </button>
        <div class="fab-menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;
  }

  private _toggle(): void {
    this._isOpen = !this._isOpen;
    this.dispatchEvent(new CustomEvent('tarmac-toggle', { bubbles: true, composed: true, detail: { isOpen: this._isOpen } }));
  }
}

export type { FABConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-fab': TarmacFab; } }
