import { i as S, A as c, c as h, n as s, t as z } from "./index-8C405PPW.js";
import { s as _, g as w } from "./theme-context-BRj4LHEr.js";
var A = Object.defineProperty, B = Object.getOwnPropertyDescriptor, o = (t, r, l, a) => {
  for (var i = a > 1 ? void 0 : a ? B(r, l) : r, n = t.length - 1, p; n >= 0; n--)
    (p = t[n]) && (i = (a ? p(r, l, i) : p(i)) || i);
  return a && i && A(r, l, i), i;
};
const g = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", transition: "all 0.15s ease-in-out" },
  types: {
    regular: { borderColor: "#e0e0e0", focusBorderColor: "#2b2b2b" },
    success: { borderColor: "#2e7d32", focusBorderColor: "#2e7d32" },
    error: { borderColor: "#c62828", focusBorderColor: "#c62828" },
    infoBlue: { borderColor: "#1565c0", focusBorderColor: "#1565c0" }
  },
  sizes: {
    sm: { minHeight: "72px", fontSize: "14px", padding: "8px" },
    md: { minHeight: "96px", fontSize: "14px", padding: "10px 12px" },
    lg: { minHeight: "120px", fontSize: "16px", padding: "12px" }
  },
  states: {
    disabled: { borderColor: "#ededed", color: "#cdcbcb", backgroundColor: "#fff" },
    ghost: { backgroundColor: "#ededed", borderColor: "transparent" }
  }
};
let e = class extends S {
  constructor() {
    super(...arguments), this.textAreaStyle = "tarmac-01", this.textAreaType = "regular", this.textAreaSize = "md", this.isDisabled = !1, this.isGhost = !1, this.label = "", this.placeholder = "", this.value = "", this.rows = 4, this.resize = "vertical", this.helperTextTop = "", this.helperTextBottom = "", this.statusText = "", this._cfg = g;
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
    const t = w(this);
    this._cfg = t?.components?.textarea_tarmac || g;
  }
  render() {
    const t = this._cfg, r = t.types?.[this.textAreaType] || t.types?.regular || {}, l = t.sizes?.[this.textAreaSize] || t.sizes?.md || {}, a = t.base || {}, i = t.states?.disabled || {}, n = t.states?.ghost || {}, p = a.fontFamily || "Noto Sans, sans-serif", f = a.radius || "4px", y = a.transition || "all 0.15s ease-in-out", m = l.minHeight || "96px", v = l.fontSize || "14px", C = l.padding || "10px 12px";
    let d, b, u, x;
    this.isDisabled ? (d = i.borderColor || "#ededed", b = i.backgroundColor || "#fff", u = i.color || "#cdcbcb", x = "not-allowed") : this.isGhost ? (d = n.borderColor || "transparent", b = n.backgroundColor || "#ededed", u = "#2b2b2b", x = "text") : (d = r.borderColor || "#e0e0e0", b = "#fff", u = "#2b2b2b", x = "text");
    const T = r.focusBorderColor || "#2b2b2b", $ = this.textAreaType === "error" ? "#c62828" : this.textAreaType === "success" ? "#2e7d32" : this.textAreaType === "infoBlue" ? "#1565c0" : "#6b6b6b";
    return h`
      <style>
        :host { display: block; font-family: ${p}; }
        .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${$}; }
        textarea {
          width: 100%; min-height: ${m}; border: 1px solid ${d}; border-radius: ${f};
          background-color: ${b}; color: ${u}; font-family: ${p}; font-size: ${v};
          padding: ${C}; box-sizing: border-box; transition: ${y}; resize: ${this.resize};
          cursor: ${x}; outline: none;
        }
        textarea::placeholder { color: #b3b1b1; }
        textarea:focus { border-color: ${this.isDisabled ? d : T}; }
        textarea:disabled { cursor: not-allowed; }
      </style>
      <div class="textarea-wrapper">
        ${this.label ? h`<div class="label">${this.label}</div>` : c}
        ${this.helperTextTop ? h`<div class="helper-text">${this.helperTextTop}</div>` : c}
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder || c}
          ?disabled=${this.isDisabled}
          @input=${this._onInput}
          @change=${this._onChange}
        ></textarea>
        ${this.statusText ? h`<div class="status-text">${this.statusText}</div>` : c}
        ${this.helperTextBottom ? h`<div class="helper-text">${this.helperTextBottom}</div>` : c}
      </div>
    `;
  }
  _onInput(t) {
    const r = t.target;
    this.value = r.value, this.dispatchEvent(new CustomEvent("tarmac-input", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onChange(t) {
    const r = t.target;
    this.value = r.value, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
};
o([
  s({ type: String, attribute: "textarea-style" })
], e.prototype, "textAreaStyle", 2);
o([
  s({ type: String, attribute: "textarea-type" })
], e.prototype, "textAreaType", 2);
o([
  s({ type: String, attribute: "textarea-size" })
], e.prototype, "textAreaSize", 2);
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
  s({ type: String })
], e.prototype, "placeholder", 2);
o([
  s({ type: String })
], e.prototype, "value", 2);
o([
  s({ type: Number })
], e.prototype, "rows", 2);
o([
  s({ type: String })
], e.prototype, "resize", 2);
o([
  s({ type: String, attribute: "helper-text-top" })
], e.prototype, "helperTextTop", 2);
o([
  s({ type: String, attribute: "helper-text-bottom" })
], e.prototype, "helperTextBottom", 2);
o([
  s({ type: String, attribute: "status-text" })
], e.prototype, "statusText", 2);
e = o([
  z("tarmac-textarea")
], e);
export {
  e as TarmacTextArea
};
