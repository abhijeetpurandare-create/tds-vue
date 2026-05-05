/**
 * <tarmac-badge>
 *
 * Web Component equivalent of the React Badge from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-badge variant="success" size="md">Active</tarmac-badge>
 *
 *   <!-- With status dot -->
 *   <tarmac-badge variant="info" show-status>Online</tarmac-badge>
 *
 *   <!-- With icons -->
 *   <tarmac-badge variant="error" size="lg">
 *     <svg slot="leading-icon" ...></svg>
 *     Critical
 *   </tarmac-badge>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  buildBadgeCSS,
  getStatusDotColor,
  type BadgeVariant,
  type BadgeSize,
  type BadgeType,
  type BadgeConfig,
} from './badge-styles';
import { defaultBadgeConfig } from './default-config';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

@customElement('tarmac-badge')
export class TarmacBadge extends LitElement {
  // ── Properties (mirror React BadgeProps) ───────────────────

  @property({ type: String }) variant: BadgeVariant = 'black';
  @property({ type: String }) size: BadgeSize = 'md';
  @property({ type: String, attribute: 'badge-type' }) badgeType: BadgeType = 'solid';
  @property({ type: String }) text = '';
  @property({ type: Boolean, attribute: 'show-status' }) showStatus = false;
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;

  // ── Internal state ─────────────────────────────────────────

  private _unsubscribeTheme?: () => void;
  private _badgeConfig: BadgeConfig = defaultBadgeConfig;

  // ── Lifecycle ──────────────────────────────────────────────

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
    this._badgeConfig = (theme?.components?.badge as BadgeConfig) || defaultBadgeConfig;
  }

  // ── Rendering ──────────────────────────────────────────────

  render() {
    const params = {
      badgeConfig: this._badgeConfig,
      variant: this.variant,
      size: this.size,
      badgeType: this.badgeType,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost,
    };

    const css = buildBadgeCSS(params);
    const statusColor = this.showStatus ? getStatusDotColor(params) : '';

    return html`
      <style>${css}</style>
      <span class="tarmac-badge">
        ${this.showStatus
          ? html`<span class="status-dot" style="background-color: ${statusColor}"></span>`
          : nothing
        }
        <span class="badge-icon"><slot name="leading-icon"></slot></span>
        ${this.text || html`<slot></slot>`}
        <span class="badge-icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
}

export type { BadgeVariant, BadgeSize, BadgeType, BadgeConfig };

declare global {
  interface HTMLElementTagNameMap {
    'tarmac-badge': TarmacBadge;
  }
}
