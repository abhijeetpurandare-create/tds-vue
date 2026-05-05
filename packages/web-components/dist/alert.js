import { i as m, A as p, c, n as a, t as u } from "./index-8C405PPW.js";
import { s as x, g as C } from "./theme-context-BRj4LHEr.js";
function f(e, r) {
  return e.variants?.[r] || {};
}
function y(e, r) {
  return e.sizes?.[r] || {};
}
function v(e) {
  const { alertConfig: r, variant: d, size: n } = e, o = r.base || {}, i = f(r, d), t = y(r, n), h = o.fontFamily || "Noto Sans, sans-serif", b = o.captionFontFamily || h;
  return `
    :host {
      display: block;
      width: 100%;
    }

    /* ── Container ─────────────────────────────────────── */
    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 0;
      width: 100%;
      padding: ${t.padding || "12px"};
      border-radius: ${o.borderRadius || "4px"};
      box-shadow: ${o.shadow || "0px 0px 4px 0px rgba(0,0,0,0.1)"};
      background-color: ${i.backgroundColor || "#ffffff"};
      font-family: ${h};
      transition: ${o.transition || "all 0.15s ease-in-out"};
      box-sizing: border-box;
      position: relative;
    }

    /* ── Inner column ──────────────────────────────────── */
    .alert-inner {
      display: flex;
      flex-direction: column;
      gap: ${t.contentGap || "8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Row (icon + text + trailing) ──────────────────── */
    .alert-row {
      display: flex;
      align-items: flex-start;
      gap: ${t.iconGap || "10px"};
      width: 100%;
    }

    /* ── Text column ───────────────────────────────────── */
    .alert-text-col {
      display: flex;
      flex-direction: column;
      gap: ${t.contentGap || "8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Text block (title + description) ──────────────── */
    .alert-text-block {
      display: flex;
      flex-direction: column;
      gap: ${t.textGap || "4px"};
      align-items: flex-start;
      width: 100%;
    }

    /* ── Title ─────────────────────────────────────────── */
    .alert-title {
      font-family: ${h};
      font-weight: ${t.titleFontWeight ? Number(t.titleFontWeight) : n === "sm" ? 500 : 400};
      font-size: ${t.titleFontSize || "16px"};
      line-height: ${t.titleLineHeight || "24px"};
      color: ${i.titleColor || "#121212"};
      margin: 0;
      width: 100%;
    }

    /* ── Description ───────────────────────────────────── */
    .alert-description {
      font-family: ${n === "sm" ? b : h};
      font-weight: 400;
      font-size: ${t.descriptionFontSize || "14px"};
      line-height: ${t.descriptionLineHeight || "20px"};
      color: ${i.descriptionColor || "#3b3b3b"};
      margin: 0;
      width: 100%;
    }

    /* ── Single text ───────────────────────────────────── */
    .alert-single-text {
      font-family: ${h};
      font-weight: 400;
      font-size: ${t.singleTextFontSize || t.titleFontSize || "16px"};
      line-height: ${t.singleTextLineHeight || t.titleLineHeight || "24px"};
      color: ${i.singleTextColor || i.descriptionColor || "#2b2b2b"};
      margin: 0;
      width: 100%;
    }

    /* ── Icon wrapper ──────────────────────────────────── */
    .alert-icon-wrap {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: ${i.iconColor || "#2b2b2b"};
    }
    .alert-icon-wrap ::slotted(*),
    .alert-icon-wrap svg {
      width: ${t.iconSize || "24px"};
      height: ${t.iconSize || "24px"};
    }

    /* ── CTAs row ──────────────────────────────────────── */
    .alert-ctas {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
    }

    /* ── Close button ──────────────────────────────────── */
    .alert-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: ${i.iconColor || "#2b2b2b"};
      opacity: 0.6;
      transition: opacity 0.15s;
    }
    .alert-close-btn:hover {
      opacity: 1;
    }
  `;
}
function $(e, r, d, n) {
  const o = e.base || {}, i = e.variants?.[r] || {}, t = e.sizes?.[d] || {};
  return `
    :host { display: block; width: 100%; }

    .alert-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-family: ${o.fontFamily || "sans-serif"};
      font-weight: ${o.fontWeight || 500};
      transition: ${o.transition || "all 0.15s ease-in-out"};
      border-radius: ${o.radius || "0.5rem"};
      border: 1px solid;
      padding: ${t.padding || "1rem"};
      font-size: ${t.fontSize || "1rem"};
      background-color: ${n.backgroundColor || i.backgroundColor || "#FFFFFF"};
      color: ${n.textColor || i.textColor || "#111827"};
      border-color: ${n.borderColor || i.borderColor || "#E5E7EB"};
      box-sizing: border-box;
    }

    .alert-icon-wrap {
      flex-shrink: 0;
      width: ${t.iconSize || "1.25rem"};
      height: ${t.iconSize || "1.25rem"};
      color: ${n.iconColor || i.iconColor || "#6B7280"};
    }

    .alert-content { flex: 1 1 0%; }

    .alert-title {
      margin: 0;
      font-weight: 600;
      line-height: 1.2;
    }

    .alert-description {
      margin: 0;
      line-height: 1.5;
      color: ${i.textColor || "#111827"};
      opacity: 0.9;
    }

    .alert-close-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.25rem;
      color: ${i.textColor || "#111827"};
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.15s;
      border: none;
      background: none;
      outline: none;
    }
    .alert-close-btn:hover { opacity: 0.75; }
  `;
}
const g = {
  base: {
    fontFamily: "sans-serif",
    fontWeight: "500",
    transition: "all 0.15s ease-in-out",
    radius: "0.5rem",
    padding: "1rem"
  },
  variants: {
    default: {
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      borderColor: "#E5E7EB",
      iconColor: "#6B7280"
    },
    primary: {
      backgroundColor: "#93C5FD20",
      textColor: "#1D4ED8",
      borderColor: "#93C5FD",
      iconColor: "#3B82F6"
    },
    destructive: {
      backgroundColor: "#FCA5A520",
      textColor: "#B91C1C",
      borderColor: "#FCA5A5",
      iconColor: "#EF4444"
    },
    success: {
      backgroundColor: "#A7F3D020",
      textColor: "#047857",
      borderColor: "#A7F3D0",
      iconColor: "#10B981"
    },
    warning: {
      backgroundColor: "#FCD34D20",
      textColor: "#B45309",
      borderColor: "#FCD34D",
      iconColor: "#F59E0B"
    },
    info: {
      backgroundColor: "#93C5FD20",
      textColor: "#1D4ED8",
      borderColor: "#93C5FD",
      iconColor: "#3B82F6"
    }
  },
  sizes: {
    sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", iconSize: "1rem" },
    md: { padding: "1rem", fontSize: "1rem", iconSize: "1.25rem" },
    lg: { padding: "1.25rem", fontSize: "1.125rem", iconSize: "1.5rem" }
  }
};
var w = Object.defineProperty, F = Object.getOwnPropertyDescriptor, s = (e, r, d, n) => {
  for (var o = n > 1 ? void 0 : n ? F(r, d) : r, i = e.length - 1, t; i >= 0; i--)
    (t = e[i]) && (o = (n ? t(r, d, o) : t(o)) || o);
  return n && o && w(r, d, o), o;
};
const S = /* @__PURE__ */ new Set([
  "white",
  "black",
  "coal",
  "success",
  "error",
  "info",
  "warning"
]);
let l = class extends m {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.title = "", this.description = "", this.closable = !1, this.alertStyle = "singleText", this.showCtas = !1, this.cancelText = "Cancel", this.proceedText = "Proceed", this._alertConfig = {}, this._legacyConfig = g;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = x(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = C(this);
    this._alertConfig = e?.components?.alerts || {}, this._legacyConfig = e?.components?.alert || g;
  }
  // ── Rendering ──────────────────────────────────────────────
  render() {
    return S.has(this.variant) ? this._renderTarmac() : this._renderLegacy();
  }
  _renderTarmac() {
    const e = this.size === "sm" ? "sm" : "lg", r = {
      alertConfig: this._alertConfig,
      variant: this.variant,
      size: e
    }, d = v(r), n = this.alertStyle === "singleText", o = this.closable;
    return c`
      <style>${d}</style>
      <div class="alert-container" role="alert">
        <div class="alert-inner">
          <div class="alert-row">
            <div class="alert-icon-wrap">
              <slot name="leading-icon"></slot>
            </div>
            <div class="alert-text-col">
              ${n ? this.title || this.description ? c`<div class="alert-single-text">${this.title || this.description}</div>` : p : c`
                    <div class="alert-text-block">
                      ${this.title ? c`<div class="alert-title">${this.title}</div>` : p}
                      ${this.description ? c`<div class="alert-description">${this.description}</div>` : p}
                    </div>
                  `}
              <slot></slot>
            </div>
            ${o ? c`
                  <button
                    type="button"
                    class="alert-close-btn"
                    aria-label="Close alert"
                    @click=${this._handleClose}
                  >
                    <slot name="trailing-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </slot>
                  </button>
                ` : c`
                  <div class="alert-icon-wrap">
                    <slot name="trailing-icon"></slot>
                  </div>
                `}
          </div>
          ${this.showCtas ? c`
                <div class="alert-ctas">
                  <slot name="cta-actions">
                    <tarmac-button
                      button-style="tertiary"
                      variant="black"
                      size=${e === "sm" ? "sm" : "md"}
                      text=${this.cancelText}
                      @tarmac-click=${this._handleCancel}
                    ></tarmac-button>
                    <tarmac-button
                      button-style="primary"
                      variant="black"
                      size=${e === "sm" ? "sm" : "md"}
                      text=${this.proceedText}
                      @tarmac-click=${this._handleProceed}
                    ></tarmac-button>
                  </slot>
                </div>
              ` : p}
        </div>
      </div>
    `;
  }
  _renderLegacy() {
    const e = $(this._legacyConfig, this.variant, this.size, {
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      textColor: this.textColor,
      iconColor: this.iconColor
    });
    return c`
      <style>${e}</style>
      <div class="alert-container" role="alert">
        <span class="alert-icon-wrap">
          <slot name="icon"></slot>
        </span>
        <div class="alert-content">
          ${this.title ? c`<h5 class="alert-title">${this.title}</h5>` : p}
          ${this.description ? c`<div class="alert-description">${this.description}</div>` : p}
          <slot></slot>
        </div>
        ${this.closable ? c`
              <button type="button" class="alert-close-btn" aria-label="Close alert" @click=${this._handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ` : p}
      </div>
    `;
  }
  // ── Events ─────────────────────────────────────────────────
  _handleClose() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
  _handleCancel() {
    this.dispatchEvent(new CustomEvent("tarmac-cancel", { bubbles: !0, composed: !0 }));
  }
  _handleProceed() {
    this.dispatchEvent(new CustomEvent("tarmac-proceed", { bubbles: !0, composed: !0 }));
  }
};
s([
  a({ type: String })
], l.prototype, "variant", 2);
s([
  a({ type: String })
], l.prototype, "size", 2);
s([
  a({ type: String })
], l.prototype, "title", 2);
s([
  a({ type: String })
], l.prototype, "description", 2);
s([
  a({ type: Boolean })
], l.prototype, "closable", 2);
s([
  a({ type: String, attribute: "alert-style" })
], l.prototype, "alertStyle", 2);
s([
  a({ type: Boolean, attribute: "show-ctas" })
], l.prototype, "showCtas", 2);
s([
  a({ type: String, attribute: "cancel-text" })
], l.prototype, "cancelText", 2);
s([
  a({ type: String, attribute: "proceed-text" })
], l.prototype, "proceedText", 2);
s([
  a({ type: String, attribute: "background-color" })
], l.prototype, "backgroundColor", 2);
s([
  a({ type: String, attribute: "border-color" })
], l.prototype, "borderColor", 2);
s([
  a({ type: String, attribute: "text-color" })
], l.prototype, "textColor", 2);
s([
  a({ type: String, attribute: "icon-color" })
], l.prototype, "iconColor", 2);
l = s([
  u("tarmac-alert")
], l);
export {
  l as TarmacAlert
};
