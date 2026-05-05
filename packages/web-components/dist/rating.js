import { i as $, w as m, c as v, n as c, t as w } from "./index-8C405PPW.js";
import { s as x, g as C } from "./theme-context-BRj4LHEr.js";
var z = Object.defineProperty, O = Object.getOwnPropertyDescriptor, h = (e, a, s, l) => {
  for (var t = l > 1 ? void 0 : l ? O(a, s) : a, n = e.length - 1, i; n >= 0; n--)
    (i = e[n]) && (t = (l ? i(a, s, t) : i(t)) || t);
  return l && t && z(a, s, t), t;
};
const _ = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", y = {
  base: { filledColor: "#f5c828", emptyColor: "#e6e6e6", gap: "2px", starPath: _ },
  sizes: {
    lg: { starSize: "20px" },
    md: { starSize: "16px" },
    sm: { starSize: "14px" }
  }
};
let o = class extends $ {
  constructor() {
    super(...arguments), this.value = 0, this.maxStars = 5, this.size = "md", this.readOnly = !1, this.allowHalf = !1, this._cfg = y, this._hoverValue = -1;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = x(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = C(this);
    this._cfg = e?.components?.rating_tarmac || y;
  }
  render() {
    const e = this._cfg, s = (e.sizes?.[this.size] || {}).starSize || "16px", l = e.base?.filledColor || "#f5c828", t = e.base?.emptyColor || "#e6e6e6", n = e.base?.gap || "2px", i = e.base?.starPath || _, g = this.readOnly ? "default" : "pointer", p = this._hoverValue >= 0 ? this._hoverValue : this.value, u = [];
    for (let r = 1; r <= this.maxStars; r++) {
      const d = p >= r, b = !d && this.allowHalf && p >= r - 0.5, f = `half-clip-${r}`;
      u.push(v`
        <span
          class="star"
          style="width:${s};height:${s};cursor:${g};"
          @click=${() => this._handleClick(r)}
          @mouseenter=${() => this._handleHover(r)}
          @mouseleave=${this._handleLeave}
        >
          <svg viewBox="0 0 24 24" width=${s} height=${s} xmlns="http://www.w3.org/2000/svg">
            ${b ? m`
              <defs>
                <clipPath id=${f}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path d=${i} fill=${t} />
              <path d=${i} fill=${l} clip-path="url(#${f})" />
            ` : m`
              <path d=${i} fill=${d ? l : t} />
            `}
          </svg>
        </span>
      `);
    }
    return v`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${n}; }
        .star { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
      </style>
      ${u}
    `;
  }
  _handleClick(e) {
    if (this.readOnly) return;
    const a = this.allowHalf && this.value === e - 0.5 ? e : this.allowHalf ? e - 0.5 : e;
    this.value = a, this.dispatchEvent(new CustomEvent("tarmac-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  _handleHover(e) {
    this.readOnly || (this._hoverValue = e, this.requestUpdate());
  }
  _handleLeave() {
    this.readOnly || (this._hoverValue = -1, this.requestUpdate());
  }
};
h([
  c({ type: Number })
], o.prototype, "value", 2);
h([
  c({ type: Number, attribute: "max-stars" })
], o.prototype, "maxStars", 2);
h([
  c({ type: String })
], o.prototype, "size", 2);
h([
  c({ type: Boolean, attribute: "read-only" })
], o.prototype, "readOnly", 2);
h([
  c({ type: Boolean, attribute: "allow-half" })
], o.prototype, "allowHalf", 2);
o = h([
  w("tarmac-rating")
], o);
export {
  o as TarmacRating
};
