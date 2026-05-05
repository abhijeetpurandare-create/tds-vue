/**
 * <tarmac-modal>
 *
 * Web Component modal dialog with overlay/backdrop using Shadow DOM portal approach.
 *
 * Usage:
 *   <tarmac-modal is-open size="md" title="Confirm">
 *     <p>Are you sure?</p>
 *     <div slot="footer"><button>OK</button></div>
 *   </tarmac-modal>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type ModalSize = 'sm' | 'md' | 'lg';

interface ModalConfig {
  base?: { fontFamily?: string; radius?: string; overlayBg?: string; shadow?: string; transition?: string };
  sizes?: Record<string, { maxWidth?: string }>;
}

const DEFAULT_CFG: ModalConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', overlayBg: 'rgba(0,0,0,0.45)', shadow: '0 4px 24px rgba(0,0,0,0.15)', transition: 'all 0.2s ease-in-out' },
  sizes: { sm: { maxWidth: '400px' }, md: { maxWidth: '520px' }, lg: { maxWidth: '720px' } },
};

const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

@customElement('tarmac-modal')
export class TarmacModal extends LitElement {
  @property({ type: Boolean, attribute: 'is-open' }) isOpen = false;
  @property({ type: String }) size: ModalSize = 'md';
  @property({ type: String }) title = '';
  @property({ type: Boolean }) closable = true;
  @property({ type: Boolean, attribute: 'mask-closable' }) maskClosable = true;
  @property({ type: String }) width = '';
  @property({ type: Boolean }) centered = false;

  private _unsub?: () => void;
  private _cfg: ModalConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    document.addEventListener('keydown', this._onEsc);
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsub?.();
    document.removeEventListener('keydown', this._onEsc);
  }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.modal_tarmac as ModalConfig) || DEFAULT_CFG;
  }

  private _onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen && this.closable) this._close();
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
    const maxWidth = this.width || sc.maxWidth || '520px';

    return html`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${this.centered ? 'center' : 'flex-start'};
          justify-content: center; padding: ${this.centered ? '0' : '80px 0'};
          background: ${overlayBg}; font-family: ${fontFamily};
        }
        .container {
          background: #fff; border-radius: ${radius}; box-shadow: ${shadow};
          width: 90%; max-width: ${maxWidth}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; justify-content: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || 'Modal'} @click=${(e: Event) => e.stopPropagation()}>
          ${this.title || this.closable ? html`
            <div class="header">
              <h2 class="title">${this.title}</h2>
              ${this.closable ? html`<button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${CLOSE_SVG}></span></button>` : nothing}
            </div>
          ` : nothing}
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }

  private _onOverlayClick(): void {
    if (this.maskClosable) this._close();
  }

  private _close(): void {
    this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true }));
  }
}

export type { ModalConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-modal': TarmacModal; } }
