import { i as V, A as v, c as g, n as l, t as F } from "./index-8C405PPW.js";
import { s as j, g as E } from "./theme-context-BRj4LHEr.js";
function H(e, r, t) {
  return e.variants?.[r]?.[t] || {};
}
function P(e, r) {
  return r === "outlined" && e.states.disabledOutlined ? e.states.disabledOutlined : e.states.disabled || {};
}
function W(e) {
  const { chipConfig: r, chipType: t, chipVariant: a, size: s, isDisabled: c, isGhost: d } = e, b = r.sizes[s] || {}, S = r.base.fontFamily || "sans-serif", _ = Number(r.base.fontWeight || 500), B = r.base.borderRadius || "8px", T = r.base.transition || "all 0.15s ease-in-out", p = b.iconSize || "12px";
  let C, h, f, u, x = "", y = "", k = "", m = "";
  if (d) {
    const o = r.states.ghost || {};
    C = o.backgroundColor || "#e6e6e6", h = o.textColor || "transparent", f = "0.5px", u = o.borderColor || "transparent", x = "cursor: default; pointer-events: none;";
  } else if (c) {
    const o = P(r, a);
    C = o.backgroundColor || "#e6e6e6", h = o.textColor || "#cdcbcb", f = "0.5px", u = o.borderColor || "transparent", x = "cursor: default;";
  } else {
    const o = H(r, a, t), $ = a === "outlined" || !!o.borderColor;
    C = o.backgroundColor || "#e6e6e6", h = o.textColor || "#2b2b2b", f = $ ? "0.5px" : "0", u = o.borderColor || "transparent";
    const z = o.hoverColor || o.backgroundColor || "#d6d6d6", w = o.hoverTextColor || o.textColor || "#2b2b2b", D = $ && o.hoverBorderColor ? `border-color: ${o.hoverBorderColor};` : "";
    y = `
      .tarmac-chip:hover {
        cursor: pointer;
        background-color: ${z};
        color: ${w};
        ${D}
      }
    `;
    const O = o.pressedColor || o.hoverColor || o.backgroundColor || "#cccccc", G = o.pressedTextColor || o.hoverTextColor || o.textColor || "#2b2b2b";
    k = `
      .tarmac-chip:active {
        background-color: ${O};
        color: ${G};
      }
    `, m = `
      .tarmac-chip:focus {
        box-shadow: ${o.focusRingColor ? `0 0 0 2px ${o.focusRingColor}` : r.base.focus?.ring || "0 0 0 2px rgba(0, 0, 0, 0.4)"};
        outline: none;
      }
    `;
  }
  return `
    :host { display: inline-block; }

    .tarmac-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${S};
      font-weight: ${_};
      border-radius: ${B};
      transition: ${T};
      padding: ${b.padding || "8px"};
      font-size: ${b.fontSize || "12px"};
      line-height: ${b.lineHeight || "16px"};
      gap: ${b.gap || "4px"};
      user-select: none;
      cursor: pointer;
      outline: none;
      background-color: ${C};
      color: ${h};
      border-width: ${f};
      border-style: solid;
      border-color: ${u};
      ${x}
    }

    ${y}
    ${k}
    ${m}

    .chip-icon {
      width: ${p};
      height: ${p};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon ::slotted(svg), .chip-icon svg {
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
function L(e) {
  const { chipConfig: r, chipType: t, chipVariant: a, isDisabled: s, isGhost: c } = e;
  return c ? "transparent" : s ? r?.states?.disabled?.textColor || "#cdcbcb" : r?.variants?.[a]?.[t]?.textColor || "#2b2b2b";
}
const R = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.15s ease-in-out",
    focus: { ring: "0 0 0 2px rgba(0,0,0,0.4)" }
  },
  variants: {
    standard: {
      black: { backgroundColor: "#000000", textColor: "#e6e6e6", hoverColor: "#121212", pressedColor: "#1a1a1a", focusRingColor: "rgba(0,0,0,0.4)" },
      white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", hoverColor: "#f2f2f2", pressedColor: "#e6e6e6", focusRingColor: "rgba(255,255,255,0.4)" },
      coal: { backgroundColor: "#64739b", textColor: "#e6e6e6", hoverColor: "#4e5d80", pressedColor: "#5a6a90", focusRingColor: "rgba(0,0,0,0.4)" },
      blue: { backgroundColor: "#2396fb", textColor: "#e6e6e6", hoverColor: "#0d7de0", pressedColor: "#1a8af0", focusRingColor: "rgba(35,150,251,0.4)" },
      success: { backgroundColor: "#1ba86e", textColor: "#e6e6e6", hoverColor: "#148a5a", pressedColor: "#189960", focusRingColor: "rgba(27,168,110,0.4)" },
      error: { backgroundColor: "#dc143c", textColor: "#e6e6e6", hoverColor: "#b8102f", pressedColor: "#c41235", focusRingColor: "rgba(220,20,60,0.4)" },
      warning: { backgroundColor: "#f5c828", textColor: "#52430d", hoverColor: "#ddb420", pressedColor: "#e6bc24", focusRingColor: "rgba(245,200,40,0.4)" },
      legacy_blue: { backgroundColor: "#5b80f7", textColor: "#e6e6e6", hoverColor: "#4a6de0", pressedColor: "#5276f0", focusRingColor: "rgba(0,0,0,0.4)" },
      dlv_red: { backgroundColor: "#ed1b36", textColor: "#e6e6e6", hoverColor: "#d0162e", pressedColor: "#de1832", focusRingColor: "rgba(0,0,0,0.4)" }
    },
    outlined: {
      black: { backgroundColor: "transparent", textColor: "#2b2b2b", borderColor: "#2b2b2b", hoverColor: "#f2f2f2", hoverBorderColor: "#1a1a1a", pressedColor: "#f2f2f2", focusRingColor: "rgba(0,0,0,0.4)" },
      white: { backgroundColor: "transparent", textColor: "#e6e6e6", borderColor: "#e6e6e6", hoverColor: "rgba(255,255,255,0.1)", hoverBorderColor: "#cccccc", pressedColor: "rgba(255,255,255,0.1)", focusRingColor: "rgba(255,255,255,0.4)" },
      coal: { backgroundColor: "transparent", textColor: "#64739b", borderColor: "#64739b", hoverColor: "#f0f2f7", hoverBorderColor: "#4e5d80", pressedColor: "#f0f2f7", focusRingColor: "rgba(0,0,0,0.4)" },
      blue: { backgroundColor: "transparent", textColor: "#2396fb", borderColor: "#2396fb", hoverColor: "#eef6ff", hoverBorderColor: "#0d7de0", pressedColor: "#eef6ff", focusRingColor: "rgba(35,150,251,0.4)" },
      success: { backgroundColor: "transparent", textColor: "#1ba86e", borderColor: "#1ba86e", hoverColor: "#edfaf4", hoverBorderColor: "#148a5a", pressedColor: "#edfaf4", focusRingColor: "rgba(27,168,110,0.4)" },
      error: { backgroundColor: "transparent", textColor: "#dc143c", borderColor: "#dc143c", hoverColor: "#fef0f2", hoverBorderColor: "#b8102f", pressedColor: "#fef0f2", focusRingColor: "rgba(220,20,60,0.4)" },
      warning: { backgroundColor: "transparent", textColor: "#7b6414", borderColor: "#f5c828", hoverColor: "#fef9e6", hoverBorderColor: "#ddb420", pressedColor: "#fef9e6", focusRingColor: "rgba(245,200,40,0.4)" },
      legacy_blue: { backgroundColor: "transparent", textColor: "#5b80f7", borderColor: "#5b80f7", hoverColor: "#f0f3ff", hoverBorderColor: "#4a6de0", pressedColor: "#f0f3ff", focusRingColor: "rgba(0,0,0,0.4)" },
      dlv_red: { backgroundColor: "transparent", textColor: "#ed1b36", borderColor: "#ed1b36", hoverColor: "#fef0f2", hoverBorderColor: "#d0162e", pressedColor: "#fef0f2", focusRingColor: "rgba(0,0,0,0.4)" }
    }
  },
  sizes: {
    sm: { padding: "4px 6px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "4px" },
    md: { padding: "4px 8px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "4px" },
    lg: { padding: "6px 8px", fontSize: "14px", lineHeight: "20px", iconSize: "20px", gap: "4px" }
  },
  states: {
    disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", borderColor: "transparent" },
    disabledOutlined: { backgroundColor: "transparent", textColor: "#cdcbcb", borderColor: "#ededed" },
    ghost: { backgroundColor: "#e6e6e6", textColor: "transparent", borderColor: "transparent" }
  }
};
var K = Object.defineProperty, N = Object.getOwnPropertyDescriptor, n = (e, r, t, a) => {
  for (var s = a > 1 ? void 0 : a ? N(r, t) : r, c = e.length - 1, d; c >= 0; c--)
    (d = e[c]) && (s = (a ? d(r, t, s) : d(s)) || s);
  return a && s && K(r, t, s), s;
};
let i = class extends V {
  constructor() {
    super(...arguments), this.chipType = "black", this.chipVariant = "standard", this.size = "md", this.text = "", this.statusLeft = !1, this.statusRight = !1, this.isDisabled = !1, this.isGhost = !1, this._chipConfig = R;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = j(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = E(this);
    this._chipConfig = e?.components?.chip || e?.components?.tag || R;
  }
  render() {
    const e = {
      chipConfig: this._chipConfig,
      chipType: this.chipType,
      chipVariant: this.chipVariant,
      size: this.size,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost
    }, r = W(e), t = L(e);
    return g`
      <style>${r}</style>
      <span
        class="tarmac-chip"
        tabindex=${this.isDisabled || this.isGhost ? -1 : 0}
        role="button"
        aria-disabled=${this.isDisabled || v}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this.statusLeft ? g`<span class="status-dot" style="background-color:${t}"></span>` : v}
        <span class="chip-icon"><slot name="leading-icon"></slot></span>
        ${this.text || g`<slot></slot>`}
        <span class="chip-icon"><slot name="trailing-icon"></slot></span>
        ${this.statusRight ? g`<span class="status-dot" style="background-color:${t}"></span>` : v}
      </span>
    `;
  }
  _handleClick(e) {
    this.isDisabled || this.isGhost || this.dispatchEvent(new CustomEvent("tarmac-click", { bubbles: !0, composed: !0, detail: { originalEvent: e } }));
  }
  _handleKeydown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._handleClick(e));
  }
};
n([
  l({ type: String, attribute: "chip-type" })
], i.prototype, "chipType", 2);
n([
  l({ type: String, attribute: "chip-variant" })
], i.prototype, "chipVariant", 2);
n([
  l({ type: String })
], i.prototype, "size", 2);
n([
  l({ type: String })
], i.prototype, "text", 2);
n([
  l({ type: Boolean, attribute: "status-left" })
], i.prototype, "statusLeft", 2);
n([
  l({ type: Boolean, attribute: "status-right" })
], i.prototype, "statusRight", 2);
n([
  l({ type: Boolean, attribute: "is-disabled" })
], i.prototype, "isDisabled", 2);
n([
  l({ type: Boolean, attribute: "is-ghost" })
], i.prototype, "isGhost", 2);
i = n([
  F("tarmac-chip")
], i);
export {
  i as TarmacChip
};
