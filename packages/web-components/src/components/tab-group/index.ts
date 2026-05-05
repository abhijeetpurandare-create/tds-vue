/**
 * <tarmac-tab-group>
 *
 * Web Component tab group container for tab-cell elements.
 *
 * Usage:
 *   <tarmac-tab-group orientation="horizontal" size="lg">
 *     <tarmac-tab-cell>Tab 1</tarmac-tab-cell>
 *     <tarmac-tab-cell>Tab 2</tarmac-tab-cell>
 *   </tarmac-tab-group>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type TabGroupOrientation = 'horizontal' | 'vertical';
export type TabGroupSize = 'lg' | 'sm';

interface TabGroupConfig {
  base?: { fontFamily?: string; borderColor?: string };
}

const DEFAULT_CFG: TabGroupConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', borderColor: '#e6e6e6' },
};

@customElement('tarmac-tab-group')
export class TarmacTabGroup extends LitElement {
  @property({ type: String }) orientation: TabGroupOrientation = 'horizontal';
  @property({ type: String }) size: TabGroupSize = 'lg';

  private _unsub?: () => void;
  private _cfg: TabGroupConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    this.addEventListener('click', this._onTabClick);
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); this.removeEventListener('click', this._onTabClick); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.tab_group_tarmac as TabGroupConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const borderColor = base.borderColor || '#e6e6e6';
    const isHorizontal = this.orientation === 'horizontal';

    return html`
      <style>
        :host { display: block; font-family: ${fontFamily}; }
        .tab-group {
          display: flex;
          flex-direction: ${isHorizontal ? 'row' : 'column'};
          ${isHorizontal ? `border-bottom: 1px solid ${borderColor};` : `border-right: 1px solid ${borderColor};`}
          gap: 0;
        }
        ::slotted(*) { cursor: pointer; }
      </style>
      <div class="tab-group" role="tablist" aria-orientation=${this.orientation}>
        <slot></slot>
      </div>
    `;
  }

  private _onTabClick = (e: Event): void => {
    const target = e.target as HTMLElement;
    const tabCell = target.closest('tarmac-tab-cell');
    if (!tabCell) return;

    const tabs = Array.from(this.querySelectorAll('tarmac-tab-cell'));
    const index = tabs.indexOf(tabCell);
    if (index >= 0) {
      this.dispatchEvent(new CustomEvent('tarmac-tab-change', { bubbles: true, composed: true, detail: { index } }));
    }
  };
}

export type { TabGroupConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-tab-group': TarmacTabGroup; } }
