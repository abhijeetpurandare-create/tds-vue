import { i as u, A as p, c as d, n, t as f } from "./index-8C405PPW.js";
import { s as m, g as y } from "./theme-context-BRj4LHEr.js";
var v = Object.defineProperty, g = Object.getOwnPropertyDescriptor, i = (e, t, r, a) => {
  for (var s = a > 1 ? void 0 : a ? g(t, r) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (s = (a ? c(t, r, s) : c(s)) || s);
  return a && s && v(t, r, s), s;
};
const h = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)" },
  sizes: { xs: { maxWidth: "320px" }, sm: { maxWidth: "400px" }, md: { maxWidth: "520px" }, lg: { maxWidth: "640px" }, xl: { maxWidth: "800px" } }
}, w = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let o = class extends u {
  constructor() {
    super(...arguments), this.isOpen = !1, this.size = "md", this.title = "", this.subtext = "", this.showFooter = !1, this.closeOnOverlay = !0, this.closeOnEsc = !0, this._cfg = h, this._onEsc = (e) => {
      e.key === "Escape" && this.isOpen && this.closeOnEsc && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = m(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const e = y(this);
    this._cfg = e?.components?.popup_tarmac || h;
  }
  render() {
    if (!this.isOpen) return p;
    const e = this._cfg, t = e.base || {}, r = e.sizes?.[this.size] || e.sizes?.md || {}, a = t.fontFamily || "Noto Sans, sans-serif", s = t.radius || "8px", l = t.overlayBg || "rgba(0,0,0,0.45)", c = t.shadow || "0 4px 24px rgba(0,0,0,0.15)", x = r.maxWidth || "520px";
    return d`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: center; justify-content: center;
          background: ${l}; font-family: ${a};
        }
        .container {
          background: #fff; border-radius: ${s}; box-shadow: ${c};
          width: 90%; max-width: ${x}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: popupIn 0.2s ease-out;
        }
        @keyframes popupIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .header-row { display: flex; align-items: center; gap: 8px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px; flex-shrink: 0;
        }
        .close-btn:hover { background: #f5f5f5; }
        .icon-slot { display: flex; align-items: center; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Popup"} @click=${(b) => b.stopPropagation()}>
          <div class="header">
            <div class="header-content">
              <div class="header-row">
                <span class="icon-slot"><slot name="leading-icon"></slot></span>
                <h2 class="title">${this.title}</h2>
              </div>
              ${this.subtext ? d`<div class="subtext">${this.subtext}</div>` : p}
            </div>
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
            <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${w}></span></button>
          </div>
          <div class="body"><slot></slot></div>
          ${this.showFooter ? d`<div class="footer"><slot name="footer"></slot></div>` : p}
        </div>
      </div>
    `;
  }
  _onOverlayClick() {
    this.closeOnOverlay && this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
i([
  n({ type: Boolean, attribute: "is-open" })
], o.prototype, "isOpen", 2);
i([
  n({ type: String })
], o.prototype, "size", 2);
i([
  n({ type: String })
], o.prototype, "title", 2);
i([
  n({ type: String })
], o.prototype, "subtext", 2);
i([
  n({ type: Boolean, attribute: "show-footer" })
], o.prototype, "showFooter", 2);
i([
  n({ type: Boolean, attribute: "close-on-overlay" })
], o.prototype, "closeOnOverlay", 2);
i([
  n({ type: Boolean, attribute: "close-on-esc" })
], o.prototype, "closeOnEsc", 2);
o = i([
  f("tarmac-popup")
], o);
export {
  o as TarmacPopup
};
