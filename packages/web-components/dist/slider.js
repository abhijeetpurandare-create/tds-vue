import { i as v, c as g, n as l, t as f } from "./index-8C405PPW.js";
import { s as _, g as k } from "./theme-context-BRj4LHEr.js";
var C = Object.defineProperty, y = Object.getOwnPropertyDescriptor, r = (e, t, o, s) => {
  for (var i = s > 1 ? void 0 : s ? y(t, o) : t, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (i = (s ? c(t, o, i) : c(i)) || i);
  return s && i && C(t, o, i), i;
};
const b = {
  base: { trackColor: "#e6e6e6", borderRadius: "999px", transition: "all 0.1s ease" },
  variants: {
    black: { fillColor: "#000000", knobColor: "#000000" },
    coal: { fillColor: "#64739b", knobColor: "#64739b" },
    dlv_red: { fillColor: "#ed1b36", knobColor: "#ed1b36" }
  },
  sizes: {
    sm: { trackHeight: "4px", knobSize: "16px" },
    lg: { trackHeight: "8px", knobSize: "24px" }
  },
  states: { disabled: { fillColor: "#cdcbcb", knobColor: "#e6e6e6" } }
};
let a = class extends v {
  constructor() {
    super(...arguments), this.variant = "black", this.size = "lg", this.sliderType = "single", this.value = 0, this.min = 0, this.max = 100, this.step = 1, this.isDisabled = !1, this._cfg = b, this._dragging = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = _(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = k(this);
    this._cfg = e?.components?.slider_tarmac || b;
  }
  render() {
    const e = this._cfg, t = e.sizes?.[this.size] || {}, o = t.trackHeight || "4px", s = t.knobSize || "16px", i = e.base?.trackColor || "#e6e6e6", n = e.base?.borderRadius || "999px";
    let c, h, u;
    if (this.isDisabled) {
      const d = e.states?.disabled || {};
      c = d.fillColor || "#cdcbcb", h = d.knobColor || "#e6e6e6", u = "default";
    } else {
      const d = e.variants?.[this.variant] || {};
      c = d.fillColor || "#000000", h = d.knobColor || "#000000", u = "pointer";
    }
    const m = (this.value - this.min) / (this.max - this.min) * 100, p = Math.max(0, Math.min(100, m));
    return g`
      <style>
        :host { display: block; width: 100%; }
        .slider-container { position: relative; width: 100%; padding: calc(${s} / 2) 0; cursor: ${u}; }
        .track { position: relative; width: 100%; height: ${o}; background-color: ${i}; border-radius: ${n}; }
        .fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: ${n}; background-color: ${c}; }
        .knob {
          position: absolute;
          top: 50%;
          width: ${s};
          height: ${s};
          border-radius: 50%;
          background-color: ${h};
          transform: translate(-50%, -50%);
          cursor: ${u};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      </style>
      <div
        class="slider-container"
        role="slider"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        @mousedown=${this._handleMouseDown}
        @touchstart=${this._handleTouchStart}
      >
        <div class="track">
          <div class="fill" style="width:${p}%"></div>
          <div class="knob" style="left:${p}%"></div>
        </div>
      </div>
    `;
  }
  _getValueFromEvent(e) {
    const t = this.shadowRoot?.querySelector(".track");
    if (!t) return this.value;
    const o = t.getBoundingClientRect(), s = Math.max(0, Math.min(1, (e - o.left) / o.width)), i = this.min + s * (this.max - this.min), n = Math.round(i / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, n));
  }
  _handleMouseDown(e) {
    if (this.isDisabled) return;
    e.preventDefault(), this._dragging = !0, this._updateValue(e.clientX);
    const t = (s) => {
      this._updateValue(s.clientX);
    }, o = (s) => {
      this._dragging = !1, document.removeEventListener("mousemove", t), document.removeEventListener("mouseup", o), this.dispatchEvent(new CustomEvent("tarmac-change-end", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    };
    document.addEventListener("mousemove", t), document.addEventListener("mouseup", o);
  }
  _handleTouchStart(e) {
    if (this.isDisabled) return;
    e.preventDefault(), this._dragging = !0, this._updateValue(e.touches[0].clientX);
    const t = (s) => {
      this._updateValue(s.touches[0].clientX);
    }, o = () => {
      this._dragging = !1, document.removeEventListener("touchmove", t), document.removeEventListener("touchend", o), this.dispatchEvent(new CustomEvent("tarmac-change-end", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    };
    document.addEventListener("touchmove", t), document.addEventListener("touchend", o);
  }
  _updateValue(e) {
    const t = this._getValueFromEvent(e);
    t !== this.value && (this.value = t, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })));
  }
};
r([
  l({ type: String })
], a.prototype, "variant", 2);
r([
  l({ type: String })
], a.prototype, "size", 2);
r([
  l({ type: String, attribute: "slider-type" })
], a.prototype, "sliderType", 2);
r([
  l({ type: Number })
], a.prototype, "value", 2);
r([
  l({ type: Number })
], a.prototype, "min", 2);
r([
  l({ type: Number })
], a.prototype, "max", 2);
r([
  l({ type: Number })
], a.prototype, "step", 2);
r([
  l({ type: Boolean, attribute: "is-disabled" })
], a.prototype, "isDisabled", 2);
a = r([
  f("tarmac-slider")
], a);
export {
  a as TarmacSlider
};
