/**
 * <tarmac-dialog-box>
 *
 * Web Component dialog box with overlay, supporting standard and slot-based layouts.
 *
 * Usage:
 *   <tarmac-dialog-box is-open type="standard" title="Delete Item?" description="This action cannot be undone.">
 *     <div slot="footer"><button>Confirm</button></div>
 *   </tarmac-dialog-box>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type DialogBoxType = 'standard' | 'slots' | 'slotsx2';
export type DialogBoxSize = 'mobile' | 'web';

interface DialogBoxConfig {
  base?: { fontFamily?: string; radius?: string; overlayBg?: string; shadow?: string };
}

const DEFAULT_CFG: DialogBoxConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', overlayBg: 'rgba(0,0,0,0.45)', shadow: '0 4px 24px rgba(0,0,0,0.15)' },
};

const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

@customElement('tarmac-dialog-box')
export class TarmacDialogBox extends LitElement {
  @property({ type: Boolean, attribute: 'is-open' }) isOpen = false;
  @property({ type: String }) type: DialogBoxType = 'standard';
  @property({ type: String }) size: DialogBoxSize = 'web';
  @property({ type: String }) title = '';
  @property({ type: String }) subtext = '';
  @property({ type: String }) heading = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean, attribute: 'show-header' }) showHeader = true;
  @property({ type: Boolean, attribute: 'show-footer' }) showFooter = true;
  @property({ type: Boolean, attribute: 'show-checkbox' }) showCheckbox = false;
  @property({ type: String, attribute: 'checkbox-label' }) checkboxLabel = '';
  @property({ type: Boolean, attribute: 'checkbox-checked' }) checkboxChecked = false;

  private _unsub?: () => void;
  private _cfg: DialogBoxConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    document.addEventListener('keydown', this._onEsc);
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); document.removeEventListener('keydown', this._onEsc); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.dialog_box_tarmac as DialogBoxConfig) || DEFAULT_CFG;
  }

  private _onEsc = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this.isOpen) this._close();
  };

  render() {
    if (!this.isOpen) return nothing;

    const cfg = this._cfg;
    const base = cfg.base || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '8px';
    const overlayBg = base.overlayBg || 'rgba(0,0,0,0.45)';
    const shadow = base.shadow || '0 4px 24px rgba(0,0,0,0.15)';
    const isMobile = this.size === 'mobile';

    return html`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${isMobile ? 'flex-end' : 'center'}; justify-content: center;
          background: ${overlayBg}; font-family: ${fontFamily};
        }
        .container {
          background: #fff; border-radius: ${isMobile ? `${radius} ${radius} 0 0` : radius};
          box-shadow: ${shadow}; display: flex; flex-direction: column; overflow: hidden;
          width: ${isMobile ? '100%' : '90%'}; max-width: ${isMobile ? '100%' : '480px'};
          max-height: 80vh; animation: dialogIn 0.2s ease-out;
        }
        @keyframes dialogIn { from { opacity: 0; transform: ${isMobile ? 'translateY(20px)' : 'scale(0.95)'}; } to { opacity: 1; transform: ${isMobile ? 'translateY(0)' : 'scale(1)'}; } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .illustration { padding: 16px 24px; display: flex; justify-content: center; }
        .snackbar-slot { padding: 0 24px; }
        .heading { font-size: 16px; font-weight: 600; color: #2b2b2b; margin: 0 0 8px; }
        .description { font-size: 14px; line-height: 20px; color: #6b6b6b; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; padding: 12px 24px; }
        .checkbox-label { font-size: 14px; color: #2b2b2b; cursor: pointer; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || 'Dialog'} @click=${(e: Event) => e.stopPropagation()}>
          ${this.showHeader ? html`
            <div class="header">
              <div class="header-content">
                ${this.title ? html`<h2 class="title">${this.title}</h2>` : nothing}
                ${this.subtext ? html`<div class="subtext">${this.subtext}</div>` : nothing}
              </div>
              <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${CLOSE_SVG}></span></button>
            </div>
          ` : nothing}
          <div class="illustration"><slot name="illustration"></slot></div>
          <div class="snackbar-slot"><slot name="snackbar"></slot></div>
          <div class="body">
            ${this.heading ? html`<h3 class="heading">${this.heading}</h3>` : nothing}
            ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
            <slot></slot>
          </div>
          ${this.showCheckbox ? html`
            <label class="checkbox-row">
              <input type="checkbox" .checked=${this.checkboxChecked} @change=${this._onCheckbox} />
              <span class="checkbox-label">${this.checkboxLabel}</span>
            </label>
          ` : nothing}
          ${this.showFooter ? html`<div class="footer"><slot name="footer"></slot></div>` : nothing}
        </div>
      </div>
    `;
  }

  private _onOverlayClick(): void { this._close(); }
  private _close(): void { this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true })); }
  private _onCheckbox(e: Event): void {
    const checked = (e.target as HTMLInputElement).checked;
    this.checkboxChecked = checked;
    this.dispatchEvent(new CustomEvent('tarmac-checkbox-change', { bubbles: true, composed: true, detail: { checked } }));
  }
}

export type { DialogBoxConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-dialog-box': TarmacDialogBox; } }
