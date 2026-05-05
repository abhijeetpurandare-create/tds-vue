/**
 * <tarmac-spinner>
 *
 * Web Component equivalent of the React Spinner from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-spinner tarmac-variant="tarmac-01" tarmac-size="24px"></tarmac-spinner>
 *   <tarmac-spinner variant="primary" size="md"></tarmac-spinner>
 */

import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
export type TarmacSpinnerVariant = 'tarmac-01' | 'tarmac-02' | 'tarmac-03' | 'tarmac-04';
export type TarmacSpinnerSize = '16px' | '20px' | '24px' | '28px' | '32px' | '36px' | '40px' | '44px';

const DEFAULT_SPINNER_CONFIG: any = {
  sizes: {
    sm: { size: '16px', strokeWidth: 3 },
    md: { size: '24px', strokeWidth: 4 },
    lg: { size: '32px', strokeWidth: 4 },
  },
  variants: {
    default: { color: '#4B5563', trackColor: '#E5E7EB' },
    primary: { color: '#2563EB', trackColor: '#DBEAFE' },
    secondary: { color: '#4B5563', trackColor: '#E5E7EB' },
    success: { color: '#059669', trackColor: '#D1FAE5' },
    error: { color: '#DC2626', trackColor: '#FEE2E2' },
    warning: { color: '#D97706', trackColor: '#FEF3C7' },
    info: { color: '#2563EB', trackColor: '#DBEAFE' },
  },
};

@customElement('tarmac-spinner')
export class TarmacSpinner extends LitElement {
  @property({ type: String }) size: SpinnerSize = 'md';
  @property({ type: String }) variant: SpinnerVariant = 'default';
  @property({ type: String, attribute: 'tarmac-variant' }) tarmacVariant?: TarmacSpinnerVariant;
  @property({ type: String, attribute: 'tarmac-size' }) tarmacSize: TarmacSpinnerSize = '24px';
  @property({ type: String }) color?: string;
  @property({ type: String, attribute: 'track-color' }) trackColor?: string;

  private _unsubscribeTheme?: () => void;
  private _spinnerConfig: any = DEFAULT_SPINNER_CONFIG;

  static styles = css`
    :host { display: inline-block; }

    .spinner-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border-width: 0;
    }
  `;

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
    this._spinnerConfig = theme?.components?.spinner || DEFAULT_SPINNER_CONFIG;
  }

  render() {
    const cfg = this._spinnerConfig;

    if (this.tarmacVariant) {
      const vc = cfg.variants?.[this.tarmacVariant] || {};
      const sc = cfg.sizes?.[this.tarmacSize] || {};
      const spinnerColor = this.color || vc.color || '#000000';
      const spinnerTrack = this.trackColor || vc.trackColor || '#d4d4d4';
      const pxSize = sc.size || this.tarmacSize;
      const sw = sc.strokeWidth || 3;

      return html`
        <div class="spinner-wrap" role="status" style="width:${pxSize};height:${pxSize}">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="${spinnerTrack}" stroke-width="${sw}" opacity="0.3"/>
            <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${spinnerColor}" stroke-width="${sw}" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      `;
    }

    // Legacy path
    const vc = cfg.variants?.[this.variant] || cfg.variants?.default || {};
    const sc = cfg.sizes?.[this.size] || {};
    const spinnerColor = this.color || vc.color || '#3B82F6';
    const spinnerTrack = this.trackColor || vc.trackColor || '#E5E7EB';
    const sw = sc.strokeWidth || 2;
    const sizeMap: Record<string, string> = { sm: '16px', md: '24px', lg: '32px' };
    const pxSize = sizeMap[this.size] || '24px';

    return html`
      <div class="spinner-wrap" role="status" style="width:${pxSize};height:${pxSize}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="${spinnerTrack}" stroke-width="${sw}" opacity="0.3"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${spinnerColor}" stroke-width="${sw}" stroke-linecap="round"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-spinner': TarmacSpinner;
  }
}
