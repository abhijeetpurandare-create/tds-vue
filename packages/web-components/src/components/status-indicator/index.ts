/**
 * <tarmac-status-indicator>
 *
 * Web Component equivalent of the React StatusIndicator from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-status-indicator variant="success" size="md" label="Active"></tarmac-status-indicator>
 *   <tarmac-status-indicator variant="failed" size="lg">
 *     <svg slot="icon" ...></svg>
 *   </tarmac-status-indicator>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type StatusVariant = 'success' | 'failed' | 'warning' | 'information' | 'synced' | 'scheduled' | 'unknown' | 'pause' | 'play' | 'downloading' | 'pending';
export type StatusSize = 'lg' | 'md' | 'sm' | 'xs';

interface StatusIndicatorConfig {
  base?: { fontFamily?: string; gap?: string };
  variants?: Record<string, { color?: string }>;
  sizes?: Record<string, { fontSize?: string; lineHeight?: string; dotSize?: string }>;
}

const DEFAULT_CONFIG: StatusIndicatorConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', gap: '4px' },
  variants: {
    success: { color: '#1ba86e' },
    failed: { color: '#dc143c' },
    warning: { color: '#f5c828' },
    information: { color: '#2396fb' },
    synced: { color: '#1ba86e' },
    scheduled: { color: '#64739b' },
    unknown: { color: '#b3b1b1' },
    pause: { color: '#f5c828' },
    play: { color: '#1ba86e' },
    downloading: { color: '#2396fb' },
    pending: { color: '#f5c828' },
  },
  sizes: {
    lg: { fontSize: '14px', lineHeight: '20px', dotSize: '8px' },
    md: { fontSize: '12px', lineHeight: '16px', dotSize: '6px' },
    sm: { fontSize: '10px', lineHeight: '14px', dotSize: '6px' },
    xs: { fontSize: '10px', lineHeight: '12px', dotSize: '4px' },
  },
};

@customElement('tarmac-status-indicator')
export class TarmacStatusIndicator extends LitElement {
  @property({ type: String }) variant: StatusVariant = 'success';
  @property({ type: String }) size: StatusSize = 'md';
  @property({ type: String }) label = '';

  private _unsub?: () => void;
  private _cfg: StatusIndicatorConfig = DEFAULT_CONFIG;

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
    this._cfg = (t?.components?.status_indicator_tarmac as StatusIndicatorConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const vc = cfg.variants?.[this.variant] || {};
    const dotColor = vc.color || '#1ba86e';
    const fontSize = sc.fontSize || '12px';
    const lineHeight = sc.lineHeight || '16px';
    const dotSize = sc.dotSize || '6px';
    const gap = cfg.base?.gap || '4px';
    const fontFamily = cfg.base?.fontFamily || 'Noto Sans, sans-serif';

    return html`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${gap}; }
        .dot { width: ${dotSize}; height: ${dotSize}; border-radius: 50%; flex-shrink: 0; background-color: ${dotColor}; }
        .label { font-family: ${fontFamily}; font-size: ${fontSize}; line-height: ${lineHeight}; color: inherit; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${fontSize}; height: ${fontSize}; }
      </style>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="dot"></span>
      ${this.label ? html`<span class="label">${this.label}</span>` : nothing}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-status-indicator': TarmacStatusIndicator; } }
