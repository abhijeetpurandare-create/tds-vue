/**
 * <tarmac-chip>
 *
 * Web Component equivalent of the React Chip from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-chip chip-type="success" chip-variant="standard" size="md">Active</tarmac-chip>
 *   <tarmac-chip chip-type="error" chip-variant="outlined" size="lg">
 *     <svg slot="leading-icon" ...></svg>
 *     Critical
 *   </tarmac-chip>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { buildChipCSS, getChipStatusColor, type ChipType, type ChipVariant, type ChipSize, type ChipConfig } from './chip-styles';
import { defaultChipConfig } from './default-config';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

@customElement('tarmac-chip')
export class TarmacChip extends LitElement {
  @property({ type: String, attribute: 'chip-type' }) chipType: ChipType = 'black';
  @property({ type: String, attribute: 'chip-variant' }) chipVariant: ChipVariant = 'standard';
  @property({ type: String }) size: ChipSize = 'md';
  @property({ type: String }) text = '';
  @property({ type: Boolean, attribute: 'status-left' }) statusLeft = false;
  @property({ type: Boolean, attribute: 'status-right' }) statusRight = false;
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;

  private _unsubscribeTheme?: () => void;
  private _chipConfig: ChipConfig = defaultChipConfig;

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
    this._chipConfig = (theme?.components?.chip || theme?.components?.tag) as ChipConfig || defaultChipConfig;
  }

  render() {
    const params = {
      chipConfig: this._chipConfig,
      chipType: this.chipType,
      chipVariant: this.chipVariant,
      size: this.size,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost,
    };

    const css = buildChipCSS(params);
    const statusColor = getChipStatusColor(params);

    return html`
      <style>${css}</style>
      <span
        class="tarmac-chip"
        tabindex=${this.isDisabled || this.isGhost ? -1 : 0}
        role="button"
        aria-disabled=${this.isDisabled || nothing}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this.statusLeft ? html`<span class="status-dot" style="background-color:${statusColor}"></span>` : nothing}
        <span class="chip-icon"><slot name="leading-icon"></slot></span>
        ${this.text || html`<slot></slot>`}
        <span class="chip-icon"><slot name="trailing-icon"></slot></span>
        ${this.statusRight ? html`<span class="status-dot" style="background-color:${statusColor}"></span>` : nothing}
      </span>
    `;
  }

  private _handleClick(e: MouseEvent): void {
    if (this.isDisabled || this.isGhost) return;
    this.dispatchEvent(new CustomEvent('tarmac-click', { bubbles: true, composed: true, detail: { originalEvent: e } }));
  }

  private _handleKeydown(e: KeyboardEvent): void {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      this._handleClick(e as any);
    }
  }
}

export type { ChipType, ChipVariant, ChipSize, ChipConfig };

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-chip': TarmacChip;
  }
}
