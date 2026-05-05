import { i as S, A as f, c, n, t as z } from "./index-8C405PPW.js";
import { s as w, g as D } from "./theme-context-BRj4LHEr.js";
var _ = Object.defineProperty, k = Object.getOwnPropertyDescriptor, a = (t, e, o, r) => {
  for (var s = r > 1 ? void 0 : r ? k(e, o) : e, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (s = (r ? d(e, o, s) : d(s)) || s);
  return r && s && _(e, o, s), s;
};
const y = {
  base: { transition: "all 0.15s ease-in-out", focus: { ring: "0 0 0 2px rgba(0,0,0,0.4)" } },
  default: { backgroundColor: "#2b2b2b", textColor: "#ffffff", borderColor: "#e6e6e6", borderWidth: "0.5", hoverBackgroundColor: "#000000", hoverBorderColor: "#cccccc", hoverBorderWidth: "1", focusRingColor: "rgba(0,0,0,0.4)" },
  sizes: {
    xl: { dimension: "48px", fontSize: "20px", lineHeight: "26px", fontWeight: "600", iconSize: "28px", statusDotSize: "12px", statusDotPadding: "2px" },
    lg: { dimension: "40px", fontSize: "16px", lineHeight: "24px", fontWeight: "600", iconSize: "28px", statusDotSize: "8px", statusDotPadding: "2px" },
    md: { dimension: "36px", fontSize: "14px", lineHeight: "20px", fontWeight: "600", iconSize: "24px", statusDotSize: "6px", statusDotPadding: "2px" },
    sm: { dimension: "28px", fontSize: "12px", lineHeight: "16px", fontWeight: "600", iconSize: "16px", statusDotSize: "6px", statusDotPadding: "2px" }
  },
  radius: { round: "999px", square: { xl: "8px", lg: "8px", md: "8px", sm: "4px" } },
  states: { disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", imageOverlay: "rgba(255,255,255,0.4)" }, ghost: { backgroundColor: "#dedede" } },
  statusDot: { active: "#1ba86e", inactive: "#a0a0a0", idle: "#f5c828", brand: "#ed1b36" }
};
let i = class extends S {
  constructor() {
    super(...arguments), this.avatarType = "initials", this.shape = "round", this.size = "md", this.src = "", this.alt = "avatar", this.showStatus = !1, this.statusType = "active", this.isDisabled = !1, this.isGhost = !1, this._cfg = y;
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
    const t = D(this);
    this._cfg = t?.components?.avatar || y;
  }
  render() {
    const t = this._cfg, e = t.sizes?.[this.size] || {}, o = t.default || {}, r = e.dimension || "36px", s = this.shape === "round" ? t.radius?.round || "999px" : t.radius?.square?.[this.size] || "8px", l = e.iconSize || "24px", d = e.statusDotSize || "6px", $ = e.statusDotPadding || "2px", m = t.statusDot?.[this.statusType] || "#1ba86e", C = this.showStatus && this.shape === "round" && !this.isGhost;
    let p, h, u, b, g = "", x = "", v = "";
    return this.isGhost ? (p = t.states?.ghost?.backgroundColor || "#dedede", h = "transparent", u = "0", b = "transparent", g = "pointer-events:none;") : this.isDisabled ? (p = t.states?.disabled?.backgroundColor || "#e6e6e6", h = t.states?.disabled?.textColor || "#cdcbcb", u = "0", b = "transparent", g = "cursor:default;") : (p = o.backgroundColor || "#2b2b2b", h = o.textColor || "#ffffff", u = o.borderWidth || "0.5px", b = o.borderColor || "#e6e6e6", x = `.avatar:hover { background-color:${o.hoverBackgroundColor || "#000"}; border-color:${o.hoverBorderColor || "#ccc"}; cursor:pointer; }`, v = `.avatar:focus { box-shadow:${o.focusRingColor ? `0 0 0 2px ${o.focusRingColor}` : t.base?.focus?.ring || "0 0 0 2px rgba(0,0,0,0.4)"}; outline:none; }`), c`
      <style>
        :host { display:inline-block; position:relative; }
        .avatar { display:inline-flex; align-items:center; justify-content:center; width:${r}; height:${r}; min-width:${r}; min-height:${r}; border-radius:${s}; font-family:sans-serif; font-size:${e.fontSize || "14px"}; line-height:${e.lineHeight || "20px"}; font-weight:${Number(e.fontWeight || 600)}; transition:${t.base?.transition || "all 0.15s ease-in-out"}; user-select:none; position:relative; overflow:visible; box-sizing:border-box; background-color:${p}; color:${h}; border-width:${u}; border-style:solid; border-color:${b}; ${g} }
        ${x} ${v}
        .avatar img { width:100%; height:100%; object-fit:cover; border-radius:${s}; }
        .avatar .icon-wrap { width:${l}; height:${l}; display:inline-flex; align-items:center; justify-content:center; }
        .avatar .icon-wrap ::slotted(svg), .avatar .icon-wrap svg { width:${l}; height:${l}; }
        .status-dot { position:absolute; bottom:0; right:0; width:${d}; height:${d}; border-radius:50%; background-color:${m}; border:${$} solid white; box-sizing:content-box; }
        .overlay { position:absolute; inset:0; border-radius:${s}; background-color:${t.states?.disabled?.imageOverlay || "rgba(255,255,255,0.4)"}; }
      </style>
      <span class="avatar" tabindex="0">
        ${this.isGhost ? f : this.avatarType === "image" && this.src ? c`<img src="${this.src}" alt="${this.alt}" />${this.isDisabled ? c`<span class="overlay"></span>` : f}` : this.avatarType === "icon" ? c`<span class="icon-wrap"><slot name="icon"></slot></span>` : c`<slot></slot>`}
      </span>
      ${C ? c`<span class="status-dot"></span>` : f}
    `;
  }
};
a([
  n({ type: String, attribute: "avatar-type" })
], i.prototype, "avatarType", 2);
a([
  n({ type: String })
], i.prototype, "shape", 2);
a([
  n({ type: String })
], i.prototype, "size", 2);
a([
  n({ type: String })
], i.prototype, "src", 2);
a([
  n({ type: String })
], i.prototype, "alt", 2);
a([
  n({ type: Boolean, attribute: "show-status" })
], i.prototype, "showStatus", 2);
a([
  n({ type: String, attribute: "status-type" })
], i.prototype, "statusType", 2);
a([
  n({ type: Boolean, attribute: "is-disabled" })
], i.prototype, "isDisabled", 2);
a([
  n({ type: Boolean, attribute: "is-ghost" })
], i.prototype, "isGhost", 2);
i = a([
  z("tarmac-avatar")
], i);
export {
  i as TarmacAvatar
};
