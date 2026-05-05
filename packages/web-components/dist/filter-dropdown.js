import { d as u, i as _, A as f, c, n as d, t as x } from "./index-8C405PPW.js";
import { s as m, g as v } from "./theme-context-BRj4LHEr.js";
var y = Object.defineProperty, w = Object.getOwnPropertyDescriptor, r = (t, e, n, o) => {
  for (var s = o > 1 ? void 0 : o ? w(e, n) : e, p = t.length - 1, a; p >= 0; p--)
    (a = t[p]) && (s = (o ? a(e, n, s) : a(s)) || s);
  return o && s && y(e, n, s), s;
};
const g = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", borderColor: "#e0e0e0", shadow: "0 4px 16px rgba(0,0,0,0.12)" }
}, $ = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
let i = class extends _ {
  constructor() {
    super(...arguments), this.placeholder = "Select", this.size = "lg", this.options = "[]", this._isOpen = !1, this._selected = /* @__PURE__ */ new Set(), this._cfg = g, this._parsedOptions = [], this._onDocClick = (t) => {
      if (!this._isOpen) return;
      t.composedPath().includes(this) || (this._isOpen = !1);
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = m(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._parseOptions(), document.addEventListener("click", this._onDocClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("click", this._onDocClick);
  }
  _resolve() {
    const t = v(this);
    this._cfg = t?.components?.filter_dropdown_tarmac || g;
  }
  updated(t) {
    t.has("options") && this._parseOptions();
  }
  _parseOptions() {
    try {
      this._parsedOptions = JSON.parse(this.options);
    } catch {
      this._parsedOptions = [];
    }
  }
  render() {
    const e = this._cfg.base || {}, n = e.fontFamily || "Noto Sans, sans-serif", o = e.radius || "4px", s = e.borderColor || "#e0e0e0", p = e.shadow || "0 4px 16px rgba(0,0,0,0.12)", a = this.size === "sm" ? "6px 10px" : "8px 12px", h = this.size === "sm" ? "13px" : "14px", b = this._selected.size;
    return c`
      <style>
        :host { display: inline-block; position: relative; font-family: ${n}; }
        .trigger {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid ${s}; border-radius: ${o};
          padding: ${a}; cursor: pointer; background: #fff;
          font-size: ${h}; color: #2b2b2b; user-select: none;
          min-width: 120px;
        }
        .trigger:hover { border-color: #b3b1b1; }
        .trigger-text { flex: 1; }
        .badge { background: #2396fb; color: #fff; border-radius: 10px; padding: 0 6px; font-size: 11px; font-weight: 600; line-height: 18px; }
        .chevron { display: flex; align-items: center; color: #6b6b6b; transition: transform 0.15s; }
        .chevron.open { transform: rotate(180deg); }
        .dropdown {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
          background: #fff; border: 1px solid ${s}; border-radius: ${o};
          box-shadow: ${p}; z-index: 100; max-height: 280px; display: flex; flex-direction: column;
        }
        .options { overflow-y: auto; flex: 1; padding: 4px 0; }
        .option {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; font-size: ${h}; color: #2b2b2b;
        }
        .option:hover { background: #f5f5f5; }
        .option.disabled { opacity: 0.5; cursor: default; pointer-events: none; }
        .option input { margin: 0; cursor: pointer; }
        .footer {
          display: flex; justify-content: space-between; padding: 8px 12px;
          border-top: 1px solid ${s};
        }
        .footer-btn {
          background: none; border: none; cursor: pointer; font-size: 13px;
          font-weight: 500; font-family: ${n}; padding: 4px 8px; border-radius: 4px;
        }
        .clear-btn { color: #6b6b6b; }
        .clear-btn:hover { background: #f5f5f5; }
        .apply-btn { color: #2396fb; }
        .apply-btn:hover { background: #eff8ff; }
      </style>
      <div class="trigger" @click=${this._toggleDropdown}>
        <span class="trigger-text">${this.placeholder}</span>
        ${b > 0 ? c`<span class="badge">${b}</span>` : f}
        <span class="chevron ${this._isOpen ? "open" : ""}" .innerHTML=${$}></span>
      </div>
      ${this._isOpen ? c`
        <div class="dropdown">
          <div class="options">
            ${this._parsedOptions.map((l) => c`
              <label class="option ${l.disabled ? "disabled" : ""}">
                <input type="checkbox" .checked=${this._selected.has(l.value)} ?disabled=${l.disabled} @change=${() => this._toggleOption(l.value)} />
                <span>${l.label}</span>
              </label>
            `)}
          </div>
          <div class="footer">
            <button class="footer-btn clear-btn" @click=${this._clearAll}>Clear All</button>
            <button class="footer-btn apply-btn" @click=${this._apply}>Apply</button>
          </div>
        </div>
      ` : f}
    `;
  }
  _toggleDropdown() {
    this._isOpen = !this._isOpen;
  }
  _toggleOption(t) {
    const e = new Set(this._selected);
    e.has(t) ? e.delete(t) : e.add(t), this._selected = e, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { values: Array.from(e) } }));
  }
  _clearAll() {
    this._selected = /* @__PURE__ */ new Set(), this.dispatchEvent(new CustomEvent("tarmac-clear", { bubbles: !0, composed: !0 }));
  }
  _apply() {
    this._isOpen = !1, this.dispatchEvent(new CustomEvent("tarmac-apply", { bubbles: !0, composed: !0, detail: { values: Array.from(this._selected) } }));
  }
};
r([
  d({ type: String })
], i.prototype, "placeholder", 2);
r([
  d({ type: String })
], i.prototype, "size", 2);
r([
  d({ type: String })
], i.prototype, "options", 2);
r([
  u()
], i.prototype, "_isOpen", 2);
r([
  u()
], i.prototype, "_selected", 2);
i = r([
  x("tarmac-filter-dropdown")
], i);
export {
  i as TarmacFilterDropdown
};
