/**
 * <tarmac-toggle>
 *
 * Web Component equivalent of the React Switch/Toggle from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-toggle tarmac-color="black" tarmac-style="filled" tarmac-size="lg"></tarmac-toggle>
 *   <tarmac-toggle tarmac-color="blue" tarmac-style="outlined" checked></tarmac-toggle>
 */

import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type TarmacToggleColor = 'black' | 'blue' | 'dlv_red' | 'green';
export type TarmacToggleStyle = 'filled' | 'outlined';
export type TarmacToggleSize = 'lg' | 'sm';

interface ToggleConfig {
  base?: { transition?: string; radius?: string; handleColor?: string };
  styles?: { filled?: Record<string, any>; outlined?: Record<string, any> };
  sizes?: Record<string, { trackWidth?: string; trackHeight?: string; handleSize?: string; handleOffset?: string; borderWidth?: string }>;
  states?: { disabled?: Record<string, string>; ghost?: Record<string, string> };
}

const DEFAULT_CFG: ToggleConfig = {
  base: { transition: 'all 0.15s ease-in-out', radius: '999px', handleColor: '#ffffff' },
  styles: {
    filled: {
      black: { uncheckedBackgroundColor: '#b3b1b1', checkedBackgroundColor: '#000000' },
      blue: { uncheckedBackgroundColor: '#b3b1b1', checkedBackgroundColor: '#2396fb' },
      dlv_red: { uncheckedBackgroundColor: '#b3b1b1', checkedBackgroundColor: '#ed1b36' },
      green: { uncheckedBackgroundColor: '#b3b1b1', checkedBackgroundColor: '#1ba86e' },
    },
    outlined: {
      black: { uncheckedBorderColor: '#b3b1b1', checkedBorderColor: '#000000', uncheckedBackgroundColor: 'transparent', checkedBackgroundColor: 'transparent', handleUncheckedColor: '#b3b1b1', handleCheckedColor: '#000000' },
      blue: { uncheckedBorderColor: '#b3b1b1', checkedBorderColor: '#2396fb', uncheckedBackgroundColor: 'transparent', checkedBackgroundColor: 'transparent', handleUncheckedColor: '#b3b1b1', handleCheckedColor: '#2396fb' },
    },
  },
  sizes: {
    lg: { trackWidth: '40px', trackHeight: '24px', handleSize: '16px', handleOffset: '4px', borderWidth: '1px' },
    sm: { trackWidth: '32px', trackHeight: '20px', handleSize: '12px', handleOffset: '4px', borderWidth: '1px' },
  },
  states: { disabled: { checkedBackgroundColor: '#e6e6e6', handleColor: '#cdcbcb', borderColor: '#ededed' }, ghost: { backgroundColor: '#dedede', handleColor: '#cdcbcb', borderColor: '#e6e6e6' } },
};

@customElement('tarmac-toggle')
export class TarmacToggle extends LitElement {
  @property({ type: String, attribute: 'tarmac-color' }) tarmacColor: TarmacToggleColor = 'black';
  @property({ type: String, attribute: 'tarmac-style' }) tarmacStyle: TarmacToggleStyle = 'filled';
  @property({ type: String, attribute: 'tarmac-size' }) tarmacSize: TarmacToggleSize = 'lg';
  @property({ type: Boolean }) checked = false;
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;

  private _unsub?: () => void;
  private _cfg: ToggleConfig = DEFAULT_CFG;

  connectedCallback(): void { super.connectedCallback(); this._resolve(); this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); }); }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void { const t = getThemeFromContext(this); this._cfg = (t?.components?.toggle_tarmac as ToggleConfig) || DEFAULT_CFG; }

  static styles = css`:host { display: inline-block; }`;

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.tarmacSize] || {};
    const trackW = sc.trackWidth || '40px';
    const trackH = sc.trackHeight || '24px';
    const handleSz = sc.handleSize || '16px';
    const offset = sc.handleOffset || '4px';
    const radius = cfg.base?.radius || '999px';
    const transition = cfg.base?.transition || 'all 0.15s ease-in-out';
    const isFilled = this.tarmacStyle === 'filled';

    let trackBg: string, trackBorder: string, handleColor: string, cursor: string;

    if (this.isGhost) {
      const gs = cfg.states?.ghost || {};
      trackBg = gs.backgroundColor || '#dedede'; trackBorder = `1px solid ${gs.borderColor || '#e6e6e6'}`; handleColor = gs.handleColor || '#cdcbcb'; cursor = 'default';
    } else if (this.disabled) {
      const ds = cfg.states?.disabled || {};
      trackBg = ds.checkedBackgroundColor || '#e6e6e6'; trackBorder = isFilled ? 'none' : `1px solid ${ds.borderColor || '#ededed'}`; handleColor = ds.handleColor || '#cdcbcb'; cursor = 'default';
    } else if (isFilled) {
      const vc = cfg.styles?.filled?.[this.tarmacColor] || {};
      trackBg = this.checked ? (vc.checkedBackgroundColor || '#000') : (vc.uncheckedBackgroundColor || '#b3b1b1'); trackBorder = 'none'; handleColor = cfg.base?.handleColor || '#ffffff'; cursor = 'pointer';
    } else {
      const vc = cfg.styles?.outlined?.[this.tarmacColor] || {};
      trackBg = this.checked ? (vc.checkedBackgroundColor || 'transparent') : (vc.uncheckedBackgroundColor || 'transparent');
      trackBorder = `${sc.borderWidth || '1px'} solid ${this.checked ? (vc.checkedBorderColor || '#000') : (vc.uncheckedBorderColor || '#b3b1b1')}`;
      handleColor = this.checked ? (vc.handleCheckedColor || '#000') : (vc.handleUncheckedColor || '#b3b1b1'); cursor = 'pointer';
    }

    const justify = this.checked ? 'flex-end' : 'flex-start';

    return html`
      <style>
        .track { position:relative; display:inline-flex; justify-content:${justify}; align-items:center; width:${trackW}; height:${trackH}; border-radius:${radius}; background-color:${trackBg}; border:${trackBorder}; cursor:${cursor}; transition:${transition}; padding:${offset}; box-sizing:border-box; }
        .handle { width:${handleSz}; height:${handleSz}; border-radius:50%; background-color:${handleColor}; transition:${transition}; flex-shrink:0; }
      </style>
      <button
        class="track"
        role="switch"
        aria-checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <span class="handle"></span>
      </button>
    `;
  }

  private _toggle(): void {
    if (this.disabled || this.isGhost) return;
    this.checked = !this.checked;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { checked: this.checked } }));
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-toggle': TarmacToggle; } }
