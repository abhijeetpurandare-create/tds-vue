import { i as f, A as d, c as p, n as a, t as u } from "./index-8C405PPW.js";
import { s as x, g as y } from "./theme-context-BRj4LHEr.js";
var g = Object.defineProperty, v = Object.getOwnPropertyDescriptor, i = (e, t, r, n) => {
  for (var s = n > 1 ? void 0 : n ? v(t, r) : t, l = e.length - 1, c; l >= 0; l--)
    (c = e[l]) && (s = (n ? c(t, r, s) : c(s)) || s);
  return n && s && g(t, r, s), s;
};
const h = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)", transition: "all 0.2s ease-in-out" },
  sizes: { sm: { maxWidth: "400px" }, md: { maxWidth: "520px" }, lg: { maxWidth: "720px" } }
}, _ = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let o = class extends f {
  constructor() {
    super(...arguments), this.isOpen = !1, this.size = "md", this.title = "", this.closable = !0, this.maskClosable = !0, this.width = "", this.centered = !1, this._cfg = h, this._onEsc = (e) => {
      e.key === "Escape" && this.isOpen && this.closable && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = x(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const e = y(this);
    this._cfg = e?.components?.modal_tarmac || h;
  }
  render() {
    if (!this.isOpen) return d;
    const e = this._cfg, t = e.base || {}, r = e.sizes?.[this.size] || e.sizes?.md || {}, n = t.fontFamily || "Noto Sans, sans-serif", s = t.radius || "8px", l = t.overlayBg || "rgba(0,0,0,0.45)", c = t.shadow || "0 4px 24px rgba(0,0,0,0.15)", b = this.width || r.maxWidth || "520px";
    return p`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${this.centered ? "center" : "flex-start"};
          justify-content: center; padding: ${this.centered ? "0" : "80px 0"};
          background: ${l}; font-family: ${n};
        }
        .container {
          background: #fff; border-radius: ${s}; box-shadow: ${c};
          width: 90%; max-width: ${b}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; justify-content: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Modal"} @click=${(m) => m.stopPropagation()}>
          ${this.title || this.closable ? p`
            <div class="header">
              <h2 class="title">${this.title}</h2>
              ${this.closable ? p`<button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${_}></span></button>` : d}
            </div>
          ` : d}
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
  _onOverlayClick() {
    this.maskClosable && this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
i([
  a({ type: Boolean, attribute: "is-open" })
], o.prototype, "isOpen", 2);
i([
  a({ type: String })
], o.prototype, "size", 2);
i([
  a({ type: String })
], o.prototype, "title", 2);
i([
  a({ type: Boolean })
], o.prototype, "closable", 2);
i([
  a({ type: Boolean, attribute: "mask-closable" })
], o.prototype, "maskClosable", 2);
i([
  a({ type: String })
], o.prototype, "width", 2);
i([
  a({ type: Boolean })
], o.prototype, "centered", 2);
o = i([
  u("tarmac-modal")
], o);
export {
  o as TarmacModal
};
