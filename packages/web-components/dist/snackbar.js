import { d as g, i as y, A as l, c, n as s, t as v } from "./index-8C405PPW.js";
import { s as k, g as _ } from "./theme-context-BRj4LHEr.js";
var C = Object.defineProperty, $ = Object.getOwnPropertyDescriptor, e = (o, a, p, r) => {
  for (var i = r > 1 ? void 0 : r ? $(a, p) : a, b = o.length - 1, h; b >= 0; b--)
    (h = o[b]) && (i = (r ? h(a, p, i) : h(i)) || i);
  return r && i && C(a, p, i), i;
};
const u = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", shadow: "0 4px 16px rgba(0,0,0,0.12)" },
  variants: {
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b" },
    black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
    coal: { backgroundColor: "#64739b", textColor: "#ffffff" },
    success: { backgroundColor: "#1ba86e", textColor: "#ffffff" },
    error: { backgroundColor: "#dc143c", textColor: "#ffffff" },
    info: { backgroundColor: "#2396fb", textColor: "#ffffff" },
    warning: { backgroundColor: "#f5c828", textColor: "#2b2b2b" }
  }
}, T = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let t = class extends y {
  constructor() {
    super(...arguments), this.message = "", this.title = "", this.variant = "black", this.snackbarStyle = "singleText", this.size = "lg", this.trailingIcon = !1, this.ctAs = !1, this.denyText = "", this.approveText = "", this.duration = 5e3, this.position = "bottom", this._visible = !0, this._cfg = u;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = k(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this._clearTimer();
  }
  _resolve() {
    const o = _(this);
    this._cfg = o?.components?.snackbar_tarmac || u;
  }
  updated(o) {
    o.has("duration") && (this._clearTimer(), this._startTimer());
  }
  _startTimer() {
    this.duration > 0 && (this._timer = setTimeout(() => {
      this._visible = !1, this._emitClose();
    }, this.duration));
  }
  _clearTimer() {
    this._timer && (clearTimeout(this._timer), this._timer = void 0);
  }
  render() {
    if (!this._visible) return l;
    const o = this._cfg, a = o.base || {}, p = o.variants?.[this.variant] || o.variants?.black || {}, r = a.fontFamily || "Noto Sans, sans-serif", i = a.radius || "8px", b = a.shadow || "0 4px 16px rgba(0,0,0,0.12)", h = p.backgroundColor || "#2b2b2b", f = p.textColor || "#ffffff", m = this.size === "sm" ? "8px 12px" : "12px 16px", d = this.size === "sm" ? "12px" : "14px", x = this.snackbarStyle === "dualText";
    let n = "";
    switch (this.position) {
      case "top-right":
        n = "top:16px;right:16px;";
        break;
      case "top-left":
        n = "top:16px;left:16px;";
        break;
      case "bottom-right":
        n = "bottom:16px;right:16px;";
        break;
      case "bottom-left":
        n = "bottom:16px;left:16px;";
        break;
      case "top":
        n = "top:16px;left:50%;transform:translateX(-50%);";
        break;
      case "bottom":
        n = "bottom:16px;left:50%;transform:translateX(-50%);";
        break;
    }
    return c`
      <style>
        :host { display: contents; }
        .snackbar {
          position: fixed; ${n} z-index: 1100;
          display: flex; align-items: center; gap: 12px;
          background: ${h}; color: ${f};
          border-radius: ${i}; box-shadow: ${b};
          padding: ${m}; font-family: ${r};
          min-width: 280px; max-width: 560px;
          animation: snackIn 0.25s ease-out;
        }
        @keyframes snackIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${d}; font-weight: 600; line-height: 1.4; }
        .message { font-size: ${d}; line-height: 1.4; opacity: ${x ? "0.8" : "1"}; }
        .actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .action-btn {
          background: none; border: 1px solid ${f}40; color: ${f};
          border-radius: 4px; padding: 4px 12px; font-size: 12px; font-weight: 500;
          cursor: pointer; font-family: ${r};
        }
        .action-btn:hover { background: ${f}15; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: ${f};
          display: flex; align-items: center; flex-shrink: 0; opacity: 0.7;
        }
        .close-btn:hover { opacity: 1; }
      </style>
      <div class="snackbar" role="alert">
        <span class="icon-slot"><slot name="leading-icon"></slot></span>
        <div class="content">
          ${x && this.title ? c`<div class="title">${this.title}</div>` : l}
          ${this.message ? c`<div class="message">${this.message}</div>` : l}
        </div>
        ${this.ctAs ? c`
          <div class="actions">
            ${this.denyText ? c`<button class="action-btn" @click=${this._handleDeny}>${this.denyText}</button>` : l}
            ${this.approveText ? c`<button class="action-btn" @click=${this._handleApprove}>${this.approveText}</button>` : l}
          </div>
        ` : l}
        ${this.trailingIcon ? c`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${T}></span></button>` : l}
      </div>
    `;
  }
  _handleClose() {
    this._clearTimer(), this._visible = !1, this._emitClose();
  }
  _handleDeny() {
    this.dispatchEvent(new CustomEvent("tarmac-deny", { bubbles: !0, composed: !0 }));
  }
  _handleApprove() {
    this.dispatchEvent(new CustomEvent("tarmac-approve", { bubbles: !0, composed: !0 }));
  }
  _emitClose() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
e([
  s({ type: String })
], t.prototype, "message", 2);
e([
  s({ type: String })
], t.prototype, "title", 2);
e([
  s({ type: String })
], t.prototype, "variant", 2);
e([
  s({ type: String, attribute: "snackbar-style" })
], t.prototype, "snackbarStyle", 2);
e([
  s({ type: String })
], t.prototype, "size", 2);
e([
  s({ type: Boolean, attribute: "trailing-icon" })
], t.prototype, "trailingIcon", 2);
e([
  s({ type: Boolean, attribute: "ct-as" })
], t.prototype, "ctAs", 2);
e([
  s({ type: String, attribute: "deny-text" })
], t.prototype, "denyText", 2);
e([
  s({ type: String, attribute: "approve-text" })
], t.prototype, "approveText", 2);
e([
  s({ type: Number })
], t.prototype, "duration", 2);
e([
  s({ type: String })
], t.prototype, "position", 2);
e([
  g()
], t.prototype, "_visible", 2);
t = e([
  v("tarmac-snackbar")
], t);
export {
  t as TarmacSnackbar
};
