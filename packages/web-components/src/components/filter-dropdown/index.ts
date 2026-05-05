/**
 * <tarmac-filter-dropdown>
 *
 * Web Component filter dropdown with checkbox options and apply/clear actions.
 *
 * Usage:
 *   <tarmac-filter-dropdown placeholder="Filter by" size="lg"
 *     options='[{"value":"a","label":"Option A"},{"value":"b","label":"Option B"}]'>
 *   </tarmac-filter-dropdown>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type FilterDropdownSize = 'sm' | 'lg';

interface FilterOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface FilterDropdownConfig {
  base?: { fontFamily?: string; radius?: string; borderColor?: string; shadow?: string };
}

const DEFAULT_CFG: FilterDropdownConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '4px', borderColor: '#e0e0e0', shadow: '0 4px 16px rgba(0,0,0,0.12)' },
};

const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;

@customElement('tarmac-filter-dropdown')
export class TarmacFilterDropdown extends LitElement {
  @property({ type: String }) placeholder = 'Select';
  @property({ type: String }) size: FilterDropdownSize = 'lg';
  @property({ type: String }) options = '[]';

  @state() private _isOpen = false;
  @state() private _selected: Set<string> = new Set();

  private _unsub?: () => void;
  private _cfg: FilterDropdownConfig = DEFAULT_CFG;
  private _parsedOptions: FilterOption[] = [];

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    this._parseOptions();
    document.addEventListener('click', this._onDocClick);
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); document.removeEventListener('click', this._onDocClick); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.filter_dropdown_tarmac as FilterDropdownConfig) || DEFAULT_CFG;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('options')) this._parseOptions();
  }

  private _parseOptions(): void {
    try { this._parsedOptions = JSON.parse(this.options); } catch { this._parsedOptions = []; }
  }

  private _onDocClick = (e: MouseEvent): void => {
    if (!this._isOpen) return;
    const path = e.composedPath();
    if (!path.includes(this)) this._isOpen = false;
  };

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '4px';
    const borderColor = base.borderColor || '#e0e0e0';
    const shadow = base.shadow || '0 4px 16px rgba(0,0,0,0.12)';

    const padding = this.size === 'sm' ? '6px 10px' : '8px 12px';
    const fontSize = this.size === 'sm' ? '13px' : '14px';
    const selectedCount = this._selected.size;

    return html`
      <style>
        :host { display: inline-block; position: relative; font-family: ${fontFamily}; }
        .trigger {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid ${borderColor}; border-radius: ${radius};
          padding: ${padding}; cursor: pointer; background: #fff;
          font-size: ${fontSize}; color: #2b2b2b; user-select: none;
          min-width: 120px;
        }
        .trigger:hover { border-color: #b3b1b1; }
        .trigger-text { flex: 1; }
        .badge { background: #2396fb; color: #fff; border-radius: 10px; padding: 0 6px; font-size: 11px; font-weight: 600; line-height: 18px; }
        .chevron { display: flex; align-items: center; color: #6b6b6b; transition: transform 0.15s; }
        .chevron.open { transform: rotate(180deg); }
        .dropdown {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
          background: #fff; border: 1px solid ${borderColor}; border-radius: ${radius};
          box-shadow: ${shadow}; z-index: 100; max-height: 280px; display: flex; flex-direction: column;
        }
        .options { overflow-y: auto; flex: 1; padding: 4px 0; }
        .option {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; font-size: ${fontSize}; color: #2b2b2b;
        }
        .option:hover { background: #f5f5f5; }
        .option.disabled { opacity: 0.5; cursor: default; pointer-events: none; }
        .option input { margin: 0; cursor: pointer; }
        .footer {
          display: flex; justify-content: space-between; padding: 8px 12px;
          border-top: 1px solid ${borderColor};
        }
        .footer-btn {
          background: none; border: none; cursor: pointer; font-size: 13px;
          font-weight: 500; font-family: ${fontFamily}; padding: 4px 8px; border-radius: 4px;
        }
        .clear-btn { color: #6b6b6b; }
        .clear-btn:hover { background: #f5f5f5; }
        .apply-btn { color: #2396fb; }
        .apply-btn:hover { background: #eff8ff; }
      </style>
      <div class="trigger" @click=${this._toggleDropdown}>
        <span class="trigger-text">${this.placeholder}</span>
        ${selectedCount > 0 ? html`<span class="badge">${selectedCount}</span>` : nothing}
        <span class="chevron ${this._isOpen ? 'open' : ''}" .innerHTML=${CHEVRON_SVG}></span>
      </div>
      ${this._isOpen ? html`
        <div class="dropdown">
          <div class="options">
            ${this._parsedOptions.map(opt => html`
              <label class="option ${opt.disabled ? 'disabled' : ''}">
                <input type="checkbox" .checked=${this._selected.has(opt.value)} ?disabled=${opt.disabled} @change=${() => this._toggleOption(opt.value)} />
                <span>${opt.label}</span>
              </label>
            `)}
          </div>
          <div class="footer">
            <button class="footer-btn clear-btn" @click=${this._clearAll}>Clear All</button>
            <button class="footer-btn apply-btn" @click=${this._apply}>Apply</button>
          </div>
        </div>
      ` : nothing}
    `;
  }

  private _toggleDropdown(): void { this._isOpen = !this._isOpen; }

  private _toggleOption(value: string): void {
    const newSet = new Set(this._selected);
    if (newSet.has(value)) newSet.delete(value); else newSet.add(value);
    this._selected = newSet;
    this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { values: Array.from(newSet) } }));
  }

  private _clearAll(): void {
    this._selected = new Set();
    this.dispatchEvent(new CustomEvent('tarmac-clear', { bubbles: true, composed: true }));
  }

  private _apply(): void {
    this._isOpen = false;
    this.dispatchEvent(new CustomEvent('tarmac-apply', { bubbles: true, composed: true, detail: { values: Array.from(this._selected) } }));
  }
}

export type { FilterDropdownConfig, FilterOption };

declare global { interface HTMLElementTagNameMap { 'tarmac-filter-dropdown': TarmacFilterDropdown; } }
