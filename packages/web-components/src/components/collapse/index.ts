/**
 * <tarmac-collapse>
 *
 * Web Component accordion/collapse with slot-based panels.
 *
 * Usage:
 *   <tarmac-collapse accordion active-key="panel1">
 *     <div data-key="panel1" data-title="Section 1">Content 1</div>
 *     <div data-key="panel2" data-title="Section 2">Content 2</div>
 *   </tarmac-collapse>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

interface CollapseConfig {
  base?: { fontFamily?: string; borderColor?: string; radius?: string; transition?: string; headerPadding?: string; contentPadding?: string; headerFontSize?: string; headerLineHeight?: string };
}

const DEFAULT_CFG: CollapseConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', borderColor: '#e6e6e6', radius: '4px', transition: 'all 0.2s ease-in-out', headerPadding: '12px', contentPadding: '12px', headerFontSize: '14px', headerLineHeight: '20px' },
};

const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

@customElement('tarmac-collapse')
export class TarmacCollapse extends LitElement {
  @property({ type: Boolean }) accordion = false;
  @property({ type: String, attribute: 'active-key' }) activeKey = '';

  @state() private _openKeys: Set<string> = new Set();

  private _unsub?: () => void;
  private _cfg: CollapseConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    if (this.activeKey) this._openKeys = new Set(this.activeKey.split(',').map(k => k.trim()));
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.collapse_tarmac as CollapseConfig) || DEFAULT_CFG;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('activeKey') && this.activeKey) {
      this._openKeys = new Set(this.activeKey.split(',').map(k => k.trim()));
    }
  }

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const borderColor = base.borderColor || '#e6e6e6';
    const radius = base.radius || '4px';
    const transition = base.transition || 'all 0.2s ease-in-out';
    const headerPadding = base.headerPadding || '12px';
    const contentPadding = base.contentPadding || '12px';
    const headerFontSize = base.headerFontSize || '14px';
    const headerLineHeight = base.headerLineHeight || '20px';

    // Get slotted panels
    const panels = Array.from(this.children).filter(el => el.hasAttribute('data-key'));

    return html`
      <style>
        :host { display: block; font-family: ${fontFamily}; }
        .collapse { border: 1px solid ${borderColor}; border-radius: ${radius}; overflow: hidden; }
        .panel { border-bottom: 1px solid ${borderColor}; }
        .panel:last-child { border-bottom: none; }
        .panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: ${headerPadding}; cursor: pointer; user-select: none;
          font-size: ${headerFontSize}; line-height: ${headerLineHeight};
          font-weight: 500; color: #2b2b2b; background: #fff;
        }
        .panel-header:hover { background: #fafafa; }
        .chevron { display: flex; align-items: center; transition: ${transition}; color: #6b6b6b; }
        .chevron.open { transform: rotate(180deg); }
        .panel-content {
          overflow: hidden; max-height: 0; transition: max-height 0.2s ease-in-out;
        }
        .panel-content.open { max-height: 1000px; }
        .panel-content-inner { padding: ${contentPadding}; border-top: 1px solid ${borderColor}; }
      </style>
      <div class="collapse">
        ${panels.map(panel => {
          const key = panel.getAttribute('data-key') || '';
          const title = panel.getAttribute('data-title') || key;
          const isOpen = this._openKeys.has(key);
          return html`
            <div class="panel">
              <div class="panel-header" @click=${() => this._togglePanel(key)}>
                <span>${title}</span>
                <span class="chevron ${isOpen ? 'open' : ''}" .innerHTML=${CHEVRON_SVG}></span>
              </div>
              <div class="panel-content ${isOpen ? 'open' : ''}">
                <div class="panel-content-inner"></div>
              </div>
            </div>
          `;
        })}
        <div style="display:none;"><slot></slot></div>
      </div>
    `;
  }

  private _togglePanel(key: string): void {
    const newKeys = new Set(this._openKeys);
    if (newKeys.has(key)) {
      newKeys.delete(key);
    } else {
      if (this.accordion) newKeys.clear();
      newKeys.add(key);
    }
    this._openKeys = newKeys;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { activeKey: Array.from(newKeys).join(',') } }));
  }
}

export type { CollapseConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-collapse': TarmacCollapse; } }
