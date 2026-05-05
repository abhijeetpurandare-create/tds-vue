/**
 * <tarmac-coachmarks>
 *
 * Web Component coachmark/callout with arrow positioning.
 *
 * Usage:
 *   <tarmac-coachmarks variant="white" size="lg" arrow-position="bottom-center" title="New Feature" description="Try this out!">
 *     <div slot="ctas"><button>Got it</button></div>
 *   </tarmac-coachmarks>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type CoachmarksVariant = 'white' | 'black';
export type CoachmarksSize = 'sm' | 'lg';
export type CoachmarksArrowPosition =
  | 'top-start' | 'top-center' | 'top-end'
  | 'bottom-start' | 'bottom-center' | 'bottom-end'
  | 'left-start' | 'left-center' | 'left-end'
  | 'right-start' | 'right-center' | 'right-end';

interface CoachmarksConfig {
  base?: { fontFamily?: string; radius?: string; shadow?: string; arrowSize?: string };
  variants?: Record<string, { backgroundColor?: string; textColor?: string; descriptionColor?: string }>;
  sizes?: Record<string, { width?: string }>;
}

const DEFAULT_CFG: CoachmarksConfig = {
  base: { fontFamily: 'Noto Sans, sans-serif', radius: '8px', shadow: '0 4px 16px rgba(0,0,0,0.12)', arrowSize: '8px' },
  variants: {
    white: { backgroundColor: '#ffffff', textColor: '#2b2b2b', descriptionColor: '#6b6b6b' },
    black: { backgroundColor: '#2b2b2b', textColor: '#ffffff', descriptionColor: '#b3b1b1' },
  },
  sizes: { sm: { width: '264px' }, lg: { width: '300px' } },
};

@customElement('tarmac-coachmarks')
export class TarmacCoachmarks extends LitElement {
  @property({ type: String }) variant: CoachmarksVariant = 'white';
  @property({ type: String }) size: CoachmarksSize = 'lg';
  @property({ type: String, attribute: 'arrow-position' }) arrowPosition: CoachmarksArrowPosition = 'bottom-center';
  @property({ type: String }) title = '';
  @property({ type: String }) description = '';

  private _unsub?: () => void;
  private _cfg: CoachmarksConfig = DEFAULT_CFG;

  connectedCallback(): void {
    super.connectedCallback();
    this._resolve();
    this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); });
  }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void {
    const t = getThemeFromContext(this);
    this._cfg = (t?.components?.coachmarks_tarmac as CoachmarksConfig) || DEFAULT_CFG;
  }

  render() {
    const cfg = this._cfg;
    const base = cfg.base || {};
    const vc = cfg.variants?.[this.variant] || cfg.variants?.white || {};
    const sc = cfg.sizes?.[this.size] || cfg.sizes?.lg || {};
    const fontFamily = base.fontFamily || 'Noto Sans, sans-serif';
    const radius = base.radius || '8px';
    const shadow = base.shadow || '0 4px 16px rgba(0,0,0,0.12)';
    const arrowSz = base.arrowSize || '8px';
    const bgColor = vc.backgroundColor || '#ffffff';
    const textColor = vc.textColor || '#2b2b2b';
    const descColor = vc.descriptionColor || '#6b6b6b';
    const width = sc.width || '300px';

    // Arrow CSS based on position
    const [side, align] = this.arrowPosition.split('-');
    let arrowCSS = '';
    const alignProp = align === 'start' ? '16px' : align === 'end' ? 'calc(100% - 24px)' : '50%';

    switch (side) {
      case 'top':
        arrowCSS = `top: -${arrowSz}; left: ${alignProp}; transform: translateX(-50%); border-left: ${arrowSz} solid transparent; border-right: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid ${bgColor};`;
        break;
      case 'bottom':
        arrowCSS = `bottom: -${arrowSz}; left: ${alignProp}; transform: translateX(-50%); border-left: ${arrowSz} solid transparent; border-right: ${arrowSz} solid transparent; border-top: ${arrowSz} solid ${bgColor};`;
        break;
      case 'left':
        arrowCSS = `left: -${arrowSz}; top: ${alignProp}; transform: translateY(-50%); border-top: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid transparent; border-right: ${arrowSz} solid ${bgColor};`;
        break;
      case 'right':
        arrowCSS = `right: -${arrowSz}; top: ${alignProp}; transform: translateY(-50%); border-top: ${arrowSz} solid transparent; border-bottom: ${arrowSz} solid transparent; border-left: ${arrowSz} solid ${bgColor};`;
        break;
    }

    return html`
      <style>
        :host { display: inline-block; position: relative; }
        .coachmark {
          width: ${width}; background: ${bgColor}; color: ${textColor};
          border-radius: ${radius}; box-shadow: ${shadow};
          padding: 16px; font-family: ${fontFamily}; position: relative;
        }
        .arrow { position: absolute; width: 0; height: 0; ${arrowCSS} }
        .image-slot { margin-bottom: 12px; }
        .image-slot ::slotted(*) { width: 100%; border-radius: 4px; }
        .title { font-size: 14px; font-weight: 600; line-height: 20px; margin: 0 0 4px; color: ${textColor}; }
        .description { font-size: 13px; line-height: 18px; color: ${descColor}; margin: 0 0 12px; }
        .badges-slot { margin-bottom: 12px; }
        .ctas-slot { display: flex; gap: 8px; }
      </style>
      <div class="coachmark">
        <span class="arrow"></span>
        <div class="image-slot"><slot name="image"></slot></div>
        ${this.title ? html`<h4 class="title">${this.title}</h4>` : nothing}
        ${this.description ? html`<p class="description">${this.description}</p>` : nothing}
        <div class="badges-slot"><slot name="badges"></slot></div>
        <div class="ctas-slot"><slot name="ctas"></slot></div>
      </div>
    `;
  }
}

export type { CoachmarksConfig };

declare global { interface HTMLElementTagNameMap { 'tarmac-coachmarks': TarmacCoachmarks; } }
