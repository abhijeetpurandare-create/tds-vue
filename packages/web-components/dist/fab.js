import { d as h, i as d, c as u, n as c, t as m } from "./index-8C405PPW.js";
import { s as x, g as v } from "./theme-context-BRj4LHEr.js";
var _ = Object.defineProperty, y = Object.getOwnPropertyDescriptor, l = (o, e, i, s) => {
  for (var t = s > 1 ? void 0 : s ? y(e, i) : e, r = o.length - 1, a; r >= 0; r--)
    (a = o[r]) && (t = (s ? a(e, i, t) : a(t)) || t);
  return s && t && _(e, i, t), t;
};
const b = {
  base: { size: "56px", shadow: "0 4px 12px rgba(0,0,0,0.2)", transition: "all 0.2s ease-in-out" },
  variants: {
    light: { backgroundColor: "#ffffff", iconColor: "#2b2b2b" },
    dark: { backgroundColor: "#2b2b2b", iconColor: "#ffffff" },
    "info-blue": { backgroundColor: "#2396fb", iconColor: "#ffffff" }
  }
}, w = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
let n = class extends d {
  constructor() {
    super(...arguments), this.position = "bottom-right", this.variant = "light", this.positionMode = "fixed", this._isOpen = !1, this._cfg = b;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = x(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const o = v(this);
    this._cfg = o?.components?.fab_tarmac || b;
  }
  render() {
    const o = this._cfg, e = o.base || {}, i = o.variants?.[this.variant] || o.variants?.light || {}, s = e.size || "56px", t = e.shadow || "0 4px 12px rgba(0,0,0,0.2)", r = e.transition || "all 0.2s ease-in-out", a = i.backgroundColor || "#ffffff", f = i.iconColor || "#2b2b2b";
    let p = "";
    switch (this.position) {
      case "bottom-right":
        p = "bottom: 24px; right: 24px;";
        break;
      case "bottom-left":
        p = "bottom: 24px; left: 24px;";
        break;
      case "top-right":
        p = "top: 24px; right: 24px;";
        break;
      case "top-left":
        p = "top: 24px; left: 24px;";
        break;
    }
    const g = this.position.startsWith("bottom");
    return u`
      <style>
        :host { display: contents; }
        .fab-wrapper {
          position: ${this.positionMode}; ${p} z-index: 900;
          display: flex; flex-direction: ${g ? "column-reverse" : "column"}; align-items: center; gap: 8px;
        }
        .fab-trigger {
          width: ${s}; height: ${s}; border-radius: 50%;
          background: ${a}; color: ${f};
          border: none; cursor: pointer; box-shadow: ${t};
          display: flex; align-items: center; justify-content: center;
          transition: ${r}; padding: 0;
        }
        .fab-trigger:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.25); }
        .fab-trigger.open { transform: rotate(45deg); }
        .fab-trigger ::slotted(*) { width: 24px; height: 24px; }
        .fab-menu {
          display: ${this._isOpen ? "flex" : "none"};
          flex-direction: column; gap: 8px; align-items: center;
          animation: menuIn 0.2s ease-out;
        }
        @keyframes menuIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      </style>
      <div class="fab-wrapper">
        <button class="fab-trigger ${this._isOpen ? "open" : ""}" @click=${this._toggle} aria-label="Toggle menu">
          <slot name="trigger"><span .innerHTML=${w}></span></slot>
        </button>
        <div class="fab-menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;
  }
  _toggle() {
    this._isOpen = !this._isOpen, this.dispatchEvent(new CustomEvent("tarmac-toggle", { bubbles: !0, composed: !0, detail: { isOpen: this._isOpen } }));
  }
};
l([
  c({ type: String })
], n.prototype, "position", 2);
l([
  c({ type: String })
], n.prototype, "variant", 2);
l([
  c({ type: String, attribute: "position-mode" })
], n.prototype, "positionMode", 2);
l([
  h()
], n.prototype, "_isOpen", 2);
n = l([
  m("tarmac-fab")
], n);
export {
  n as TarmacFab
};
