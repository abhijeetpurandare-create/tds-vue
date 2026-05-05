import { i as p, c as h, n as b, t as d } from "./index-8C405PPW.js";
import { s as u, g as f } from "./theme-context-BRj4LHEr.js";
var m = Object.defineProperty, g = Object.getOwnPropertyDescriptor, c = (r, e, o, s) => {
  for (var t = s > 1 ? void 0 : s ? g(e, o) : e, a = r.length - 1, n; a >= 0; a--)
    (n = r[a]) && (t = (s ? n(e, o, t) : n(t)) || t);
  return s && t && m(e, o, t), t;
};
const l = {
  base: { fontFamily: "Noto Sans, sans-serif", borderColor: "#e6e6e6" }
};
let i = class extends p {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.size = "lg", this._cfg = l, this._onTabClick = (r) => {
      const o = r.target.closest("tarmac-tab-cell");
      if (!o) return;
      const t = Array.from(this.querySelectorAll("tarmac-tab-cell")).indexOf(o);
      t >= 0 && this.dispatchEvent(new CustomEvent("tarmac-tab-change", { bubbles: !0, composed: !0, detail: { index: t } }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = u(this, () => {
      this._resolve(), this.requestUpdate();
    }), this.addEventListener("click", this._onTabClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this.removeEventListener("click", this._onTabClick);
  }
  _resolve() {
    const r = f(this);
    this._cfg = r?.components?.tab_group_tarmac || l;
  }
  render() {
    const e = this._cfg.base || {}, o = e.fontFamily || "Noto Sans, sans-serif", s = e.borderColor || "#e6e6e6", t = this.orientation === "horizontal";
    return h`
      <style>
        :host { display: block; font-family: ${o}; }
        .tab-group {
          display: flex;
          flex-direction: ${t ? "row" : "column"};
          ${t ? `border-bottom: 1px solid ${s};` : `border-right: 1px solid ${s};`}
          gap: 0;
        }
        ::slotted(*) { cursor: pointer; }
      </style>
      <div class="tab-group" role="tablist" aria-orientation=${this.orientation}>
        <slot></slot>
      </div>
    `;
  }
};
c([
  b({ type: String })
], i.prototype, "orientation", 2);
c([
  b({ type: String })
], i.prototype, "size", 2);
i = c([
  d("tarmac-tab-group")
], i);
export {
  i as TarmacTabGroup
};
