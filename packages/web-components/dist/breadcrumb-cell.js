import { i as y, c as f, n as a, t as x } from "./index-8C405PPW.js";
import { s as v, g as C } from "./theme-context-BRj4LHEr.js";
var _ = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, l = (t, o, n, r) => {
  for (var e = r > 1 ? void 0 : r ? $(o, n) : o, c = t.length - 1, i; c >= 0; c--)
    (i = t[c]) && (e = (r ? i(o, n, e) : i(e)) || e);
  return r && e && _(o, n, e), e;
};
const u = {
  base: { fontFamily: "Noto Sans, sans-serif", gap: "4px" },
  variants: {
    black: { color: "#2b2b2b" },
    blue: { color: "#2396fb" },
    dlvRed: { color: "#ed1b36" }
  },
  sizes: {
    lg: { fontSize: "14px", lineHeight: "20px" },
    sm: { fontSize: "12px", lineHeight: "16px" }
  },
  states: {
    disabled: { color: "#cdcbcb" },
    ghost: { backgroundColor: "#dedede", textColor: "transparent" },
    current: { fontWeight: "600" }
  }
};
let s = class extends y {
  constructor() {
    super(...arguments), this.label = "", this.cellStyle = "black", this.size = "lg", this.isDisabled = !1, this.isGhost = !1, this.isCurrent = !1, this.href = "", this._cfg = u;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = v(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = C(this);
    this._cfg = t?.components?.breadcrumb_cell_tarmac || u;
  }
  render() {
    const t = this._cfg, o = t.sizes?.[this.size] || {}, n = o.fontSize || "14px", r = o.lineHeight || "20px", e = t.base?.fontFamily || "Noto Sans, sans-serif", c = t.base?.gap || "4px";
    let i, h, p, g, d = "";
    if (this.isGhost) {
      const b = t.states?.ghost || {};
      i = b.textColor || "transparent", g = b.backgroundColor || "#dedede", h = "default", p = "400", d = `background-color:${g}; border-radius:4px; padding:2px 4px;`;
    } else this.isDisabled ? (i = (t.states?.disabled || {}).color || "#cdcbcb", h = "default", p = "400", d = "pointer-events:none;") : (i = (t.variants?.[this.cellStyle] || {}).color || "#2b2b2b", h = "pointer", p = this.isCurrent ? t.states?.current?.fontWeight || "600" : "400");
    const m = this.href && !this.isDisabled && !this.isGhost ? "a" : "span";
    return f`
      <style>
        :host { display: inline-flex; align-items: center; }
        .cell {
          display: inline-flex;
          align-items: center;
          gap: ${c};
          font-family: ${e};
          font-size: ${n};
          line-height: ${r};
          color: ${i};
          cursor: ${h};
          font-weight: ${p};
          text-decoration: none;
          ${d}
        }
        .cell:hover { text-decoration: ${this.isDisabled || this.isGhost ? "none" : "underline"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${n}; height: ${n}; }
      </style>
      ${m === "a" ? f`<a class="cell" href=${this.href} @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </a>` : f`<span class="cell" @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </span>`}
    `;
  }
  _handleClick(t) {
    if (this.isDisabled || this.isGhost) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: t, label: this.label, href: this.href }
    }));
  }
};
l([
  a({ type: String })
], s.prototype, "label", 2);
l([
  a({ type: String, attribute: "cell-style" })
], s.prototype, "cellStyle", 2);
l([
  a({ type: String })
], s.prototype, "size", 2);
l([
  a({ type: Boolean, attribute: "is-disabled" })
], s.prototype, "isDisabled", 2);
l([
  a({ type: Boolean, attribute: "is-ghost" })
], s.prototype, "isGhost", 2);
l([
  a({ type: Boolean, attribute: "is-current" })
], s.prototype, "isCurrent", 2);
l([
  a({ type: String })
], s.prototype, "href", 2);
s = l([
  x("tarmac-breadcrumb-cell")
], s);
export {
  s as TarmacBreadcrumbCell
};
