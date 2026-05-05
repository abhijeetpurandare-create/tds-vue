/**
 * <tarmac-rating>
 *
 * Web Component equivalent of the React Rating from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-rating value="3" max-stars="5" size="md"></tarmac-rating>
 *   <tarmac-rating value="4.5" allow-half read-only></tarmac-rating>
 */

import { LitElement, html, svg, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type RatingSize = 'lg' | 'md' | 'sm';

interface RatingConfig {
  base?: { filledColor?: string; emptyColor?: string; gap?: string; starPath?: string };
  sizes?: Record<string, { starSize?: string }>;
}

const STAR_PATH = 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

const DEFAULT_CONFIG: RatingConfig = {
  base: { filledColor: '#f5c828', emptyColor: '#e6e6e6', gap: '2px', starPath: STAR_PATH },
  sizes: {
    lg: { starSize: '20px' },
    md: { starSize: '16px' },
    sm: { starSize: '14px' },
  },
};

@customElement('tarmac-rating')
export class TarmacRating extends LitElement {
  @property({ type: Number }) value = 0;
  @property({ type: Number, attribute: 'max-stars' }) maxStars = 5;
  @property({ type: String }) size: RatingSize = 'md';
  @property({ type: Boolean, attribute: 'read-only' }) readOnly = false;
  @property({ type: Boolean, attribute: 'allow-half' }) allowHalf = false;

  private _unsub?: () => void;
  private _cfg: RatingConfig = DEFAULT_CONFIG;
  private _hoverValue = -1;

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
    this._cfg = (t?.components?.rating_tarmac as RatingConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const starSize = sc.starSize || '16px';
    const filledColor = cfg.base?.filledColor || '#f5c828';
    const emptyColor = cfg.base?.emptyColor || '#e6e6e6';
    const gap = cfg.base?.gap || '2px';
    const starPath = cfg.base?.starPath || STAR_PATH;
    const cursor = this.readOnly ? 'default' : 'pointer';
    const displayValue = this._hoverValue >= 0 ? this._hoverValue : this.value;

    const stars = [];
    for (let i = 1; i <= this.maxStars; i++) {
      const filled = displayValue >= i;
      const halfFilled = !filled && this.allowHalf && displayValue >= i - 0.5;
      const clipId = `half-clip-${i}`;

      stars.push(html`
        <span
          class="star"
          style="width:${starSize};height:${starSize};cursor:${cursor};"
          @click=${() => this._handleClick(i)}
          @mouseenter=${() => this._handleHover(i)}
          @mouseleave=${this._handleLeave}
        >
          <svg viewBox="0 0 24 24" width=${starSize} height=${starSize} xmlns="http://www.w3.org/2000/svg">
            ${halfFilled ? svg`
              <defs>
                <clipPath id=${clipId}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path d=${starPath} fill=${emptyColor} />
              <path d=${starPath} fill=${filledColor} clip-path="url(#${clipId})" />
            ` : svg`
              <path d=${starPath} fill=${filled ? filledColor : emptyColor} />
            `}
          </svg>
        </span>
      `);
    }

    return html`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${gap}; }
        .star { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
      </style>
      ${stars}
    `;
  }

  private _handleClick(starIndex: number): void {
    if (this.readOnly) return;
    const newValue = this.allowHalf && this.value === starIndex - 0.5 ? starIndex : this.allowHalf ? starIndex - 0.5 : starIndex;
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('tarmac-change', {
      bubbles: true,
      composed: true,
      detail: { value: this.value },
    }));
  }

  private _handleHover(starIndex: number): void {
    if (this.readOnly) return;
    this._hoverValue = starIndex;
    this.requestUpdate();
  }

  private _handleLeave(): void {
    if (this.readOnly) return;
    this._hoverValue = -1;
    this.requestUpdate();
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-rating': TarmacRating; } }
