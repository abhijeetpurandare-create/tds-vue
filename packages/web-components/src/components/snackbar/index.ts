/**
 * <tarmac-snackbar>
 *
 * Web Component snackbar notification with fixed positioning and auto-dismiss.
 *
 * Usage:
 *   <tarmac-snackbar message="Item deleted" variant="black" position="bottom"></tarmac-snackbar>
 *   <tarmac-snackbar title="Undo?" message="Action completed" ct-as approve-text="Undo" deny-text="Dismiss"></tarmac-snackbar>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type SnackbarVariant = 'white' | 'black' | 'coal' | 'success' | 'error' | 'info' | 'warning';
export type SnackbarStyle = 'singleText' | 'dualText';
export type SnackbarSize = 'lg' | 'sm';
export type SnackbarPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';

interface SnackbarConfig {
  base?: { fontFamily?: string; radius?: string; shadow?: string };
  variants?: Record<string, { backgroundColor?: string; textColor?: string }>;
}

const DEFAULT_CFG: SnackbarConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', shadow: '0 4px 16px rgba(0,0,0,0.12)' },
  variants: {
    white: { backgroundColor: '#ffffff', textColor: '#2b2b2b' },
    black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' },
    coal: { backgroundColor: '#64739b', textColor: '#ffffff' },
    success: { backgroundColor: '#1ba86e', textColor: '#ffffff' },
    error: { backgroundColor: '#dc143c', textColor: '#ffffff' },
    info: { backgroundColor: '#2396fb', textColor: '#ffffff' },
    warning: { backgroundColor: '#f5c828', textColor: '#2b2b2b' },
  },
};

const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

@customElement('tarmac-snackbar')
export class TarmacSnackbar extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String }) title = '';
  @property({ type: String }) variant: SnackbarVariant = 'black';
  @property({ type: String, attribute: 'snackbar-style' }) snackbarStyle: SnackbarStyle = 'singleText';
  @property({ type: String }) size: SnackbarSize = 'lg';
  @property({ type: Boolean, attribute: 'trailing-icon' }) trailingIcon = false;
  @property({ type: Boolean, attribute: 'ct-as' }) ctAs = false;
  @property({ type: String, attribute: 'deny-text' }) denyText = '';
  @property({ type: String, attribute: 'approve-text' }) approveText = '';
  @property({ type: Number }) duration = 5000;
  @property({ type: String }) position: SnackbarPosition = 'bottom';

  @state() private _visible = true;
  private _timer?: ReturnType<typeof setTimeout>;
  private _unsub?: () => void;
  private _cfg: SnackbarConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    this._startTimer();
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); this._clearTimer(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.snackbar_tarmac as SnackbarConfig) || DEFAULT_CFG;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('duration')) { this._clearTimer(); this._startTimer(); }
  }

  private _startTimer(): void {
    if (this.duration > 0) {
      this._timer = setTimeout(() => { this._visible = false; this._emitClose(); }, this.duration);
    }
  }
  private _clearTimer(): void { if (this._timer) { clearTimeout(this._timer); this._timer = undefined; } }

  render() {
    if (!this._visible) return nothing;

    const cfg = this._cfg;
    const base = cfg.base || {};
    const vc = cfg.variants?.[this.variant] || cfg.variants?.black || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '8px';
    const shadow = base.shadow || '0 4px 16px rgba(0,0,0,0.12)';
    const bgColor = vc.backgroundColor || '#2b2b2b';
    const textColor = vc.textColor || '#ffffff';

    const padding = this.size === 'sm' ? '8px 12px' : '12px 16px';
    const fontSize = this.size === 'sm' ? '12px' : '14px';
    const isDual = this.snackbarStyle === 'dualText';

    let posStyle = '';
    switch (this.position) {
      case 'top-right': posStyle = 'top:16px;right:16px;'; break;
      case 'top-left': posStyle = 'top:16px;left:16px;'; break;
      case 'bottom-right': posStyle = 'bottom:16px;right:16px;'; break;
      case 'bottom-left': posStyle = 'bottom:16px;left:16px;'; break;
      case 'top': posStyle = 'top:16px;left:50%;transform:translateX(-50%);'; break;
      case 'bottom': posStyle = 'bottom:16px;left:50%;transform:translateX(-50%);'; break;
    }

    return html`
      <style>
        :host { display: contents; }
        .snackbar {
          position: fixed; ${posStyle} z-index: 1100;
          display: flex; align-items: center; gap: 12px;
          background: ${bgColor}; color: ${textColor};
          border-radius: ${radius}; box-shadow: ${shadow};
          padding: ${padding}; font-family: ${fontFamily};
          min-width: 280px; max-width: 560px;
          animation: snackIn 0.25s ease-out;
        }
        @keyframes snackIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${fontSize}; font-weight: 600; line-height: 1.4; }
        .message { font-size: ${fontSize}; line-height: 1.4; opacity: ${isDual ? '0.8' : '1'}; }
        .actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .action-btn {
          background: none; border: 1px solid ${textColor}40; color: ${textColor};
          border-radius: 4px; padding: 4px 12px; font-size: 12px; font-weight: 500;
          cursor: pointer; font-family: ${fontFamily};
        }
        .action-btn:hover { background: ${textColor}15; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: ${textColor};
          display: flex; align-items: center; flex-shrink: 0; opacity: 0.7;
        }
        .close-btn:hover { opacity: 1; }
      </style>
      <div class="snackbar" role="alert">
        <span class="icon-slot"><slot name="leading-icon"></slot></span>
        <div class="content">
          ${isDual && this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.message ? html`<div class="message">${this.message}</div>` : nothing}
        </div>
        ${this.ctAs ? html`
          <div class="actions">
            ${this.denyText ? html`<button class="action-btn" @click=${this._handleDeny}>${this.denyText}</button>` : nothing}
            ${this.approveText ? html`<button class="action-btn" @click=${this._handleApprove}>${this.approveText}</button>` : nothing}
          </div>
        ` : nothing}
        ${this.trailingIcon ? html`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${CLOSE_SVG}></span></button>` : nothing}
      </div>
    `;
  }

  private _handleClose(): void { this._clearTimer(); this._visible = false; this._emitClose(); }
  private _handleDeny(): void { this.dispatchEvent(new CustomEvent('tarmac-deny', { bubbles: true, composed: true })); }
  private _handleApprove(): void { this.dispatchEvent(new CustomEvent('tarmac-approve', { bubbles: true, composed: true })); }
  private _emitClose(): void { this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true })); }
}

export type { SnackbarConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-snackbar': TarmacSnackbar; } }
