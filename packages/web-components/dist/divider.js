import { i as g, c as b, n as p, t as u } from "./index-8C405PPW.js";
import { s as v, g as m } from "./theme-context-BRj4LHEr.js";
var x = Object.defineProperty, y = Object.getOwnPropertyDescriptor, c = (r, a, s, t) => {
  for (var e = t > 1 ? void 0 : t ? y(a, s) : a, i = r.length - 1, o; i >= 0; i--)
    (o = r[i]) && (e = (t ? o(a, s, e) : o(e)) || e);
  return t && e && x(a, s, e), e;
};
const d = {
  base: { color: "#cccccc", dashPattern: "6 6" },
  sizes: { "0.5": { strokeWeight: "0.5px" }, 1: { strokeWeight: "1px" }, "1.5": { strokeWeight: "1.5px" } }
};
let n = class extends g {
  constructor() {
    super(...arguments), this.dividerType = "line", this.size = "1", this.orientation = "horizontal", this._cfg = d;
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
    const r = m(this);
    this._cfg = r?.components?.divider || d;
  }
  render() {
    const r = this._cfg, s = (r.sizes?.[this.size] || {}).strokeWeight || `${this.size}px`, t = this.color || r.base?.color || "#b3b1b1", e = this.dividerType === "dash", i = this.orientation === "vertical", o = e ? i ? `repeating-linear-gradient(to bottom, ${t} 0px, ${t} 6px, transparent 6px, transparent 12px)` : `repeating-linear-gradient(to right, ${t} 0px, ${t} 6px, transparent 6px, transparent 12px)` : "none", h = e ? "transparent" : t, l = i ? `:host{display:inline-block;} hr{border:none;width:${s};height:100%;margin:0;padding:0;flex-shrink:0;background-color:${h};background-image:${o};}` : `:host{display:block;width:100%;} hr{border:none;height:${s};width:100%;margin:0;padding:0;flex-shrink:0;background-color:${h};background-image:${o};}`;
    return b`
      <style>${l}</style>
      <hr role="separator" aria-orientation=${this.orientation} />
    `;
  }
};
c([
  p({ type: String, attribute: "divider-type" })
], n.prototype, "dividerType", 2);
c([
  p({ type: String })
], n.prototype, "size", 2);
c([
  p({ type: String })
], n.prototype, "color", 2);
c([
  p({ type: String })
], n.prototype, "orientation", 2);
n = c([
  u("tarmac-divider")
], n);
export {
  n as TarmacDivider
};
