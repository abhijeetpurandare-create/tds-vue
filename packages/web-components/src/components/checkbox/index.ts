/**
 * <tarmac-checkbox>
 *
 * Web Component equivalent of the React Checkbox from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-checkbox tarmac-variant="standard" size="md">Accept terms</tarmac-checkbox>
 *   <tarmac-checkbox tarmac-variant="blue" tarmac-style="rounded" checked>Selected</tarmac-checkbox>
 *   <tarmac-checkbox tarmac-variant="green" subtext="Optional description">Label</tarmac-checkbox>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  buildCheckboxCSS,
  type TarmacCheckboxVariant,
  type TarmacCheckboxStyle,
  type TarmacCheckboxSize,
  type CheckboxTarmacConfig,
} from './checkbox-styles';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

const CHECKMARK_SVG = `<svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

@customElement('tarmac-checkbox')
export class TarmacCheckbox extends LitElement {
  @property({ type: String, attribute: 'tarmac-variant' }) tarmacVariant: TarmacCheckboxVariant = 'standard';
  @property({ type: String, attribute: 'tarmac-style' }) tarmacStyle: TarmacCheckboxStyle = 'box';
  @property({ type: String }) size: TarmacCheckboxSize = 'md';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) indeterminate = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: String }) value = '';
  @property({ type: String }) name = '';
  @property({ type: String }) subtext = '';

  private _unsubscribeTheme?: () => void;
  private _checkboxConfig: CheckboxTarmacConfig = {};

  connectedCallback(): void {
    super.connectedCallback();
    this._resolveTheme();
    this._unsubscribeTheme = subscribeToTheme(this, () => {
      this._resolveTheme();
      this.requestUpdate();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeTheme?.();
  }

  private _resolveTheme(): void {
    const theme = getThemeFromContext(this);
    this._checkboxConfig = (theme?.components?.checkbox as CheckboxTarmacConfig) || {};
  }

  render() {
    const hasLabel = Boolean(this.textContent?.trim()) || this.querySelector('[slot]') !== null;
    const hasSubtext = Boolean(this.subtext);

    const css = buildCheckboxCSS({
      config: this._checkboxConfig,
      variant: this.tarmacVariant,
      checkboxStyle: this.tarmacStyle,
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      hasLabel,
      hasSubtext,
    });

    return html`
      <style>${css}</style>
      <label class="cb-wrapper" @click=${this._handleClick}>
        <input
          class="cb-input"
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name || nothing}
          value=${this.value || nothing}
          @change=${this._handleChange}
        />
        <span class="cb-box">
          <span class="cb-checkmark" .innerHTML=${CHECKMARK_SVG}></span>
          <span class="cb-dash"></span>
        </span>
        ${hasLabel || hasSubtext
          ? html`
              <span class="cb-label-col">
                <span class="cb-label"><slot></slot></span>
                ${hasSubtext ? html`<span class="cb-subtext">${this.subtext}</span>` : nothing}
              </span>
            `
          : nothing
        }
      </label>
    `;
  }

  private _handleClick(e: MouseEvent): void {
    // Prevent double-firing from label + input
    if ((e.target as HTMLElement).tagName === 'INPUT') return;
  }

  private _handleChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;

    this.dispatchEvent(new CustomEvent('tarmac-change', {
      bubbles: true,
      composed: true,
      detail: {
        checked: this.checked,
        value: this.value,
      },
    }));
  }
}

export type { TarmacCheckboxVariant, TarmacCheckboxStyle, TarmacCheckboxSize, CheckboxTarmacConfig };

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-checkbox': TarmacCheckbox;
  }
}
