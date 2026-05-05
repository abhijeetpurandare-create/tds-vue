/**
 * <tarmac-progress-bar>
 *
 * Web Component equivalent of the React ProgressBar from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-progress-bar value="65" size="md" variant="primary"></tarmac-progress-bar>
 *   <tarmac-progress-bar value="100" variant="success" show-percentage></tarmac-progress-bar>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type ProgressBarSize = 'sm' | 'md' | 'lg';
export type ProgressBarVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default';

interface ProgressBarConfig {
  base?: { trackColor?: string; borderRadius?: string; transition?: string; textFontSize?: string; textColor?: string };
  variants?: Record<string, { fillColor?: string }>;
  sizes?: Record<string, { height?: string }>;
}

const DEFAULT_CONFIG: ProgressBarConfig = {
  base: { trackColor: '#e6e6e6', borderRadius: '999px', transition: 'width 0.3s', textFontSize: '12px', textColor: '#2b2b2b' },
  variants: {
    primary: { fillColor: '#2396fb' },
    success: { fillColor: '#1ba86e' },
    warning: { fillColor: '#f5c828' },
    error: { fillColor: '#dc143c' },
    info: { fillColor: '#2396fb' },
    default: { fillColor: '#2b2b2b' },
  },
  sizes: {
    sm: { height: '4px' },
    md: { height: '8px' },
    lg: { height: '12px' },
  },
};

@customElement('tarmac-progress-bar')
export class TarmacProgressBar extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: String }) size: ProgressBarSize = 'md';
  @property({ type: String }) variant: ProgressBarVariant = 'primary';
  @property({ type: Boolean, attribute: 'show-percentage' }) showPercentage = false;
  @property({ type: String, attribute: 'track-color' }) trackColor?: string;
  @property({ type: String, attribute: 'text-color' }) textColor?: string;

  private _unsub?: () => void;
  private _cfg: ProgressBarConfig = DEFAULT_CONFIG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsub?.();
  }

  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.progress_bar_tarmac as ProgressBarConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const vc = cfg.variants?.[this.variant] || {};
    const height = sc.height || '8px';
    const fillColor = vc.fillColor || '#2396fb';
    const bgColor = this.trackColor || cfg.base?.trackColor || '#e6e6e6';
    const borderRadius = cfg.base?.borderRadius || '999px';
    const transition = cfg.base?.transition || 'width 0.3s';
    const txtColor = this.textColor || cfg.base?.textColor || '#2b2b2b';
    const txtFontSize = cfg.base?.textFontSize || '12px';
    const clampedValue = Math.max(0, Math.min(100, this.value));

    return html`
      <style>
        :host { display: block; width: 100%; }
        .wrapper { display: flex; align-items: center; gap: 8px; }
        .track { flex: 1; height: ${height}; background-color: ${bgColor}; border-radius: ${borderRadius}; overflow: hidden; }
        .fill { height: 100%; border-radius: ${borderRadius}; background-color: ${fillColor}; transition: ${transition}; }
        .percentage { font-size: ${txtFontSize}; color: ${txtColor}; flex-shrink: 0; font-family: Noto Sans, sans-serif; }
      </style>
      <div class="wrapper" role="progressbar" aria-valuenow=${clampedValue} aria-valuemin="0" aria-valuemax="100">
        <div class="track">
          <div class="fill" style="width:${clampedValue}%"></div>
        </div>
        ${this.showPercentage ? html`<span class="percentage">${clampedValue}%</span>` : nothing}
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-progress-bar': TarmacProgressBar; } }
