import { a as m, n as a, i as B, c as x, t as y } from "./index-8C405PPW.js";
import { s as $, g as _ } from "./theme-context-BRj4LHEr.js";
var v = Object.defineProperty, S = Object.getOwnPropertyDescriptor, s = (o, t, l, d) => {
  for (var r = d > 1 ? void 0 : d ? S(t, l) : t, n = o.length - 1, i; n >= 0; n--)
    (i = o[n]) && (r = (d ? i(t, l, r) : i(r)) || r);
  return d && r && v(t, l, r), r;
};
const C = {
  base: { transition: "all 0.15s ease-in-out", radius: "999px", handleColor: "#ffffff" },
  styles: {
    filled: {
      black: { uncheckedBackgroundColor: "#b3b1b1", checkedBackgroundColor: "#000000" },
      blue: { uncheckedBackgroundColor: "#b3b1b1", checkedBackgroundColor: "#2396fb" },
      dlv_red: { uncheckedBackgroundColor: "#b3b1b1", checkedBackgroundColor: "#ed1b36" },
      green: { uncheckedBackgroundColor: "#b3b1b1", checkedBackgroundColor: "#1ba86e" }
    },
    outlined: {
      black: { uncheckedBorderColor: "#b3b1b1", checkedBorderColor: "#000000", uncheckedBackgroundColor: "transparent", checkedBackgroundColor: "transparent", handleUncheckedColor: "#b3b1b1", handleCheckedColor: "#000000" },
      blue: { uncheckedBorderColor: "#b3b1b1", checkedBorderColor: "#2396fb", uncheckedBackgroundColor: "transparent", checkedBackgroundColor: "transparent", handleUncheckedColor: "#b3b1b1", handleCheckedColor: "#2396fb" }
    }
  },
  sizes: {
    lg: { trackWidth: "40px", trackHeight: "24px", handleSize: "16px", handleOffset: "4px", borderWidth: "1px" },
    sm: { trackWidth: "32px", trackHeight: "20px", handleSize: "12px", handleOffset: "4px", borderWidth: "1px" }
  },
  states: { disabled: { checkedBackgroundColor: "#e6e6e6", handleColor: "#cdcbcb", borderColor: "#ededed" }, ghost: { backgroundColor: "#dedede", handleColor: "#cdcbcb", borderColor: "#e6e6e6" } }
};
let c = class extends B {
  constructor() {
    super(...arguments), this.tarmacColor = "black", this.tarmacStyle = "filled", this.tarmacSize = "lg", this.checked = !1, this.disabled = !1, this.isGhost = !1, this._cfg = C;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = $(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const o = _(this);
    this._cfg = o?.components?.toggle_tarmac || C;
  }
  render() {
    const o = this._cfg, t = o.sizes?.[this.tarmacSize] || {}, l = t.trackWidth || "40px", d = t.trackHeight || "24px", r = t.handleSize || "16px", n = t.handleOffset || "4px", i = o.base?.radius || "999px", p = o.base?.transition || "all 0.15s ease-in-out", g = this.tarmacStyle === "filled";
    let h, b, k, u;
    if (this.isGhost) {
      const e = o.states?.ghost || {};
      h = e.backgroundColor || "#dedede", b = `1px solid ${e.borderColor || "#e6e6e6"}`, k = e.handleColor || "#cdcbcb", u = "default";
    } else if (this.disabled) {
      const e = o.states?.disabled || {};
      h = e.checkedBackgroundColor || "#e6e6e6", b = g ? "none" : `1px solid ${e.borderColor || "#ededed"}`, k = e.handleColor || "#cdcbcb", u = "default";
    } else if (g) {
      const e = o.styles?.filled?.[this.tarmacColor] || {};
      h = this.checked ? e.checkedBackgroundColor || "#000" : e.uncheckedBackgroundColor || "#b3b1b1", b = "none", k = o.base?.handleColor || "#ffffff", u = "pointer";
    } else {
      const e = o.styles?.outlined?.[this.tarmacColor] || {};
      h = this.checked ? e.checkedBackgroundColor || "transparent" : e.uncheckedBackgroundColor || "transparent", b = `${t.borderWidth || "1px"} solid ${this.checked ? e.checkedBorderColor || "#000" : e.uncheckedBorderColor || "#b3b1b1"}`, k = this.checked ? e.handleCheckedColor || "#000" : e.handleUncheckedColor || "#b3b1b1", u = "pointer";
    }
    const f = this.checked ? "flex-end" : "flex-start";
    return x`
      <style>
        .track { position:relative; display:inline-flex; justify-content:${f}; align-items:center; width:${l}; height:${d}; border-radius:${i}; background-color:${h}; border:${b}; cursor:${u}; transition:${p}; padding:${n}; box-sizing:border-box; }
        .handle { width:${r}; height:${r}; border-radius:50%; background-color:${k}; transition:${p}; flex-shrink:0; }
      </style>
      <button
        class="track"
        role="switch"
        aria-checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <span class="handle"></span>
      </button>
    `;
  }
  _toggle() {
    this.disabled || this.isGhost || (this.checked = !this.checked, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { checked: this.checked } })));
  }
};
c.styles = m`:host { display: inline-block; }`;
s([
  a({ type: String, attribute: "tarmac-color" })
], c.prototype, "tarmacColor", 2);
s([
  a({ type: String, attribute: "tarmac-style" })
], c.prototype, "tarmacStyle", 2);
s([
  a({ type: String, attribute: "tarmac-size" })
], c.prototype, "tarmacSize", 2);
s([
  a({ type: Boolean })
], c.prototype, "checked", 2);
s([
  a({ type: Boolean })
], c.prototype, "disabled", 2);
s([
  a({ type: Boolean, attribute: "is-ghost" })
], c.prototype, "isGhost", 2);
c = s([
  y("tarmac-toggle")
], c);
export {
  c as TarmacToggle
};
