import { i as C, A as $, c as f, n as b, t as y } from "./index-8C405PPW.js";
import { s as _, g as k } from "./theme-context-BRj4LHEr.js";
var S = Object.defineProperty, z = Object.getOwnPropertyDescriptor, n = (o, s, e, a) => {
  for (var r = a > 1 ? void 0 : a ? z(s, e) : s, l = o.length - 1, c; l >= 0; l--)
    (c = o[l]) && (r = (a ? c(s, e, r) : c(r)) || r);
  return a && r && S(s, e, r), r;
};
const x = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", shadow: "0 4px 16px rgba(0,0,0,0.12)", arrowSize: "8px" },
  variants: {
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", descriptionColor: "#6b6b6b" },
    black: { backgroundColor: "#2b2b2b", textColor: "#ffffff", descriptionColor: "#b3b1b1" }
  },
  sizes: { sm: { width: "264px" }, lg: { width: "300px" } }
};
let i = class extends C {
  constructor() {
    super(...arguments), this.variant = "white", this.size = "lg", this.arrowPosition = "bottom-center", this.title = "", this.description = "", this._cfg = x;
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
    const o = k(this);
    this._cfg = o?.components?.coachmarks_tarmac || x;
  }
  render() {
    const o = this._cfg, s = o.base || {}, e = o.variants?.[this.variant] || o.variants?.white || {}, a = o.sizes?.[this.size] || o.sizes?.lg || {}, r = s.fontFamily || "Noto Sans, sans-serif", l = s.radius || "8px", c = s.shadow || "0 4px 16px rgba(0,0,0,0.12)", t = s.arrowSize || "8px", p = e.backgroundColor || "#ffffff", g = e.textColor || "#2b2b2b", w = e.descriptionColor || "#6b6b6b", v = a.width || "300px", [u, m] = this.arrowPosition.split("-");
    let d = "";
    const h = m === "start" ? "16px" : m === "end" ? "calc(100% - 24px)" : "50%";
    switch (u) {
      case "top":
        d = `top: -${t}; left: ${h}; transform: translateX(-50%); border-left: ${t} solid transparent; border-right: ${t} solid transparent; border-bottom: ${t} solid ${p};`;
        break;
      case "bottom":
        d = `bottom: -${t}; left: ${h}; transform: translateX(-50%); border-left: ${t} solid transparent; border-right: ${t} solid transparent; border-top: ${t} solid ${p};`;
        break;
      case "left":
        d = `left: -${t}; top: ${h}; transform: translateY(-50%); border-top: ${t} solid transparent; border-bottom: ${t} solid transparent; border-right: ${t} solid ${p};`;
        break;
      case "right":
        d = `right: -${t}; top: ${h}; transform: translateY(-50%); border-top: ${t} solid transparent; border-bottom: ${t} solid transparent; border-left: ${t} solid ${p};`;
        break;
    }
    return f`
      <style>
        :host { display: inline-block; position: relative; }
        .coachmark {
          width: ${v}; background: ${p}; color: ${g};
          border-radius: ${l}; box-shadow: ${c};
          padding: 16px; font-family: ${r}; position: relative;
        }
        .arrow { position: absolute; width: 0; height: 0; ${d} }
        .image-slot { margin-bottom: 12px; }
        .image-slot ::slotted(*) { width: 100%; border-radius: 4px; }
        .title { font-size: 14px; font-weight: 600; line-height: 20px; margin: 0 0 4px; color: ${g}; }
        .description { font-size: 13px; line-height: 18px; color: ${w}; margin: 0 0 12px; }
        .badges-slot { margin-bottom: 12px; }
        .ctas-slot { display: flex; gap: 8px; }
      </style>
      <div class="coachmark">
        <span class="arrow"></span>
        <div class="image-slot"><slot name="image"></slot></div>
        ${this.title ? f`<h4 class="title">${this.title}</h4>` : $}
        ${this.description ? f`<p class="description">${this.description}</p>` : $}
        <div class="badges-slot"><slot name="badges"></slot></div>
        <div class="ctas-slot"><slot name="ctas"></slot></div>
      </div>
    `;
  }
};
n([
  b({ type: String })
], i.prototype, "variant", 2);
n([
  b({ type: String })
], i.prototype, "size", 2);
n([
  b({ type: String, attribute: "arrow-position" })
], i.prototype, "arrowPosition", 2);
n([
  b({ type: String })
], i.prototype, "title", 2);
n([
  b({ type: String })
], i.prototype, "description", 2);
i = n([
  y("tarmac-coachmarks")
], i);
export {
  i as TarmacCoachmarks
};
