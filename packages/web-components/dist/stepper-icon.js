import { i as $, A as z, c as a, n as p, t as _ } from "./index-8C405PPW.js";
import { s as w, g as N } from "./theme-context-BRj4LHEr.js";
var W = Object.defineProperty, F = Object.getOwnPropertyDescriptor, l = (t, e, o, i) => {
  for (var r = i > 1 ? void 0 : i ? F(e, o) : e, d = t.length - 1, n; d >= 0; d--)
    (n = t[d]) && (r = (i ? n(e, o, r) : n(r)) || r);
  return i && r && W(e, o, r), r;
};
const D = {
  base: { borderRadius: "999px" },
  outerBg: { default: "#f7f7f7", ghost: "#ededed", ghostNumericIcon: "#f2f2f2" },
  sizes: {
    sm: { outerSize: "20px", innerDotSolid: "8px", innerDotOutlined: "6px", fontSize: "10px", lineHeight: "12px", borderWidthDefault: "1px", borderWidthFocused: "2px" },
    md: { outerSize: "28px", innerDotSolid: "12px", innerDotOutlined: "8px", fontSize: "12px", lineHeight: "16px", borderWidthDefault: "1px", borderWidthFocused: "2px" },
    lg: { outerSize: "36px", innerDotSolid: "16px", innerDotOutlined: "12px", fontSize: "14px", lineHeight: "20px", borderWidthDefault: "1px", borderWidthFocused: "2px" }
  },
  styles: {
    black: { innerColor: "#000000", borderColor: "#000000", textColor: "#000000", iconColor: "#000000", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    coal: { innerColor: "#64739b", borderColor: "#64739b", textColor: "#64739b", iconColor: "#64739b", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    dlv_red: { innerColor: "#ed1b36", borderColor: "#ed1b36", textColor: "#ed1b36", iconColor: "#ed1b36", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    blue: { innerColor: "#2396fb", borderColor: "#2396fb", textColor: "#2396fb", iconColor: "#2396fb", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    green: { innerColor: "#1ba86e", borderColor: "#1ba86e", textColor: "#1ba86e", iconColor: "#1ba86e", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    numeric: { borderColor: "#2b2b2b", textColor: "#2b2b2b", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb" },
    icon: { borderColor: "#2b2b2b", iconColor: "#2b2b2b", borderColorDisabled: "#ededed", iconColorDisabled: "#cdcbcb" }
  }
};
let s = class extends $ {
  constructor() {
    super(...arguments), this.stepperStyle = "numeric", this.variant = "solid", this.size = "lg", this.stepNumber = 1, this._cfg = D;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = w(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = N(this);
    this._cfg = t?.components?.stepperIcon_tarmac || D;
  }
  render() {
    const t = this._cfg, e = t.sizes?.[this.size] || {}, o = t.styles?.[this.stepperStyle] || {}, i = t.outerBg || {}, r = e.outerSize || "28px", d = t.base?.borderRadius || "999px", n = !["numeric", "icon"].includes(this.stepperStyle), f = this.stepperStyle === "numeric", g = this.stepperStyle === "icon", h = this.variant === "ghost", c = this.variant === "disabled", u = f || g;
    let b, C = "", m = "";
    h ? b = u ? i.ghostNumericIcon || "#f2f2f2" : i.ghost || "#ededed" : c ? (b = u ? o.outerBgDisabled || "#ffffff" : i.default || "#f7f7f7", u && (C = `border:${e.borderWidthDefault || "1px"} solid ${o.borderColorDisabled || "#ededed"};`)) : (b = i.default || "#f7f7f7", (this.variant === "outlined" || this.variant === "focused") && (C = `border:${this.variant === "focused" ? e.borderWidthFocused || "2px" : e.borderWidthDefault || "1px"} solid ${o.borderColor || "#2b2b2b"};`));
    const x = this.variant === "outlined" ? e.innerDotOutlined || "8px" : e.innerDotSolid || "12px", S = c ? o.innerColorDisabled || "#cdcbcb" : o.innerColor || "#000", y = c ? o.textColorDisabled || "#cdcbcb" : o.textColor || "#2b2b2b", v = c ? o.iconColorDisabled || "#cdcbcb" : o.iconColor || "#2b2b2b";
    return a`
      <style>
        :host { display:inline-block; }
        .outer { width:${r}; height:${r}; border-radius:${d}; background-color:${b}; overflow:hidden; display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; box-sizing:border-box; ${C} ${m} }
        .dot { width:${x}; height:${x}; border-radius:50%; background-color:${S}; }
        .num { font-family:${e.fontFamily || "Noto Sans, sans-serif"}; font-size:${e.fontSize || "12px"}; line-height:${e.lineHeight || "16px"}; font-weight:600; color:${y}; }
        .icon-wrap { display:flex; align-items:center; justify-content:center; color:${v}; }
        .icon-wrap ::slotted(svg) { width:${e.iconContainerSize || "16px"}; height:${e.iconContainerSize || "16px"}; }
      </style>
      <div class="outer">
        ${h ? z : n ? a`<span class="dot"></span>` : f ? a`<span class="num">${this.stepNumber}</span>` : a`<span class="icon-wrap"><slot name="icon"></slot></span>`}
      </div>
    `;
  }
};
l([
  p({ type: String, attribute: "stepper-style" })
], s.prototype, "stepperStyle", 2);
l([
  p({ type: String })
], s.prototype, "variant", 2);
l([
  p({ type: String })
], s.prototype, "size", 2);
l([
  p({ type: Number, attribute: "step-number" })
], s.prototype, "stepNumber", 2);
s = l([
  _("tarmac-stepper-icon")
], s);
export {
  s as TarmacStepperIcon
};
