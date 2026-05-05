/**
 * <tarmac-popup>
 *
 * Web Component popup dialog with overlay, header, and footer slots.
 *
 * Usage:
 *   <tarmac-popup is-open size="md" title="Confirm Action" subtext="This cannot be undone">
 *     <p>Content here</p>
 *     <div slot="footer"><button>OK</button></div>
 *   </tarmac-popup>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type PopupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface PopupConfig {
  base?: { fontFamily?: string; radius?: string; overlayBg?: string; shadow?: string };
  sizes?: Record<string, { maxWidth?: string }>;
}

const DEFAULT_CFG: PopupConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', overlayBg: 'rgba(0,0,0,0.45)', shadow: '0 4px 24px rgba(0,0,0,0.15)' },
  sizes: { xs: { maxWidth: '320px' }, sm: { maxWidth: '400px' }, md: { maxWidth: '520px' }, lg: { maxWidth: '640px' }, xl: { maxWidth: '800px' } },
};

const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

@customElement('tarmac-popup')
export class TarmacPopup extends LitElement {
  @property({ type: Boolean, attribute: 'is-open' }) isOpen = false;
  @property({ type: String }) size: PopupSize = 'md';
  @property({ type: String }) title = '';
  @property({ type: String }) subtext = '';
  @property({ type: Boolean, attribute: 'show-footer' }) showFooter = false;
  @property({ type: Boolean, attribute: 'close-on-overlay' }) closeOnOverlay = true;
  @property({ type: Boolean, attribute: 'close-on-esc' }) closeOnEsc = true;

  private _unsub?: () => void;
  private _cfg: PopupConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    document.addEventListener('keydown', this._onEsc);
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); document.removeEventListener('keydown', this._onEsc); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.popup_tarmac as PopupConfig) || DEFAULT_CFG;
  }

  private _onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen && this.closeOnEsc) this._close();
  };

  render() {
    if (!this.isOpen) return nothing;

    const cfg = this._cfg;
    const base = cfg.base || {};
    const sc = cfg.sizes?.[this.size] || cfg.sizes?.md || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '8px';
    const overlayBg = base.overlayBg || 'rgba(0,0,0,0.45)';
    const shadow = base.shadow || '0 4px 24px rgba(0,0,0,0.15)';
    const maxWidth = sc.maxWidth || '520px';

    return html`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: center; justify-content: center;
          background: ${overlayBg}; font-family: ${fontFamily};
        }
        .container {
          background: #fff; border-radius: ${radius}; box-shadow: ${shadow};
          width: 90%; max-width: ${maxWidth}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: popupIn 0.2s ease-out;
        }
        @keyframes popupIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .header-row { display: flex; align-items: center; gap: 8px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px; flex-shrink: 0;
        }
        .close-btn:hover { background: #f5f5f5; }
        .icon-slot { display: flex; align-items: center; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || 'Popup'} @click=${(e: Event) => e.stopPropagation()}>
          <div class="header">
            <div class="header-content">
              <div class="header-row">
                <span class="icon-slot"><slot name="leading-icon"></slot></span>
                <h2 class="title">${this.title}</h2>
              </div>
              ${this.subtext ? html`<div class="subtext">${this.subtext}</div>` : nothing}
            </div>
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
            <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${CLOSE_SVG}></span></button>
          </div>
          <div class="body"><slot></slot></div>
          ${this.showFooter ? html`<div class="footer"><slot name="footer"></slot></div>` : nothing}
        </div>
      </div>
    `;
  }

  private _onOverlayClick(): void { if (this.closeOnOverlay) this._close(); }
  private _close(): void { this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true })); }
}

export type { PopupConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-popup': TarmacPopup; } }
