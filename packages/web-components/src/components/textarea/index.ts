/**
 * <tarmac-textarea>
 *
 * Web Component equivalent of the React TextArea from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-textarea label="Description" placeholder="Enter text" textarea-size="md"></tarmac-textarea>
 *   <tarmac-textarea textarea-type="error" status-text="Required"></tarmac-textarea>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type TextAreaStyle = 'tarmac-01';
export type TextAreaType = 'regular' | 'success' | 'error' | 'infoBlue';
export type TextAreaSize = 'sm' | 'md' | 'lg';
export type TextAreaResize = 'none' | 'vertical' | 'horizontal' | 'both';

interface TextAreaConfig {
  base?: { fontFamily?: string; radius?: string; transition?: string };
  types?: Record<string, { borderColor?: string; focusBorderColor?: string }>;
  sizes?: Record<string, { minHeight?: string; fontSize?: string; padding?: string }>;
  states?: { disabled?: Record<string, string>; ghost?: Record<string, string> };
}

const DEFAULT_CFG: TextAreaConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '4px', transition: 'all 0.15s ease-in-out' },
  types: {
    regular: { borderColor: '#e0e0e0', focusBorderColor: '#2b2b2b' },
    success: { borderColor: '#2e7d32', focusBorderColor: '#2e7d32' },
    error: { borderColor: '#c62828', focusBorderColor: '#c62828' },
    infoBlue: { borderColor: '#1565c0', focusBorderColor: '#1565c0' },
  },
  sizes: {
    sm: { minHeight: '72px', fontSize: '14px', padding: '8px' },
    md: { minHeight: '96px', fontSize: '14px', padding: '10px 12px' },
    lg: { minHeight: '120px', fontSize: '16px', padding: '12px' },
  },
  states: {
    disabled: { borderColor: '#ededed', color: '#cdcbcb', backgroundColor: '#fff' },
    ghost: { backgroundColor: '#ededed', borderColor: 'transparent' },
  },
};

@customElement('tarmac-textarea')
export class TarmacTextArea extends LitElement {
  @property({ type: String, attribute: 'textarea-style' }) textAreaStyle: TextAreaStyle = 'tarmac-01';
  @property({ type: String, attribute: 'textarea-type' }) textAreaType: TextAreaType = 'regular';
  @property({ type: String, attribute: 'textarea-size' }) textAreaSize: TextAreaSize = 'md';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;
  @property({ type: String }) label = '';
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: Number }) rows = 4;
  @property({ type: String }) resize: TextAreaResize = 'vertical';
  @property({ type: String, attribute: 'helper-text-top' }) helperTextTop = '';
  @property({ type: String, attribute: 'helper-text-bottom' }) helperTextBottom = '';
  @property({ type: String, attribute: 'status-text' }) statusText = '';

  private _unsub?: () => void;
  private _cfg: TextAreaConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.textarea_tarmac as TextAreaConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const tc = cfg.types?.[this.textAreaType] || cfg.types?.regular || {};
    const sc = cfg.sizes?.[this.textAreaSize] || cfg.sizes?.md || {};
    const base = cfg.base || {};
    const dis = cfg.states?.disabled || {};
    const ghost = cfg.states?.ghost || {};

    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '4px';
    const transition = base.transition || 'all 0.15s ease-in-out';
    const minHeight = sc.minHeight || '96px';
    const fontSize = sc.fontSize || '14px';
    const padding = sc.padding || '10px 12px';

    let borderColor: string, bgColor: string, textColor: string, cursor: string;
    if (this.isDisabled) {
      borderColor = dis.borderColor || '#ededed';
      bgColor = dis.backgroundColor || '#fff';
      textColor = dis.color || '#cdcbcb';
      cursor = 'not-allowed';
    } else if (this.isGhost) {
      borderColor = ghost.borderColor || 'transparent';
      bgColor = ghost.backgroundColor || '#ededed';
      textColor = '#2b2b2b';
      cursor = 'text';
    } else {
      borderColor = tc.borderColor || '#e0e0e0';
      bgColor = '#fff';
      textColor = '#2b2b2b';
      cursor = 'text';
    }

    const focusBorder = tc.focusBorderColor || '#2b2b2b';
    const statusColor = this.textAreaType === 'error' ? '#c62828' : this.textAreaType === 'success' ? '#2e7d32' : this.textAreaType === 'infoBlue' ? '#1565c0' : '#6b6b6b';

    return html`
      <style>
        :host { display: block; font-family: ${fontFamily}; }
        .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${statusColor}; }
        textarea {
          width: 100%; min-height: ${minHeight}; border: 1px solid ${borderColor}; border-radius: ${radius};
          background-color: ${bgColor}; color: ${textColor}; font-family: ${fontFamily}; font-size: ${fontSize};
          padding: ${padding}; box-sizing: border-box; transition: ${transition}; resize: ${this.resize};
          cursor: ${cursor}; outline: none;
        }
        textarea::placeholder { color: #b3b1b1; }
        textarea:focus { border-color: ${this.isDisabled ? borderColor : focusBorder}; }
        textarea:disabled { cursor: not-allowed; }
      </style>
      <div class="textarea-wrapper">
        ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
        ${this.helperTextTop ? html`<div class="helper-text">${this.helperTextTop}</div>` : nothing}
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder || nothing}
          ?disabled=${this.isDisabled}
          @input=${this._onInput}
          @change=${this._onChange}
        ></textarea>
        ${this.statusText ? html`<div class="status-text">${this.statusText}</div>` : nothing}
        ${this.helperTextBottom ? html`<div class="helper-text">${this.helperTextBottom}</div>` : nothing}
      </div>
    `;
  }

  private _onInput(e: Event): void {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    this.dispatchEvent(new CustomEvent('tarmac-input', { bubbles: true, composed: true, detail: { value: this.value } }));
  }
  private _onChange(e: Event): void {
    const ta = e.target as HTMLTextAreaElement;
    this.value = ta.value;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { value: this.value } }));
  }
}

export type { TextAreaConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-textarea': TarmacTextArea; } }
