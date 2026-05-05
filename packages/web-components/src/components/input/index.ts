/**
 * <tarmac-input>
 *
 * Web Component equivalent of the React Input from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-input label="Email" placeholder="Enter email" input-size="md"></tarmac-input>
 *   <tarmac-input input-type="error" status-text="Required field"></tarmac-input>
 *   <tarmac-input style-variant="addonLeft"><span slot="addon">https://</span></tarmac-input>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type InputStyle = 'tarmac-01';
export type InputType = 'regular' | 'success' | 'infoBlue' | 'error';
export type InputSize = 'sm' | 'md' | 'lg';
export type InputStyleVariant = 'standard' | 'addonLeft' | 'addonRight';

interface InputConfig {
  base?: { fontFamily?: string; radius?: string; transition?: string };
  types?: Record<string, { borderColor?: string; focusBorderColor?: string }>;
  sizes?: Record<string, { height?: string; fontSize?: string; padding?: string }>;
  states?: { disabled?: Record<string, string>; ghost?: Record<string, string> };
}

const DEFAULT_CFG: InputConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '4px', transition: 'all 0.15s ease-in-out' },
  types: {
    regular: { borderColor: '#e0e0e0', focusBorderColor: '#2b2b2b' },
    success: { borderColor: '#2e7d32', focusBorderColor: '#2e7d32' },
    error: { borderColor: '#c62828', focusBorderColor: '#c62828' },
    infoBlue: { borderColor: '#1565c0', focusBorderColor: '#1565c0' },
  },
  sizes: {
    lg: { height: '48px', fontSize: '16px', padding: '0 12px' },
    md: { height: '40px', fontSize: '14px', padding: '0 12px' },
    sm: { height: '32px', fontSize: '14px', padding: '0 8px' },
  },
  states: {
    disabled: { borderColor: '#ededed', color: '#cdcbcb', backgroundColor: '#fff' },
    ghost: { backgroundColor: '#ededed', borderColor: 'transparent' },
  },
};

@customElement('tarmac-input')
export class TarmacInput extends LitElement {
  @property({ type: String, attribute: 'input-style' }) inputStyle: InputStyle = 'tarmac-01';
  @property({ type: String, attribute: 'input-type' }) inputType: InputType = 'regular';
  @property({ type: String, attribute: 'input-size' }) inputSize: InputSize = 'md';
  @property({ type: String, attribute: 'style-variant' }) styleVariant: InputStyleVariant = 'standard';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;
  @property({ type: String }) label = '';
  @property({ type: Boolean, attribute: 'is-mandatory' }) isMandatory = false;
  @property({ type: String }) placeholder = '';
  @property({ type: String }) value = '';
  @property({ type: String, attribute: 'helper-text-top' }) helperTextTop = '';
  @property({ type: String, attribute: 'helper-text-bottom' }) helperTextBottom = '';
  @property({ type: String }) subtext = '';
  @property({ type: String, attribute: 'status-text' }) statusText = '';

  private _unsub?: () => void;
  private _cfg: InputConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.input_tarmac as InputConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const tc = cfg.types?.[this.inputType] || cfg.types?.regular || {};
    const sc = cfg.sizes?.[this.inputSize] || cfg.sizes?.md || {};
    const base = cfg.base || {};
    const dis = cfg.states?.disabled || {};
    const ghost = cfg.states?.ghost || {};

    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '4px';
    const transition = base.transition || 'all 0.15s ease-in-out';
    const height = sc.height || '40px';
    const fontSize = sc.fontSize || '14px';
    const padding = sc.padding || '0 12px';

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
    const statusColor = this.inputType === 'error' ? '#c62828' : this.inputType === 'success' ? '#2e7d32' : this.inputType === 'infoBlue' ? '#1565c0' : '#6b6b6b';
    const isAddonLeft = this.styleVariant === 'addonLeft';
    const isAddonRight = this.styleVariant === 'addonRight';

    return html`
      <style>
        :host { display: block; font-family: ${fontFamily}; }
        .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label-row { display: flex; align-items: center; gap: 2px; font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .mandatory { color: #c62828; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${statusColor}; }
        .subtext { font-size: 12px; line-height: 16px; color: #8c8c8c; }
        .input-row { display: flex; align-items: center; }
        .addon { display: flex; align-items: center; justify-content: center; height: ${height}; padding: 0 12px; background: #f5f5f5; border: 1px solid ${borderColor}; font-size: ${fontSize}; color: #6b6b6b; white-space: nowrap; }
        .addon-left { border-right: none; border-radius: ${radius} 0 0 ${radius}; }
        .addon-right { border-left: none; border-radius: 0 ${radius} ${radius} 0; }
        .input-container { display: flex; align-items: center; flex: 1; height: ${height}; border: 1px solid ${borderColor}; border-radius: ${isAddonLeft ? `0 ${radius} ${radius} 0` : isAddonRight ? `${radius} 0 0 ${radius}` : radius}; background-color: ${bgColor}; transition: ${transition}; padding: ${padding}; gap: 8px; box-sizing: border-box; }
        .input-container:focus-within { border-color: ${this.isDisabled ? borderColor : focusBorder}; }
        input { flex: 1; border: none; outline: none; background: transparent; font-family: ${fontFamily}; font-size: ${fontSize}; color: ${textColor}; cursor: ${cursor}; min-width: 0; }
        input::placeholder { color: #b3b1b1; }
        input:disabled { cursor: not-allowed; }
        .icon-slot { display: flex; align-items: center; color: #6b6b6b; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
      </style>
      <div class="input-wrapper">
        ${this.label ? html`<div class="label-row"><span>${this.label}</span>${this.isMandatory ? html`<span class="mandatory">*</span>` : nothing}</div>` : nothing}
        ${this.helperTextTop ? html`<div class="helper-text">${this.helperTextTop}</div>` : nothing}
        <div class="input-row">
          ${isAddonLeft ? html`<div class="addon addon-left"><slot name="addon"></slot></div>` : nothing}
          <div class="input-container">
            <span class="icon-slot"><slot name="leading-icon"></slot></span>
            <input
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder || nothing}
              ?disabled=${this.isDisabled}
              @input=${this._onInput}
              @change=${this._onChange}
              @focus=${this._onFocus}
              @blur=${this._onBlur}
            />
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
          </div>
          ${isAddonRight ? html`<div class="addon addon-right"><slot name="addon"></slot></div>` : nothing}
        </div>
        ${this.statusText ? html`<div class="status-text">${this.statusText}</div>` : nothing}
        ${this.helperTextBottom ? html`<div class="helper-text">${this.helperTextBottom}</div>` : nothing}
        ${this.subtext ? html`<div class="subtext">${this.subtext}</div>` : nothing}
      </div>
    `;
  }

  private _onInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('tarmac-input', { bubbles: true, composed: true, detail: { value: this.value } }));
  }
  private _onChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { value: this.value } }));
  }
  private _onFocus(): void {
    this.dispatchEvent(new CustomEvent('tarmac-focus', { bubbles: true, composed: true }));
  }
  private _onBlur(): void {
    this.dispatchEvent(new CustomEvent('tarmac-blur', { bubbles: true, composed: true }));
  }
}

export type { InputConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-input': TarmacInput; } }
