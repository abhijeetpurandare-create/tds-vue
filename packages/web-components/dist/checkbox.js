import { i as O, A as x, c as g, n as a, t as R } from "./index-8C405PPW.js";
import { s as A, g as D } from "./theme-context-BRj4LHEr.js";
function E(t, e) {
  return t.variants?.[e] || {};
}
function M(t, e) {
  return t.sizes?.[e] || {};
}
function q(t) {
  const { config: e, variant: h, checkboxStyle: b, size: i, checked: d, indeterminate: p, disabled: c, hasLabel: $ } = t, o = E(e, h), s = M(e, i), l = e.base || {}, k = e.states?.disabled || {}, u = d || p, y = b === "rounded" ? l.radius?.rounded || "999px" : l.radius?.box || "2px", m = s.boxSize || "20px", f = s.borderWidth || l.borderWidth || "1px", v = s.checkedBorderWidth || f, w = u ? v : f, S = c ? k.borderColor || "#ededed" : u ? o.checkedBorderColor || o.checkedBackgroundColor || "#000" : o.borderColor || "#e6e6e6", B = c && u ? k.borderColor || "#ededed" : u ? o.checkedBackgroundColor || "#000" : o.backgroundColor || "#fff", _ = u ? o.checkedHoverBorderColor || o.checkedBorderColor || "#000" : o.hoverBorderColor || "#ccc", z = u ? o.checkedHoverBackgroundColor || o.checkedBackgroundColor || "#000" : o.hoverBackgroundColor || o.backgroundColor || "#fff", C = c ? k.checkmarkColor || "#cdcbcb" : o.checkmarkColor || "#e6e6e6", T = s.checkmarkWidth || "10px", H = s.checkmarkHeight || "8px", W = s.dashWidth || "8px", F = s.dashHeight || "2px", L = l.label?.fontFamily || "Noto Sans, sans-serif", j = c ? k.labelColor || "#cdcbcb" : l.label?.color || "#2b2b2b", P = l.subtext?.fontFamily || "Noto Sans, sans-serif", V = c ? k.subtextColor || "#cdcbcb" : l.subtext?.color || "#454545", N = o.focusRingColor || "rgba(0,0,0,0.4)";
  return `
    :host { display: inline-block; }

    .cb-wrapper {
      display: inline-flex;
      align-items: ${$ ? "flex-start" : "center"};
      gap: ${s.gap || "6px"};
      cursor: ${c ? "default" : "pointer"};
      user-select: none;
      ${c ? "pointer-events: none;" : ""}
    }

    .cb-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .cb-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: ${m};
      height: ${m};
      min-width: ${m};
      min-height: ${m};
      border-width: ${w};
      border-style: solid;
      border-color: ${S};
      border-radius: ${y};
      background-color: ${B};
      transition: ${l.transition || "all 0.15s ease-in-out"};
      cursor: ${c ? "default" : "pointer"};
      position: relative;
      flex-shrink: 0;
    }

    ${c ? "" : `
    .cb-wrapper:hover .cb-box {
      border-color: ${_};
      background-color: ${z};
    }
    `}

    .cb-box:focus-within {
      outline: none;
      box-shadow: ${c ? "none" : `0 0 0 2px ${N}`};
    }

    /* Checkmark (checked state) */
    .cb-checkmark {
      display: ${d ? "flex" : "none"};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${C};
    }
    .cb-checkmark svg {
      width: ${T};
      height: ${H};
    }

    /* Dash (indeterminate state) */
    .cb-dash {
      display: ${p && !d ? "block" : "none"};
      width: ${W};
      height: ${F};
      background-color: ${C};
      border-radius: 1px;
    }

    /* Label */
    .cb-label-col {
      display: flex;
      flex-direction: column;
    }

    .cb-label {
      font-family: ${L};
      font-size: ${s.labelFontSize || "14px"};
      line-height: ${s.labelLineHeight || "20px"};
      font-weight: 500;
      color: ${j};
    }

    .cb-subtext {
      font-family: ${P};
      font-size: ${s.subtextFontSize || "12px"};
      line-height: ${s.subtextLineHeight || "16px"};
      font-weight: 400;
      color: ${V};
    }
  `;
}
var K = Object.defineProperty, U = Object.getOwnPropertyDescriptor, n = (t, e, h, b) => {
  for (var i = b > 1 ? void 0 : b ? U(e, h) : e, d = t.length - 1, p; d >= 0; d--)
    (p = t[d]) && (i = (b ? p(e, h, i) : p(i)) || i);
  return b && i && K(e, h, i), i;
};
const G = `<svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
let r = class extends O {
  constructor() {
    super(...arguments), this.tarmacVariant = "standard", this.tarmacStyle = "box", this.size = "md", this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.value = "", this.name = "", this.subtext = "", this._checkboxConfig = {};
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = A(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const t = D(this);
    this._checkboxConfig = t?.components?.checkbox || {};
  }
  render() {
    const t = !!this.textContent?.trim() || this.querySelector("[slot]") !== null, e = !!this.subtext, h = q({
      config: this._checkboxConfig,
      variant: this.tarmacVariant,
      checkboxStyle: this.tarmacStyle,
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      hasLabel: t
    });
    return g`
      <style>${h}</style>
      <label class="cb-wrapper" @click=${this._handleClick}>
        <input
          class="cb-input"
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name || x}
          value=${this.value || x}
          @change=${this._handleChange}
        />
        <span class="cb-box">
          <span class="cb-checkmark" .innerHTML=${G}></span>
          <span class="cb-dash"></span>
        </span>
        ${t || e ? g`
              <span class="cb-label-col">
                <span class="cb-label"><slot></slot></span>
                ${e ? g`<span class="cb-subtext">${this.subtext}</span>` : x}
              </span>
            ` : x}
      </label>
    `;
  }
  _handleClick(t) {
    t.target.tagName;
  }
  _handleChange(t) {
    const e = t.target;
    this.checked = e.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("tarmac-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        checked: this.checked,
        value: this.value
      }
    }));
  }
};
n([
  a({ type: String, attribute: "tarmac-variant" })
], r.prototype, "tarmacVariant", 2);
n([
  a({ type: String, attribute: "tarmac-style" })
], r.prototype, "tarmacStyle", 2);
n([
  a({ type: String })
], r.prototype, "size", 2);
n([
  a({ type: Boolean })
], r.prototype, "checked", 2);
n([
  a({ type: Boolean })
], r.prototype, "indeterminate", 2);
n([
  a({ type: Boolean })
], r.prototype, "disabled", 2);
n([
  a({ type: String })
], r.prototype, "value", 2);
n([
  a({ type: String })
], r.prototype, "name", 2);
n([
  a({ type: String })
], r.prototype, "subtext", 2);
r = n([
  R("tarmac-checkbox")
], r);
export {
  r as TarmacCheckbox
};
