/**
 * <tarmac-tooltip>
 *
 * Web Component tooltip with configurable placement, trigger, and variant.
 *
 * Usage:
 *   <tarmac-tooltip content="Help text" placement="top" variant="black">
 *     <button>Hover me</button>
 *   </tarmac-tooltip>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type TooltipPlacement = 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end';
export type TooltipTrigger = 'hover' | 'click' | 'focus';
export type TooltipVariant = 'white' | 'black' | 'coal';
export type TooltipSize = 'sm' | 'md' | 'lg';

interface TooltipConfig {
  base?: { fontFamily?: string; radius?: string; shadow?: string; arrowSize?: string };
  variants?: Record<string, { backgroundColor?: string; textColor?: string }>;
  sizes?: Record<string, { padding?: string; fontSize?: string }>;
}

const DEFAULT_CFG: TooltipConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '4px', shadow: '0 2px 8px rgba(0,0,0,0.15)', arrowSize: '6px' },
  variants: {
    white: { backgroundColor: '#ffffff', textColor: '#2b2b2b' },
    black: { backgroundColor: '#2b2b2b', textColor: '#ffffff' },
    coal: { backgroundColor: '#64739b', textColor: '#ffffff' },
  },
  sizes: {
    sm: { padding: '4px 8px', fontSize: '12px' },
    md: { padding: '8px 12px', fontSize: '13px' },
    lg: { padding: '12px 16px', fontSize: '14px' },
  },
};

@customElement('tarmac-tooltip')
export class TarmacTooltip extends LitElement {
  @property({ type: String }) content = '';
  @property({ type: String }) placement: TooltipPlacement = 'top';
  @property({ type: String }) trigger: TooltipTrigger = 'hover';
  @property({ type: String }) variant: TooltipVariant = 'black';
  @property({ type: String }) size: TooltipSize = 'md';
  @property({ type: Boolean }) visible = false;

  @state() private _show = false;

  private _unsub?: () => void;
  private _cfg: TooltipConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
    if (this.visible) this._show = true;
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.tooltip_tarmac as TooltipConfig) || DEFAULT_CFG;
  }

  updated(changed: Map<string, unknown>): void {
    if (changed.has('visible')) this._show = this.visible;
  }

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const vc = cfg.variants?.[this.variant] || cfg.variants?.black || {};
    const sc = cfg.sizes?.[this.size] || cfg.sizes?.md || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '4px';
    const shadow = base.shadow || '0 2px 8px rgba(0,0,0,0.15)';
    const arrowSz = base.arrowSize || '6px';
    const bgColor = vc.backgroundColor || '#2b2b2b';
    const textColor = vc.textColor || '#ffffff';
    const padding = sc.padding || '8px 12px';
    const fontSize = sc.fontSize || '13px';

    // Placement CSS
    const basePlacement = this.placement.split('-')[0];
    let tooltipPos = '', arrowPos = '';
    switch (basePlacement) {
      case 'top':
        tooltipPos = 'bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;';
        arrowPos = `bottom: -${arrowSz}; left: 50%; transform: translateX(-50%); border-left: ${arrowSz} solid transparent; border-right: ${arrowSz} solid transparent; border-top: ${arrowSz} solid ${bgColor};`;
        break;
      case 'bottom':
        tooltipPos = 'top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;';
        arrowPos = `top: -${arrowSz}; left: 50%; transform: translateX(-50%); border-left: ${arrowSz} solid transparent; border-right: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid ${bgColor};`;
        break;
      case 'left':
        tooltipPos = 'right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;';
        arrowPos = `right: -${arrowSz}; top: 50%; transform: translateY(-50%); border-top: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid transparent; border-left: ${arrowSz} solid ${bgColor};`;
        break;
      case 'right':
        tooltipPos = 'left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;';
        arrowPos = `left: -${arrowSz}; top: 50%; transform: translateY(-50%); border-top: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid transparent; border-right: ${arrowSz} solid ${bgColor};`;
        break;
    }

    return html`
      <style>
        :host { display: inline-block; position: relative; }
        .trigger { display: inline-block; }
        .tooltip-container {
          position: absolute; ${tooltipPos} z-index: 1000;
          background: ${bgColor}; color: ${textColor};
          border-radius: ${radius}; box-shadow: ${shadow};
          padding: ${padding}; font-family: ${fontFamily}; font-size: ${fontSize};
          line-height: 1.4; white-space: nowrap; pointer-events: none;
          opacity: ${this._show ? '1' : '0'};
          visibility: ${this._show ? 'visible' : 'hidden'};
          transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        }
        .arrow { position: absolute; width: 0; height: 0; ${arrowPos} }
      </style>
      <div class="trigger"
        @mouseenter=${this.trigger === 'hover' ? this._onShow : nothing}
        @mouseleave=${this.trigger === 'hover' ? this._onHide : nothing}
        @click=${this.trigger === 'click' ? this._onToggle : nothing}
        @focusin=${this.trigger === 'focus' ? this._onShow : nothing}
        @focusout=${this.trigger === 'focus' ? this._onHide : nothing}
      >
        <slot></slot>
      </div>
      ${this.content ? html`
        <div class="tooltip-container" role="tooltip">
          ${this.content}
          <span class="arrow"></span>
        </div>
      ` : nothing}
    `;
  }

  private _onShow(): void { this._show = true; this._emitChange(); }
  private _onHide(): void { this._show = false; this._emitChange(); }
  private _onToggle(): void { this._show = !this._show; this._emitChange(); }
  private _emitChange(): void {
    this.dispatchEvent(new CustomEvent('tarmac-visible-change', { bubbles: true, composed: true, detail: { visible: this._show } }));
  }
}

export type { TooltipConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-tooltip': TarmacTooltip; } }
