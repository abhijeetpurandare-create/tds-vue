import { a as y, n as a, i as C, c as v, t as f } from "./index-8C405PPW.js";
import { s as x, g as E } from "./theme-context-BRj4LHEr.js";
var z = Object.defineProperty, b = Object.getOwnPropertyDescriptor, o = (t, e, c, i) => {
  for (var r = i > 1 ? void 0 : i ? b(e, c) : e, n = t.length - 1, p; n >= 0; n--)
    (p = t[n]) && (r = (i ? p(e, c, r) : p(r)) || r);
  return i && r && z(e, c, r), r;
};
const k = {
  sizes: {
    sm: { size: "16px", strokeWidth: 3 },
    md: { size: "24px", strokeWidth: 4 },
    lg: { size: "32px", strokeWidth: 4 }
  },
  variants: {
    default: { color: "#4B5563", trackColor: "#E5E7EB" },
    primary: { color: "#2563EB", trackColor: "#DBEAFE" },
    secondary: { color: "#4B5563", trackColor: "#E5E7EB" },
    success: { color: "#059669", trackColor: "#D1FAE5" },
    error: { color: "#DC2626", trackColor: "#FEE2E2" },
    warning: { color: "#D97706", trackColor: "#FEF3C7" },
    info: { color: "#2563EB", trackColor: "#DBEAFE" }
  }
};
let s = class extends C {
  constructor() {
    super(...arguments), this.size = "md", this.variant = "default", this.tarmacSize = "24px", this._spinnerConfig = k;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = x(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const t = E(this);
    this._spinnerConfig = t?.components?.spinner || k;
  }
  render() {
    const t = this._spinnerConfig;
    if (this.tarmacVariant) {
      const h = t.variants?.[this.tarmacVariant] || {}, d = t.sizes?.[this.tarmacSize] || {}, w = this.color || h.color || "#000000", u = this.trackColor || h.trackColor || "#d4d4d4", m = d.size || this.tarmacSize, g = d.strokeWidth || 3;
      return v`
        <div class="spinner-wrap" role="status" style="width:${m};height:${m}">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="${u}" stroke-width="${g}" opacity="0.3"/>
            <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${w}" stroke-width="${g}" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      `;
    }
    const e = t.variants?.[this.variant] || t.variants?.default || {}, c = t.sizes?.[this.size] || {}, i = this.color || e.color || "#3B82F6", r = this.trackColor || e.trackColor || "#E5E7EB", n = c.strokeWidth || 2, l = { sm: "16px", md: "24px", lg: "32px" }[this.size] || "24px";
    return v`
      <div class="spinner-wrap" role="status" style="width:${l};height:${l}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="${r}" stroke-width="${n}" opacity="0.3"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${i}" stroke-width="${n}" stroke-linecap="round"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
};
s.styles = y`
    :host { display: inline-block; }

    .spinner-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border-width: 0;
    }
  `;
o([
  a({ type: String })
], s.prototype, "size", 2);
o([
  a({ type: String })
], s.prototype, "variant", 2);
o([
  a({ type: String, attribute: "tarmac-variant" })
], s.prototype, "tarmacVariant", 2);
o([
  a({ type: String, attribute: "tarmac-size" })
], s.prototype, "tarmacSize", 2);
o([
  a({ type: String })
], s.prototype, "color", 2);
o([
  a({ type: String, attribute: "track-color" })
], s.prototype, "trackColor", 2);
s = o([
  f("tarmac-spinner")
], s);
export {
  s as TarmacSpinner
};
