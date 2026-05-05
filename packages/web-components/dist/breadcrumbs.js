import { i as v, c as u, n as a, t as p } from "./index-8C405PPW.js";
import { s as f, g } from "./theme-context-BRj4LHEr.js";
var m = Object.defineProperty, y = Object.getOwnPropertyDescriptor, l = (e, t, s, n) => {
  for (var i = n > 1 ? void 0 : n ? y(t, s) : t, r = e.length - 1, d; r >= 0; r--)
    (d = e[r]) && (i = (n ? d(t, s, i) : d(i)) || i);
  return n && i && m(t, s, i), i;
};
const c = {
  base: { dividerColor: "#2B2B2B", dividerStrokeWidth: "0.5", dividerWidth: "8px" }
};
let o = class extends v {
  constructor() {
    super(...arguments), this.dividerStyle = "slash", this.size = "lg", this.showDivider = !0, this._cfg = c;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = f(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = g(this);
    this._cfg = e?.components?.breadcrumbs_tarmac || c;
  }
  render() {
    const e = this._cfg;
    e.base?.dividerColor, e.base?.dividerStrokeWidth;
    const t = e.base?.dividerWidth || "8px";
    return u`
      <style>
        :host { display: inline-flex; }
        nav { display: flex; align-items: center; gap: 0; }
        .divider { display: inline-flex; align-items: center; justify-content: center; width: ${t}; margin: 0 4px; flex-shrink: 0; }
        .divider svg { width: ${t}; height: auto; }
        ::slotted(*) { display: inline-flex; }
      </style>
      <nav aria-label="breadcrumb">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }
  _handleSlotChange() {
    const e = this.shadowRoot?.querySelector("slot");
    if (!e) return;
    const t = e.assignedElements({ flatten: !0 }), s = this.shadowRoot?.querySelector("nav");
    if (s && (s.querySelectorAll(".divider").forEach((n) => n.remove()), !(!this.showDivider || t.length <= 1))) {
      for (let n = 0; n < t.length - 1; n++) {
        const i = document.createElement("span");
        i.className = "divider", i.innerHTML = this._getDividerSVG(), t[n].after(i);
      }
      this.requestUpdate();
    }
  }
  _getDividerSVG() {
    const e = this._cfg, t = e.base?.dividerColor || "#2B2B2B", s = e.base?.dividerStrokeWidth || "0.5";
    return this.dividerStyle === "chevron" ? `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l5 5-5 5" stroke="${t}" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L2 11" stroke="${t}" stroke-width="${s}" stroke-linecap="round"/></svg>`;
  }
  updated() {
    const e = this.shadowRoot?.querySelector("slot");
    if (!e) return;
    const t = this.shadowRoot?.querySelector("nav");
    if (!t || (t.querySelectorAll(".divider").forEach((i) => i.remove()), !this.showDivider)) return;
    const s = e.assignedElements({ flatten: !0 });
    if (s.length <= 1) return;
    const n = document.createElement("span");
    n.style.display = "contents";
    for (let i = s.length - 1; i > 0; i--) {
      const r = document.createElement("span");
      r.className = "divider", r.setAttribute("aria-hidden", "true"), r.innerHTML = this._getDividerSVG();
      const h = this._cfg.base?.dividerWidth || "8px";
      r.style.display = "inline-flex", r.style.alignItems = "center", r.style.justifyContent = "center", r.style.width = h, r.style.margin = "0 4px", r.style.flexShrink = "0", this.insertBefore(r, s[i]);
    }
  }
};
l([
  a({ type: String, attribute: "divider-style" })
], o.prototype, "dividerStyle", 2);
l([
  a({ type: String })
], o.prototype, "size", 2);
l([
  a({ type: Boolean, attribute: "show-divider" })
], o.prototype, "showDivider", 2);
o = l([
  p("tarmac-breadcrumbs")
], o);
export {
  o as TarmacBreadcrumbs
};
