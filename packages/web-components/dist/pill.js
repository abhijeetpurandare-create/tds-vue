import { i as C, A as g, c as d, n as c, t as u } from "./index-8C405PPW.js";
import { s as h, g as x } from "./theme-context-BRj4LHEr.js";
var k = Object.defineProperty, y = Object.getOwnPropertyDescriptor, i = (o, e, r, s) => {
  for (var t = s > 1 ? void 0 : s ? y(e, r) : e, n = o.length - 1, b; n >= 0; n--)
    (b = o[n]) && (t = (s ? b(e, r, t) : b(t)) || t);
  return s && t && k(e, r, t), t;
};
const f = {
  base: { fontFamily: "sans-serif", fontWeight: "500", borderRadius: "999px" },
  types: {
    solid: {
      black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
      white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e0e0e0" },
      coal: { backgroundColor: "#4a4a4a", textColor: "#ffffff" },
      blue: { backgroundColor: "#3b82f6", textColor: "#ffffff" },
      success: { backgroundColor: "#10b981", textColor: "#ffffff" },
      error: { backgroundColor: "#ef4444", textColor: "#ffffff" },
      warning: { backgroundColor: "#f59e0b", textColor: "#7b6414" },
      legacy_blue: { backgroundColor: "#5b80f7", textColor: "#ffffff" }
    },
    subtle: {
      black: { backgroundColor: "#e6e6e6", textColor: "#2b2b2b" },
      white: { backgroundColor: "#3a3a3a", textColor: "#ffffff" },
      coal: { backgroundColor: "#d9d9d9", textColor: "#4a4a4a" },
      blue: { backgroundColor: "#dbeafe", textColor: "#1d4ed8" },
      success: { backgroundColor: "#d1fae5", textColor: "#047857" },
      error: { backgroundColor: "#fee2e2", textColor: "#b91c1c" },
      warning: { backgroundColor: "#fef3c7", textColor: "#7b6414" },
      legacy_blue: { backgroundColor: "#e0e7ff", textColor: "#3b5bdb" }
    },
    outlined: {
      black: { backgroundColor: "transparent", textColor: "#2b2b2b", borderColor: "#2b2b2b" },
      white: { backgroundColor: "transparent", textColor: "#ffffff", borderColor: "#e0e0e0" },
      coal: { backgroundColor: "transparent", textColor: "#4a4a4a", borderColor: "#999999" },
      blue: { backgroundColor: "transparent", textColor: "#1d4ed8", borderColor: "#3b82f6" },
      success: { backgroundColor: "transparent", textColor: "#047857", borderColor: "#10b981" },
      error: { backgroundColor: "transparent", textColor: "#b91c1c", borderColor: "#ef4444" },
      warning: { backgroundColor: "transparent", textColor: "#7b6414", borderColor: "#f59e0b" },
      legacy_blue: { backgroundColor: "transparent", textColor: "#3b5bdb", borderColor: "#5b80f7" }
    }
  },
  variants: { black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" }, white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e0e0e0" } },
  sizes: {
    sm: { padding: "4px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    md: { padding: "6px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    lg: { padding: "6px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "2px" }
  },
  states: {
    disabled: { backgroundColor: "#dedede", textColor: "#cdcbcb", borderColor: "transparent" },
    ghost: { backgroundColor: "#dedede", textColor: "transparent", borderColor: "transparent" }
  }
};
function _(o, e, r) {
  return o.types?.[e]?.[r] || o.variants[r] || {};
}
let a = class extends C {
  constructor() {
    super(...arguments), this.pillVariant = "black", this.pillType = "solid", this.size = "md", this.text = "", this.showStatus = !1, this.isDisabled = !1, this.isGhost = !1, this._cfg = f;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = h(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const o = x(this);
    this._cfg = o?.components?.pill_tarmac || f;
  }
  render() {
    const o = this._cfg.sizes[this.size] || {}, e = o.iconSize || "12px";
    let r, s, t, n, b = "";
    if (this.isGhost) {
      const l = this._cfg.states.ghost || {};
      r = l.backgroundColor || "#dedede", s = l.textColor || "transparent", t = "0", n = "transparent", b = "pointer-events:none;";
    } else if (this.isDisabled) {
      const l = this._cfg.states.disabled || {};
      r = "transparent", s = l.textColor || "#cdcbcb", t = "0.5px", n = l.borderColor || "#ededed", b = "cursor:default;";
    } else {
      const l = _(this._cfg, this.pillType, this.pillVariant);
      r = l.backgroundColor || "#e6e6e6", s = l.textColor || "#2b2b2b", t = l.borderColor ? "0.5px" : "0", n = l.borderColor || "transparent";
    }
    const p = this.isGhost ? "transparent" : this.isDisabled ? "#cdcbcb" : s;
    return d`
      <style>
        :host { display: inline-block; }
        .pill { display:inline-flex; align-items:center; justify-content:center; font-family:${this._cfg.base.fontFamily || "sans-serif"}; font-weight:${Number(this._cfg.base.fontWeight || 500)}; border-radius:${this._cfg.base.borderRadius || "999px"}; padding:${o.padding || "6px"}; font-size:${o.fontSize || "10px"}; line-height:${o.lineHeight || "12px"}; gap:${o.gap || "2px"}; user-select:none; background-color:${r}; color:${s}; border-width:${t}; border-style:solid; border-color:${n}; ${b} }
        .icon { width:${e}; height:${e}; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
        .icon ::slotted(svg), .icon svg { width:${e}; height:${e}; }
        .dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
      </style>
      <span class="pill">
        ${this.showStatus ? d`<span class="dot" style="background-color:${p}"></span>` : g}
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || d`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
};
i([
  c({ type: String, attribute: "pill-variant" })
], a.prototype, "pillVariant", 2);
i([
  c({ type: String, attribute: "pill-type" })
], a.prototype, "pillType", 2);
i([
  c({ type: String })
], a.prototype, "size", 2);
i([
  c({ type: String })
], a.prototype, "text", 2);
i([
  c({ type: Boolean, attribute: "show-status" })
], a.prototype, "showStatus", 2);
i([
  c({ type: Boolean, attribute: "is-disabled" })
], a.prototype, "isDisabled", 2);
i([
  c({ type: Boolean, attribute: "is-ghost" })
], a.prototype, "isGhost", 2);
a = i([
  u("tarmac-pill")
], a);
export {
  a as TarmacPill
};
