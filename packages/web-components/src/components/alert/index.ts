/**
 * <tarmac-alert>
 *
 * Web Component equivalent of the React Alert from @delhivery/tarmac.
 *
 * Usage:
 *   <!-- Tarmac variant (single text) -->
 *   <tarmac-alert variant="success" size="lg" title="Order shipped!">
 *     <svg slot="leading-icon" ...></svg>
 *   </tarmac-alert>
 *
 *   <!-- Tarmac variant (dual text) -->
 *   <tarmac-alert variant="error" alert-style="dualText"
 *     title="Payment failed" description="Please try again.">
 *   </tarmac-alert>
 *
 *   <!-- With close button -->
 *   <tarmac-alert variant="info" closable title="New update available">
 *     <svg slot="trailing-icon" ...></svg>
 *   </tarmac-alert>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  buildAlertCSS,
  buildLegacyAlertCSS,
  type TarmacAlertVariant,
  type TarmacAlertStyle,
  type TarmacAlertSize,
  type AlertVariant,
  type AlertSize,
  type AlertThemeConfig,
} from './alert-styles';
import { defaultAlertConfig } from './default-config';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

const TARMAC_VARIANTS = new Set([
  'white', 'black', 'coal', 'success', 'error', 'info', 'warning',
]);

@customElement('tarmac-alert')
export class TarmacAlert extends LitElement {
  // ── Properties (mirror React AlertProps) ───────────────────

  @property({ type: String }) variant: AlertVariant = 'default';
  @property({ type: String }) size: AlertSize = 'md';
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';
  @property({ type: Boolean }) closable = false;
  @property({ type: String, attribute: 'alert-style' }) alertStyle: TarmacAlertStyle = 'singleText';
  @property({ type: Boolean, attribute: 'show-ctas' }) showCtas = false;
  @property({ type: String, attribute: 'cancel-text' }) cancelText = 'Cancel';
  @property({ type: String, attribute: 'proceed-text' }) proceedText = 'Proceed';
  @property({ type: String, attribute: 'background-color' }) backgroundColor?: string;
  @property({ type: String, attribute: 'border-color' }) borderColor?: string;
  @property({ type: String, attribute: 'text-color' }) textColor?: string;
  @property({ type: String, attribute: 'icon-color' }) iconColor?: string;

  // ── Internal state ─────────────────────────────────────────

  private _unsubscribeTheme?: () => void;
  private _alertConfig: AlertThemeConfig = {};
  private _legacyConfig: any = defaultAlertConfig;

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
    this._alertConfig = (theme?.components?.alerts as AlertThemeConfig) || {};
    this._legacyConfig = theme?.components?.alert || defaultAlertConfig;
  }

  // ── Rendering ──────────────────────────────────────────────

  render() {
    const isTarmac = TARMAC_VARIANTS.has(this.variant);

    if (isTarmac) {
      return this._renderTarmac();
    }
    return this._renderLegacy();
  }

  private _renderTarmac() {
    const tSize: TarmacAlertSize = this.size === 'sm' ? 'sm' : 'lg';
    const params = {
      alertConfig: this._alertConfig,
      variant: this.variant as TarmacAlertVariant,
      size: tSize,
    };
    const css = buildAlertCSS(params);
    const isSingle = this.alertStyle === 'singleText';
    const hasTrailingIcon = this.closable;

    return html`
      <style>${css}</style>
      <div class="alert-container" role="alert">
        <div class="alert-inner">
          <div class="alert-row">
            <div class="alert-icon-wrap">
              <slot name="leading-icon"></slot>
            </div>
            <div class="alert-text-col">
              ${isSingle
                ? (this.title || this.description)
                  ? html`<div class="alert-single-text">${this.title || this.description}</div>`
                  : nothing
                : html`
                    <div class="alert-text-block">
                      ${this.title ? html`<div class="alert-title">${this.title}</div>` : nothing}
                      ${this.description ? html`<div class="alert-description">${this.description}</div>` : nothing}
                    </div>
                  `
              }
              <slot></slot>
            </div>
            ${hasTrailingIcon
              ? html`
                  <button
                    type="button"
                    class="alert-close-btn"
                    aria-label="Close alert"
                    @click=${this._handleClose}
                  >
                    <slot name="trailing-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </slot>
                  </button>
                `
              : html`
                  <div class="alert-icon-wrap">
                    <slot name="trailing-icon"></slot>
                  </div>
                `
            }
          </div>
          ${this.showCtas
            ? html`
                <div class="alert-ctas">
                  <slot name="cta-actions">
                    <tarmac-button
                      button-style="tertiary"
                      variant="black"
                      size=${tSize === 'sm' ? 'sm' : 'md'}
                      text=${this.cancelText}
                      @tarmac-click=${this._handleCancel}
                    ></tarmac-button>
                    <tarmac-button
                      button-style="primary"
                      variant="black"
                      size=${tSize === 'sm' ? 'sm' : 'md'}
                      text=${this.proceedText}
                      @tarmac-click=${this._handleProceed}
                    ></tarmac-button>
                  </slot>
                </div>
              `
            : nothing
          }
        </div>
      </div>
    `;
  }

  private _renderLegacy() {
    const css = buildLegacyAlertCSS(this._legacyConfig, this.variant, this.size, {
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      textColor: this.textColor,
      iconColor: this.iconColor,
    });

    return html`
      <style>${css}</style>
      <div class="alert-container" role="alert">
        <span class="alert-icon-wrap">
          <slot name="icon"></slot>
        </span>
        <div class="alert-content">
          ${this.title ? html`<h5 class="alert-title">${this.title}</h5>` : nothing}
          ${this.description ? html`<div class="alert-description">${this.description}</div>` : nothing}
          <slot></slot>
        </div>
        ${this.closable
          ? html`
              <button type="button" class="alert-close-btn" aria-label="Close alert" @click=${this._handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `
          : nothing
        }
      </div>
    `;
  }

  // ── Events ─────────────────────────────────────────────────

  private _handleClose(): void {
    this.dispatchEvent(new CustomEvent('tarmac-close', { bubbles: true, composed: true }));
  }

  private _handleCancel(): void {
    this.dispatchEvent(new CustomEvent('tarmac-cancel', { bubbles: true, composed: true }));
  }

  private _handleProceed(): void {
    this.dispatchEvent(new CustomEvent('tarmac-proceed', { bubbles: true, composed: true }));
  }
}

export type { TarmacAlertVariant, TarmacAlertStyle, TarmacAlertSize, AlertVariant, AlertSize, AlertThemeConfig };

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-alert': TarmacAlert;
  }
}
