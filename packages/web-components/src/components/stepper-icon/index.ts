/**
 * <tarmac-stepper-icon>
 *
 * Web Component equivalent of the React StepperIcon from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-stepper-icon stepper-style="numeric" variant="solid" size="lg" step-number="1"></tarmac-stepper-icon>
 *   <tarmac-stepper-icon stepper-style="blue" variant="outlined" size="md"></tarmac-stepper-icon>
 *   <tarmac-stepper-icon stepper-style="icon" variant="solid" size="lg">
 *     <svg slot="icon" ...></svg>
 *   </tarmac-stepper-icon>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type StepperIconStyle = 'black' | 'coal' | 'dlv_red' | 'blue' | 'green' | 'numeric' | 'icon';
export type StepperIconVariant = 'solid' | 'outlined' | 'focused' | 'disabled' | 'ghost';
export type StepperIconSize = 'sm' | 'md' | 'lg';

interface StepperIconConfig {
  base?: { borderRadius?: string; shadowSolid?: string; shadowDisabled?: string; shadowGhost?: string };
  outerBg?: { default?: string; ghost?: string; ghostNumericIcon?: string; disabled_numeric_icon?: string };
  sizes?: Record<string, { outerSize?: string; innerDotSolid?: string; innerDotOutlined?: string; iconContainerSize?: string; fontSize?: string; lineHeight?: string; fontFamily?: string; borderWidthDefault?: string; borderWidthFocused?: string }>;
  styles?: Record<string, { innerColor?: string; innerColorDisabled?: string; borderColor?: string; borderColorDisabled?: string; textColor?: string; textColorDisabled?: string; iconColor?: string; iconColorDisabled?: string; outerBgDisabled?: string }>;
}

const DEFAULT_CFG: StepperIconConfig = {
  base: { borderRadius: '999px' },
  outerBg: { default: '#f7f7f7', ghost: '#ededed', ghostNumericIcon: '#f2f2f2' },
  sizes: {
    sm: { outerSize: '20px', innerDotSolid: '8px', innerDotOutlined: '6px', fontSize: '10px', lineHeight: '12px', borderWidthDefault: '1px', borderWidthFocused: '2px' },
    md: { outerSize: '28px', innerDotSolid: '12px', innerDotOutlined: '8px', fontSize: '12px', lineHeight: '16px', borderWidthDefault: '1px', borderWidthFocused: '2px' },
    lg: { outerSize: '36px', innerDotSolid: '16px', innerDotOutlined: '12px', fontSize: '14px', lineHeight: '20px', borderWidthDefault: '1px', borderWidthFocused: '2px' },
  },
  styles: {
    black: { innerColor: '#000000', borderColor: '#000000', textColor: '#000000', iconColor: '#000000', innerColorDisabled: '#cdcbcb', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb', iconColorDisabled: '#cdcbcb' },
    coal: { innerColor: '#64739b', borderColor: '#64739b', textColor: '#64739b', iconColor: '#64739b', innerColorDisabled: '#cdcbcb', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb', iconColorDisabled: '#cdcbcb' },
    dlv_red: { innerColor: '#ed1b36', borderColor: '#ed1b36', textColor: '#ed1b36', iconColor: '#ed1b36', innerColorDisabled: '#cdcbcb', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb', iconColorDisabled: '#cdcbcb' },
    blue: { innerColor: '#2396fb', borderColor: '#2396fb', textColor: '#2396fb', iconColor: '#2396fb', innerColorDisabled: '#cdcbcb', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb', iconColorDisabled: '#cdcbcb' },
    green: { innerColor: '#1ba86e', borderColor: '#1ba86e', textColor: '#1ba86e', iconColor: '#1ba86e', innerColorDisabled: '#cdcbcb', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb', iconColorDisabled: '#cdcbcb' },
    numeric: { borderColor: '#2b2b2b', textColor: '#2b2b2b', borderColorDisabled: '#ededed', textColorDisabled: '#cdcbcb' },
    icon: { borderColor: '#2b2b2b', iconColor: '#2b2b2b', borderColorDisabled: '#ededed', iconColorDisabled: '#cdcbcb' },
  },
};

@customElement('tarmac-stepper-icon')
export class TarmacStepperIcon extends LitElement {
  @property({ type: String, attribute: 'stepper-style' }) stepperStyle: StepperIconStyle = 'numeric';
  @property({ type: String }) variant: StepperIconVariant = 'solid';
  @property({ type: String }) size: StepperIconSize = 'lg';
  @property({ type: Number, attribute: 'step-number' }) stepNumber = 1;

  private _unsub?: () => void;
  private _cfg: StepperIconConfig = DEFAULT_CFG;

  connectedCallback(): void { super.connectedCallback(); this._resolve(); this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); }); }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void { const t = getThemeFromContext(this); this._cfg = (t?.components as any)?.stepperIcon_tarmac as StepperIconConfig || DEFAULT_CFG; }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const stCfg = cfg.styles?.[this.stepperStyle] || {};
    const outerBg = cfg.outerBg || {};
    const outerSize = sc.outerSize || '28px';
    const radius = cfg.base?.borderRadius || '999px';
    const isColor = !['numeric', 'icon'].includes(this.stepperStyle);
    const isNumeric = this.stepperStyle === 'numeric';
    const isIcon = this.stepperStyle === 'icon';
    const isGhost = this.variant === 'ghost';
    const isDis = this.variant === 'disabled';
    const isNI = isNumeric || isIcon;

    // Outer background
    let bg: string, border = '', shadow = '';
    if (isGhost) {
      bg = isNI ? (outerBg.ghostNumericIcon || '#f2f2f2') : (outerBg.ghost || '#ededed');
    } else if (isDis) {
      bg = isNI ? (stCfg.outerBgDisabled || '#ffffff') : (outerBg.default || '#f7f7f7');
      if (isNI) border = `border:${sc.borderWidthDefault || '1px'} solid ${stCfg.borderColorDisabled || '#ededed'};`;
    } else {
      bg = outerBg.default || '#f7f7f7';
      const hasBorder = this.variant === 'outlined' || this.variant === 'focused';
      if (hasBorder) {
        const bw = this.variant === 'focused' ? (sc.borderWidthFocused || '2px') : (sc.borderWidthDefault || '1px');
        border = `border:${bw} solid ${stCfg.borderColor || '#2b2b2b'};`;
      }
    }

    // Inner dot (color styles only)
    const dotSize = this.variant === 'outlined' ? (sc.innerDotOutlined || '8px') : (sc.innerDotSolid || '12px');
    const dotColor = isDis ? (stCfg.innerColorDisabled || '#cdcbcb') : (stCfg.innerColor || '#000');

    // Text/icon color
    const textColor = isDis ? (stCfg.textColorDisabled || '#cdcbcb') : (stCfg.textColor || '#2b2b2b');
    const iconColor = isDis ? (stCfg.iconColorDisabled || '#cdcbcb') : (stCfg.iconColor || '#2b2b2b');

    return html`
      <style>
        :host { display:inline-block; }
        .outer { width:${outerSize}; height:${outerSize}; border-radius:${radius}; background-color:${bg}; overflow:hidden; display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; box-sizing:border-box; ${border} ${shadow} }
        .dot { width:${dotSize}; height:${dotSize}; border-radius:50%; background-color:${dotColor}; }
        .num { font-family:${sc.fontFamily || 'Noto Sans, sans-serif'}; font-size:${sc.fontSize || '12px'}; line-height:${sc.lineHeight || '16px'}; font-weight:600; color:${textColor}; }
        .icon-wrap { display:flex; align-items:center; justify-content:center; color:${iconColor}; }
        .icon-wrap ::slotted(svg) { width:${sc.iconContainerSize || '16px'}; height:${sc.iconContainerSize || '16px'}; }
      </style>
      <div class="outer">
        ${isGhost ? nothing
          : isColor ? html`<span class="dot"></span>`
          : isNumeric ? html`<span class="num">${this.stepNumber}</span>`
          : html`<span class="icon-wrap"><slot name="icon"></slot></span>`
        }
      </div>
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-stepper-icon': TarmacStepperIcon; } }
