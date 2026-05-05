/**
 * <tarmac-breadcrumbs>
 *
 * Web Component equivalent of the React Breadcrumbs from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-breadcrumbs divider-style="slash" size="lg">
 *     <tarmac-breadcrumb-cell label="Home" href="/"></tarmac-breadcrumb-cell>
 *     <tarmac-breadcrumb-cell label="Products" href="/products"></tarmac-breadcrumb-cell>
 *     <tarmac-breadcrumb-cell label="Detail" is-current></tarmac-breadcrumb-cell>
 *   </tarmac-breadcrumbs>
 */

import { LitElement, html, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type DividerStyle = 'slash' | 'chevron';
export type BreadcrumbsSize = 'lg' | 'sm';

interface BreadcrumbsConfig {
  base?: { dividerColor?: string; dividerStrokeWidth?: string; dividerWidth?: string };
}

const DEFAULT_CONFIG: BreadcrumbsConfig = {
  base: { dividerColor: '#2B2B2B', dividerStrokeWidth: '0.5', dividerWidth: '8px' },
};

@customElement('tarmac-breadcrumbs')
export class TarmacBreadcrumbs extends LitElement {
  @property({ type: String, attribute: 'divider-style' }) dividerStyle: DividerStyle = 'slash';
  @property({ type: String }) size: BreadcrumbsSize = 'lg';
  @property({ type: Boolean, attribute: 'show-divider' }) showDivider = true;

  private _unsub?: () => void;
  private _cfg: BreadcrumbsConfig = DEFAULT_CONFIG;

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
    this._cfg = (t?.components?.breadcrumbs_tarmac as BreadcrumbsConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const dividerColor = cfg.base?.dividerColor || '#2B2B2B';
    const strokeWidth = cfg.base?.dividerStrokeWidth || '0.5';
    const dividerWidth = cfg.base?.dividerWidth || '8px';

    return html`
      <style>
        :host { display: inline-flex; }
        nav { display: flex; align-items: center; gap: 0; }
        .divider { display: inline-flex; align-items: center; justify-content: center; width: ${dividerWidth}; margin: 0 4px; flex-shrink: 0; }
        .divider svg { width: ${dividerWidth}; height: auto; }
        ::slotted(*) { display: inline-flex; }
      </style>
      <nav aria-label="breadcrumb">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }

  private _handleSlotChange(): void {
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    const nodes = slot.assignedElements({ flatten: true });

    // Remove existing dividers
    const nav = this.shadowRoot?.querySelector('nav');
    if (!nav) return;
    nav.querySelectorAll('.divider').forEach(d => d.remove());

    if (!this.showDivider || nodes.length <= 1) return;

    // Insert dividers between slotted elements
    for (let i = 0; i < nodes.length - 1; i++) {
      const divider = document.createElement('span');
      divider.className = 'divider';
      divider.innerHTML = this._getDividerSVG();
      // Insert after the slot but we need to use a different approach with shadow DOM
      // We'll insert dividers into the nav before the slot's next assigned element
      nodes[i].after(divider);
    }

    // Since we can't easily insert into light DOM between slotted elements,
    // we'll use a different rendering approach
    this.requestUpdate();
  }

  private _getDividerSVG(): string {
    const cfg = this._cfg;
    const color = cfg.base?.dividerColor || '#2B2B2B';
    const sw = cfg.base?.dividerStrokeWidth || '0.5';

    if (this.dividerStyle === 'chevron') {
      return `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l5 5-5 5" stroke="${color}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    return `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L2 11" stroke="${color}" stroke-width="${sw}" stroke-linecap="round"/></svg>`;
  }

  updated(): void {
    // Re-render dividers between slotted children
    const slot = this.shadowRoot?.querySelector('slot') as HTMLSlotElement | null;
    if (!slot) return;
    const nav = this.shadowRoot?.querySelector('nav');
    if (!nav) return;

    // Remove old dividers
    nav.querySelectorAll('.divider').forEach(d => d.remove());

    if (!this.showDivider) return;

    const nodes = slot.assignedElements({ flatten: true });
    if (nodes.length <= 1) return;

    // Insert divider spans into the shadow DOM nav, interleaved around the slot
    // Since all children come through one slot, we wrap with a container approach
    const wrapper = document.createElement('span');
    wrapper.style.display = 'contents';

    for (let i = nodes.length - 1; i > 0; i--) {
      const divider = document.createElement('span');
      divider.className = 'divider';
      divider.setAttribute('aria-hidden', 'true');
      divider.innerHTML = this._getDividerSVG();
      const cfg = this._cfg;
      const dividerWidth = cfg.base?.dividerWidth || '8px';
      divider.style.display = 'inline-flex';
      divider.style.alignItems = 'center';
      divider.style.justifyContent = 'center';
      divider.style.width = dividerWidth;
      divider.style.margin = '0 4px';
      divider.style.flexShrink = '0';
      // Insert divider before the i-th light DOM child
      this.insertBefore(divider, nodes[i]);
    }
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-breadcrumbs': TarmacBreadcrumbs; } }
