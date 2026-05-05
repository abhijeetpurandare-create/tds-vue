import { i as $, A as v, c as y, n as i, t as C } from "./index-8C405PPW.js";
import { s as S, g as _ } from "./theme-context-BRj4LHEr.js";
var T = Object.defineProperty, z = Object.getOwnPropertyDescriptor, s = (t, l, r, o) => {
  for (var a = o > 1 ? void 0 : o ? z(l, r) : l, d = t.length - 1, h; d >= 0; d--)
    (h = t[d]) && (a = (o ? h(l, r, a) : h(a)) || a);
  return o && a && T(l, r, a), a;
};
const x = {
  base: { fontFamily: "Noto Sans, sans-serif", gap: "8px" },
  variants: {
    black: { color: "#2b2b2b", pressedColor: "#000000", pressedBg: "#f5f5f5" },
    blue: { color: "#2b2b2b", pressedColor: "#2396fb", pressedBg: "#eef7ff" },
    dlvRed: { color: "#2b2b2b", pressedColor: "#ed1b36", pressedBg: "#fef2f2" }
  },
  sizes: {
    lg: { fontSize: "14px", lineHeight: "20px", padding: "12px" },
    sm: { fontSize: "12px", lineHeight: "16px", padding: "8px" }
  },
  types: { regular: { borderWidth: "2px" }, button: { borderRadius: "4px" } },
  states: {
    disabled: { color: "#cdcbcb" },
    ghost: { backgroundColor: "#dedede", textColor: "transparent" }
  }
};
let e = class extends $ {
  constructor() {
    super(...arguments), this.tabType = "regular", this.orientation = "horizontal", this.tabStyle = "black", this.size = "lg", this.isPressed = !1, this.isSelected = !1, this.isDisabled = !1, this.isGhost = !1, this.tabTitle = "", this.subtext = "", this._cfg = x;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = S(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const t = _(this);
    this._cfg = t?.components?.tab_cell_tarmac || x;
  }
  render() {
    const t = this._cfg, l = t.sizes?.[this.size] || {}, r = t.variants?.[this.tabStyle] || {}, o = l.fontSize || "14px", a = l.lineHeight || "20px", d = l.padding || "12px", h = t.base?.fontFamily || "Noto Sans, sans-serif", m = t.base?.gap || "8px", g = this.isPressed || this.isSelected;
    let p, b, f, n, u = "";
    if (this.isGhost) {
      const c = t.states?.ghost || {};
      p = c.textColor || "transparent", b = c.backgroundColor || "#dedede", f = "default", n = "none", u = "pointer-events:none;";
    } else if (this.isDisabled)
      p = (t.states?.disabled || {}).color || "#cdcbcb", b = "transparent", f = "default", n = "none", u = "pointer-events:none;";
    else if (g)
      if (p = r.pressedColor || "#000000", f = "pointer", this.tabType === "regular") {
        b = "transparent";
        const c = t.types?.regular?.borderWidth || "2px";
        this.orientation === "vertical" ? n = `border-left: ${c} solid ${p};` : n = `border-bottom: ${c} solid ${p};`;
      } else
        b = r.pressedBg || "#f5f5f5", n = `border-radius: ${t.types?.button?.borderRadius || "4px"};`;
    else
      p = r.color || "#2b2b2b", b = "transparent", f = "pointer", n = this.tabType === "regular" ? "border-bottom: 2px solid transparent;" : "";
    return y`
      <style>
        :host { display: inline-flex; }
        .tab-cell {
          display: inline-flex;
          align-items: center;
          gap: ${m};
          font-family: ${h};
          font-size: ${o};
          line-height: ${a};
          padding: ${d};
          color: ${p};
          background-color: ${b};
          cursor: ${f};
          border: none;
          outline: none;
          user-select: none;
          white-space: nowrap;
          ${typeof n == "string" && n.includes(":") ? n : ""}
          ${u}
        }
        .tab-cell:hover { opacity: ${this.isDisabled || this.isGhost ? "1" : "0.8"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
        .content { display: flex; flex-direction: column; }
        .title { font-weight: ${g ? "600" : "400"}; }
        .subtext { font-size: calc(${o} - 2px); color: ${this.isDisabled ? "#cdcbcb" : "#64739b"}; }
        .extras { display: inline-flex; align-items: center; gap: 4px; }
      </style>
      <button
        class="tab-cell"
        role="tab"
        aria-selected=${g}
        ?disabled=${this.isDisabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        <span class="content">
          <span class="title">${this.tabTitle}</span>
          ${this.subtext ? y`<span class="subtext">${this.subtext}</span>` : v}
        </span>
        <span class="extras">
          <slot name="badge"></slot>
          <slot name="pill"></slot>
          <slot name="status"></slot>
        </span>
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </button>
    `;
  }
  _handleClick(t) {
    if (this.isDisabled || this.isGhost) {
      t.preventDefault(), t.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: t, title: this.tabTitle }
    }));
  }
};
s([
  i({ type: String, attribute: "tab-type" })
], e.prototype, "tabType", 2);
s([
  i({ type: String })
], e.prototype, "orientation", 2);
s([
  i({ type: String, attribute: "tab-style" })
], e.prototype, "tabStyle", 2);
s([
  i({ type: String })
], e.prototype, "size", 2);
s([
  i({ type: Boolean, attribute: "is-pressed" })
], e.prototype, "isPressed", 2);
s([
  i({ type: Boolean, attribute: "is-selected" })
], e.prototype, "isSelected", 2);
s([
  i({ type: Boolean, attribute: "is-disabled" })
], e.prototype, "isDisabled", 2);
s([
  i({ type: Boolean, attribute: "is-ghost" })
], e.prototype, "isGhost", 2);
s([
  i({ type: String, attribute: "title" })
], e.prototype, "tabTitle", 2);
s([
  i({ type: String })
], e.prototype, "subtext", 2);
e = s([
  C("tarmac-tab-cell")
], e);
export {
  e as TarmacTabCell
};
