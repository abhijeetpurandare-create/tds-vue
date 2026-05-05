import { d as _, i as x, c as h, n as g, t as w } from "./index-8C405PPW.js";
import { s as K, g as $ } from "./theme-context-BRj4LHEr.js";
var C = Object.defineProperty, P = Object.getOwnPropertyDescriptor, c = (t, e, o, s) => {
  for (var n = s > 1 ? void 0 : s ? P(e, o) : e, i = t.length - 1, a; i >= 0; i--)
    (a = t[i]) && (n = (s ? a(e, o, n) : a(n)) || n);
  return s && n && C(e, o, n), n;
};
const f = {
  base: { fontFamily: "Noto Sans, sans-serif", borderColor: "#e6e6e6", radius: "4px", transition: "all 0.2s ease-in-out", headerPadding: "12px", contentPadding: "12px", headerFontSize: "14px", headerLineHeight: "20px" }
}, S = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
let r = class extends x {
  constructor() {
    super(...arguments), this.accordion = !1, this.activeKey = "", this._openKeys = /* @__PURE__ */ new Set(), this._cfg = f;
  }
  connectedCallback() {
    super.connectedCallback(), this.activeKey && (this._openKeys = new Set(this.activeKey.split(",").map((t) => t.trim()))), this._resolve(), this._unsub = K(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = $(this);
    this._cfg = t?.components?.collapse_tarmac || f;
  }
  updated(t) {
    t.has("activeKey") && this.activeKey && (this._openKeys = new Set(this.activeKey.split(",").map((e) => e.trim())));
  }
  render() {
    const e = this._cfg.base || {}, o = e.fontFamily || "Noto Sans, sans-serif", s = e.borderColor || "#e6e6e6", n = e.radius || "4px", i = e.transition || "all 0.2s ease-in-out", a = e.headerPadding || "12px", v = e.contentPadding || "12px", b = e.headerFontSize || "14px", u = e.headerLineHeight || "20px", y = Array.from(this.children).filter((l) => l.hasAttribute("data-key"));
    return h`
      <style>
        :host { display: block; font-family: ${o}; }
        .collapse { border: 1px solid ${s}; border-radius: ${n}; overflow: hidden; }
        .panel { border-bottom: 1px solid ${s}; }
        .panel:last-child { border-bottom: none; }
        .panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: ${a}; cursor: pointer; user-select: none;
          font-size: ${b}; line-height: ${u};
          font-weight: 500; color: #2b2b2b; background: #fff;
        }
        .panel-header:hover { background: #fafafa; }
        .chevron { display: flex; align-items: center; transition: ${i}; color: #6b6b6b; }
        .chevron.open { transform: rotate(180deg); }
        .panel-content {
          overflow: hidden; max-height: 0; transition: max-height 0.2s ease-in-out;
        }
        .panel-content.open { max-height: 1000px; }
        .panel-content-inner { padding: ${v}; border-top: 1px solid ${s}; }
      </style>
      <div class="collapse">
        ${y.map((l) => {
      const d = l.getAttribute("data-key") || "", m = l.getAttribute("data-title") || d, p = this._openKeys.has(d);
      return h`
            <div class="panel">
              <div class="panel-header" @click=${() => this._togglePanel(d)}>
                <span>${m}</span>
                <span class="chevron ${p ? "open" : ""}" .innerHTML=${S}></span>
              </div>
              <div class="panel-content ${p ? "open" : ""}">
                <div class="panel-content-inner"></div>
              </div>
            </div>
          `;
    })}
        <div style="display:none;"><slot></slot></div>
      </div>
    `;
  }
  _togglePanel(t) {
    const e = new Set(this._openKeys);
    e.has(t) ? e.delete(t) : (this.accordion && e.clear(), e.add(t)), this._openKeys = e, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { activeKey: Array.from(e).join(",") } }));
  }
};
c([
  g({ type: Boolean })
], r.prototype, "accordion", 2);
c([
  g({ type: String, attribute: "active-key" })
], r.prototype, "activeKey", 2);
c([
  _()
], r.prototype, "_openKeys", 2);
r = c([
  w("tarmac-collapse")
], r);
export {
  r as TarmacCollapse
};
