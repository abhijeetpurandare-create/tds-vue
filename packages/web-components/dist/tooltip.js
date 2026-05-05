import { d as x, i as w, A as l, c as g, n as p, t as y } from "./index-8C405PPW.js";
import { s as C, g as S } from "./theme-context-BRj4LHEr.js";
var z = Object.defineProperty, k = Object.getOwnPropertyDescriptor, r = (o, s, n, a) => {
  for (var e = a > 1 ? void 0 : a ? k(s, n) : s, h = o.length - 1, c; h >= 0; h--)
    (c = o[h]) && (e = (a ? c(s, n, e) : c(e)) || e);
  return a && e && z(s, n, e), e;
};
const m = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", shadow: "0 2px 8px rgba(0,0,0,0.15)", arrowSize: "6px" },
  variants: {
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b" },
    black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
    coal: { backgroundColor: "#64739b", textColor: "#ffffff" }
  },
  sizes: {
    sm: { padding: "4px 8px", fontSize: "12px" },
    md: { padding: "8px 12px", fontSize: "13px" },
    lg: { padding: "12px 16px", fontSize: "14px" }
  }
};
let i = class extends w {
  constructor() {
    super(...arguments), this.content = "", this.placement = "top", this.trigger = "hover", this.variant = "black", this.size = "md", this.visible = !1, this._show = !1, this._cfg = m;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = C(this, () => {
      this._resolve(), this.requestUpdate();
    }), this.visible && (this._show = !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const o = S(this);
    this._cfg = o?.components?.tooltip_tarmac || m;
  }
  updated(o) {
    o.has("visible") && (this._show = this.visible);
  }
  render() {
    const o = this._cfg, s = o.base || {}, n = o.variants?.[this.variant] || o.variants?.black || {}, a = o.sizes?.[this.size] || o.sizes?.md || {}, e = s.fontFamily || "Noto Sans, sans-serif", h = s.radius || "4px", c = s.shadow || "0 2px 8px rgba(0,0,0,0.15)", t = s.arrowSize || "6px", d = n.backgroundColor || "#2b2b2b", u = n.textColor || "#ffffff", _ = a.padding || "8px 12px", v = a.fontSize || "13px", $ = this.placement.split("-")[0];
    let b = "", f = "";
    switch ($) {
      case "top":
        b = "bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;", f = `bottom: -${t}; left: 50%; transform: translateX(-50%); border-left: ${t} solid transparent; border-right: ${t} solid transparent; border-top: ${t} solid ${d};`;
        break;
      case "bottom":
        b = "top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;", f = `top: -${t}; left: 50%; transform: translateX(-50%); border-left: ${t} solid transparent; border-right: ${t} solid transparent; border-bottom: ${t} solid ${d};`;
        break;
      case "left":
        b = "right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;", f = `right: -${t}; top: 50%; transform: translateY(-50%); border-top: ${t} solid transparent; border-bottom: ${t} solid transparent; border-left: ${t} solid ${d};`;
        break;
      case "right":
        b = "left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;", f = `left: -${t}; top: 50%; transform: translateY(-50%); border-top: ${t} solid transparent; border-bottom: ${t} solid transparent; border-right: ${t} solid ${d};`;
        break;
    }
    return g`
      <style>
        :host { display: inline-block; position: relative; }
        .trigger { display: inline-block; }
        .tooltip-container {
          position: absolute; ${b} z-index: 1000;
          background: ${d}; color: ${u};
          border-radius: ${h}; box-shadow: ${c};
          padding: ${_}; font-family: ${e}; font-size: ${v};
          line-height: 1.4; white-space: nowrap; pointer-events: none;
          opacity: ${this._show ? "1" : "0"};
          visibility: ${this._show ? "visible" : "hidden"};
          transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        }
        .arrow { position: absolute; width: 0; height: 0; ${f} }
      </style>
      <div class="trigger"
        @mouseenter=${this.trigger === "hover" ? this._onShow : l}
        @mouseleave=${this.trigger === "hover" ? this._onHide : l}
        @click=${this.trigger === "click" ? this._onToggle : l}
        @focusin=${this.trigger === "focus" ? this._onShow : l}
        @focusout=${this.trigger === "focus" ? this._onHide : l}
      >
        <slot></slot>
      </div>
      ${this.content ? g`
        <div class="tooltip-container" role="tooltip">
          ${this.content}
          <span class="arrow"></span>
        </div>
      ` : l}
    `;
  }
  _onShow() {
    this._show = !0, this._emitChange();
  }
  _onHide() {
    this._show = !1, this._emitChange();
  }
  _onToggle() {
    this._show = !this._show, this._emitChange();
  }
  _emitChange() {
    this.dispatchEvent(new CustomEvent("tarmac-visible-change", { bubbles: !0, composed: !0, detail: { visible: this._show } }));
  }
};
r([
  p({ type: String })
], i.prototype, "content", 2);
r([
  p({ type: String })
], i.prototype, "placement", 2);
r([
  p({ type: String })
], i.prototype, "trigger", 2);
r([
  p({ type: String })
], i.prototype, "variant", 2);
r([
  p({ type: String })
], i.prototype, "size", 2);
r([
  p({ type: Boolean })
], i.prototype, "visible", 2);
r([
  x()
], i.prototype, "_show", 2);
i = r([
  y("tarmac-tooltip")
], i);
export {
  i as TarmacTooltip
};
