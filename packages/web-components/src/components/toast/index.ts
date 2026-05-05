/**
 * <tarmac-toast>
 *
 * Web Component toast notification with fixed positioning and auto-dismiss.
 *
 * Usage:
 *   <tarmac-toast message="Saved!" variant="success" position="top-right"></tarmac-toast>
 *   <tarmac-toast message="Error occurred" variant="error" duration="5000" closable></tarmac-toast>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type ToastVariant = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ToastSize = 'sm' | 'md' | 'lg';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top' | 'bottom';

interface ToastConfig {
  base?: { fontFamily?: string; radius?: string; shadow?: string };
  variants?: Record<string, { accentColor?: string }>;
}

const DEFAULT_CFG: ToastConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', shadow: '0 4px 16px rgba(0,0,0,0.12)' },
  variants: {
    success: { accentColor: '#1ba86e' },
    error: { accentColor: '#dc143c' },
    warning: { accentColor: '#f5c828' },
    info: { accentColor: '#2396fb' },
    default: { accentColor: '#2b2b2b' },
  },
};

const CLOSE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;

@customElement('tarmac-toast')
export class TarmacToast extends LitElement {
  @property({ type: String }) message = '';
  @property({ type: String }) title = '';
  @property({ type: String }) variant: ToastVariant = 'default';
  @property({ type: String }) size: ToastSize = 'md';
  @property({ type: Number }) duration = 3000;
  @property({ type: Boolean }) closable = false;
  @property({ type: String }) position: ToastPosition = 'top-right';

  @state() private _visible = true;
  private _timer?: ReturnType<typeof setTimeout>;
  private _unsub?: () => void;
  private _cfg: ToastConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    this._startTimer();
  }
  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsub?.();
    this._clearTimer();
  }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.toast_tarmac as ToastConfig) || DEFAULT_CFG;
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
    const vc = cfg.variants?.[this.variant] || cfg.variants?.default || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '8px';
    const shadow = base.shadow || '0 4px 16px rgba(0,0,0,0.12)';
    const accentColor = vc.accentColor || '#2b2b2b';

    const padding = this.size === 'sm' ? '8px 12px' : this.size === 'lg' ? '16px 20px' : '12px 16px';
    const titleSize = this.size === 'sm' ? '12px' : this.size === 'lg' ? '16px' : '14px';
    const msgSize = this.size === 'sm' ? '12px' : this.size === 'lg' ? '14px' : '13px';

    // Position styles
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
        .toast {
          position: fixed; ${posStyle} z-index: 1100;
          display: flex; align-items: flex-start; gap: 12px;
          background: #fff; border-left: 4px solid ${accentColor};
          border-radius: ${radius}; box-shadow: ${shadow};
          padding: ${padding}; font-family: ${fontFamily};
          min-width: 280px; max-width: 420px;
          animation: toastIn 0.25s ease-out;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; color: ${accentColor}; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${titleSize}; font-weight: 600; color: #2b2b2b; line-height: 1.4; }
        .message { font-size: ${msgSize}; color: #6b6b6b; line-height: 1.4; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: #6b6b6b;
          display: flex; align-items: center; flex-shrink: 0;
        }
        .close-btn:hover { color: #2b2b2b; }
      </style>
      <div class="toast" role="alert">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content">
          ${this.title ? html`<div class="title">${this.title}</div>` : nothing}
          ${this.message ? html`<div class="message">${this.message}</div>` : nothing}
        </div>
        ${this.closable ? html`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${CLOSE_SVG}></span></button>` : nothing}
      </div>
    `;
  }

  private _handleClose(): void {
    this._clearTimer();
    this._visible = false;
    this._emitClose();
  }

  private _emitClose(): void {
    this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true }));
  }
}

export type { ToastConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-toast': TarmacToast; } }
