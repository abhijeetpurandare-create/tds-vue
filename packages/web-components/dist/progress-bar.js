import { i as u, A as v, c as h, n as l, t as x } from "./index-8C405PPW.js";
import { s as m, g as C } from "./theme-context-BRj4LHEr.js";
var y = Object.defineProperty, _ = Object.getOwnPropertyDescriptor, o = (t, s, n, a) => {
  for (var e = a > 1 ? void 0 : a ? _(s, n) : s, c = t.length - 1, i; c >= 0; c--)
    (i = t[c]) && (e = (a ? i(s, n, e) : i(e)) || e);
  return a && e && y(s, n, e), e;
};
const b = {
  base: { trackColor: "#e6e6e6", borderRadius: "999px", transition: "width 0.3s", textFontSize: "12px", textColor: "#2b2b2b" },
  variants: {
    primary: { fillColor: "#2396fb" },
    success: { fillColor: "#1ba86e" },
    warning: { fillColor: "#f5c828" },
    error: { fillColor: "#dc143c" },
    info: { fillColor: "#2396fb" },
    default: { fillColor: "#2b2b2b" }
  },
  sizes: {
    sm: { height: "4px" },
    md: { height: "8px" },
    lg: { height: "12px" }
  }
};
let r = class extends u {
  constructor() {
    super(...arguments), this.value = 0, this.size = "md", this.variant = "primary", this.showPercentage = !1, this._cfg = b;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = m(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = C(this);
    this._cfg = t?.components?.progress_bar_tarmac || b;
  }
  render() {
    const t = this._cfg, s = t.sizes?.[this.size] || {}, n = t.variants?.[this.variant] || {}, a = s.height || "8px", e = n.fillColor || "#2396fb", c = this.trackColor || t.base?.trackColor || "#e6e6e6", i = t.base?.borderRadius || "999px", d = t.base?.transition || "width 0.3s", f = this.textColor || t.base?.textColor || "#2b2b2b", g = t.base?.textFontSize || "12px", p = Math.max(0, Math.min(100, this.value));
    return h`
      <style>
        :host { display: block; width: 100%; }
        .wrapper { display: flex; align-items: center; gap: 8px; }
        .track { flex: 1; height: ${a}; background-color: ${c}; border-radius: ${i}; overflow: hidden; }
        .fill { height: 100%; border-radius: ${i}; background-color: ${e}; transition: ${d}; }
        .percentage { font-size: ${g}; color: ${f}; flex-shrink: 0; font-family: Noto Sans, sans-serif; }
      </style>
      <div class="wrapper" role="progressbar" aria-valuenow=${p} aria-valuemin="0" aria-valuemax="100">
        <div class="track">
          <div class="fill" style="width:${p}%"></div>
        </div>
        ${this.showPercentage ? h`<span class="percentage">${p}%</span>` : v}
      </div>
    `;
  }
};
o([
  l({ type: Number })
], r.prototype, "value", 2);
o([
  l({ type: String })
], r.prototype, "size", 2);
o([
  l({ type: String })
], r.prototype, "variant", 2);
o([
  l({ type: Boolean, attribute: "show-percentage" })
], r.prototype, "showPercentage", 2);
o([
  l({ type: String, attribute: "track-color" })
], r.prototype, "trackColor", 2);
o([
  l({ type: String, attribute: "text-color" })
], r.prototype, "textColor", 2);
r = o([
  x("tarmac-progress-bar")
], r);
export {
  r as TarmacProgressBar
};
