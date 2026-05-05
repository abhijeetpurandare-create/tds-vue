/**
 * <tarmac-button>
 *
 * Web Component equivalent of the React Button from @delhivery/tarmac.
 * Produces pixel-identical output by using the same style-building logic.
 *
 * Usage:
 *   <tarmac-button variant="black" size="md" button-style="primary">
 *     Click me
 *   </tarmac-button>
 *
 *   <!-- With icons via slots -->
 *   <tarmac-button variant="info" size="lg">
 *     <svg slot="leading-icon" ...></svg>
 *     Submit
 *     <svg slot="trailing-icon" ...></svg>
 *   </tarmac-button>
 *
 *   <!-- Icon button -->
 *   <tarmac-button variant="black" button-type="iconButton" size="md">
 *     <svg slot="leading-icon" ...></svg>
 *   </tarmac-button>
 */

import { LitElement, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  buildButtonCSS,
  buildIconCSS,
  SPINNER_CSS,
  type ButtonVariant,
  type ButtonSize,
  type ButtonStyle,
  type ButtonType,
  type ButtonConfig,
} from './button-styles';
import { defaultButtonConfig } from './default-config';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

// Tarmac variants that use the Tarmac spinner style
const TARMAC_BUTTON_VARIANTS = new Set([
  'black', 'white', 'info', 'success', 'error', 'warning', 'dlv_red', 'coal',
]);

@customElement('tarmac-button')
export class TarmacButton extends LitElement {
  // ── Properties (mirror React ButtonProps) ──────────────────

  @property({ type: String }) variant: ButtonVariant = 'primary';
  @property({ type: String }) size: ButtonSize = 'md';
  @property({ type: String, attribute: 'button-style' }) buttonStyle: ButtonStyle = 'primary';
  @property({ type: String, attribute: 'button-type' }) buttonType: ButtonType = 'button';
  @property({ type: Boolean, attribute: 'is-loading' }) isLoading = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'is-rounded' }) isRounded = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;
  @property({ type: String }) text = '';
  @property({ type: String, attribute: 'background-color' }) backgroundColor?: string;
  @property({ type: String, attribute: 'border-color' }) borderColor?: string;
  @property({ type: String, attribute: 'text-color' }) textColor?: string;
  @property({ type: String, attribute: 'hover-color' }) hoverColor?: string;
  @property({ type: String }) radius?: string;
  @property({ type: String }) border?: string;

  // ── Internal state ─────────────────────────────────────────

  private _unsubscribeTheme?: () => void;
  private _buttonConfig: ButtonConfig = defaultButtonConfig;

  // ── Lifecycle ──────────────────────────────────────────────

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
    this._buttonConfig = (theme?.components?.button as ButtonConfig) || defaultButtonConfig;
  }

  // ── Rendering ──────────────────────────────────────────────

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    // Use shadow DOM for style encapsulation
    return this.attachShadow({ mode: 'open' });
  }

  render() {
    const hasLeadingIcon = this._hasSlottedContent('leading-icon');
    const hasTrailingIcon = this._hasSlottedContent('trailing-icon');
    const hasContent = Boolean(this.text) || this._hasSlottedContent('default');
    const isIconButton = this.buttonType === 'iconButton';

    // Build dynamic styles from theme config
    const dynamicCSS = buildButtonCSS({
      buttonConfig: this._buttonConfig,
      variant: this.variant,
      size: this.size,
      buttonStyle: this.buttonStyle,
      buttonType: this.buttonType,
      isRounded: this.isRounded,
      isLoading: this.isLoading,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      hoverColor: this.hoverColor,
      textColor: this.textColor,
      radius: this.radius,
      border: this.border,
    });

    const leadingIconCSS = buildIconCSS(this._buttonConfig, this.size, 'left', hasContent);
    const trailingIconCSS = buildIconCSS(this._buttonConfig, this.size, 'right', hasContent);

    const ghostClass = this.isGhost ? 'ghost' : '';
    const spinnerSize = this.size === 'lg' ? 'tarmac-spinner--lg' : this.size === 'sm' ? 'tarmac-spinner--sm' : 'tarmac-spinner--md';

    return html`
      <style>
        ${dynamicCSS}
        ${leadingIconCSS}
        ${trailingIconCSS}
        ${SPINNER_CSS}
      </style>
      <button
        class="tarmac-btn ${ghostClass}"
        ?disabled=${this.disabled || this.isLoading}
        @click=${this._handleClick}
      >
        ${this.isLoading
          ? html`
              <span class="tarmac-spinner ${spinnerSize}"></span>
              ${this.text || html`<slot></slot>`}
            `
          : isIconButton
            ? html`
                <span class="icon-left">
                  <slot name="leading-icon"></slot>
                  ${!hasLeadingIcon ? html`<slot></slot>` : ''}
                </span>
              `
            : html`
                <span class="icon-left"><slot name="leading-icon"></slot></span>
                ${this.text || html`<slot></slot>`}
                <span class="icon-right"><slot name="trailing-icon"></slot></span>
              `
        }
      </button>
    `;
  }

  // ── Event handling ─────────────────────────────────────────

  private _handleClick(e: MouseEvent): void {
    if (this.disabled || this.isLoading) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Re-dispatch as a composed event so it crosses shadow DOM
    this.dispatchEvent(new CustomEvent('tarmac-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: e },
    }));
  }

  // ── Helpers ────────────────────────────────────────────────

  private _hasSlottedContent(slotName: string): boolean {
    if (slotName === 'default') {
      const slot = this.shadowRoot?.querySelector('slot:not([name])') as HTMLSlotElement | null;
      return slot ? slot.assignedNodes({ flatten: true }).length > 0 : Boolean(this.textContent?.trim());
    }
    const slot = this.shadowRoot?.querySelector(`slot[name="${slotName}"]`) as HTMLSlotElement | null;
    return slot ? slot.assignedNodes({ flatten: true }).length > 0 : false;
  }
}

// Re-export types for consumers
export type { ButtonVariant, ButtonSize, ButtonStyle, ButtonType, ButtonConfig };

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-button': TarmacButton;
  }
}
