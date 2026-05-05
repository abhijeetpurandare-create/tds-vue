import { d as g, i as u, A as h, c as b, n as r, t as _ } from "./index-8C405PPW.js";
import { s as v, g as y } from "./theme-context-BRj4LHEr.js";
var C = Object.defineProperty, w = Object.getOwnPropertyDescriptor, i = (t, o, c, n) => {
  for (var s = n > 1 ? void 0 : n ? w(o, c) : o, p = t.length - 1, l; p >= 0; p--)
    (l = t[p]) && (s = (n ? l(o, c, s) : l(s)) || s);
  return n && s && C(o, c, s), s;
};
const d = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", shadow: "0 4px 16px rgba(0,0,0,0.12)" },
  variants: {
    success: { accentColor: "#1ba86e" },
    error: { accentColor: "#dc143c" },
    warning: { accentColor: "#f5c828" },
    info: { accentColor: "#2396fb" },
    default: { accentColor: "#2b2b2b" }
  }
}, T = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let e = class extends u {
  constructor() {
    super(...arguments), this.message = "", this.title = "", this.variant = "default", this.size = "md", this.duration = 3e3, this.closable = !1, this.position = "top-right", this._visible = !0, this._cfg = d;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = v(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this._clearTimer();
  }
  _resolve() {
    const t = y(this);
    this._cfg = t?.components?.toast_tarmac || d;
  }
  updated(t) {
    t.has("duration") && (this._clearTimer(), this._startTimer());
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
    if (!this._visible) return h;
    const t = this._cfg, o = t.base || {}, c = t.variants?.[this.variant] || t.variants?.default || {}, n = o.fontFamily || "Noto Sans, sans-serif", s = o.radius || "8px", p = o.shadow || "0 4px 16px rgba(0,0,0,0.12)", l = c.accentColor || "#2b2b2b", m = this.size === "sm" ? "8px 12px" : this.size === "lg" ? "16px 20px" : "12px 16px", f = this.size === "sm" ? "12px" : this.size === "lg" ? "16px" : "14px", x = this.size === "sm" ? "12px" : this.size === "lg" ? "14px" : "13px";
    let a = "";
    switch (this.position) {
      case "top-right":
        a = "top:16px;right:16px;";
        break;
      case "top-left":
        a = "top:16px;left:16px;";
        break;
      case "bottom-right":
        a = "bottom:16px;right:16px;";
        break;
      case "bottom-left":
        a = "bottom:16px;left:16px;";
        break;
      case "top":
        a = "top:16px;left:50%;transform:translateX(-50%);";
        break;
      case "bottom":
        a = "bottom:16px;left:50%;transform:translateX(-50%);";
        break;
    }
    return b`
      <style>
        :host { display: contents; }
        .toast {
          position: fixed; ${a} z-index: 1100;
          display: flex; align-items: flex-start; gap: 12px;
          background: #fff; border-left: 4px solid ${l};
          border-radius: ${s}; box-shadow: ${p};
          padding: ${m}; font-family: ${n};
          min-width: 280px; max-width: 420px;
          animation: toastIn 0.25s ease-out;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; color: ${l}; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${f}; font-weight: 600; color: #2b2b2b; line-height: 1.4; }
        .message { font-size: ${x}; color: #6b6b6b; line-height: 1.4; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: #6b6b6b;
          display: flex; align-items: center; flex-shrink: 0;
        }
        .close-btn:hover { color: #2b2b2b; }
      </style>
      <div class="toast" role="alert">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content">
          ${this.title ? b`<div class="title">${this.title}</div>` : h}
          ${this.message ? b`<div class="message">${this.message}</div>` : h}
        </div>
        ${this.closable ? b`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${T}></span></button>` : h}
      </div>
    `;
  }
  _handleClose() {
    this._clearTimer(), this._visible = !1, this._emitClose();
  }
  _emitClose() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
i([
  r({ type: String })
], e.prototype, "message", 2);
i([
  r({ type: String })
], e.prototype, "title", 2);
i([
  r({ type: String })
], e.prototype, "variant", 2);
i([
  r({ type: String })
], e.prototype, "size", 2);
i([
  r({ type: Number })
], e.prototype, "duration", 2);
i([
  r({ type: Boolean })
], e.prototype, "closable", 2);
i([
  r({ type: String })
], e.prototype, "position", 2);
i([
  g()
], e.prototype, "_visible", 2);
e = i([
  _("tarmac-toast")
], e);
export {
  e as TarmacToast
};
