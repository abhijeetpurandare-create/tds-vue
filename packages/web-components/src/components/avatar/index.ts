/**
 * <tarmac-avatar>
 *
 * Web Component equivalent of the React Avatar from @delhivery/tarmac.
 *
 * Usage:
 *   <tarmac-avatar size="md" shape="round">AB</tarmac-avatar>
 *   <tarmac-avatar avatar-type="image" src="photo.jpg" size="lg"></tarmac-avatar>
 *   <tarmac-avatar size="sm" show-status status-type="active">JD</tarmac-avatar>
 */

import { LitElement, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { getThemeFromContext, subscribeToTheme } from '../../core/theme-context';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'round' | 'square';
export type AvatarType = 'initials' | 'image' | 'numeric' | 'icon';
export type AvatarStatusDotType = 'active' | 'inactive' | 'idle' | 'brand';

interface AvatarConfig {
  base?: { transition?: string; focus?: { ring?: string } };
  default?: Record<string, string>;
  sizes?: Record<string, Record<string, string>>;
  radius?: { round?: string; square?: Record<string, string> };
  states?: { disabled?: Record<string, string>; ghost?: Record<string, string> };
  statusDot?: Record<string, string>;
}

const DEFAULT_CFG: AvatarConfig = {
  base: { transition: 'all 0.15s ease-in-out', focus: { ring: '0 0 0 2px rgba(0,0,0,0.4)' } },
  default: { backgroundColor: '#2b2b2b', textColor: '#ffffff', borderColor: '#e6e6e6', borderWidth: '0.5', hoverBackgroundColor: '#000000', hoverBorderColor: '#cccccc', hoverBorderWidth: '1', focusRingColor: 'rgba(0,0,0,0.4)' },
  sizes: {
    xl: { dimension: '48px', fontSize: '20px', lineHeight: '26px', fontWeight: '600', iconSize: '28px', statusDotSize: '12px', statusDotPadding: '2px' },
    lg: { dimension: '40px', fontSize: '16px', lineHeight: '24px', fontWeight: '600', iconSize: '28px', statusDotSize: '8px', statusDotPadding: '2px' },
    md: { dimension: '36px', fontSize: '14px', lineHeight: '20px', fontWeight: '600', iconSize: '24px', statusDotSize: '6px', statusDotPadding: '2px' },
    sm: { dimension: '28px', fontSize: '12px', lineHeight: '16px', fontWeight: '600', iconSize: '16px', statusDotSize: '6px', statusDotPadding: '2px' },
  },
  radius: { round: '999px', square: { xl: '8px', lg: '8px', md: '8px', sm: '4px' } },
  states: { disabled: { backgroundColor: '#e6e6e6', textColor: '#cdcbcb', imageOverlay: 'rgba(255,255,255,0.4)' }, ghost: { backgroundColor: '#dedede' } },
  statusDot: { active: '#1ba86e', inactive: '#a0a0a0', idle: '#f5c828', brand: '#ed1b36' },
};

@customElement('tarmac-avatar')
export class TarmacAvatar extends LitElement {
  @property({ type: String, attribute: 'avatar-type' }) avatarType: AvatarType = 'initials';
  @property({ type: String }) shape: AvatarShape = 'round';
  @property({ type: String }) size: AvatarSize = 'md';
  @property({ type: String }) src = '';
  @property({ type: String }) alt = 'avatar';
  @property({ type: Boolean, attribute: 'show-status' }) showStatus = false;
  @property({ type: String, attribute: 'status-type' }) statusType: AvatarStatusDotType = 'active';
  @property({ type: Boolean, attribute: 'is-disabled' }) isDisabled = false;
  @property({ type: Boolean, attribute: 'is-ghost' }) isGhost = false;

  private _unsub?: () => void;
  private _cfg: AvatarConfig = DEFAULT_CFG;

  connectedCallback(): void { super.connectedCallback(); this._resolve(); this._unsub = subscribeToTheme(this, () => { this._resolve(); this.requestUpdate(); }); }
  disconnectedCallback(): void { super.disconnectedCallback(); this._unsub?.(); }
  private _resolve(): void { const t = getThemeFromContext(this); this._cfg = (t?.components?.avatar as AvatarConfig) || DEFAULT_CFG; }

  render() {
    const cfg = this._cfg;
    const sc = cfg.sizes?.[this.size] || {};
    const dc = cfg.default || {};
    const dim = sc.dimension || '36px';
    const radius = this.shape === 'round' ? (cfg.radius?.round || '999px') : (cfg.radius?.square?.[this.size] || '8px');
    const iconSize = sc.iconSize || '24px';
    const dotSize = sc.statusDotSize || '6px';
    const dotPad = sc.statusDotPadding || '2px';
    const dotColor = cfg.statusDot?.[this.statusType] || '#1ba86e';
    const showDot = this.showStatus && this.shape === 'round' && !this.isGhost;

    let bgColor: string, textColor: string, borderW: string, borderColor: string, extra = '', hoverCSS = '', focusCSS = '';

    if (this.isGhost) {
      bgColor = cfg.states?.ghost?.backgroundColor || '#dedede'; textColor = 'transparent'; borderW = '0'; borderColor = 'transparent'; extra = 'pointer-events:none;';
    } else if (this.isDisabled) {
      bgColor = cfg.states?.disabled?.backgroundColor || '#e6e6e6'; textColor = cfg.states?.disabled?.textColor || '#cdcbcb'; borderW = '0'; borderColor = 'transparent'; extra = 'cursor:default;';
    } else {
      bgColor = dc.backgroundColor || '#2b2b2b'; textColor = dc.textColor || '#ffffff'; borderW = dc.borderWidth || '0.5px'; borderColor = dc.borderColor || '#e6e6e6';
      hoverCSS = `.avatar:hover { background-color:${dc.hoverBackgroundColor || '#000'}; border-color:${dc.hoverBorderColor || '#ccc'}; cursor:pointer; }`;
      focusCSS = `.avatar:focus { box-shadow:${dc.focusRingColor ? `0 0 0 2px ${dc.focusRingColor}` : (cfg.base?.focus?.ring || '0 0 0 2px rgba(0,0,0,0.4)')}; outline:none; }`;
    }

    return html`
      <style>
        :host { display:inline-block; position:relative; }
        .avatar { display:inline-flex; align-items:center; justify-content:center; width:${dim}; height:${dim}; min-width:${dim}; min-height:${dim}; border-radius:${radius}; font-family:sans-serif; font-size:${sc.fontSize || '14px'}; line-height:${sc.lineHeight || '20px'}; font-weight:${Number(sc.fontWeight || 600)}; transition:${cfg.base?.transition || 'all 0.15s ease-in-out'}; user-select:none; position:relative; overflow:visible; box-sizing:border-box; background-color:${bgColor}; color:${textColor}; border-width:${borderW}; border-style:solid; border-color:${borderColor}; ${extra} }
        ${hoverCSS} ${focusCSS}
        .avatar img { width:100%; height:100%; object-fit:cover; border-radius:${radius}; }
        .avatar .icon-wrap { width:${iconSize}; height:${iconSize}; display:inline-flex; align-items:center; justify-content:center; }
        .avatar .icon-wrap ::slotted(svg), .avatar .icon-wrap svg { width:${iconSize}; height:${iconSize}; }
        .status-dot { position:absolute; bottom:0; right:0; width:${dotSize}; height:${dotSize}; border-radius:50%; background-color:${dotColor}; border:${dotPad} solid white; box-sizing:content-box; }
        .overlay { position:absolute; inset:0; border-radius:${radius}; background-color:${cfg.states?.disabled?.imageOverlay || 'rgba(255,255,255,0.4)'}; }
      </style>
      <span class="avatar" tabindex="0">
        ${this.isGhost ? nothing
          : this.avatarType === 'image' && this.src
            ? html`<img src="${this.src}" alt="${this.alt}" />${this.isDisabled ? html`<span class="overlay"></span>` : nothing}`
            : this.avatarType === 'icon'
              ? html`<span class="icon-wrap"><slot name="icon"></slot></span>`
              : html`<slot></slot>`
        }
      </span>
      ${showDot ? html`<span class="status-dot"></span>` : nothing}
    `;
  }
}

declare global { interface HTMLElementTagNameMap { 'tarmac-avatar': TarmacAvatar; } }
