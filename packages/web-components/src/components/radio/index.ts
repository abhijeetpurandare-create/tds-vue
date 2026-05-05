/**
 * <tarmac-radio>
 *
 * Web Component equivalent of the React Radio from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-radio tarmac-variant="standard" size="md" value="opt1" name="group1">Option 1</tarmac-radio>
 *   <tarmac-radio tarmac-variant="blue" checked>Selected</tarmac-radio>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type RadioVariant = 'standard' | 'blue' | 'green' | 'dlv_red';
export type RadioStyle = 'box' | 'rounded';
export type RadioSize = 'sm' | 'md' | 'lg';

interface RadioConfig {
  base?: { fontFamily?: string; transition?: string };
  variants?: Record<string, { checkedColor?: string; borderColor?: string; dotColor?: string }>;
  sizes?: Record<string, { radioSize?: string; dotSize?: string; labelFontSize?: string; labelLineHeight?: string }>;
  states?: { disabled?: Record<string, string> };
}

const DEFAULT_CFG: RadioConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', transition: 'all 0.15s ease-in-out' },
  variants: {
    standard: { checkedColor: '#000000', borderColor: '#e6e6e6', dotColor: '#ffffff' },
    blue: { checkedColor: '#2396fb', borderColor: '#e6e6e6', dotColor: '#ffffff' },
    green: { checkedColor: '#1ba86e', borderColor: '#e6e6e6', dotColor: '#ffffff' },
    dlv_red: { checkedColor: '#ed1b36', borderColor: '#e6e6e6', dotColor: '#ffffff' },
  },
  sizes: {
    sm: { radioSize: '16px', dotSize: '6px', labelFontSize: '14px', labelLineHeight: '20px' },
    md: { radioSize: '20px', dotSize: '8px', labelFontSize: '14px', labelLineHeight: '20px' },
    lg: { radioSize: '24px', dotSize: '10px', labelFontSize: '14px', labelLineHeight: '20px' },
  },
  states: { disabled: { borderColor: '#ededed', checkedColor: '#e6e6e6', dotColor: '#cdcbcb', labelColor: '#cdcbcb' } },
};

@customElement('tarmac-radio')
export class TarmacRadio extends LitElement {
  @property({ type: String, attribute: 'tarmac-variant' }) tarmacVariant: RadioVariant = 'standard';
  @property({ type: String, attribute: 'tarmac-style' }) tarmacStyle: RadioStyle = 'box';
  @property({ type: String }) size: RadioSize = 'md';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) subtext = '';

  private _unsub?: () => void;
  private _cfg: RadioConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.radio_tarmac as RadioConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const vc = cfg.variants?.[this.tarmacVariant] || cfg.variants?.standard || {};
    const sc = cfg.sizes?.[this.size] || cfg.sizes?.md || {};
    const base = cfg.base || {};
    const dis = cfg.states?.disabled || {};

    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const transition = base.transition || 'all 0.15s ease-in-out';
    const radioSize = sc.radioSize || '20px';
    const dotSize = sc.dotSize || '8px';
    const labelFontSize = sc.labelFontSize || '14px';
    const labelLineHeight = sc.labelLineHeight || '20px';

    let borderColor: string, bgColor: string, dotColor: string, labelColor: string;
    if (this.disabled) {
      borderColor = dis.borderColor || '#ededed';
      bgColor = this.checked ? (dis.checkedColor || '#e6e6e6') : '#fff';
      dotColor = dis.dotColor || '#cdcbcb';
      labelColor = dis.labelColor || '#cdcbcb';
    } else {
      borderColor = this.checked ? (vc.checkedColor || '#000') : (vc.borderColor || '#e6e6e6');
      bgColor = this.checked ? (vc.checkedColor || '#000') : '#fff';
      dotColor = vc.dotColor || '#ffffff';
      labelColor = '#2b2b2b';
    }

    const hasLabel = Boolean(this.textContent?.trim()) || this.querySelector('[slot]') !== null;
    const hasSubtext = Boolean(this.subtext);

    return html`
      <style>
        :host { display: inline-block; font-family: ${fontFamily}; }
        .radio-wrapper { display: inline-flex; align-items: ${hasSubtext ? 'flex-start' : 'center'}; gap: 8px; cursor: ${this.disabled ? 'default' : 'pointer'}; user-select: none; }
        .radio-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
        .radio-circle {
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          width: ${radioSize}; height: ${radioSize}; border-radius: 50%;
          border: 2px solid ${borderColor}; background-color: ${bgColor};
          transition: ${transition}; box-sizing: border-box;
        }
        .radio-dot {
          width: ${dotSize}; height: ${dotSize}; border-radius: 50%;
          background-color: ${dotColor};
          display: ${this.checked ? 'block' : 'none'};
        }
        .label-col { display: flex; flex-direction: column; }
        .label { font-size: ${labelFontSize}; line-height: ${labelLineHeight}; font-weight: 500; color: ${labelColor}; }
        .subtext { font-size: 12px; line-height: 16px; color: ${this.disabled ? '#cdcbcb' : '#8c8c8c'}; }
      </style>
      <label class="radio-wrapper" @click=${this._handleClick}>
        <input
          class="radio-input"
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          value=${this.value || nothing}
          @change=${this._handleChange}
        />
        <span class="radio-circle"><span class="radio-dot"></span></span>
        ${hasLabel || hasSubtext ? html`
          <span class="label-col">
            <span class="label"><slot></slot></span>
            ${hasSubtext ? html`<span class="subtext">${this.subtext}</span>` : nothing}
          </span>
        ` : nothing}
      </label>
    `;
  }

  private _handleClick(e: MouseEvent): void {
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
  }

  private _handleChange(): void {
    if (this.disabled) return;
    this.checked = true;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { checked: this.checked, value: this.value } }));
  }
}

export type { RadioConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-radio': TarmacRadio; } }
