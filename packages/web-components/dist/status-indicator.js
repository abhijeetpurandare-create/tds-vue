import { i as b, A as g, c as p, n as r, t as u } from "./index-8C405PPW.js";
import { s as x, g as m } from "./theme-context-BRj4LHEr.js";
var z = Object.defineProperty, S = Object.getOwnPropertyDescriptor, l = (e, s, c, o) => {
  for (var t = o > 1 ? void 0 : o ? S(s, c) : s, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (t = (o ? i(s, c, t) : i(t)) || t);
  return o && t && z(s, c, t), t;
};
const h = {
  base: { fontFamily: "Noto Sans, sans-serif", gap: "4px" },
  variants: {
    success: { color: "#1ba86e" },
    failed: { color: "#dc143c" },
    warning: { color: "#f5c828" },
    information: { color: "#2396fb" },
    synced: { color: "#1ba86e" },
    scheduled: { color: "#64739b" },
    unknown: { color: "#b3b1b1" },
    pause: { color: "#f5c828" },
    play: { color: "#1ba86e" },
    downloading: { color: "#2396fb" },
    pending: { color: "#f5c828" }
  },
  sizes: {
    lg: { fontSize: "14px", lineHeight: "20px", dotSize: "8px" },
    md: { fontSize: "12px", lineHeight: "16px", dotSize: "6px" },
    sm: { fontSize: "10px", lineHeight: "14px", dotSize: "6px" },
    xs: { fontSize: "10px", lineHeight: "12px", dotSize: "4px" }
  }
};
let a = class extends b {
  constructor() {
    super(...arguments), this.variant = "success", this.size = "md", this.label = "", this._cfg = h;
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
    const e = m(this);
    this._cfg = e?.components?.status_indicator_tarmac || h;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, o = (e.variants?.[this.variant] || {}).color || "#1ba86e", t = s.fontSize || "12px", n = s.lineHeight || "16px", i = s.dotSize || "6px", d = e.base?.gap || "4px", f = e.base?.fontFamily || "Noto Sans, sans-serif";
    return p`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${d}; }
        .dot { width: ${i}; height: ${i}; border-radius: 50%; flex-shrink: 0; background-color: ${o}; }
        .label { font-family: ${f}; font-size: ${t}; line-height: ${n}; color: inherit; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${t}; height: ${t}; }
      </style>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="dot"></span>
      ${this.label ? p`<span class="label">${this.label}</span>` : g}
    `;
  }
};
l([
  r({ type: String })
], a.prototype, "variant", 2);
l([
  r({ type: String })
], a.prototype, "size", 2);
l([
  r({ type: String })
], a.prototype, "label", 2);
a = l([
  u("tarmac-status-indicator")
], a);
export {
  a as TarmacStatusIndicator
};
