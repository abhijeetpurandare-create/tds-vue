import { i as b, c as f, n as a, t as g } from "./index-8C405PPW.js";
import { s as u, g as y } from "./theme-context-BRj4LHEr.js";
var m = Object.defineProperty, x = Object.getOwnPropertyDescriptor, s = (t, n, o, c) => {
  for (var e = c > 1 ? void 0 : c ? x(n, o) : n, l = t.length - 1, r; l >= 0; l--)
    (r = t[l]) && (e = (c ? r(n, o, e) : r(e)) || e);
  return c && e && m(n, o, e), e;
};
const d = {
  base: { fontFamily: "Noto Sans, sans-serif" },
  variants: {
    blue: { color: "#2396fb" },
    black: { color: "#2b2b2b" },
    white: { color: "#ffffff" }
  },
  sizes: {
    xl: { fontSize: "20px", lineHeight: "28px" },
    lg: { fontSize: "16px", lineHeight: "24px" },
    md: { fontSize: "14px", lineHeight: "20px" },
    sm: { fontSize: "12px", lineHeight: "16px" },
    xs: { fontSize: "10px", lineHeight: "14px" }
  },
  states: { disabled: { color: "#cdcbcb", cursor: "default" } }
};
let i = class extends b {
  constructor() {
    super(...arguments), this.linkStyle = "blue", this.size = "md", this.isDisabled = !1, this.text = "", this.href = "", this.target = "", this.rel = "", this._cfg = d;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = u(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = y(this);
    this._cfg = t?.components?.link_tarmac || d;
  }
  render() {
    const t = this._cfg, n = t.sizes?.[this.size] || {}, o = n.fontSize || "14px", c = n.lineHeight || "20px", e = t.base?.fontFamily || "Noto Sans, sans-serif";
    let l, r, p;
    if (this.isDisabled) {
      const h = t.states?.disabled || {};
      l = h.color || "#cdcbcb", r = h.cursor || "default", p = "none";
    } else
      l = (t.variants?.[this.linkStyle] || {}).color || "#2396fb", r = "pointer", p = "auto";
    return f`
      <style>
        :host { display: inline; }
        .link {
          font-family: ${e};
          font-size: ${o};
          line-height: ${c};
          color: ${l};
          cursor: ${r};
          pointer-events: ${p};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .link:hover { text-decoration: underline; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
      </style>
      <a
        class="link"
        href=${this.href || "javascript:void(0)"}
        target=${this.target || ""}
        rel=${this.rel || ""}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || f`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </a>
    `;
  }
  _handleClick(t) {
    if (this.isDisabled) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: t }
    }));
  }
};
s([
  a({ type: String, attribute: "link-style" })
], i.prototype, "linkStyle", 2);
s([
  a({ type: String })
], i.prototype, "size", 2);
s([
  a({ type: Boolean, attribute: "is-disabled" })
], i.prototype, "isDisabled", 2);
s([
  a({ type: String })
], i.prototype, "text", 2);
s([
  a({ type: String })
], i.prototype, "href", 2);
s([
  a({ type: String })
], i.prototype, "target", 2);
s([
  a({ type: String })
], i.prototype, "rel", 2);
i = s([
  g("tarmac-link")
], i);
export {
  i as TarmacLink
};
