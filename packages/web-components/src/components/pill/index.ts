/**
 * <tarmac-pill>
 *
 * Web Component equivalent of the React Pill from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-pill pill-variant="success" pill-type="solid" size="md">Active</tarmac-pill>
 *   <tarmac-pill pill-variant="error" pill-type="outlined" show-status>Critical</tarmac-pill>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type PillVariant = 'black' | 'white' | 'coal' | 'blue' | 'success' | 'error' | 'warning' | 'legacy_blue';
export type PillSize = 'sm' | 'md' | 'lg';
export type PillType = 'solid' | 'subtle' | 'outlined';

interface VariantConfig { backgroundColor?: string; textColor?: string; borderColor?: string; iconColor?: string; }

interface PillConfig {
  base: { fontFamily?: string; fontWeight?: string; borderRadius?: string };
  types?: Record<string, Record<string, VariantConfig>>;
  variants: Record<string, VariantConfig>;
  sizes: Record<string, { padding?: string; fontSize?: string; lineHeight?: string; iconSize?: string; gap?: string }>;
  states: { disabled?: Record<string, VariantConfig> | VariantConfig; ghost?: VariantConfig & { cursor?: string } };
}

const DEFAULT_CONFIG: PillConfig = {
  base: { fontFamily: 'sans-serif', fontWeight: '500', borderRadius: '999px' },
  types: {
    solid: {
      black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' }, white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e0e0e0' },
      coal: { backgroundColor: '#4a4a4a', textColor: '#ffffff' }, blue: { backgroundColor: '#3b82f6', textColor: '#ffffff' },
      success: { backgroundColor: '#10b981', textColor: '#ffffff' }, error: { backgroundColor: '#ef4444', textColor: '#ffffff' },
      warning: { backgroundColor: '#f59e0b', textColor: '#7b6414' }, legacy_blue: { backgroundColor: '#5b80f7', textColor: '#ffffff' },
    },
    subtle: {
      black: { backgroundColor: '#e6e6e6', textColor: '#2b2b2b' }, white: { backgroundColor: '#3a3a3a', textColor: '#ffffff' },
      coal: { backgroundColor: '#d9d9d9', textColor: '#4a4a4a' }, blue: { backgroundColor: '#dbeafe', textColor: '#1d4ed8' },
      success: { backgroundColor: '#d1fae5', textColor: '#047857' }, error: { backgroundColor: '#fee2e2', textColor: '#b91c1c' },
      warning: { backgroundColor: '#fef3c7', textColor: '#7b6414' }, legacy_blue: { backgroundColor: '#e0e7ff', textColor: '#3b5bdb' },
    },
    outlined: {
      black: { backgroundColor: 'transparent', textColor: '#2b2b2b', borderColor: '#2b2b2b' }, white: { backgroundColor: 'transparent', textColor: '#ffffff', borderColor: '#e0e0e0' },
      coal: { backgroundColor: 'transparent', textColor: '#4a4a4a', borderColor: '#999999' }, blue: { backgroundColor: 'transparent', textColor: '#1d4ed8', borderColor: '#3b82f6' },
      success: { backgroundColor: 'transparent', textColor: '#047857', borderColor: '#10b981' }, error: { backgroundColor: 'transparent', textColor: '#b91c1c', borderColor: '#ef4444' },
      warning: { backgroundColor: 'transparent', textColor: '#7b6414', borderColor: '#f59e0b' }, legacy_blue: { backgroundColor: 'transparent', textColor: '#3b5bdb', borderColor: '#5b80f7' },
    },
  },
  variants: { black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' }, white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', borderColor: '#e0e0e0' } },
  sizes: {
    sm: { padding: '4px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
    md: { padding: '6px', fontSize: '10px', lineHeight: '12px', iconSize: '12px', gap: '2px' },
    lg: { padding: '6px', fontSize: '12px', lineHeight: '16px', iconSize: '16px', gap: '2px' },
  },
  states: {
    disabled: { backgroundColor: '#dedede', textColor: '#cdcbcb', borderColor: 'transparent' },
    ghost: { backgroundColor: '#dedede', textColor: 'transparent', borderColor: 'transparent' },
  },
};

function getVC(cfg: PillConfig, pillType: PillType, variant: string): VariantConfig {
  return cfg.types?.[pillType]?.[variant] || cfg.variants[variant] || {};
}

@customElement('tarmac-pill')
export class TarmacPill extends LitElement {
  @property({ type: String, attribute: 'pill-variant' }) pillVariant: PillVariant = 'black';
  @property({ type: String, attribute: 'pill-type' }) pillType: PillType = 'solid';
  @property({ type: String }) size: PillSize = 'md';
  @property({ type: String }) text = '';
  @property({ type: Boolean, attribute: 'show-status' }) showStatus = false;
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;

  private _unsub?: () => void;
  private _cfg: PillConfig = DEFAULT_CONFIG;

  connectedCallback(): void { super.connectedCallback(); this._resolve(); this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); }); }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void { const t = getThemeFromContext(this); this._cfg = (t?.components?.pill_tarmac as PillConfig) || DEFAULT_CONFIG; }

  render() {
    const sc = this._cfg.sizes[this.size] || {};
    const iconSize = sc.iconSize || '12px';
    let bgColor: string, textColor: string, borderW: string, borderColor: string, extra = '';

    if (this.isGhost) {
      const gs = this._cfg.states.ghost || {} as any;
      bgColor = gs.backgroundColor || '#dedede'; textColor = gs.textColor || 'transparent'; borderW = '0'; borderColor = 'transparent'; extra = 'pointer-events:none;';
    } else if (this.isDisabled) {
      const ds = (this._cfg.states.disabled as VariantConfig) || {};
      bgColor = 'transparent'; textColor = ds.textColor || '#cdcbcb'; borderW = '0.5px'; borderColor = ds.borderColor || '#ededed'; extra = 'cursor:default;';
    } else {
      const vc = getVC(this._cfg, this.pillType, this.pillVariant);
      bgColor = vc.backgroundColor || '#e6e6e6'; textColor = vc.textColor || '#2b2b2b'; borderW = vc.borderColor ? '0.5px' : '0'; borderColor = vc.borderColor || 'transparent';
    }

    const statusColor = this.isGhost ? 'transparent' : this.isDisabled ? '#cdcbcb' : textColor;

    return html`
      <style>
        :host { display: inline-block; }
        .pill { display:inline-flex; align-items:center; justify-content:center; font-family:${this._cfg.base.fontFamily || 'sans-serif'}; font-weight:${Number(this._cfg.base.fontWeight || 500)}; border-radius:${this._cfg.base.borderRadius || '999px'}; padding:${sc.padding || '6px'}; font-size:${sc.fontSize || '10px'}; line-height:${sc.lineHeight || '12px'}; gap:${sc.gap || '2px'}; user-select:none; background-color:${bgColor}; color:${textColor}; border-width:${borderW}; border-style:solid; border-color:${borderColor}; ${extra} }
        .icon { width:${iconSize}; height:${iconSize}; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
        .icon ::slotted(svg), .icon svg { width:${iconSize}; height:${iconSize}; }
        .dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
      </style>
      <span class="pill">
        ${this.showStatus ? html`<span class="dot" style="background-color:${statusColor}"></span>` : nothing}
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || html`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-pill': TarmacPill; } }
