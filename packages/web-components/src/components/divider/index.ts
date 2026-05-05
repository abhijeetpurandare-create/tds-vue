/**
 * <tarmac-divider>
 *
 * Web Component equivalent of the React Divider from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-divider></tarmac-divider>
 *   <tarmac-divider divider-type="dash" size="1.5" color="#ED4136"></tarmac-divider>
 *   <tarmac-divider orientation="vertical" style="height:40px"></tarmac-divider>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type DividerType = 'line' | 'dash';
export type DividerSize = '0.5' | '1' | '1.5';

interface DividerConfig {
  base?: { color?: string; dashPattern?: string };
  sizes?: Record<string, { strokeWeight?: string }>;
}

const DEFAULT_CFG: DividerConfig = {
  base: { color: '#cccccc', dashPattern: '6 6' },
  sizes: { '0.5': { strokeWeight: '0.5px' }, '1': { strokeWeight: '1px' }, '1.5': { strokeWeight: '1.5px' } },
};

@customElement('tarmac-divider')
export class TarmacDivider extends LitElement {
  @property({ type: String, attribute: 'divider-type' }) dividerType: DividerType = 'line';
  @property({ type: String }) size: DividerSize = '1';
  @property({ type: String }) color?: string;
  @property({ type: String }) orientation: 'horizontal' | 'vertical' = 'horizontal';

  private _unsub?: () => void;
  private _cfg: DividerConfig = DEFAULT_CFG;

  connectedCallback(): void { super.connectedCallback(); this._resolve(); this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); }); }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void { const t = getThemeFromContext(this); this._cfg = (t?.components?.divider as DividerConfig) || DEFAULT_CFG; }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const strokeWeight = sc.strokeWeight || `${this.size}px`;
    const resolvedColor = this.color || cfg.base?.color || '#b3b1b1';
    const isDash = this.dividerType === 'dash';
    const isVert = this.orientation === 'vertical';

    const bgImage = isDash
      ? isVert
        ? `repeating-linear-gradient(to bottom, ${resolvedColor} 0px, ${resolvedColor} 6px, transparent 6px, transparent 12px)`
        : `repeating-linear-gradient(to right, ${resolvedColor} 0px, ${resolvedColor} 6px, transparent 6px, transparent 12px)`
      : 'none';
    const bgColor = isDash ? 'transparent' : resolvedColor;

    const css = isVert
      ? `:host{display:inline-block;} hr{border:none;width:${strokeWeight};height:100%;margin:0;padding:0;flex-shrink:0;background-color:${bgColor};background-image:${bgImage};}`
      : `:host{display:block;width:100%;} hr{border:none;height:${strokeWeight};width:100%;margin:0;padding:0;flex-shrink:0;background-color:${bgColor};background-image:${bgImage};}`;

    return html`
      <style>${css}</style>
      <hr role="separator" aria-orientation=${this.orientation} />
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-divider': TarmacDivider; } }
