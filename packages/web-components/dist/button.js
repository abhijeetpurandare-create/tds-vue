import { i as V, c as u, n as d, t as W } from "./index-8C405PPW.js";
import { s as A, g as U } from "./theme-context-BRj4LHEr.js";
function H(o, t, e) {
  return o.styles?.[t]?.[e] ? o.styles[t][e] : o.variants[e] || {};
}
function J(o, t, e) {
  let r;
  return t === "secondary" && o.states.disabledSecondary ? r = o.states.disabledSecondary : t === "tertiary" && o.states.disabledTertiary ? r = o.states.disabledTertiary : r = o.states.disabled || {}, {
    backgroundColor: e.disabledBackgroundColor || r.backgroundColor,
    textColor: e.disabledTextColor || r.textColor,
    borderColor: e.disabledBorderColor || r.borderColor,
    cursor: r.cursor
  };
}
function K(o) {
  const {
    buttonConfig: t,
    variant: e,
    size: r,
    buttonStyle: n,
    buttonType: c,
    isRounded: p,
    isLoading: y,
    backgroundColor: T,
    borderColor: C,
    hoverColor: _,
    textColor: w,
    radius: F,
    border: R
  } = o, s = H(t, n, e), h = J(t, n, s), b = t.states.ghost || {}, v = n === "secondary" || e === "outline" || !!s.borderColor, k = c === "iconButton", m = t.sizes[r]?.iconButtonSize;
  let f;
  k && m ? f = t.sizes[r]?.iconButtonPadding || "0" : f = t.sizes[r]?.padding || (r === "sm" ? "0.375rem 0.75rem" : r === "md" ? "0.5rem 1rem" : "0.625rem 1.25rem");
  const E = t.sizes[r]?.fontSize || (r === "sm" ? "0.875rem" : r === "md" ? "1rem" : "1.125rem"), L = p ? t.base.radius?.rounded || "9999px" : F || t.base.radius?.default || "0.375rem", $ = T || s.backgroundColor || "#3B82F6", S = w || s.textColor || "white";
  let x, D = "solid", g;
  v ? (x = "1px", g = C || s.borderColor || "transparent") : (x = R || C ? "1px" : "0", g = C || "transparent");
  const I = _ || s.hoverColor || s.backgroundColor || $, P = s.hoverTextColor || s.textColor || S, N = v && s.hoverBorderColor ? s.hoverBorderColor : g, O = s.pressedColor || s.hoverColor || s.backgroundColor || $, j = s.pressedTextColor || s.hoverTextColor || s.textColor || S, G = s.focusRingColor ? `0 0 0 2px ${s.focusRingColor}` : t.base.focus?.ring || "0 0 0 2px rgba(0, 0, 0, 0.4)", q = t.states.loading?.opacity ? Number(t.states.loading.opacity) : 0.8;
  return `
    :host {
      display: inline-block;
    }

    .tarmac-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${t.base.fontFamily?.replace("font-", "") || "sans-serif"};
      font-weight: ${Number(t.base.fontWeight?.replace("font-", "") || 500)};
      transition: all 0.15s ease-in-out;
      outline: none;
      cursor: pointer;
      padding: ${f};
      font-size: ${E};
      border-radius: ${L};
      background-color: ${$};
      color: ${S};
      border-width: ${x};
      border-style: ${D};
      border-color: ${g};
      ${k && m ? `width: ${m}; height: ${m};` : ""}
      ${y ? `opacity: ${q}; pointer-events: none;` : ""}
    }

    .tarmac-btn:hover:not(:disabled):not(.ghost) {
      background-color: ${I};
      color: ${P};
      border-color: ${N};
    }

    .tarmac-btn:active:not(:disabled):not(.ghost) {
      background-color: ${O};
      color: ${j};
    }

    .tarmac-btn:focus {
      box-shadow: ${G};
      outline: none;
    }

    .tarmac-btn:disabled,
    .tarmac-btn.disabled {
      cursor: ${h.cursor || "not-allowed"};
      background-color: ${h.backgroundColor || "#E5E7EB"};
      color: ${h.textColor || "#9CA3AF"};
      border-color: ${h.borderColor || "transparent"};
    }

    .tarmac-btn.ghost {
      background-color: ${b.backgroundColor || "#dedede"};
      color: ${b.textColor || "transparent"};
      border-color: ${b.borderColor || "transparent"};
      cursor: ${b.cursor || "default"};
      pointer-events: none;
    }
  `;
}
function B(o, t, e, r) {
  const n = o.sizes[t]?.iconSize || (t === "sm" ? "1rem" : t === "md" ? "1.25rem" : "1.5rem"), c = o.sizes[t]?.gap || (t === "sm" ? "0.375rem" : t === "md" ? "0.5rem" : "0.625rem");
  return `
    .icon-${e} {
      width: ${n};
      height: ${n};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${r && e === "left" ? `margin-right: ${c};` : ""}
      ${r && e === "right" ? `margin-left: ${c};` : ""}
    }

    .icon-${e} ::slotted(svg),
    .icon-${e} svg {
      width: ${n};
      height: ${n};
    }
  `;
}
const M = `
  @keyframes tarmac-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .tarmac-spinner {
    display: inline-block;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: tarmac-spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  .tarmac-spinner--sm {
    width: 14px;
    height: 14px;
  }

  .tarmac-spinner--md {
    width: 16px;
    height: 16px;
  }

  .tarmac-spinner--lg {
    width: 20px;
    height: 20px;
  }
`, l = {
  primary: { main: "#3B82F6", dark: "#1D4ED8", contrast: "#FFFFFF" },
  secondary: { main: "#6B7280", dark: "#374151", contrast: "#FFFFFF" }
}, z = {
  base: {
    fontFamily: "sans-serif",
    fontWeight: "500",
    focus: {
      ring: "0 0 0 3px rgba(59, 130, 246, 0.5)"
    },
    radius: {
      default: "0.375rem",
      rounded: "9999px"
    }
  },
  variants: {
    primary: {
      backgroundColor: l.primary.main,
      textColor: l.primary.contrast,
      borderColor: l.primary.main,
      hoverColor: l.primary.dark,
      focusRingColor: l.primary.main
    },
    secondary: {
      backgroundColor: l.secondary.main,
      textColor: l.secondary.contrast,
      borderColor: l.secondary.main,
      hoverColor: l.secondary.dark,
      focusRingColor: l.secondary.main
    },
    outline: {
      backgroundColor: "transparent",
      textColor: l.primary.main,
      borderColor: l.primary.main,
      hoverColor: l.primary.main,
      hoverTextColor: l.primary.contrast,
      focusRingColor: l.primary.main
    }
  },
  sizes: {
    sm: {
      padding: "0.375rem 0.75rem",
      fontSize: "0.875rem",
      iconSize: "1rem",
      gap: "0.375rem"
    },
    md: {
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      iconSize: "1.25rem",
      gap: "0.5rem"
    },
    lg: {
      padding: "0.75rem 1.5rem",
      fontSize: "1.125rem",
      iconSize: "1.5rem",
      gap: "0.625rem"
    }
  },
  states: {
    disabled: {
      backgroundColor: "#E0E0E0",
      textColor: "#9E9E9E",
      cursor: "not-allowed"
    },
    loading: {
      opacity: "0.7",
      cursor: "wait"
    }
  }
};
var Q = Object.defineProperty, X = Object.getOwnPropertyDescriptor, a = (o, t, e, r) => {
  for (var n = r > 1 ? void 0 : r ? X(t, e) : t, c = o.length - 1, p; c >= 0; c--)
    (p = o[c]) && (n = (r ? p(t, e, n) : p(n)) || n);
  return r && n && Q(t, e, n), n;
};
let i = class extends V {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.buttonStyle = "primary", this.buttonType = "button", this.isLoading = !1, this.disabled = !1, this.isRounded = !1, this.isGhost = !1, this.text = "", this._buttonConfig = z;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = A(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const o = U(this);
    this._buttonConfig = o?.components?.button || z;
  }
  // ── Rendering ──────────────────────────────────────────────
  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }
  render() {
    const o = this._hasSlottedContent("leading-icon");
    this._hasSlottedContent("trailing-icon");
    const t = !!this.text || this._hasSlottedContent("default"), e = this.buttonType === "iconButton", r = K({
      buttonConfig: this._buttonConfig,
      variant: this.variant,
      size: this.size,
      buttonStyle: this.buttonStyle,
      buttonType: this.buttonType,
      isRounded: this.isRounded,
      isLoading: this.isLoading,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      hoverColor: this.hoverColor,
      textColor: this.textColor,
      radius: this.radius,
      border: this.border
    }), n = B(this._buttonConfig, this.size, "left", t), c = B(this._buttonConfig, this.size, "right", t), p = this.isGhost ? "ghost" : "", y = this.size === "lg" ? "tarmac-spinner--lg" : this.size === "sm" ? "tarmac-spinner--sm" : "tarmac-spinner--md";
    return u`
      <style>
        ${r}
        ${n}
        ${c}
        ${M}
      </style>
      <button
        class="tarmac-btn ${p}"
        ?disabled=${this.disabled || this.isLoading}
        @click=${this._handleClick}
      >
        ${this.isLoading ? u`
              <span class="tarmac-spinner ${y}"></span>
              ${this.text || u`<slot></slot>`}
            ` : e ? u`
                <span class="icon-left">
                  <slot name="leading-icon"></slot>
                  ${o ? "" : u`<slot></slot>`}
                </span>
              ` : u`
                <span class="icon-left"><slot name="leading-icon"></slot></span>
                ${this.text || u`<slot></slot>`}
                <span class="icon-right"><slot name="trailing-icon"></slot></span>
              `}
      </button>
    `;
  }
  // ── Event handling ─────────────────────────────────────────
  _handleClick(o) {
    if (this.disabled || this.isLoading) {
      o.preventDefault(), o.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: o }
    }));
  }
  // ── Helpers ────────────────────────────────────────────────
  _hasSlottedContent(o) {
    if (o === "default") {
      const e = this.shadowRoot?.querySelector("slot:not([name])");
      return e ? e.assignedNodes({ flatten: !0 }).length > 0 : !!this.textContent?.trim();
    }
    const t = this.shadowRoot?.querySelector(`slot[name="${o}"]`);
    return t ? t.assignedNodes({ flatten: !0 }).length > 0 : !1;
  }
};
a([
  d({ type: String })
], i.prototype, "variant", 2);
a([
  d({ type: String })
], i.prototype, "size", 2);
a([
  d({ type: String, attribute: "button-style" })
], i.prototype, "buttonStyle", 2);
a([
  d({ type: String, attribute: "button-type" })
], i.prototype, "buttonType", 2);
a([
  d({ type: Boolean, attribute: "is-loading" })
], i.prototype, "isLoading", 2);
a([
  d({ type: Boolean })
], i.prototype, "disabled", 2);
a([
  d({ type: Boolean, attribute: "is-rounded" })
], i.prototype, "isRounded", 2);
a([
  d({ type: Boolean, attribute: "is-ghost" })
], i.prototype, "isGhost", 2);
a([
  d({ type: String })
], i.prototype, "text", 2);
a([
  d({ type: String, attribute: "background-color" })
], i.prototype, "backgroundColor", 2);
a([
  d({ type: String, attribute: "border-color" })
], i.prototype, "borderColor", 2);
a([
  d({ type: String, attribute: "text-color" })
], i.prototype, "textColor", 2);
a([
  d({ type: String, attribute: "hover-color" })
], i.prototype, "hoverColor", 2);
a([
  d({ type: String })
], i.prototype, "radius", 2);
a([
  d({ type: String })
], i.prototype, "border", 2);
i = a([
  W("tarmac-button")
], i);
export {
  i as TarmacButton
};
