import { i as $, A as d, c as C, n as r, t as v } from "./index-8C405PPW.js";
import { s as z, g as _ } from "./theme-context-BRj4LHEr.js";
var F = Object.defineProperty, w = Object.getOwnPropertyDescriptor, a = (e, s, i, l) => {
  for (var t = l > 1 ? void 0 : l ? w(s, i) : s, n = e.length - 1, c; n >= 0; n--)
    (c = e[n]) && (t = (l ? c(s, i, t) : c(t)) || t);
  return l && t && F(s, i, t), t;
};
const m = {
  base: { fontFamily: "Noto Sans, sans-serif", transition: "all 0.15s ease-in-out" },
  variants: {
    standard: { checkedColor: "#000000", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    blue: { checkedColor: "#2396fb", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    green: { checkedColor: "#1ba86e", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    dlv_red: { checkedColor: "#ed1b36", borderColor: "#e6e6e6", dotColor: "#ffffff" }
  },
  sizes: {
    sm: { radioSize: "16px", dotSize: "6px", labelFontSize: "14px", labelLineHeight: "20px" },
    md: { radioSize: "20px", dotSize: "8px", labelFontSize: "14px", labelLineHeight: "20px" },
    lg: { radioSize: "24px", dotSize: "10px", labelFontSize: "14px", labelLineHeight: "20px" }
  },
  states: { disabled: { borderColor: "#ededed", checkedColor: "#e6e6e6", dotColor: "#cdcbcb", labelColor: "#cdcbcb" } }
};
let o = class extends $ {
  constructor() {
    super(...arguments), this.tarmacVariant = "standard", this.tarmacStyle = "box", this.size = "md", this.checked = !1, this.disabled = !1, this.value = "", this.name = "", this.subtext = "", this._cfg = m;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = z(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = _(this);
    this._cfg = e?.components?.radio_tarmac || m;
  }
  render() {
    const e = this._cfg, s = e.variants?.[this.tarmacVariant] || e.variants?.standard || {}, i = e.sizes?.[this.size] || e.sizes?.md || {}, l = e.base || {}, t = e.states?.disabled || {}, n = l.fontFamily || "Noto Sans, sans-serif", c = l.transition || "all 0.15s ease-in-out", x = i.radioSize || "20px", g = i.dotSize || "8px", y = i.labelFontSize || "14px", S = i.labelLineHeight || "20px";
    let h, b, p, f;
    this.disabled ? (h = t.borderColor || "#ededed", b = this.checked ? t.checkedColor || "#e6e6e6" : "#fff", p = t.dotColor || "#cdcbcb", f = t.labelColor || "#cdcbcb") : (h = this.checked ? s.checkedColor || "#000" : s.borderColor || "#e6e6e6", b = this.checked ? s.checkedColor || "#000" : "#fff", p = s.dotColor || "#ffffff", f = "#2b2b2b");
    const k = !!this.textContent?.trim() || this.querySelector("[slot]") !== null, u = !!this.subtext;
    return C`
      <style>
        :host { display: inline-block; font-family: ${n}; }
        .radio-wrapper { display: inline-flex; align-items: ${u ? "flex-start" : "center"}; gap: 8px; cursor: ${this.disabled ? "default" : "pointer"}; user-select: none; }
        .radio-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
        .radio-circle {
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          width: ${x}; height: ${x}; border-radius: 50%;
          border: 2px solid ${h}; background-color: ${b};
          transition: ${c}; box-sizing: border-box;
        }
        .radio-dot {
          width: ${g}; height: ${g}; border-radius: 50%;
          background-color: ${p};
          display: ${this.checked ? "block" : "none"};
        }
        .label-col { display: flex; flex-direction: column; }
        .label { font-size: ${y}; line-height: ${S}; font-weight: 500; color: ${f}; }
        .subtext { font-size: 12px; line-height: 16px; color: ${this.disabled ? "#cdcbcb" : "#8c8c8c"}; }
      </style>
      <label class="radio-wrapper" @click=${this._handleClick}>
        <input
          class="radio-input"
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || d}
          value=${this.value || d}
          @change=${this._handleChange}
        />
        <span class="radio-circle"><span class="radio-dot"></span></span>
        ${k || u ? C`
          <span class="label-col">
            <span class="label"><slot></slot></span>
            ${u ? C`<span class="subtext">${this.subtext}</span>` : d}
          </span>
        ` : d}
      </label>
    `;
  }
  _handleClick(e) {
    e.target.tagName;
  }
  _handleChange() {
    this.disabled || (this.checked = !0, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { checked: this.checked, value: this.value } })));
  }
};
a([
  r({ type: String, attribute: "tarmac-variant" })
], o.prototype, "tarmacVariant", 2);
a([
  r({ type: String, attribute: "tarmac-style" })
], o.prototype, "tarmacStyle", 2);
a([
  r({ type: String })
], o.prototype, "size", 2);
a([
  r({ type: Boolean })
], o.prototype, "checked", 2);
a([
  r({ type: Boolean })
], o.prototype, "disabled", 2);
a([
  r({ type: String })
], o.prototype, "value", 2);
a([
  r({ type: String })
], o.prototype, "name", 2);
a([
  r({ type: String })
], o.prototype, "subtext", 2);
o = a([
  v("tarmac-radio")
], o);
export {
  o as TarmacRadio
};
