/**
 * <tarmac-slider>
 *
 * Web Component equivalent of the React Slider from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-slider variant="black" size="lg" value="50" min="0" max="100"></tarmac-slider>
 *   <tarmac-slider variant="dlv_red" size="sm" is-disabled></tarmac-slider>
 */

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type SliderVariant = 'black' | 'coal' | 'dlv_red';
export type SliderSize = 'sm' | 'lg';
export type SliderType = 'single' | 'dual';

interface SliderConfig {
  base?: { trackColor?: string; borderRadius?: string; transition?: string };
  variants?: Record<string, { fillColor?: string; knobColor?: string }>;
  sizes?: Record<string, { trackHeight?: string; knobSize?: string }>;
  states?: { disabled?: { fillColor?: string; knobColor?: string } };
}

const DEFAULT_CONFIG: SliderConfig = {
  base: { trackColor: '#e6e6e6', borderRadius: '999px', transition: 'all 0.1s ease' },
  variants: {
    black: { fillColor: '#000000', knobColor: '#000000' },
    coal: { fillColor: '#64739b', knobColor: '#64739b' },
    dlv_red: { fillColor: '#ed1b36', knobColor: '#ed1b36' },
  },
  sizes: {
    sm: { trackHeight: '4px', knobSize: '16px' },
    lg: { trackHeight: '8px', knobSize: '24px' },
  },
  states: { disabled: { fillColor: '#cdcbcb', knobColor: '#e6e6e6' } },
};

@customElement('tarmac-slider')
export class TarmacSlider extends LitElement {
  @property({ type: String }) variant: SliderVariant = 'black';
  @property({ type: String }) size: SliderSize = 'lg';
  @property({ type: String, attribute: 'slider-type' }) sliderType: SliderType = 'single';
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) step = 1;
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;

  private _unsub?: () => void;
  private _cfg: SliderConfig = DEFAULT_CONFIG;
  private _dragging = false;

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
    this._cfg = (t?.components?.slider_tarmac as SliderConfig) || DEFAULT_CONFIG;
  }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const trackHeight = sc.trackHeight || '4px';
    const knobSize = sc.knobSize || '16px';
    const trackColor = cfg.base?.trackColor || '#e6e6e6';
    const borderRadius = cfg.base?.borderRadius || '999px';

    let fillColor: string, knobColor: string, cursor: string;

    if (this.isDisabled) {
      const ds = cfg.states?.disabled || {};
      fillColor = ds.fillColor || '#cdcbcb';
      knobColor = ds.knobColor || '#e6e6e6';
      cursor = 'default';
    } else {
      const vc = cfg.variants?.[this.variant] || {};
      fillColor = vc.fillColor || '#000000';
      knobColor = vc.knobColor || '#000000';
      cursor = 'pointer';
    }

    const pct = ((this.value - this.min) / (this.max - this.min)) * 100;
    const clampedPct = Math.max(0, Math.min(100, pct));

    return html`
      <style>
        :host { display: block; width: 100%; }
        .slider-container { position: relative; width: 100%; padding: calc(${knobSize} / 2) 0; cursor: ${cursor}; }
        .track { position: relative; width: 100%; height: ${trackHeight}; background-color: ${trackColor}; border-radius: ${borderRadius}; }
        .fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: ${borderRadius}; background-color: ${fillColor}; }
        .knob {
          position: absolute;
          top: 50%;
          width: ${knobSize};
          height: ${knobSize};
          border-radius: 50%;
          background-color: ${knobColor};
          transform: translate(-50%, -50%);
          cursor: ${cursor};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      </style>
      <div
        class="slider-container"
        role="slider"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        @mousedown=${this._handleMouseDown}
        @touchstart=${this._handleTouchStart}
      >
        <div class="track">
          <div class="fill" style="width:${clampedPct}%"></div>
          <div class="knob" style="left:${clampedPct}%"></div>
        </div>
      </div>
    `;
  }

  private _getValueFromEvent(clientX: number): number {
    const track = this.shadowRoot?.querySelector('.track') as HTMLElement | null;
    if (!track) return this.value;
    const rect = track.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const raw = this.min + pct * (this.max - this.min);
    const stepped = Math.round(raw / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, stepped));
  }

  private _handleMouseDown(e: MouseEvent): void {
    if (this.isDisabled) return;
    e.preventDefault();
    this._dragging = true;
    this._updateValue(e.clientX);

    const onMove = (ev: MouseEvent) => { this._updateValue(ev.clientX); };
    const onUp = (ev: MouseEvent) => {
      this._dragging = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      this.dispatchEvent(new CustomEvent('tarmac-change-end', { bubbles: true, composed: true, detail: { value: this.value } }));
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }

  private _handleTouchStart(e: TouchEvent): void {
    if (this.isDisabled) return;
    e.preventDefault();
    this._dragging = true;
    this._updateValue(e.touches[0].clientX);

    const onMove = (ev: TouchEvent) => { this._updateValue(ev.touches[0].clientX); };
    const onEnd = () => {
      this._dragging = false;
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onEnd);
      this.dispatchEvent(new CustomEvent('tarmac-change-end', { bubbles: true, composed: true, detail: { value: this.value } }));
    };
    document.addEventListener('touchmove', onMove);
    document.addEventListener('touchend', onEnd);
  }

  private _updateValue(clientX: number): void {
    const newValue = this._getValueFromEvent(clientX);
    if (newValue !== this.value) {
      this.value = newValue;
      this.dispatchEvent(new CustomEvent('tarmac-change', { bubbles: true, composed: true, detail: { value: this.value } }));
    }
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-slider': TarmacSlider; } }
