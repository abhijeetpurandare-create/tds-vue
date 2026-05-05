import { i as w, A as a, c as l, n as s, t as z } from "./index-8C405PPW.js";
import { s as B, g as E } from "./theme-context-BRj4LHEr.js";
var D = Object.defineProperty, F = Object.getOwnPropertyDescriptor, o = (t, i, d, p) => {
  for (var r = p > 1 ? void 0 : p ? F(i, d) : i, c = t.length - 1, u; c >= 0; c--)
    (u = t[c]) && (r = (p ? u(i, d, r) : u(r)) || r);
  return p && r && D(i, d, r), r;
};
const $ = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", transition: "all 0.15s ease-in-out" },
  types: {
    regular: { borderColor: "#e0e0e0", focusBorderColor: "#2b2b2b" },
    success: { borderColor: "#2e7d32", focusBorderColor: "#2e7d32" },
    error: { borderColor: "#c62828", focusBorderColor: "#c62828" },
    infoBlue: { borderColor: "#1565c0", focusBorderColor: "#1565c0" }
  },
  sizes: {
    lg: { height: "48px", fontSize: "16px", padding: "0 12px" },
    md: { height: "40px", fontSize: "14px", padding: "0 12px" },
    sm: { height: "32px", fontSize: "14px", padding: "0 8px" }
  },
  states: {
    disabled: { borderColor: "#ededed", color: "#cdcbcb", backgroundColor: "#fff" },
    ghost: { backgroundColor: "#ededed", borderColor: "transparent" }
  }
};
let e = class extends w {
  constructor() {
    super(...arguments), this.inputStyle = "tarmac-01", this.inputType = "regular", this.inputSize = "md", this.styleVariant = "standard", this.isDisabled = !1, this.isGhost = !1, this.label = "", this.isMandatory = !1, this.placeholder = "", this.value = "", this.helperTextTop = "", this.helperTextBottom = "", this.subtext = "", this.statusText = "", this._cfg = $;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = B(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = E(this);
    this._cfg = t?.components?.input_tarmac || $;
  }
  render() {
    const t = this._cfg, i = t.types?.[this.inputType] || t.types?.regular || {}, d = t.sizes?.[this.inputSize] || t.sizes?.md || {}, p = t.base || {}, r = t.states?.disabled || {}, c = t.states?.ghost || {}, u = p.fontFamily || "Noto Sans, sans-serif", n = p.radius || "4px", C = p.transition || "all 0.15s ease-in-out", x = d.height || "40px", y = d.fontSize || "14px", T = d.padding || "0 12px";
    let h, b, g, f;
    this.isDisabled ? (h = r.borderColor || "#ededed", b = r.backgroundColor || "#fff", g = r.color || "#cdcbcb", f = "not-allowed") : this.isGhost ? (h = c.borderColor || "transparent", b = c.backgroundColor || "#ededed", g = "#2b2b2b", f = "text") : (h = i.borderColor || "#e0e0e0", b = "#fff", g = "#2b2b2b", f = "text");
    const _ = i.focusBorderColor || "#2b2b2b", S = this.inputType === "error" ? "#c62828" : this.inputType === "success" ? "#2e7d32" : this.inputType === "infoBlue" ? "#1565c0" : "#6b6b6b", m = this.styleVariant === "addonLeft", v = this.styleVariant === "addonRight";
    return l`
      <style>
        :host { display: block; font-family: ${u}; }
        .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label-row { display: flex; align-items: center; gap: 2px; font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .mandatory { color: #c62828; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${S}; }
        .subtext { font-size: 12px; line-height: 16px; color: #8c8c8c; }
        .input-row { display: flex; align-items: center; }
        .addon { display: flex; align-items: center; justify-content: center; height: ${x}; padding: 0 12px; background: #f5f5f5; border: 1px solid ${h}; font-size: ${y}; color: #6b6b6b; white-space: nowrap; }
        .addon-left { border-right: none; border-radius: ${n} 0 0 ${n}; }
        .addon-right { border-left: none; border-radius: 0 ${n} ${n} 0; }
        .input-container { display: flex; align-items: center; flex: 1; height: ${x}; border: 1px solid ${h}; border-radius: ${m ? `0 ${n} ${n} 0` : v ? `${n} 0 0 ${n}` : n}; background-color: ${b}; transition: ${C}; padding: ${T}; gap: 8px; box-sizing: border-box; }
        .input-container:focus-within { border-color: ${this.isDisabled ? h : _}; }
        input { flex: 1; border: none; outline: none; background: transparent; font-family: ${u}; font-size: ${y}; color: ${g}; cursor: ${f}; min-width: 0; }
        input::placeholder { color: #b3b1b1; }
        input:disabled { cursor: not-allowed; }
        .icon-slot { display: flex; align-items: center; color: #6b6b6b; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
      </style>
      <div class="input-wrapper">
        ${this.label ? l`<div class="label-row"><span>${this.label}</span>${this.isMandatory ? l`<span class="mandatory">*</span>` : a}</div>` : a}
        ${this.helperTextTop ? l`<div class="helper-text">${this.helperTextTop}</div>` : a}
        <div class="input-row">
          ${m ? l`<div class="addon addon-left"><slot name="addon"></slot></div>` : a}
          <div class="input-container">
            <span class="icon-slot"><slot name="leading-icon"></slot></span>
            <input
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder || a}
              ?disabled=${this.isDisabled}
              @input=${this._onInput}
              @change=${this._onChange}
              @focus=${this._onFocus}
              @blur=${this._onBlur}
            />
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
          </div>
          ${v ? l`<div class="addon addon-right"><slot name="addon"></slot></div>` : a}
        </div>
        ${this.statusText ? l`<div class="status-text">${this.statusText}</div>` : a}
        ${this.helperTextBottom ? l`<div class="helper-text">${this.helperTextBottom}</div>` : a}
        ${this.subtext ? l`<div class="subtext">${this.subtext}</div>` : a}
      </div>
    `;
  }
  _onInput(t) {
    const i = t.target;
    this.value = i.value, this.dispatchEvent(new CustomEvent("tarmac-input", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onChange(t) {
    const i = t.target;
    this.value = i.value, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onFocus() {
    this.dispatchEvent(new CustomEvent("tarmac-focus", { bubbles: !0, composed: !0 }));
  }
  _onBlur() {
    this.dispatchEvent(new CustomEvent("tarmac-blur", { bubbles: !0, composed: !0 }));
  }
};
o([
  s({ type: String, attribute: "input-style" })
], e.prototype, "inputStyle", 2);
o([
  s({ type: String, attribute: "input-type" })
], e.prototype, "inputType", 2);
o([
  s({ type: String, attribute: "input-size" })
], e.prototype, "inputSize", 2);
o([
  s({ type: String, attribute: "style-variant" })
], e.prototype, "styleVariant", 2);
o([
  s({ type: Boolean, attribute: "is-disabled" })
], e.prototype, "isDisabled", 2);
o([
  s({ type: Boolean, attribute: "is-ghost" })
], e.prototype, "isGhost", 2);
o([
  s({ type: String })
], e.prototype, "label", 2);
o([
  s({ type: Boolean, attribute: "is-mandatory" })
], e.prototype, "isMandatory", 2);
o([
  s({ type: String })
], e.prototype, "placeholder", 2);
o([
  s({ type: String })
], e.prototype, "value", 2);
o([
  s({ type: String, attribute: "helper-text-top" })
], e.prototype, "helperTextTop", 2);
o([
  s({ type: String, attribute: "helper-text-bottom" })
], e.prototype, "helperTextBottom", 2);
o([
  s({ type: String })
], e.prototype, "subtext", 2);
o([
  s({ type: String, attribute: "status-text" })
], e.prototype, "statusText", 2);
e = o([
  z("tarmac-input")
], e);
export {
  e as TarmacInput
};
