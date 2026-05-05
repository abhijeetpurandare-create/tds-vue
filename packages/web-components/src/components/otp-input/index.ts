/**
 * <tarmac-otp-input>
 *
 * Web Component equivalent of the React OtpInput from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-otp-input num-digits="6" otp-size="md"></tarmac-otp-input>
 *   <tarmac-otp-input num-digits="4" otp-variant="error" label="Enter OTP"></tarmac-otp-input>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type OtpStyle = 'tarmac-01';
export type OtpSize = 'sm' | 'md' | 'lg';
export type OtpVariant = 'default' | 'success' | 'error' | 'info';
export type OtpInputType = 'text' | 'password' | 'number';

interface OtpConfig {
  base?: { fontFamily?: string; radius?: string; transition?: string };
  variants?: Record<string, { borderColor?: string; focusBorderColor?: string }>;
  sizes?: Record<string, { boxSize?: string; fontSize?: string }>;
  states?: { disabled?: Record<string, string> };
}

const DEFAULT_CFG: OtpConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '4px', transition: 'all 0.15s ease-in-out' },
  variants: {
    default: { borderColor: '#e0e0e0', focusBorderColor: '#2b2b2b' },
    success: { borderColor: '#2e7d32', focusBorderColor: '#2e7d32' },
    error: { borderColor: '#c62828', focusBorderColor: '#c62828' },
    info: { borderColor: '#1565c0', focusBorderColor: '#1565c0' },
  },
  sizes: {
    sm: { boxSize: '32px', fontSize: '14px' },
    md: { boxSize: '40px', fontSize: '16px' },
    lg: { boxSize: '48px', fontSize: '18px' },
  },
  states: { disabled: { borderColor: '#ededed', color: '#cdcbcb', backgroundColor: '#f5f5f5' } },
};

@customElement('tarmac-otp-input')
export class TarmacOtpInput extends LitElement {
  @property({ type: Number, attribute: 'num-digits' }) numDigits = 6;
  @property({ type: String, attribute: 'otp-style' }) otpStyle: OtpStyle = 'tarmac-01';
  @property({ type: String, attribute: 'otp-size' }) otpSize: OtpSize = 'md';
  @property({ type: String, attribute: 'otp-variant' }) otpVariant: OtpVariant = 'default';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: String }) placeholder = '';
  @property({ type: String, attribute: 'input-type' }) inputType: OtpInputType = 'text';
  @property({ type: String }) label = '';
  @property({ type: String, attribute: 'helper-text' }) helperText = '';
  @property({ type: String }) value = '';

  @state() private _digits: string[] = [];

  private _unsub?: () => void;
  private _cfg: OtpConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._digits = Array.from({ length: this.numDigits }, (_, i) => this.value[i] || '');
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.otp_tarmac as OtpConfig) || DEFAULT_CFG;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('numDigits') || changed.has('value')) {
      this._digits = Array.from({ length: this.numDigits }, (_, i) => this.value[i] || '');
    }
  }

  render() {
    const cfg = this._cfg;
    const vc = cfg.variants?.[this.otpVariant] || cfg.variants?.default || {};
    const sc = cfg.sizes?.[this.otpSize] || cfg.sizes?.md || {};
    const base = cfg.base || {};
    const dis = cfg.states?.disabled || {};

    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '4px';
    const transition = base.transition || 'all 0.15s ease-in-out';
    const boxSize = sc.boxSize || '40px';
    const fontSize = sc.fontSize || '16px';

    let borderColor: string, bgColor: string, textColor: string;
    if (this.isDisabled) {
      borderColor = dis.borderColor || '#ededed';
      bgColor = dis.backgroundColor || '#f5f5f5';
      textColor = dis.color || '#cdcbcb';
    } else {
      borderColor = vc.borderColor || '#e0e0e0';
      bgColor = '#fff';
      textColor = '#2b2b2b';
    }
    const focusBorder = vc.focusBorderColor || '#2b2b2b';
    const statusColor = this.otpVariant === 'error' ? '#c62828' : this.otpVariant === 'success' ? '#2e7d32' : '#6b6b6b';

    const inputTypeAttr = this.inputType === 'number' ? 'tel' : this.inputType;

    return html`
      <style>
        :host { display: block; font-family: ${fontFamily}; }
        .otp-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: ${statusColor}; }
        .otp-row { display: flex; gap: 8px; }
        .otp-box {
          width: ${boxSize}; height: ${boxSize}; border: 1px solid ${borderColor}; border-radius: ${radius};
          background-color: ${bgColor}; color: ${textColor}; font-family: ${fontFamily}; font-size: ${fontSize};
          text-align: center; outline: none; transition: ${transition}; box-sizing: border-box;
        }
        .otp-box:focus { border-color: ${this.isDisabled ? borderColor : focusBorder}; }
        .otp-box:disabled { cursor: not-allowed; }
      </style>
      <div class="otp-wrapper">
        ${this.label ? html`<div class="label">${this.label}</div>` : nothing}
        <div class="otp-row">
          ${this._digits.map((digit, i) => html`
            <input
              class="otp-box"
              type=${inputTypeAttr}
              maxlength="1"
              .value=${digit}
              placeholder=${this.placeholder ? this.placeholder[0] || '' : nothing}
              ?disabled=${this.isDisabled}
              @input=${(e: Event) => this._onDigitInput(e, i)}
              @keydown=${(e: KeyboardEvent) => this._onKeyDown(e, i)}
              @paste=${(e: ClipboardEvent) => this._onPaste(e, i)}
            />
          `)}
        </div>
        ${this.helperText ? html`<div class="helper-text">${this.helperText}</div>` : nothing}
      </div>
    `;
  }

  private _getInputs(): HTMLInputElement[] {
    return Array.from(this.shadowRoot?.querySelectorAll('.otp-box') || []) as HTMLInputElement[];
  }

  private _onDigitInput(e: Event, index: number): void {
    const input = e.target as HTMLInputElement;
    const val = input.value.slice(-1);
    this._digits = [...this._digits];
    this._digits[index] = val;
    this.value = this._digits.join('');

    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { value: this.value } }));

    if (val && index < this.numDigits - 1) {
      const inputs = this._getInputs();
      inputs[index + 1]?.focus();
    }

    if (this.value.length === this.numDigits && !this._digits.includes('')) {
      this.dispatchEvent(new CustomEvent('tarmac-complete', { bubbles: true, composed: true, detail: { value: this.value } }));
    }

    this.requestUpdate();
  }

  private _onKeyDown(e: KeyboardEvent, index: number): void {
    if (e.key === 'Backspace' && !this._digits[index] && index > 0) {
      const inputs = this._getInputs();
      this._digits = [...this._digits];
      this._digits[index - 1] = '';
      this.value = this._digits.join('');
      inputs[index - 1]?.focus();
      this.requestUpdate();
    }
  }

  private _onPaste(e: ClipboardEvent, startIndex: number): void {
    e.preventDefault();
    const pasted = e.clipboardData?.getData('text') || '';
    this._digits = [...this._digits];
    for (let i = 0; i < pasted.length && startIndex + i < this.numDigits; i++) {
      this._digits[startIndex + i] = pasted[i];
    }
    this.value = this._digits.join('');
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { value: this.value } }));

    if (this.value.length === this.numDigits && !this._digits.includes('')) {
      this.dispatchEvent(new CustomEvent('tarmac-complete', { bubbles: true, composed: true, detail: { value: this.value } }));
    }

    const inputs = this._getInputs();
    const focusIdx = Math.min(startIndex + pasted.length, this.numDigits - 1);
    inputs[focusIdx]?.focus();
    this.requestUpdate();
  }
}

export type { OtpConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-otp-input': TarmacOtpInput; } }
