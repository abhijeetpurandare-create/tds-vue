import { i as p, A as h, c as v, n as l, t as y } from "./index-8C405PPW.js";
import { s as f, g as m } from "./theme-context-BRj4LHEr.js";
var u = Object.defineProperty, b = Object.getOwnPropertyDescriptor, c = (e, s, r, o) => {
  for (var t = o > 1 ? void 0 : o ? b(s, r) : s, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (t = (o ? i(s, r, t) : i(t)) || t);
  return o && t && u(s, r, t), t;
};
const d = {
  base: { fontFamily: "Noto Sans, sans-serif", overlayBg: "rgba(0,0,0,0.45)", shadow: "-4px 0 24px rgba(0,0,0,0.15)", transition: "transform 0.3s ease-in-out" },
  variants: { narrow: { width: "400px" }, extended: { width: "640px" } }
};
let a = class extends p {
  constructor() {
    super(...arguments), this.isOpen = !1, this.variant = "narrow", this.closeOnOverlay = !0, this.closeOnEsc = !0, this._cfg = d, this._onEsc = (e) => {
      e.key === "Escape" && this.isOpen && this.closeOnEsc && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = f(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const e = m(this);
    this._cfg = e?.components?.side_drawer_tarmac || d;
  }
  render() {
    if (!this.isOpen) return h;
    const e = this._cfg, s = e.base || {}, r = e.variants?.[this.variant] || e.variants?.narrow || {}, o = s.fontFamily || "Noto Sans, sans-serif", t = s.overlayBg || "rgba(0,0,0,0.45)", n = s.shadow || "-4px 0 24px rgba(0,0,0,0.15)", i = r.width || "400px";
    return v`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: ${t}; font-family: ${o};
          animation: overlayIn 0.2s ease-out;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 1001;
          width: ${i}; max-width: 90vw; background: #fff;
          box-shadow: ${n}; overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="drawer" role="dialog" aria-modal="true">
        <slot></slot>
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
c([
  l({ type: Boolean, attribute: "is-open" })
], a.prototype, "isOpen", 2);
c([
  l({ type: String })
], a.prototype, "variant", 2);
c([
  l({ type: Boolean, attribute: "close-on-overlay" })
], a.prototype, "closeOnOverlay", 2);
c([
  l({ type: Boolean, attribute: "close-on-esc" })
], a.prototype, "closeOnEsc", 2);
a = c([
  y("tarmac-side-drawer")
], a);
export {
  a as TarmacSideDrawer
};
