import { i as k, A as $, c as f, n as d, t as z } from "./index-8C405PPW.js";
import { s as _, g as w } from "./theme-context-BRj4LHEr.js";
function T(t, e, o) {
  return t.types?.[e]?.[o] ? t.types[e][o] : t.variants[o] || {};
}
function D(t, e) {
  return e === "outlined" && t.states.disabledOutlined ? t.states.disabledOutlined : t.states.disabled || {};
}
function B(t) {
  const { badgeConfig: e, variant: o, size: i, badgeType: s, isDisabled: l, isGhost: b } = t, c = e.sizes[i] || {}, m = e.base.fontFamily || "sans-serif", v = Number(e.base.fontWeight || 500), S = e.base.borderRadius || "4px", p = c.iconSize || "12px";
  let g, u, h, x, C = "";
  if (b) {
    const r = e.states.ghost || {};
    g = r.backgroundColor || "#e6e6e6", u = r.textColor || "transparent", h = "0.5px", x = r.borderColor || "transparent", C = "pointer-events: none;";
  } else if (l) {
    const r = D(e, s);
    g = r.backgroundColor || "#e6e6e6", u = r.textColor || "#cdcbcb", h = "0.5px", x = r.borderColor || "transparent", C = "cursor: default;";
  } else {
    const r = T(e, s, o);
    g = r.backgroundColor || "#e6e6e6", u = r.textColor || "#2b2b2b", h = r.borderColor ? "0.5px" : "0", x = r.borderColor || "transparent";
  }
  return `
    :host {
      display: inline-block;
    }

    .tarmac-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${m};
      font-weight: ${v};
      border-radius: ${S};
      padding: ${c.padding || "6px"};
      font-size: ${c.fontSize || "12px"};
      line-height: ${c.lineHeight || "16px"};
      gap: ${c.gap || "2px"};
      user-select: none;
      background-color: ${g};
      color: ${u};
      border-width: ${h};
      border-style: solid;
      border-color: ${x};
      ${C}
    }

    .badge-icon {
      width: ${p};
      height: ${p};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-icon ::slotted(svg),
    .badge-icon svg {
      width: ${p};
      height: ${p};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;
}
function O(t) {
  const { badgeConfig: e, variant: o, badgeType: i, isDisabled: s, isGhost: l } = t;
  return l ? "transparent" : s ? e.states?.disabled?.textColor || "#cdcbcb" : (e.types?.[i]?.[o] || e.variants?.[o] || {}).textColor || "#2b2b2b";
}
const y = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    borderRadius: "4px"
  },
  types: {},
  variants: {
    black: { backgroundColor: "#000000", textColor: "#e6e6e6" },
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e6e6e6" },
    coal: { backgroundColor: "#64739b", textColor: "#f2f2f2" },
    dlv_red: { backgroundColor: "#ed1b36", textColor: "#e6e6e6" },
    info: { backgroundColor: "#2396fb", textColor: "#e6e6e6" },
    success: { backgroundColor: "#1ba86e", textColor: "#e6e6e6" },
    warning: { backgroundColor: "#f5c828", textColor: "#7b6414" },
    error: { backgroundColor: "#dc143c", textColor: "#e6e6e6" },
    cardbox: { backgroundColor: "#b88b5c", textColor: "#e6e6e6" }
  },
  sizes: {
    sm: { padding: "2px 4px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    md: { padding: "2px 6px", fontSize: "12px", lineHeight: "16px", iconSize: "12px", gap: "2px" },
    lg: { padding: "2px 6px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "2px" }
  },
  states: {
    disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", borderColor: "transparent" },
    disabledOutlined: { backgroundColor: "transparent", textColor: "#cdcbcb", borderColor: "#ededed" },
    ghost: { backgroundColor: "#e6e6e6", textColor: "transparent", borderColor: "transparent" }
  }
};
var F = Object.defineProperty, G = Object.getOwnPropertyDescriptor, n = (t, e, o, i) => {
  for (var s = i > 1 ? void 0 : i ? G(e, o) : e, l = t.length - 1, b; l >= 0; l--)
    (b = t[l]) && (s = (i ? b(e, o, s) : b(s)) || s);
  return i && s && F(e, o, s), s;
};
let a = class extends k {
  constructor() {
    super(...arguments), this.variant = "black", this.size = "md", this.badgeType = "solid", this.text = "", this.showStatus = !1, this.isDisabled = !1, this.isGhost = !1, this._badgeConfig = y;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = _(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const t = w(this);
    this._badgeConfig = t?.components?.badge || y;
  }
  // ── Rendering ──────────────────────────────────────────────
  render() {
    const t = {
      badgeConfig: this._badgeConfig,
      variant: this.variant,
      size: this.size,
      badgeType: this.badgeType,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost
    }, e = B(t), o = this.showStatus ? O(t) : "";
    return f`
      <style>${e}</style>
      <span class="tarmac-badge">
        ${this.showStatus ? f`<span class="status-dot" style="background-color: ${o}"></span>` : $}
        <span class="badge-icon"><slot name="leading-icon"></slot></span>
        ${this.text || f`<slot></slot>`}
        <span class="badge-icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
};
n([
  d({ type: String })
], a.prototype, "variant", 2);
n([
  d({ type: String })
], a.prototype, "size", 2);
n([
  d({ type: String, attribute: "badge-type" })
], a.prototype, "badgeType", 2);
n([
  d({ type: String })
], a.prototype, "text", 2);
n([
  d({ type: Boolean, attribute: "show-status" })
], a.prototype, "showStatus", 2);
n([
  d({ type: Boolean, attribute: "is-disabled" })
], a.prototype, "isDisabled", 2);
n([
  d({ type: Boolean, attribute: "is-ghost" })
], a.prototype, "isGhost", 2);
a = n([
  z("tarmac-badge")
], a);
export {
  a as TarmacBadge
};
