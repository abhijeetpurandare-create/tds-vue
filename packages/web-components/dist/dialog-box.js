import { i as x, A as c, c as l, n as s, t as g } from "./index-8C405PPW.js";
import { s as u, g as f } from "./theme-context-BRj4LHEr.js";
var y = Object.defineProperty, v = Object.getOwnPropertyDescriptor, t = (a, o, h, r) => {
  for (var n = r > 1 ? void 0 : r ? v(o, h) : o, p = a.length - 1, i; p >= 0; p--)
    (i = a[p]) && (n = (r ? i(o, h, n) : i(n)) || n);
  return r && n && y(o, h, n), n;
};
const d = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)" }
}, k = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let e = class extends x {
  constructor() {
    super(...arguments), this.isOpen = !1, this.type = "standard", this.size = "web", this.title = "", this.subtext = "", this.heading = "", this.description = "", this.showHeader = !0, this.showFooter = !0, this.showCheckbox = !1, this.checkboxLabel = "", this.checkboxChecked = !1, this._cfg = d, this._onEsc = (a) => {
      a.key === "Escape" && this.isOpen && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = u(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const a = f(this);
    this._cfg = a?.components?.dialog_box_tarmac || d;
  }
  render() {
    if (!this.isOpen) return c;
    const o = this._cfg.base || {}, h = o.fontFamily || "Noto Sans, sans-serif", r = o.radius || "8px", n = o.overlayBg || "rgba(0,0,0,0.45)", p = o.shadow || "0 4px 24px rgba(0,0,0,0.15)", i = this.size === "mobile";
    return l`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${i ? "flex-end" : "center"}; justify-content: center;
          background: ${n}; font-family: ${h};
        }
        .container {
          background: #fff; border-radius: ${i ? `${r} ${r} 0 0` : r};
          box-shadow: ${p}; display: flex; flex-direction: column; overflow: hidden;
          width: ${i ? "100%" : "90%"}; max-width: ${i ? "100%" : "480px"};
          max-height: 80vh; animation: dialogIn 0.2s ease-out;
        }
        @keyframes dialogIn { from { opacity: 0; transform: ${i ? "translateY(20px)" : "scale(0.95)"}; } to { opacity: 1; transform: ${i ? "translateY(0)" : "scale(1)"}; } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .illustration { padding: 16px 24px; display: flex; justify-content: center; }
        .snackbar-slot { padding: 0 24px; }
        .heading { font-size: 16px; font-weight: 600; color: #2b2b2b; margin: 0 0 8px; }
        .description { font-size: 14px; line-height: 20px; color: #6b6b6b; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; padding: 12px 24px; }
        .checkbox-label { font-size: 14px; color: #2b2b2b; cursor: pointer; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Dialog"} @click=${(b) => b.stopPropagation()}>
          ${this.showHeader ? l`
            <div class="header">
              <div class="header-content">
                ${this.title ? l`<h2 class="title">${this.title}</h2>` : c}
                ${this.subtext ? l`<div class="subtext">${this.subtext}</div>` : c}
              </div>
              <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${k}></span></button>
            </div>
          ` : c}
          <div class="illustration"><slot name="illustration"></slot></div>
          <div class="snackbar-slot"><slot name="snackbar"></slot></div>
          <div class="body">
            ${this.heading ? l`<h3 class="heading">${this.heading}</h3>` : c}
            ${this.description ? l`<p class="description">${this.description}</p>` : c}
            <slot></slot>
          </div>
          ${this.showCheckbox ? l`
            <label class="checkbox-row">
              <input type="checkbox" .checked=${this.checkboxChecked} @change=${this._onCheckbox} />
              <span class="checkbox-label">${this.checkboxLabel}</span>
            </label>
          ` : c}
          ${this.showFooter ? l`<div class="footer"><slot name="footer"></slot></div>` : c}
        </div>
      </div>
    `;
  }
  _onOverlayClick() {
    this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
  _onCheckbox(a) {
    const o = a.target.checked;
    this.checkboxChecked = o, this.dispatchEvent(new CustomEvent("tarmac-checkbox-change", { bubbles: !0, composed: !0, detail: { checked: o } }));
  }
};
t([
  s({ type: Boolean, attribute: "is-open" })
], e.prototype, "isOpen", 2);
t([
  s({ type: String })
], e.prototype, "type", 2);
t([
  s({ type: String })
], e.prototype, "size", 2);
t([
  s({ type: String })
], e.prototype, "title", 2);
t([
  s({ type: String })
], e.prototype, "subtext", 2);
t([
  s({ type: String })
], e.prototype, "heading", 2);
t([
  s({ type: String })
], e.prototype, "description", 2);
t([
  s({ type: Boolean, attribute: "show-header" })
], e.prototype, "showHeader", 2);
t([
  s({ type: Boolean, attribute: "show-footer" })
], e.prototype, "showFooter", 2);
t([
  s({ type: Boolean, attribute: "show-checkbox" })
], e.prototype, "showCheckbox", 2);
t([
  s({ type: String, attribute: "checkbox-label" })
], e.prototype, "checkboxLabel", 2);
t([
  s({ type: Boolean, attribute: "checkbox-checked" })
], e.prototype, "checkboxChecked", 2);
e = t([
  g("tarmac-dialog-box")
], e);
export {
  e as TarmacDialogBox
};
