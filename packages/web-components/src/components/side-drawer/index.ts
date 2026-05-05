/**
 * <tarmac-side-drawer>
 *
 * Web Component side drawer with overlay and slide-in animation.
 *
 * Usage:
 *   <tarmac-side-drawer is-open variant="narrow">
 *     <div>Drawer content</div>
 *   </tarmac-side-drawer>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type SideDrawerVariant = 'narrow' | 'extended';

interface SideDrawerConfig {
  base?: { fontFamily?: string; overlayBg?: string; shadow?: string; transition?: string };
  variants?: Record<string, { width?: string }>;
}

const DEFAULT_CFG: SideDrawerConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', overlayBg: 'rgba(0,0,0,0.45)', shadow: '-4px 0 24px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease-in-out' },
  variants: { narrow: { width: '400px' }, extended: { width: '640px' } },
};

@customElement('tarmac-side-drawer')
export class TarmacSideDrawer extends LitElement {
  @property({ type: Boolean, attribute: 'is-open' }) isOpen = false;
  @property({ type: String }) variant: SideDrawerVariant = 'narrow';
  @property({ type: Boolean, attribute: 'close-on-overlay' }) closeOnOverlay = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;

  private _unsub?: () => void;
  private _cfg: SideDrawerConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    document.addEventListener('keydown', this._onEsc);
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); document.removeEventListener('keydown', this._onEsc); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.side_drawer_tarmac as SideDrawerConfig) || DEFAULT_CFG;
  }

  private _onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen && this.closeOnEsc) this._close();
  };

  render() {
    if (!this.isOpen) return nothing;

    const cfg = this._cfg;
    const base = cfg.base || {};
    const vc = cfg.variants?.[this.variant] || cfg.variants?.narrow || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const overlayBg = base.overlayBg || 'rgba(0,0,0,0.45)';
    const shadow = base.shadow || '-4px 0 24px rgba(0,0,0,0.15)';
    const width = vc.width || '400px';

    return html`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: ${overlayBg}; font-family: ${fontFamily};
          animation: overlayIn 0.2s ease-out;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 1001;
          width: ${width}; max-width: 90vw; background: #fff;
          box-shadow: ${shadow}; overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="drawer" role="dialog" aria-modal="true">
        <slot></slot>
      </div>
    `;
  }

  private _onOverlayClick(): void { if (this.closeOnOverlay) this._close(); }
  private _close(): void { this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true })); }
}

export type { SideDrawerConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-side-drawer': TarmacSideDrawer; } }
