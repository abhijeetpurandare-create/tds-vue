import { d as $, i as z, A as f, c, n, t as w } from "./index-8C405PPW.js";
import { s as T, g as E } from "./theme-context-BRj4LHEr.js";
var B = Object.defineProperty, A = Object.getOwnPropertyDescriptor, l = (e, t, s, o) => {
  for (var i = o > 1 ? void 0 : o ? A(t, s) : t, a = e.length - 1, p; a >= 0; a--)
    (p = e[a]) && (i = (o ? p(t, s, i) : p(i)) || i);
  return o && i && B(t, s, i), i;
};
const v = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", transition: "all 0.15s ease-in-out" },
  variants: {
    default: { borderColor: "#e0e0e0", focusBorderColor: "#2b2b2b" },
    success: { borderColor: "#2e7d32", focusBorderColor: "#2e7d32" },
    error: { borderColor: "#c62828", focusBorderColor: "#c62828" },
    info: { borderColor: "#1565c0", focusBorderColor: "#1565c0" }
  },
  sizes: {
    sm: { boxSize: "32px", fontSize: "14px" },
    md: { boxSize: "40px", fontSize: "16px" },
    lg: { boxSize: "48px", fontSize: "18px" }
  },
  states: { disabled: { borderColor: "#ededed", color: "#cdcbcb", backgroundColor: "#f5f5f5" } }
};
let r = class extends z {
  constructor() {
    super(...arguments), this.numDigits = 6, this.otpStyle = "tarmac-01", this.otpSize = "md", this.otpVariant = "default", this.isDisabled = !1, this.placeholder = "", this.inputType = "text", this.label = "", this.helperText = "", this.value = "", this._digits = [], this._cfg = v;
  }
  connectedCallback() {
    super.connectedCallback(), this._digits = Array.from({ length: this.numDigits }, (e, t) => this.value[t] || ""), this._resolve(), this._unsub = T(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = E(this);
    this._cfg = e?.components?.otp_tarmac || v;
  }
  updated(e) {
    (e.has("numDigits") || e.has("value")) && (this._digits = Array.from({ length: this.numDigits }, (t, s) => this.value[s] || ""));
  }
  render() {
    const e = this._cfg, t = e.variants?.[this.otpVariant] || e.variants?.default || {}, s = e.sizes?.[this.otpSize] || e.sizes?.md || {}, o = e.base || {}, i = e.states?.disabled || {}, a = o.fontFamily || "Noto Sans, sans-serif", p = o.radius || "4px", y = o.transition || "all 0.15s ease-in-out", m = s.boxSize || "40px", _ = s.fontSize || "16px";
    let h, d, b;
    this.isDisabled ? (h = i.borderColor || "#ededed", d = i.backgroundColor || "#f5f5f5", b = i.color || "#cdcbcb") : (h = t.borderColor || "#e0e0e0", d = "#fff", b = "#2b2b2b");
    const x = t.focusBorderColor || "#2b2b2b", C = this.otpVariant === "error" ? "#c62828" : this.otpVariant === "success" ? "#2e7d32" : "#6b6b6b", S = this.inputType === "number" ? "tel" : this.inputType;
    return c`
      <style>
        :host { display: block; font-family: ${a}; }
        .otp-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: ${C}; }
        .otp-row { display: flex; gap: 8px; }
        .otp-box {
          width: ${m}; height: ${m}; border: 1px solid ${h}; border-radius: ${p};
          background-color: ${d}; color: ${b}; font-family: ${a}; font-size: ${_};
          text-align: center; outline: none; transition: ${y}; box-sizing: border-box;
        }
        .otp-box:focus { border-color: ${this.isDisabled ? h : x}; }
        .otp-box:disabled { cursor: not-allowed; }
      </style>
      <div class="otp-wrapper">
        ${this.label ? c`<div class="label">${this.label}</div>` : f}
        <div class="otp-row">
          ${this._digits.map((D, g) => c`
            <input
              class="otp-box"
              type=${S}
              maxlength="1"
              .value=${D}
              placeholder=${this.placeholder ? this.placeholder[0] || "" : f}
              ?disabled=${this.isDisabled}
              @input=${(u) => this._onDigitInput(u, g)}
              @keydown=${(u) => this._onKeyDown(u, g)}
              @paste=${(u) => this._onPaste(u, g)}
            />
          `)}
        </div>
        ${this.helperText ? c`<div class="helper-text">${this.helperText}</div>` : f}
      </div>
    `;
  }
  _getInputs() {
    return Array.from(this.shadowRoot?.querySelectorAll(".otp-box") || []);
  }
  _onDigitInput(e, t) {
    const o = e.target.value.slice(-1);
    this._digits = [...this._digits], this._digits[t] = o, this.value = this._digits.join(""), this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })), o && t < this.numDigits - 1 && this._getInputs()[t + 1]?.focus(), this.value.length === this.numDigits && !this._digits.includes("") && this.dispatchEvent(new CustomEvent("tarmac-complete", { bubbles: !0, composed: !0, detail: { value: this.value } })), this.requestUpdate();
  }
  _onKeyDown(e, t) {
    if (e.key === "Backspace" && !this._digits[t] && t > 0) {
      const s = this._getInputs();
      this._digits = [...this._digits], this._digits[t - 1] = "", this.value = this._digits.join(""), s[t - 1]?.focus(), this.requestUpdate();
    }
  }
  _onPaste(e, t) {
    e.preventDefault();
    const s = e.clipboardData?.getData("text") || "";
    this._digits = [...this._digits];
    for (let a = 0; a < s.length && t + a < this.numDigits; a++)
      this._digits[t + a] = s[a];
    this.value = this._digits.join(""), this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })), this.value.length === this.numDigits && !this._digits.includes("") && this.dispatchEvent(new CustomEvent("tarmac-complete", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    const o = this._getInputs(), i = Math.min(t + s.length, this.numDigits - 1);
    o[i]?.focus(), this.requestUpdate();
  }
};
l([
  n({ type: Number, attribute: "num-digits" })
], r.prototype, "numDigits", 2);
l([
  n({ type: String, attribute: "otp-style" })
], r.prototype, "otpStyle", 2);
l([
  n({ type: String, attribute: "otp-size" })
], r.prototype, "otpSize", 2);
l([
  n({ type: String, attribute: "otp-variant" })
], r.prototype, "otpVariant", 2);
l([
  n({ type: Boolean, attribute: "is-disabled" })
], r.prototype, "isDisabled", 2);
l([
  n({ type: String })
], r.prototype, "placeholder", 2);
l([
  n({ type: String, attribute: "input-type" })
], r.prototype, "inputType", 2);
l([
  n({ type: String })
], r.prototype, "label", 2);
l([
  n({ type: String, attribute: "helper-text" })
], r.prototype, "helperText", 2);
l([
  n({ type: String })
], r.prototype, "value", 2);
l([
  $()
], r.prototype, "_digits", 2);
r = l([
  w("tarmac-otp-input")
], r);
export {
  r as TarmacOtpInput
};
