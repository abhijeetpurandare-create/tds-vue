import { defineComponent as k, resolveComponent as S, openBlock as w, createBlock as _, withCtx as D, renderSlot as $ } from "vue";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const bt = globalThis, Dt = bt.ShadowRoot && (bt.ShadyCSS === void 0 || bt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ot = Symbol(), Vt = /* @__PURE__ */ new WeakMap();
let Po = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Ot) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Dt && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = Vt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && Vt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const At = (t) => new Po(typeof t == "string" ? t : t + "", void 0, Ot), yt = (t, ...e) => {
  const s = t.length === 1 ? t[0] : e.reduce((i, o, a) => i + ((r) => {
    if (r._$cssResult$ === !0) return r.cssText;
    if (typeof r == "number") return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + t[a + 1], t[0]);
  return new Po(s, t, Ot);
}, qo = (t, e) => {
  if (Dt) t.adoptedStyleSheets = e.map((s) => s instanceof CSSStyleSheet ? s : s.styleSheet);
  else for (const s of e) {
    const i = document.createElement("style"), o = bt.litNonce;
    o !== void 0 && i.setAttribute("nonce", o), i.textContent = s.cssText, t.appendChild(i);
  }
}, Ut = Dt ? (t) => t : (t) => t instanceof CSSStyleSheet ? ((e) => {
  let s = "";
  for (const i of e.cssRules) s += i.cssText;
  return At(s);
})(t) : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Ko, defineProperty: Xo, getOwnPropertyDescriptor: Yo, getOwnPropertyNames: Jo, getOwnPropertySymbols: Zo, getPrototypeOf: Qo } = Object, $t = globalThis, Mt = $t.trustedTypes, es = Mt ? Mt.emptyScript : "", ts = $t.reactiveElementPolyfillSupport, it = (t, e) => t, gt = { toAttribute(t, e) {
  switch (e) {
    case Boolean:
      t = t ? es : null;
      break;
    case Object:
    case Array:
      t = t == null ? t : JSON.stringify(t);
  }
  return t;
}, fromAttribute(t, e) {
  let s = t;
  switch (e) {
    case Boolean:
      s = t !== null;
      break;
    case Number:
      s = t === null ? null : Number(t);
      break;
    case Object:
    case Array:
      try {
        s = JSON.parse(t);
      } catch {
        s = null;
      }
  }
  return s;
} }, Pt = (t, e) => !Ko(t, e), Wt = { attribute: !0, type: String, converter: gt, reflect: !1, useDefault: !1, hasChanged: Pt };
Symbol.metadata ??= Symbol("metadata"), $t.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let Ge = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, s = Wt) {
    if (s.state && (s.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((s = Object.create(s)).wrapped = !0), this.elementProperties.set(e, s), !s.noAccessor) {
      const i = Symbol(), o = this.getPropertyDescriptor(e, i, s);
      o !== void 0 && Xo(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, s, i) {
    const { get: o, set: a } = Yo(this.prototype, e) ?? { get() {
      return this[s];
    }, set(r) {
      this[s] = r;
    } };
    return { get: o, set(r) {
      const d = o?.call(this);
      a?.call(this, r), this.requestUpdate(e, d, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Wt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(it("elementProperties"))) return;
    const e = Qo(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(it("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(it("properties"))) {
      const s = this.properties, i = [...Jo(s), ...Zo(s)];
      for (const o of i) this.createProperty(o, s[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const s = litPropertyMetadata.get(e);
      if (s !== void 0) for (const [i, o] of s) this.elementProperties.set(i, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [s, i] of this.elementProperties) {
      const o = this._$Eu(s, i);
      o !== void 0 && this._$Eh.set(o, s);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const s = [];
    if (Array.isArray(e)) {
      const i = new Set(e.flat(1 / 0).reverse());
      for (const o of i) s.unshift(Ut(o));
    } else e !== void 0 && s.push(Ut(e));
    return s;
  }
  static _$Eu(e, s) {
    const i = s.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), s = this.constructor.elementProperties;
    for (const i of s.keys()) this.hasOwnProperty(i) && (e.set(i, this[i]), delete this[i]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return qo(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, s, i) {
    this._$AK(e, i);
  }
  _$ET(e, s) {
    const i = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, i);
    if (o !== void 0 && i.reflect === !0) {
      const a = (i.converter?.toAttribute !== void 0 ? i.converter : gt).toAttribute(s, i.type);
      this._$Em = e, a == null ? this.removeAttribute(o) : this.setAttribute(o, a), this._$Em = null;
    }
  }
  _$AK(e, s) {
    const i = this.constructor, o = i._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const a = i.getPropertyOptions(o), r = typeof a.converter == "function" ? { fromAttribute: a.converter } : a.converter?.fromAttribute !== void 0 ? a.converter : gt;
      this._$Em = o;
      const d = r.fromAttribute(s, a.type);
      this[o] = d ?? this._$Ej?.get(o) ?? d, this._$Em = null;
    }
  }
  requestUpdate(e, s, i, o = !1, a) {
    if (e !== void 0) {
      const r = this.constructor;
      if (o === !1 && (a = this[e]), i ??= r.getPropertyOptions(e), !((i.hasChanged ?? Pt)(a, s) || i.useDefault && i.reflect && a === this._$Ej?.get(e) && !this.hasAttribute(r._$Eu(e, i)))) return;
      this.C(e, s, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, s, { useDefault: i, reflect: o, wrapped: a }, r) {
    i && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, r ?? s ?? this[e]), a !== !0 || r !== void 0) || (this._$AL.has(e) || (this.hasUpdated || i || (s = void 0), this._$AL.set(e, s)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (s) {
      Promise.reject(s);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0) for (const [o, a] of i) {
        const { wrapped: r } = a, d = this[o];
        r !== !0 || this._$AL.has(o) || d === void 0 || this.C(o, void 0, a, d);
      }
    }
    let e = !1;
    const s = this._$AL;
    try {
      e = this.shouldUpdate(s), e ? (this.willUpdate(s), this._$EO?.forEach((i) => i.hostUpdate?.()), this.update(s)) : this._$EM();
    } catch (i) {
      throw e = !1, this._$EM(), i;
    }
    e && this._$AE(s);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((s) => s.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((s) => this._$ET(s, this[s])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
Ge.elementStyles = [], Ge.shadowRootOptions = { mode: "open" }, Ge[it("elementProperties")] = /* @__PURE__ */ new Map(), Ge[it("finalized")] = /* @__PURE__ */ new Map(), ts?.({ ReactiveElement: Ge }), ($t.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const jt = globalThis, Gt = (t) => t, ft = jt.trustedTypes, It = ft ? ft.createPolicy("lit-html", { createHTML: (t) => t }) : void 0, jo = "$lit$", ke = `lit$${Math.random().toFixed(9).slice(2)}$`, Ho = "?" + ke, os = `<${Ho}>`, He = document, rt = () => He.createComment(""), at = (t) => t === null || typeof t != "object" && typeof t != "function", Ht = Array.isArray, ss = (t) => Ht(t) || typeof t?.[Symbol.iterator] == "function", Bt = `[ 	
\f\r]`, st = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, qt = /-->/g, Kt = />/g, Pe = RegExp(`>|${Bt}(?:([^\\s"'>=/]+)(${Bt}*=${Bt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Xt = /'/g, Yt = /"/g, No = /^(?:script|style|textarea|title)$/i, Ro = (t) => (e, ...s) => ({ _$litType$: t, strings: e, values: s }), c = Ro(1), Jt = Ro(2), Ie = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Zt = /* @__PURE__ */ new WeakMap(), je = He.createTreeWalker(He, 129);
function Lo(t, e) {
  if (!Ht(t) || !t.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return It !== void 0 ? It.createHTML(e) : e;
}
const is = (t, e) => {
  const s = t.length - 1, i = [];
  let o, a = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", r = st;
  for (let d = 0; d < s; d++) {
    const l = t[d];
    let p, b, h = -1, g = 0;
    for (; g < l.length && (r.lastIndex = g, b = r.exec(l), b !== null); ) g = r.lastIndex, r === st ? b[1] === "!--" ? r = qt : b[1] !== void 0 ? r = Kt : b[2] !== void 0 ? (No.test(b[2]) && (o = RegExp("</" + b[2], "g")), r = Pe) : b[3] !== void 0 && (r = Pe) : r === Pe ? b[0] === ">" ? (r = o ?? st, h = -1) : b[1] === void 0 ? h = -2 : (h = r.lastIndex - b[2].length, p = b[1], r = b[3] === void 0 ? Pe : b[3] === '"' ? Yt : Xt) : r === Yt || r === Xt ? r = Pe : r === qt || r === Kt ? r = st : (r = Pe, o = void 0);
    const f = r === Pe && t[d + 1].startsWith("/>") ? " " : "";
    a += r === st ? l + os : h >= 0 ? (i.push(p), l.slice(0, h) + jo + l.slice(h) + ke + f) : l + ke + (h === -2 ? d : f);
  }
  return [Lo(t, a + (t[s] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), i];
};
let Et = class Vo {
  constructor({ strings: e, _$litType$: s }, i) {
    let o;
    this.parts = [];
    let a = 0, r = 0;
    const d = e.length - 1, l = this.parts, [p, b] = is(e, s);
    if (this.el = Vo.createElement(p, i), je.currentNode = this.el.content, s === 2 || s === 3) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (o = je.nextNode()) !== null && l.length < d; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const h of o.getAttributeNames()) if (h.endsWith(jo)) {
          const g = b[r++], f = o.getAttribute(h).split(ke), m = /([.?@])?(.*)/.exec(g);
          l.push({ type: 1, index: a, name: m[2], strings: f, ctor: m[1] === "." ? as : m[1] === "?" ? ns : m[1] === "@" ? ls : vt }), o.removeAttribute(h);
        } else h.startsWith(ke) && (l.push({ type: 6, index: a }), o.removeAttribute(h));
        if (No.test(o.tagName)) {
          const h = o.textContent.split(ke), g = h.length - 1;
          if (g > 0) {
            o.textContent = ft ? ft.emptyScript : "";
            for (let f = 0; f < g; f++) o.append(h[f], rt()), je.nextNode(), l.push({ type: 2, index: ++a });
            o.append(h[g], rt());
          }
        }
      } else if (o.nodeType === 8) if (o.data === Ho) l.push({ type: 2, index: a });
      else {
        let h = -1;
        for (; (h = o.data.indexOf(ke, h + 1)) !== -1; ) l.push({ type: 7, index: a }), h += ke.length - 1;
      }
      a++;
    }
  }
  static createElement(e, s) {
    const i = He.createElement("template");
    return i.innerHTML = e, i;
  }
};
function qe(t, e, s = t, i) {
  if (e === Ie) return e;
  let o = i !== void 0 ? s._$Co?.[i] : s._$Cl;
  const a = at(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== a && (o?._$AO?.(!1), a === void 0 ? o = void 0 : (o = new a(t), o._$AT(t, s, i)), i !== void 0 ? (s._$Co ??= [])[i] = o : s._$Cl = o), o !== void 0 && (e = qe(t, o._$AS(t, e.values), o, i)), e;
}
class rs {
  constructor(e, s) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = s;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: s }, parts: i } = this._$AD, o = (e?.creationScope ?? He).importNode(s, !0);
    je.currentNode = o;
    let a = je.nextNode(), r = 0, d = 0, l = i[0];
    for (; l !== void 0; ) {
      if (r === l.index) {
        let p;
        l.type === 2 ? p = new Nt(a, a.nextSibling, this, e) : l.type === 1 ? p = new l.ctor(a, l.name, l.strings, this, e) : l.type === 6 && (p = new ds(a, this, e)), this._$AV.push(p), l = i[++d];
      }
      r !== l?.index && (a = je.nextNode(), r++);
    }
    return je.currentNode = He, o;
  }
  p(e) {
    let s = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(e, i, s), s += i.strings.length - 2) : i._$AI(e[s])), s++;
  }
}
let Nt = class Uo {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, s, i, o) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = e, this._$AB = s, this._$AM = i, this.options = o, this._$Cv = o?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const s = this._$AM;
    return s !== void 0 && e?.nodeType === 11 && (e = s.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, s = this) {
    e = qe(this, e, s), at(e) ? e === u || e == null || e === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : e !== this._$AH && e !== Ie && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : ss(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== u && at(this._$AH) ? this._$AA.nextSibling.data = e : this.T(He.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: s, _$litType$: i } = e, o = typeof i == "number" ? this._$AC(e) : (i.el === void 0 && (i.el = Et.createElement(Lo(i.h, i.h[0]), this.options)), i);
    if (this._$AH?._$AD === o) this._$AH.p(s);
    else {
      const a = new rs(o, this), r = a.u(this.options);
      a.p(s), this.T(r), this._$AH = a;
    }
  }
  _$AC(e) {
    let s = Zt.get(e.strings);
    return s === void 0 && Zt.set(e.strings, s = new Et(e)), s;
  }
  k(e) {
    Ht(this._$AH) || (this._$AH = [], this._$AR());
    const s = this._$AH;
    let i, o = 0;
    for (const a of e) o === s.length ? s.push(i = new Uo(this.O(rt()), this.O(rt()), this, this.options)) : i = s[o], i._$AI(a), o++;
    o < s.length && (this._$AR(i && i._$AB.nextSibling, o), s.length = o);
  }
  _$AR(e = this._$AA.nextSibling, s) {
    for (this._$AP?.(!1, !0, s); e !== this._$AB; ) {
      const i = Gt(e).nextSibling;
      Gt(e).remove(), e = i;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}, vt = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, s, i, o, a) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = e, this.name = s, this._$AM = o, this.options = a, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(e, s = this, i, o) {
    const a = this.strings;
    let r = !1;
    if (a === void 0) e = qe(this, e, s, 0), r = !at(e) || e !== this._$AH && e !== Ie, r && (this._$AH = e);
    else {
      const d = e;
      let l, p;
      for (e = a[0], l = 0; l < a.length - 1; l++) p = qe(this, d[i + l], s, l), p === Ie && (p = this._$AH[l]), r ||= !at(p) || p !== this._$AH[l], p === u ? e = u : e !== u && (e += (p ?? "") + a[l + 1]), this._$AH[l] = p;
    }
    r && !o && this.j(e);
  }
  j(e) {
    e === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
};
class as extends vt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === u ? void 0 : e;
  }
}
class ns extends vt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== u);
  }
}
class ls extends vt {
  constructor(e, s, i, o, a) {
    super(e, s, i, o, a), this.type = 5;
  }
  _$AI(e, s = this) {
    if ((e = qe(this, e, s, 0) ?? u) === Ie) return;
    const i = this._$AH, o = e === u && i !== u || e.capture !== i.capture || e.once !== i.once || e.passive !== i.passive, a = e !== u && (i === u || o);
    o && this.element.removeEventListener(this.name, this, i), a && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ds {
  constructor(e, s, i) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = s, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    qe(this, e);
  }
}
const cs = jt.litHtmlPolyfillSupport;
cs?.(Et, Nt), (jt.litHtmlVersions ??= []).push("3.3.2");
const ps = (t, e, s) => {
  const i = s?.renderBefore ?? e;
  let o = i._$litPart$;
  if (o === void 0) {
    const a = s?.renderBefore ?? null;
    i._$litPart$ = o = new Nt(e.insertBefore(rt(), a), a, void 0, s ?? {});
  }
  return o._$AI(t), o;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Rt = globalThis;
let x = class extends Ge {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const s = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = ps(s, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return Ie;
  }
};
x._$litElement$ = !0, x.finalized = !0, Rt.litElementHydrateSupport?.({ LitElement: x });
const hs = Rt.litElementPolyfillSupport;
hs?.({ LitElement: x });
(Rt.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const z = (t) => (e, s) => {
  s !== void 0 ? s.addInitializer(() => {
    customElements.define(t, e);
  }) : customElements.define(t, e);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const us = { attribute: !0, type: String, converter: gt, reflect: !1, hasChanged: Pt }, bs = (t = us, e, s) => {
  const { kind: i, metadata: o } = s;
  let a = globalThis.litPropertyMetadata.get(o);
  if (a === void 0 && globalThis.litPropertyMetadata.set(o, a = /* @__PURE__ */ new Map()), i === "setter" && ((t = Object.create(t)).wrapped = !0), a.set(s.name, t), i === "accessor") {
    const { name: r } = s;
    return { set(d) {
      const l = e.get.call(this);
      e.set.call(this, d), this.requestUpdate(r, l, t, !0, d);
    }, init(d) {
      return d !== void 0 && this.C(r, void 0, t, d), d;
    } };
  }
  if (i === "setter") {
    const { name: r } = s;
    return function(d) {
      const l = this[r];
      e.call(this, d), this.requestUpdate(r, l, t, !0, d);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function n(t) {
  return (e, s) => typeof s == "object" ? bs(t, e, s) : ((i, o, a) => {
    const r = o.hasOwnProperty(a);
    return o.constructor.createProperty(a, i), r ? Object.getOwnPropertyDescriptor(o, a) : void 0;
  })(t, e, s);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function ee(t) {
  return n({ ...t, state: !0, attribute: !1 });
}
const Mo = {
  // Brand
  "--delhivery-red": "#ED4136",
  "--delhivery-blue": "#5b80f7",
  // ── Success ──────────────────────────────────────────────
  "--success-bg-lightest": "#E6F4EA",
  "--success-bg": "#C6E6D4",
  "--success-bg-darkest": "#A6D8BE",
  "--success-stroke-lighter": "#8CCBAA",
  "--success-stroke": "#6EBF96",
  "--success-stroke-dark": "#50B382",
  "--success": "#34A853",
  "--success-dark": "#2E8B47",
  "--success-font-dark": "#1A6E3A",
  "--success-font-light": "#B7E1C7",
  // ── Error ────────────────────────────────────────────────
  "--error-bg-lightest": "#FCE8E6",
  "--error-bg": "#F9D1D1",
  "--error-bg-darkest": "#F6BABA",
  "--error-stroke-lighter": "#F4A3A3",
  "--error-stroke": "#F28C8C",
  "--error-stroke-dark": "#F07575",
  "--error": "#EA4335",
  "--error-dark": "#D32F2F",
  "--error-font-dark": "#B71C1C",
  "--error-font-light": "#F5B7B1",
  // ── Warning ──────────────────────────────────────────────
  "--warning-bg-lightest": "#FFF3E0",
  "--warning-bg": "#FFE0B2",
  "--warning-bg-darkest": "#FFCC80",
  "--warning-stroke-lighter": "#FFB74D",
  "--warning-stroke": "#FFA726",
  "--warning-stroke-dark": "#FF9800",
  "--warning": "#FBBC05",
  "--warning-dark": "#F57C00",
  "--warning-font-dark": "#E65100",
  "--warning-font-light": "#FFE0B2",
  // ── Information ──────────────────────────────────────────
  "--information-bg-lightest": "#E3F2FD",
  "--information-bg-lighter": "#BBDEFB",
  "--information-bg": "#90CAF9",
  "--information-bg-dark": "#64B5F6",
  "--information-bg-darkest": "#42A5F5",
  "--information-stroke-lightest": "#E3F2FD",
  "--information-stroke-lighter": "#BBDEFB",
  "--information-stroke": "#90CAF9",
  "--information-stroke-dark": "#64B5F6",
  "--information-stroke-darkest": "#42A5F5",
  "--information": "#2196F3",
  "--information-dark": "#1E88E5",
  "--information-light": "#BBDEFB",
  // ── Failure ──────────────────────────────────────────────
  "--failure-bg-lightest": "#FFEBEE",
  "--failure-bg-lighter": "#FFCDD2",
  "--failure-bg": "#EF9A9A",
  "--failure-bg-dark": "#E57373",
  "--failure-bg-darkest": "#EF5350",
  "--failure-stroke-lightest": "#FFEBEE",
  "--failure-stroke-lighter": "#FFCDD2",
  "--failure-stroke": "#EF9A9A",
  "--failure-stroke-dark": "#E57373",
  "--failure-stroke-darkest": "#EF5350",
  "--failure": "#F44336",
  "--failure-dark": "#E53935",
  "--failure-light": "#FFCDD2",
  // ── Pending ──────────────────────────────────────────────
  "--pending-bg-lightest": "#FFF3E0",
  "--pending-bg-lighter": "#FFE0B2",
  "--pending-bg": "#FFCC80",
  "--pending-bg-dark": "#FFB74D",
  "--pending-bg-darkest": "#FFA726",
  "--pending-stroke-lightest": "#FFF3E0",
  "--pending-stroke-lighter": "#FFE0B2",
  "--pending-stroke": "#FFCC80",
  "--pending-stroke-dark": "#FFB74D",
  "--pending-stroke-darkest": "#FFA726",
  "--pending": "#FF9800",
  "--pending-dark": "#FB8C00",
  "--pending-light": "#FFE0B2",
  // ── Shadows ──────────────────────────────────────────────
  "--primary-shadow": "0 35px 60px -15px rgba(0,0,0,0.3)",
  "--warning-shadow": "0 0 0 4px rgba(245, 158, 11, 0.1), 0 1px 3px 0 rgba(245, 158, 11, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "--success-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
};
async function gs(t) {
  const { source: e, activeTheme: s = "light", overrides: i = {} } = t;
  let o = {};
  try {
    const a = fs(e) || e.startsWith("/") || e.startsWith("./") ? e : `/${e}`, r = await fetch(a, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!r.ok)
      throw new Error(`Failed to load theme: HTTP ${r.status}`);
    if (r.headers.get("Content-Type") !== "application/json") {
      const d = await r.text();
      try {
        const l = JSON.parse(d);
        o = l.record ?? l;
      } catch {
        throw new Error(`Invalid JSON in theme file: ${e}`);
      }
    } else
      o = await r.json();
  } catch (a) {
    throw console.error("[Tarmac Tokens] Error loading theme:", a), a;
  }
  return { ...o[s] ? o[s] : o, ...i };
}
function fs(t) {
  try {
    return new URL(t), !0;
  } catch {
    return !1;
  }
}
var ms = Object.defineProperty, ys = Object.getOwnPropertyDescriptor, Ze = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ys(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && ms(e, s, o), o;
};
const Ft = "tarmac-theme-loaded";
let Se = class extends x {
  constructor() {
    super(...arguments), this.source = "", this.activeTheme = "light", this.theme = {}, this.isLoading = !1, this.isReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.source ? this._loadTheme() : this.isReady = !0;
  }
  updated(e) {
    e.has("source") && this.source && this._loadTheme();
  }
  async _loadTheme() {
    this.isLoading = !0, this.isReady = !1;
    try {
      this.theme = await gs({
        source: this.source,
        activeTheme: this.activeTheme
      }), this.dispatchEvent(
        new CustomEvent(Ft, {
          bubbles: !0,
          composed: !0,
          detail: { theme: this.theme }
        })
      );
    } catch (e) {
      console.error("[tarmac-theme-provider] Failed to load theme:", e);
    } finally {
      this.isLoading = !1, this.isReady = !0;
    }
  }
  /**
   * Get the current theme. Called by child components.
   */
  getTheme() {
    return this.theme;
  }
  render() {
    return c`<slot></slot>`;
  }
};
Se.styles = [
  At($s()),
  yt`
      :host {
        display: contents;
      }
    `
];
Ze([
  n({ type: String })
], Se.prototype, "source", 2);
Ze([
  n({ type: String, attribute: "active-theme" })
], Se.prototype, "activeTheme", 2);
Ze([
  ee()
], Se.prototype, "theme", 2);
Ze([
  ee()
], Se.prototype, "isLoading", 2);
Ze([
  ee()
], Se.prototype, "isReady", 2);
Se = Ze([
  z("tarmac-theme-provider")
], Se);
function $s() {
  return `:host {
${Object.entries(Mo).map(([t, e]) => `  ${t}: ${e};`).join(`
`)}
}`;
}
function B(t) {
  let e = t;
  for (; e; ) {
    if (e instanceof HTMLElement && e.tagName === "TARMAC-THEME-PROVIDER")
      return e.getTheme?.() ?? {};
    e instanceof HTMLElement && e.assignedSlot ? e = e.assignedSlot : e.host ? e = e.host : e = e.parentNode;
  }
  return {};
}
function E(t, e) {
  const s = (i) => {
    const o = i.detail;
    o?.theme && e(o.theme);
  };
  return window.addEventListener(Ft, s), () => {
    window.removeEventListener(Ft, s);
  };
}
function vs(t, e, s) {
  return t.styles?.[e]?.[s] ? t.styles[e][s] : t.variants[s] || {};
}
function xs(t, e, s) {
  let i;
  return e === "secondary" && t.states.disabledSecondary ? i = t.states.disabledSecondary : e === "tertiary" && t.states.disabledTertiary ? i = t.states.disabledTertiary : i = t.states.disabled || {}, {
    backgroundColor: s.disabledBackgroundColor || i.backgroundColor,
    textColor: s.disabledTextColor || i.textColor,
    borderColor: s.disabledBorderColor || i.borderColor,
    cursor: i.cursor
  };
}
function Cs(t) {
  const {
    buttonConfig: e,
    variant: s,
    size: i,
    buttonStyle: o,
    buttonType: a,
    isRounded: r,
    isLoading: d,
    backgroundColor: l,
    borderColor: p,
    hoverColor: b,
    textColor: h,
    radius: g,
    border: f
  } = t, m = vs(e, o, s), y = xs(e, o, m), v = e.states.ghost || {}, C = o === "secondary" || s === "outline" || !!m.borderColor, A = a === "iconButton", O = e.sizes[i]?.iconButtonSize;
  let J;
  A && O ? J = e.sizes[i]?.iconButtonPadding || "0" : J = e.sizes[i]?.padding || (i === "sm" ? "0.375rem 0.75rem" : i === "md" ? "0.5rem 1rem" : "0.625rem 1.25rem");
  const F = e.sizes[i]?.fontSize || (i === "sm" ? "0.875rem" : i === "md" ? "1rem" : "1.125rem"), We = r ? e.base.radius?.rounded || "9999px" : g || e.base.radius?.default || "0.375rem", xe = l || m.backgroundColor || "#3B82F6", Oe = h || m.textColor || "white";
  let Ae, ot = "solid", Ce;
  C ? (Ae = "1px", Ce = p || m.borderColor || "transparent") : (Ae = f || p ? "1px" : "0", Ce = p || "transparent");
  const St = b || m.hoverColor || m.backgroundColor || xe, wt = m.hoverTextColor || m.textColor || Oe, _t = C && m.hoverBorderColor ? m.hoverBorderColor : Ce, zt = m.pressedColor || m.hoverColor || m.backgroundColor || xe, Tt = m.pressedTextColor || m.hoverTextColor || m.textColor || Oe, Go = m.focusRingColor ? `0 0 0 2px ${m.focusRingColor}` : e.base.focus?.ring || "0 0 0 2px rgba(0, 0, 0, 0.4)", Io = e.states.loading?.opacity ? Number(e.states.loading.opacity) : 0.8;
  return `
    :host {
      display: inline-block;
    }

    .tarmac-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${e.base.fontFamily?.replace("font-", "") || "sans-serif"};
      font-weight: ${Number(e.base.fontWeight?.replace("font-", "") || 500)};
      transition: all 0.15s ease-in-out;
      outline: none;
      cursor: pointer;
      padding: ${J};
      font-size: ${F};
      border-radius: ${We};
      background-color: ${xe};
      color: ${Oe};
      border-width: ${Ae};
      border-style: ${ot};
      border-color: ${Ce};
      ${A && O ? `width: ${O}; height: ${O};` : ""}
      ${d ? `opacity: ${Io}; pointer-events: none;` : ""}
    }

    .tarmac-btn:hover:not(:disabled):not(.ghost) {
      background-color: ${St};
      color: ${wt};
      border-color: ${_t};
    }

    .tarmac-btn:active:not(:disabled):not(.ghost) {
      background-color: ${zt};
      color: ${Tt};
    }

    .tarmac-btn:focus {
      box-shadow: ${Go};
      outline: none;
    }

    .tarmac-btn:disabled,
    .tarmac-btn.disabled {
      cursor: ${y.cursor || "not-allowed"};
      background-color: ${y.backgroundColor || "#E5E7EB"};
      color: ${y.textColor || "#9CA3AF"};
      border-color: ${y.borderColor || "transparent"};
    }

    .tarmac-btn.ghost {
      background-color: ${v.backgroundColor || "#dedede"};
      color: ${v.textColor || "transparent"};
      border-color: ${v.borderColor || "transparent"};
      cursor: ${v.cursor || "default"};
      pointer-events: none;
    }
  `;
}
function Qt(t, e, s, i) {
  const o = t.sizes[e]?.iconSize || (e === "sm" ? "1rem" : e === "md" ? "1.25rem" : "1.5rem"), a = t.sizes[e]?.gap || (e === "sm" ? "0.375rem" : e === "md" ? "0.5rem" : "0.625rem");
  return `
    .icon-${s} {
      width: ${o};
      height: ${o};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${i && s === "left" ? `margin-right: ${a};` : ""}
      ${i && s === "right" ? `margin-left: ${a};` : ""}
    }

    .icon-${s} ::slotted(svg),
    .icon-${s} svg {
      width: ${o};
      height: ${o};
    }
  `;
}
const ks = `
  @keyframes tarmac-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .tarmac-spinner {
    display: inline-block;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: tarmac-spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  .tarmac-spinner--sm {
    width: 14px;
    height: 14px;
  }

  .tarmac-spinner--md {
    width: 16px;
    height: 16px;
  }

  .tarmac-spinner--lg {
    width: 20px;
    height: 20px;
  }
`, N = {
  primary: { main: "#3B82F6", dark: "#1D4ED8", contrast: "#FFFFFF" },
  secondary: { main: "#6B7280", dark: "#374151", contrast: "#FFFFFF" }
}, eo = {
  base: {
    fontFamily: "sans-serif",
    fontWeight: "500",
    focus: {
      ring: "0 0 0 3px rgba(59, 130, 246, 0.5)"
    },
    radius: {
      default: "0.375rem",
      rounded: "9999px"
    }
  },
  variants: {
    primary: {
      backgroundColor: N.primary.main,
      textColor: N.primary.contrast,
      borderColor: N.primary.main,
      hoverColor: N.primary.dark,
      focusRingColor: N.primary.main
    },
    secondary: {
      backgroundColor: N.secondary.main,
      textColor: N.secondary.contrast,
      borderColor: N.secondary.main,
      hoverColor: N.secondary.dark,
      focusRingColor: N.secondary.main
    },
    outline: {
      backgroundColor: "transparent",
      textColor: N.primary.main,
      borderColor: N.primary.main,
      hoverColor: N.primary.main,
      hoverTextColor: N.primary.contrast,
      focusRingColor: N.primary.main
    }
  },
  sizes: {
    sm: {
      padding: "0.375rem 0.75rem",
      fontSize: "0.875rem",
      iconSize: "1rem",
      gap: "0.375rem"
    },
    md: {
      padding: "0.5rem 1rem",
      fontSize: "1rem",
      iconSize: "1.25rem",
      gap: "0.5rem"
    },
    lg: {
      padding: "0.75rem 1.5rem",
      fontSize: "1.125rem",
      iconSize: "1.5rem",
      gap: "0.625rem"
    }
  },
  states: {
    disabled: {
      backgroundColor: "#E0E0E0",
      textColor: "#9E9E9E",
      cursor: "not-allowed"
    },
    loading: {
      opacity: "0.7",
      cursor: "wait"
    }
  }
};
var Ss = Object.defineProperty, ws = Object.getOwnPropertyDescriptor, H = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ws(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ss(e, s, o), o;
};
let P = class extends x {
  constructor() {
    super(...arguments), this.variant = "primary", this.size = "md", this.buttonStyle = "primary", this.buttonType = "button", this.isLoading = !1, this.disabled = !1, this.isRounded = !1, this.isGhost = !1, this.text = "", this._buttonConfig = eo;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._buttonConfig = e?.components?.button || eo;
  }
  // ── Rendering ──────────────────────────────────────────────
  createRenderRoot() {
    return this.attachShadow({ mode: "open" });
  }
  render() {
    const e = this._hasSlottedContent("leading-icon");
    this._hasSlottedContent("trailing-icon");
    const s = !!this.text || this._hasSlottedContent("default"), i = this.buttonType === "iconButton", o = Cs({
      buttonConfig: this._buttonConfig,
      variant: this.variant,
      size: this.size,
      buttonStyle: this.buttonStyle,
      buttonType: this.buttonType,
      isRounded: this.isRounded,
      isLoading: this.isLoading,
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      hoverColor: this.hoverColor,
      textColor: this.textColor,
      radius: this.radius,
      border: this.border
    }), a = Qt(this._buttonConfig, this.size, "left", s), r = Qt(this._buttonConfig, this.size, "right", s), d = this.isGhost ? "ghost" : "", l = this.size === "lg" ? "tarmac-spinner--lg" : this.size === "sm" ? "tarmac-spinner--sm" : "tarmac-spinner--md";
    return c`
      <style>
        ${o}
        ${a}
        ${r}
        ${ks}
      </style>
      <button
        class="tarmac-btn ${d}"
        ?disabled=${this.disabled || this.isLoading}
        @click=${this._handleClick}
      >
        ${this.isLoading ? c`
              <span class="tarmac-spinner ${l}"></span>
              ${this.text || c`<slot></slot>`}
            ` : i ? c`
                <span class="icon-left">
                  <slot name="leading-icon"></slot>
                  ${e ? "" : c`<slot></slot>`}
                </span>
              ` : c`
                <span class="icon-left"><slot name="leading-icon"></slot></span>
                ${this.text || c`<slot></slot>`}
                <span class="icon-right"><slot name="trailing-icon"></slot></span>
              `}
      </button>
    `;
  }
  // ── Event handling ─────────────────────────────────────────
  _handleClick(e) {
    if (this.disabled || this.isLoading) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: e }
    }));
  }
  // ── Helpers ────────────────────────────────────────────────
  _hasSlottedContent(e) {
    if (e === "default") {
      const i = this.shadowRoot?.querySelector("slot:not([name])");
      return i ? i.assignedNodes({ flatten: !0 }).length > 0 : !!this.textContent?.trim();
    }
    const s = this.shadowRoot?.querySelector(`slot[name="${e}"]`);
    return s ? s.assignedNodes({ flatten: !0 }).length > 0 : !1;
  }
};
H([
  n({ type: String })
], P.prototype, "variant", 2);
H([
  n({ type: String })
], P.prototype, "size", 2);
H([
  n({ type: String, attribute: "button-style" })
], P.prototype, "buttonStyle", 2);
H([
  n({ type: String, attribute: "button-type" })
], P.prototype, "buttonType", 2);
H([
  n({ type: Boolean, attribute: "is-loading" })
], P.prototype, "isLoading", 2);
H([
  n({ type: Boolean })
], P.prototype, "disabled", 2);
H([
  n({ type: Boolean, attribute: "is-rounded" })
], P.prototype, "isRounded", 2);
H([
  n({ type: Boolean, attribute: "is-ghost" })
], P.prototype, "isGhost", 2);
H([
  n({ type: String })
], P.prototype, "text", 2);
H([
  n({ type: String, attribute: "background-color" })
], P.prototype, "backgroundColor", 2);
H([
  n({ type: String, attribute: "border-color" })
], P.prototype, "borderColor", 2);
H([
  n({ type: String, attribute: "text-color" })
], P.prototype, "textColor", 2);
H([
  n({ type: String, attribute: "hover-color" })
], P.prototype, "hoverColor", 2);
H([
  n({ type: String })
], P.prototype, "radius", 2);
H([
  n({ type: String })
], P.prototype, "border", 2);
P = H([
  z("tarmac-button")
], P);
function _s(t, e) {
  return t.variants?.[e] || {};
}
function zs(t, e) {
  return t.sizes?.[e] || {};
}
function Ts(t) {
  const { alertConfig: e, variant: s, size: i } = t, o = e.base || {}, a = _s(e, s), r = zs(e, i), d = o.fontFamily || "Noto Sans, sans-serif", l = o.captionFontFamily || d;
  return `
    :host {
      display: block;
      width: 100%;
    }

    /* ── Container ─────────────────────────────────────── */
    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 0;
      width: 100%;
      padding: ${r.padding || "12px"};
      border-radius: ${o.borderRadius || "4px"};
      box-shadow: ${o.shadow || "0px 0px 4px 0px rgba(0,0,0,0.1)"};
      background-color: ${a.backgroundColor || "#ffffff"};
      font-family: ${d};
      transition: ${o.transition || "all 0.15s ease-in-out"};
      box-sizing: border-box;
      position: relative;
    }

    /* ── Inner column ──────────────────────────────────── */
    .alert-inner {
      display: flex;
      flex-direction: column;
      gap: ${r.contentGap || "8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Row (icon + text + trailing) ──────────────────── */
    .alert-row {
      display: flex;
      align-items: flex-start;
      gap: ${r.iconGap || "10px"};
      width: 100%;
    }

    /* ── Text column ───────────────────────────────────── */
    .alert-text-col {
      display: flex;
      flex-direction: column;
      gap: ${r.contentGap || "8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Text block (title + description) ──────────────── */
    .alert-text-block {
      display: flex;
      flex-direction: column;
      gap: ${r.textGap || "4px"};
      align-items: flex-start;
      width: 100%;
    }

    /* ── Title ─────────────────────────────────────────── */
    .alert-title {
      font-family: ${d};
      font-weight: ${r.titleFontWeight ? Number(r.titleFontWeight) : i === "sm" ? 500 : 400};
      font-size: ${r.titleFontSize || "16px"};
      line-height: ${r.titleLineHeight || "24px"};
      color: ${a.titleColor || "#121212"};
      margin: 0;
      width: 100%;
    }

    /* ── Description ───────────────────────────────────── */
    .alert-description {
      font-family: ${i === "sm" ? l : d};
      font-weight: 400;
      font-size: ${r.descriptionFontSize || "14px"};
      line-height: ${r.descriptionLineHeight || "20px"};
      color: ${a.descriptionColor || "#3b3b3b"};
      margin: 0;
      width: 100%;
    }

    /* ── Single text ───────────────────────────────────── */
    .alert-single-text {
      font-family: ${d};
      font-weight: 400;
      font-size: ${r.singleTextFontSize || r.titleFontSize || "16px"};
      line-height: ${r.singleTextLineHeight || r.titleLineHeight || "24px"};
      color: ${a.singleTextColor || a.descriptionColor || "#2b2b2b"};
      margin: 0;
      width: 100%;
    }

    /* ── Icon wrapper ──────────────────────────────────── */
    .alert-icon-wrap {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: ${a.iconColor || "#2b2b2b"};
    }
    .alert-icon-wrap ::slotted(*),
    .alert-icon-wrap svg {
      width: ${r.iconSize || "24px"};
      height: ${r.iconSize || "24px"};
    }

    /* ── CTAs row ──────────────────────────────────────── */
    .alert-ctas {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
    }

    /* ── Close button ──────────────────────────────────── */
    .alert-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: ${a.iconColor || "#2b2b2b"};
      opacity: 0.6;
      transition: opacity 0.15s;
    }
    .alert-close-btn:hover {
      opacity: 1;
    }
  `;
}
function Bs(t, e, s, i) {
  const o = t.base || {}, a = t.variants?.[e] || {}, r = t.sizes?.[s] || {};
  return `
    :host { display: block; width: 100%; }

    .alert-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-family: ${o.fontFamily || "sans-serif"};
      font-weight: ${o.fontWeight || 500};
      transition: ${o.transition || "all 0.15s ease-in-out"};
      border-radius: ${o.radius || "0.5rem"};
      border: 1px solid;
      padding: ${r.padding || "1rem"};
      font-size: ${r.fontSize || "1rem"};
      background-color: ${i.backgroundColor || a.backgroundColor || "#FFFFFF"};
      color: ${i.textColor || a.textColor || "#111827"};
      border-color: ${i.borderColor || a.borderColor || "#E5E7EB"};
      box-sizing: border-box;
    }

    .alert-icon-wrap {
      flex-shrink: 0;
      width: ${r.iconSize || "1.25rem"};
      height: ${r.iconSize || "1.25rem"};
      color: ${i.iconColor || a.iconColor || "#6B7280"};
    }

    .alert-content { flex: 1 1 0%; }

    .alert-title {
      margin: 0;
      font-weight: 600;
      line-height: 1.2;
    }

    .alert-description {
      margin: 0;
      line-height: 1.5;
      color: ${a.textColor || "#111827"};
      opacity: 0.9;
    }

    .alert-close-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.25rem;
      color: ${a.textColor || "#111827"};
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.15s;
      border: none;
      background: none;
      outline: none;
    }
    .alert-close-btn:hover { opacity: 0.75; }
  `;
}
const to = {
  base: {
    fontFamily: "sans-serif",
    fontWeight: "500",
    transition: "all 0.15s ease-in-out",
    radius: "0.5rem",
    padding: "1rem"
  },
  variants: {
    default: {
      backgroundColor: "#FFFFFF",
      textColor: "#111827",
      borderColor: "#E5E7EB",
      iconColor: "#6B7280"
    },
    primary: {
      backgroundColor: "#93C5FD20",
      textColor: "#1D4ED8",
      borderColor: "#93C5FD",
      iconColor: "#3B82F6"
    },
    destructive: {
      backgroundColor: "#FCA5A520",
      textColor: "#B91C1C",
      borderColor: "#FCA5A5",
      iconColor: "#EF4444"
    },
    success: {
      backgroundColor: "#A7F3D020",
      textColor: "#047857",
      borderColor: "#A7F3D0",
      iconColor: "#10B981"
    },
    warning: {
      backgroundColor: "#FCD34D20",
      textColor: "#B45309",
      borderColor: "#FCD34D",
      iconColor: "#F59E0B"
    },
    info: {
      backgroundColor: "#93C5FD20",
      textColor: "#1D4ED8",
      borderColor: "#93C5FD",
      iconColor: "#3B82F6"
    }
  },
  sizes: {
    sm: { padding: "0.5rem 1rem", fontSize: "0.875rem", iconSize: "1rem" },
    md: { padding: "1rem", fontSize: "1rem", iconSize: "1.25rem" },
    lg: { padding: "1.25rem", fontSize: "1.125rem", iconSize: "1.5rem" }
  }
};
var Es = Object.defineProperty, Fs = Object.getOwnPropertyDescriptor, W = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fs(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Es(e, s, o), o;
};
const Ds = /* @__PURE__ */ new Set([
  "white",
  "black",
  "coal",
  "success",
  "error",
  "info",
  "warning"
]);
let R = class extends x {
  constructor() {
    super(...arguments), this.variant = "default", this.size = "md", this.title = "", this.description = "", this.closable = !1, this.alertStyle = "singleText", this.showCtas = !1, this.cancelText = "Cancel", this.proceedText = "Proceed", this._alertConfig = {}, this._legacyConfig = to;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._alertConfig = e?.components?.alerts || {}, this._legacyConfig = e?.components?.alert || to;
  }
  // ── Rendering ──────────────────────────────────────────────
  render() {
    return Ds.has(this.variant) ? this._renderTarmac() : this._renderLegacy();
  }
  _renderTarmac() {
    const e = this.size === "sm" ? "sm" : "lg", s = {
      alertConfig: this._alertConfig,
      variant: this.variant,
      size: e
    }, i = Ts(s), o = this.alertStyle === "singleText", a = this.closable;
    return c`
      <style>${i}</style>
      <div class="alert-container" role="alert">
        <div class="alert-inner">
          <div class="alert-row">
            <div class="alert-icon-wrap">
              <slot name="leading-icon"></slot>
            </div>
            <div class="alert-text-col">
              ${o ? this.title || this.description ? c`<div class="alert-single-text">${this.title || this.description}</div>` : u : c`
                    <div class="alert-text-block">
                      ${this.title ? c`<div class="alert-title">${this.title}</div>` : u}
                      ${this.description ? c`<div class="alert-description">${this.description}</div>` : u}
                    </div>
                  `}
              <slot></slot>
            </div>
            ${a ? c`
                  <button
                    type="button"
                    class="alert-close-btn"
                    aria-label="Close alert"
                    @click=${this._handleClose}
                  >
                    <slot name="trailing-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </slot>
                  </button>
                ` : c`
                  <div class="alert-icon-wrap">
                    <slot name="trailing-icon"></slot>
                  </div>
                `}
          </div>
          ${this.showCtas ? c`
                <div class="alert-ctas">
                  <slot name="cta-actions">
                    <tarmac-button
                      button-style="tertiary"
                      variant="black"
                      size=${e === "sm" ? "sm" : "md"}
                      text=${this.cancelText}
                      @tarmac-click=${this._handleCancel}
                    ></tarmac-button>
                    <tarmac-button
                      button-style="primary"
                      variant="black"
                      size=${e === "sm" ? "sm" : "md"}
                      text=${this.proceedText}
                      @tarmac-click=${this._handleProceed}
                    ></tarmac-button>
                  </slot>
                </div>
              ` : u}
        </div>
      </div>
    `;
  }
  _renderLegacy() {
    const e = Bs(this._legacyConfig, this.variant, this.size, {
      backgroundColor: this.backgroundColor,
      borderColor: this.borderColor,
      textColor: this.textColor,
      iconColor: this.iconColor
    });
    return c`
      <style>${e}</style>
      <div class="alert-container" role="alert">
        <span class="alert-icon-wrap">
          <slot name="icon"></slot>
        </span>
        <div class="alert-content">
          ${this.title ? c`<h5 class="alert-title">${this.title}</h5>` : u}
          ${this.description ? c`<div class="alert-description">${this.description}</div>` : u}
          <slot></slot>
        </div>
        ${this.closable ? c`
              <button type="button" class="alert-close-btn" aria-label="Close alert" @click=${this._handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            ` : u}
      </div>
    `;
  }
  // ── Events ─────────────────────────────────────────────────
  _handleClose() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
  _handleCancel() {
    this.dispatchEvent(new CustomEvent("tarmac-cancel", { bubbles: !0, composed: !0 }));
  }
  _handleProceed() {
    this.dispatchEvent(new CustomEvent("tarmac-proceed", { bubbles: !0, composed: !0 }));
  }
};
W([
  n({ type: String })
], R.prototype, "variant", 2);
W([
  n({ type: String })
], R.prototype, "size", 2);
W([
  n({ type: String })
], R.prototype, "title", 2);
W([
  n({ type: String })
], R.prototype, "description", 2);
W([
  n({ type: Boolean })
], R.prototype, "closable", 2);
W([
  n({ type: String, attribute: "alert-style" })
], R.prototype, "alertStyle", 2);
W([
  n({ type: Boolean, attribute: "show-ctas" })
], R.prototype, "showCtas", 2);
W([
  n({ type: String, attribute: "cancel-text" })
], R.prototype, "cancelText", 2);
W([
  n({ type: String, attribute: "proceed-text" })
], R.prototype, "proceedText", 2);
W([
  n({ type: String, attribute: "background-color" })
], R.prototype, "backgroundColor", 2);
W([
  n({ type: String, attribute: "border-color" })
], R.prototype, "borderColor", 2);
W([
  n({ type: String, attribute: "text-color" })
], R.prototype, "textColor", 2);
W([
  n({ type: String, attribute: "icon-color" })
], R.prototype, "iconColor", 2);
R = W([
  z("tarmac-alert")
], R);
function Os(t, e, s) {
  return t.types?.[e]?.[s] ? t.types[e][s] : t.variants[s] || {};
}
function As(t, e) {
  return e === "outlined" && t.states.disabledOutlined ? t.states.disabledOutlined : t.states.disabled || {};
}
function Ps(t) {
  const { badgeConfig: e, variant: s, size: i, badgeType: o, isDisabled: a, isGhost: r } = t, d = e.sizes[i] || {}, l = e.base.fontFamily || "sans-serif", p = Number(e.base.fontWeight || 500), b = e.base.borderRadius || "4px", h = d.iconSize || "12px";
  let g, f, m, y, v = "";
  if (r) {
    const C = e.states.ghost || {};
    g = C.backgroundColor || "#e6e6e6", f = C.textColor || "transparent", m = "0.5px", y = C.borderColor || "transparent", v = "pointer-events: none;";
  } else if (a) {
    const C = As(e, o);
    g = C.backgroundColor || "#e6e6e6", f = C.textColor || "#cdcbcb", m = "0.5px", y = C.borderColor || "transparent", v = "cursor: default;";
  } else {
    const C = Os(e, o, s);
    g = C.backgroundColor || "#e6e6e6", f = C.textColor || "#2b2b2b", m = C.borderColor ? "0.5px" : "0", y = C.borderColor || "transparent";
  }
  return `
    :host {
      display: inline-block;
    }

    .tarmac-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${l};
      font-weight: ${p};
      border-radius: ${b};
      padding: ${d.padding || "6px"};
      font-size: ${d.fontSize || "12px"};
      line-height: ${d.lineHeight || "16px"};
      gap: ${d.gap || "2px"};
      user-select: none;
      background-color: ${g};
      color: ${f};
      border-width: ${m};
      border-style: solid;
      border-color: ${y};
      ${v}
    }

    .badge-icon {
      width: ${h};
      height: ${h};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-icon ::slotted(svg),
    .badge-icon svg {
      width: ${h};
      height: ${h};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;
}
function js(t) {
  const { badgeConfig: e, variant: s, badgeType: i, isDisabled: o, isGhost: a } = t;
  return a ? "transparent" : o ? e.states?.disabled?.textColor || "#cdcbcb" : (e.types?.[i]?.[s] || e.variants?.[s] || {}).textColor || "#2b2b2b";
}
const oo = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    borderRadius: "4px"
  },
  types: {},
  variants: {
    black: { backgroundColor: "#000000", textColor: "#e6e6e6" },
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e6e6e6" },
    coal: { backgroundColor: "#64739b", textColor: "#f2f2f2" },
    dlv_red: { backgroundColor: "#ed1b36", textColor: "#e6e6e6" },
    info: { backgroundColor: "#2396fb", textColor: "#e6e6e6" },
    success: { backgroundColor: "#1ba86e", textColor: "#e6e6e6" },
    warning: { backgroundColor: "#f5c828", textColor: "#7b6414" },
    error: { backgroundColor: "#dc143c", textColor: "#e6e6e6" },
    cardbox: { backgroundColor: "#b88b5c", textColor: "#e6e6e6" }
  },
  sizes: {
    sm: { padding: "2px 4px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    md: { padding: "2px 6px", fontSize: "12px", lineHeight: "16px", iconSize: "12px", gap: "2px" },
    lg: { padding: "2px 6px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "2px" }
  },
  states: {
    disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", borderColor: "transparent" },
    disabledOutlined: { backgroundColor: "transparent", textColor: "#cdcbcb", borderColor: "#ededed" },
    ghost: { backgroundColor: "#e6e6e6", textColor: "transparent", borderColor: "transparent" }
  }
};
var Hs = Object.defineProperty, Ns = Object.getOwnPropertyDescriptor, _e = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ns(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Hs(e, s, o), o;
};
let le = class extends x {
  constructor() {
    super(...arguments), this.variant = "black", this.size = "md", this.badgeType = "solid", this.text = "", this.showStatus = !1, this.isDisabled = !1, this.isGhost = !1, this._badgeConfig = oo;
  }
  // ── Lifecycle ──────────────────────────────────────────────
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._badgeConfig = e?.components?.badge || oo;
  }
  // ── Rendering ──────────────────────────────────────────────
  render() {
    const e = {
      badgeConfig: this._badgeConfig,
      variant: this.variant,
      size: this.size,
      badgeType: this.badgeType,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost
    }, s = Ps(e), i = this.showStatus ? js(e) : "";
    return c`
      <style>${s}</style>
      <span class="tarmac-badge">
        ${this.showStatus ? c`<span class="status-dot" style="background-color: ${i}"></span>` : u}
        <span class="badge-icon"><slot name="leading-icon"></slot></span>
        ${this.text || c`<slot></slot>`}
        <span class="badge-icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
};
_e([
  n({ type: String })
], le.prototype, "variant", 2);
_e([
  n({ type: String })
], le.prototype, "size", 2);
_e([
  n({ type: String, attribute: "badge-type" })
], le.prototype, "badgeType", 2);
_e([
  n({ type: String })
], le.prototype, "text", 2);
_e([
  n({ type: Boolean, attribute: "show-status" })
], le.prototype, "showStatus", 2);
_e([
  n({ type: Boolean, attribute: "is-disabled" })
], le.prototype, "isDisabled", 2);
_e([
  n({ type: Boolean, attribute: "is-ghost" })
], le.prototype, "isGhost", 2);
le = _e([
  z("tarmac-badge")
], le);
var Rs = Object.defineProperty, Ls = Object.getOwnPropertyDescriptor, Ve = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ls(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Rs(e, s, o), o;
};
const so = {
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
let de = class extends x {
  constructor() {
    super(...arguments), this.size = "md", this.variant = "default", this.tarmacSize = "24px", this._spinnerConfig = so;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._spinnerConfig = e?.components?.spinner || so;
  }
  render() {
    const e = this._spinnerConfig;
    if (this.tarmacVariant) {
      const l = e.variants?.[this.tarmacVariant] || {}, p = e.sizes?.[this.tarmacSize] || {}, b = this.color || l.color || "#000000", h = this.trackColor || l.trackColor || "#d4d4d4", g = p.size || this.tarmacSize, f = p.strokeWidth || 3;
      return c`
        <div class="spinner-wrap" role="status" style="width:${g};height:${g}">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="${h}" stroke-width="${f}" opacity="0.3"/>
            <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${b}" stroke-width="${f}" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      `;
    }
    const s = e.variants?.[this.variant] || e.variants?.default || {}, i = e.sizes?.[this.size] || {}, o = this.color || s.color || "#3B82F6", a = this.trackColor || s.trackColor || "#E5E7EB", r = i.strokeWidth || 2, d = { sm: "16px", md: "24px", lg: "32px" }[this.size] || "24px";
    return c`
      <div class="spinner-wrap" role="status" style="width:${d};height:${d}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="${a}" stroke-width="${r}" opacity="0.3"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${o}" stroke-width="${r}" stroke-linecap="round"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    `;
  }
};
de.styles = yt`
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
Ve([
  n({ type: String })
], de.prototype, "size", 2);
Ve([
  n({ type: String })
], de.prototype, "variant", 2);
Ve([
  n({ type: String, attribute: "tarmac-variant" })
], de.prototype, "tarmacVariant", 2);
Ve([
  n({ type: String, attribute: "tarmac-size" })
], de.prototype, "tarmacSize", 2);
Ve([
  n({ type: String })
], de.prototype, "color", 2);
Ve([
  n({ type: String, attribute: "track-color" })
], de.prototype, "trackColor", 2);
de = Ve([
  z("tarmac-spinner")
], de);
function Vs(t, e, s) {
  return t.variants?.[e]?.[s] || {};
}
function Us(t, e) {
  return e === "outlined" && t.states.disabledOutlined ? t.states.disabledOutlined : t.states.disabled || {};
}
function Ms(t) {
  const { chipConfig: e, chipType: s, chipVariant: i, size: o, isDisabled: a, isGhost: r } = t, d = e.sizes[o] || {}, l = e.base.fontFamily || "sans-serif", p = Number(e.base.fontWeight || 500), b = e.base.borderRadius || "8px", h = e.base.transition || "all 0.15s ease-in-out", g = d.iconSize || "12px";
  let f, m, y, v, C = "", A = "", O = "", J = "";
  if (r) {
    const F = e.states.ghost || {};
    f = F.backgroundColor || "#e6e6e6", m = F.textColor || "transparent", y = "0.5px", v = F.borderColor || "transparent", C = "cursor: default; pointer-events: none;";
  } else if (a) {
    const F = Us(e, i);
    f = F.backgroundColor || "#e6e6e6", m = F.textColor || "#cdcbcb", y = "0.5px", v = F.borderColor || "transparent", C = "cursor: default;";
  } else {
    const F = Vs(e, i, s), We = i === "outlined" || !!F.borderColor;
    f = F.backgroundColor || "#e6e6e6", m = F.textColor || "#2b2b2b", y = We ? "0.5px" : "0", v = F.borderColor || "transparent";
    const xe = F.hoverColor || F.backgroundColor || "#d6d6d6", Oe = F.hoverTextColor || F.textColor || "#2b2b2b", Ae = We && F.hoverBorderColor ? `border-color: ${F.hoverBorderColor};` : "";
    A = `
      .tarmac-chip:hover {
        cursor: pointer;
        background-color: ${xe};
        color: ${Oe};
        ${Ae}
      }
    `;
    const ot = F.pressedColor || F.hoverColor || F.backgroundColor || "#cccccc", Ce = F.pressedTextColor || F.hoverTextColor || F.textColor || "#2b2b2b";
    O = `
      .tarmac-chip:active {
        background-color: ${ot};
        color: ${Ce};
      }
    `, J = `
      .tarmac-chip:focus {
        box-shadow: ${F.focusRingColor ? `0 0 0 2px ${F.focusRingColor}` : e.base.focus?.ring || "0 0 0 2px rgba(0, 0, 0, 0.4)"};
        outline: none;
      }
    `;
  }
  return `
    :host { display: inline-block; }

    .tarmac-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${l};
      font-weight: ${p};
      border-radius: ${b};
      transition: ${h};
      padding: ${d.padding || "8px"};
      font-size: ${d.fontSize || "12px"};
      line-height: ${d.lineHeight || "16px"};
      gap: ${d.gap || "4px"};
      user-select: none;
      cursor: pointer;
      outline: none;
      background-color: ${f};
      color: ${m};
      border-width: ${y};
      border-style: solid;
      border-color: ${v};
      ${C}
    }

    ${A}
    ${O}
    ${J}

    .chip-icon {
      width: ${g};
      height: ${g};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon ::slotted(svg), .chip-icon svg {
      width: ${g};
      height: ${g};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `;
}
function Ws(t) {
  const { chipConfig: e, chipType: s, chipVariant: i, isDisabled: o, isGhost: a } = t;
  return a ? "transparent" : o ? e?.states?.disabled?.textColor || "#cdcbcb" : e?.variants?.[i]?.[s]?.textColor || "#2b2b2b";
}
const io = {
  base: {
    fontFamily: "Noto Sans, sans-serif",
    fontWeight: "500",
    borderRadius: "8px",
    transition: "all 0.15s ease-in-out",
    focus: { ring: "0 0 0 2px rgba(0,0,0,0.4)" }
  },
  variants: {
    standard: {
      black: { backgroundColor: "#000000", textColor: "#e6e6e6", hoverColor: "#121212", pressedColor: "#1a1a1a", focusRingColor: "rgba(0,0,0,0.4)" },
      white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", hoverColor: "#f2f2f2", pressedColor: "#e6e6e6", focusRingColor: "rgba(255,255,255,0.4)" },
      coal: { backgroundColor: "#64739b", textColor: "#e6e6e6", hoverColor: "#4e5d80", pressedColor: "#5a6a90", focusRingColor: "rgba(0,0,0,0.4)" },
      blue: { backgroundColor: "#2396fb", textColor: "#e6e6e6", hoverColor: "#0d7de0", pressedColor: "#1a8af0", focusRingColor: "rgba(35,150,251,0.4)" },
      success: { backgroundColor: "#1ba86e", textColor: "#e6e6e6", hoverColor: "#148a5a", pressedColor: "#189960", focusRingColor: "rgba(27,168,110,0.4)" },
      error: { backgroundColor: "#dc143c", textColor: "#e6e6e6", hoverColor: "#b8102f", pressedColor: "#c41235", focusRingColor: "rgba(220,20,60,0.4)" },
      warning: { backgroundColor: "#f5c828", textColor: "#52430d", hoverColor: "#ddb420", pressedColor: "#e6bc24", focusRingColor: "rgba(245,200,40,0.4)" },
      legacy_blue: { backgroundColor: "#5b80f7", textColor: "#e6e6e6", hoverColor: "#4a6de0", pressedColor: "#5276f0", focusRingColor: "rgba(0,0,0,0.4)" },
      dlv_red: { backgroundColor: "#ed1b36", textColor: "#e6e6e6", hoverColor: "#d0162e", pressedColor: "#de1832", focusRingColor: "rgba(0,0,0,0.4)" }
    },
    outlined: {
      black: { backgroundColor: "transparent", textColor: "#2b2b2b", borderColor: "#2b2b2b", hoverColor: "#f2f2f2", hoverBorderColor: "#1a1a1a", pressedColor: "#f2f2f2", focusRingColor: "rgba(0,0,0,0.4)" },
      white: { backgroundColor: "transparent", textColor: "#e6e6e6", borderColor: "#e6e6e6", hoverColor: "rgba(255,255,255,0.1)", hoverBorderColor: "#cccccc", pressedColor: "rgba(255,255,255,0.1)", focusRingColor: "rgba(255,255,255,0.4)" },
      coal: { backgroundColor: "transparent", textColor: "#64739b", borderColor: "#64739b", hoverColor: "#f0f2f7", hoverBorderColor: "#4e5d80", pressedColor: "#f0f2f7", focusRingColor: "rgba(0,0,0,0.4)" },
      blue: { backgroundColor: "transparent", textColor: "#2396fb", borderColor: "#2396fb", hoverColor: "#eef6ff", hoverBorderColor: "#0d7de0", pressedColor: "#eef6ff", focusRingColor: "rgba(35,150,251,0.4)" },
      success: { backgroundColor: "transparent", textColor: "#1ba86e", borderColor: "#1ba86e", hoverColor: "#edfaf4", hoverBorderColor: "#148a5a", pressedColor: "#edfaf4", focusRingColor: "rgba(27,168,110,0.4)" },
      error: { backgroundColor: "transparent", textColor: "#dc143c", borderColor: "#dc143c", hoverColor: "#fef0f2", hoverBorderColor: "#b8102f", pressedColor: "#fef0f2", focusRingColor: "rgba(220,20,60,0.4)" },
      warning: { backgroundColor: "transparent", textColor: "#7b6414", borderColor: "#f5c828", hoverColor: "#fef9e6", hoverBorderColor: "#ddb420", pressedColor: "#fef9e6", focusRingColor: "rgba(245,200,40,0.4)" },
      legacy_blue: { backgroundColor: "transparent", textColor: "#5b80f7", borderColor: "#5b80f7", hoverColor: "#f0f3ff", hoverBorderColor: "#4a6de0", pressedColor: "#f0f3ff", focusRingColor: "rgba(0,0,0,0.4)" },
      dlv_red: { backgroundColor: "transparent", textColor: "#ed1b36", borderColor: "#ed1b36", hoverColor: "#fef0f2", hoverBorderColor: "#d0162e", pressedColor: "#fef0f2", focusRingColor: "rgba(0,0,0,0.4)" }
    }
  },
  sizes: {
    sm: { padding: "4px 6px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "4px" },
    md: { padding: "4px 8px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "4px" },
    lg: { padding: "6px 8px", fontSize: "14px", lineHeight: "20px", iconSize: "20px", gap: "4px" }
  },
  states: {
    disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", borderColor: "transparent" },
    disabledOutlined: { backgroundColor: "transparent", textColor: "#cdcbcb", borderColor: "#ededed" },
    ghost: { backgroundColor: "#e6e6e6", textColor: "transparent", borderColor: "transparent" }
  }
};
var Gs = Object.defineProperty, Is = Object.getOwnPropertyDescriptor, me = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Is(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Gs(e, s, o), o;
};
let oe = class extends x {
  constructor() {
    super(...arguments), this.chipType = "black", this.chipVariant = "standard", this.size = "md", this.text = "", this.statusLeft = !1, this.statusRight = !1, this.isDisabled = !1, this.isGhost = !1, this._chipConfig = io;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._chipConfig = e?.components?.chip || e?.components?.tag || io;
  }
  render() {
    const e = {
      chipConfig: this._chipConfig,
      chipType: this.chipType,
      chipVariant: this.chipVariant,
      size: this.size,
      isDisabled: this.isDisabled,
      isGhost: this.isGhost
    }, s = Ms(e), i = Ws(e);
    return c`
      <style>${s}</style>
      <span
        class="tarmac-chip"
        tabindex=${this.isDisabled || this.isGhost ? -1 : 0}
        role="button"
        aria-disabled=${this.isDisabled || u}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this.statusLeft ? c`<span class="status-dot" style="background-color:${i}"></span>` : u}
        <span class="chip-icon"><slot name="leading-icon"></slot></span>
        ${this.text || c`<slot></slot>`}
        <span class="chip-icon"><slot name="trailing-icon"></slot></span>
        ${this.statusRight ? c`<span class="status-dot" style="background-color:${i}"></span>` : u}
      </span>
    `;
  }
  _handleClick(e) {
    this.isDisabled || this.isGhost || this.dispatchEvent(new CustomEvent("tarmac-click", { bubbles: !0, composed: !0, detail: { originalEvent: e } }));
  }
  _handleKeydown(e) {
    (e.key === "Enter" || e.key === " ") && (e.preventDefault(), this._handleClick(e));
  }
};
me([
  n({ type: String, attribute: "chip-type" })
], oe.prototype, "chipType", 2);
me([
  n({ type: String, attribute: "chip-variant" })
], oe.prototype, "chipVariant", 2);
me([
  n({ type: String })
], oe.prototype, "size", 2);
me([
  n({ type: String })
], oe.prototype, "text", 2);
me([
  n({ type: Boolean, attribute: "status-left" })
], oe.prototype, "statusLeft", 2);
me([
  n({ type: Boolean, attribute: "status-right" })
], oe.prototype, "statusRight", 2);
me([
  n({ type: Boolean, attribute: "is-disabled" })
], oe.prototype, "isDisabled", 2);
me([
  n({ type: Boolean, attribute: "is-ghost" })
], oe.prototype, "isGhost", 2);
oe = me([
  z("tarmac-chip")
], oe);
function qs(t, e) {
  return t.variants?.[e] || {};
}
function Ks(t, e) {
  return t.sizes?.[e] || {};
}
function Xs(t) {
  const { config: e, variant: s, checkboxStyle: i, size: o, checked: a, indeterminate: r, disabled: d, hasLabel: l } = t, p = qs(e, s), b = Ks(e, o), h = e.base || {}, g = e.states?.disabled || {}, f = a || r, m = i === "rounded" ? h.radius?.rounded || "999px" : h.radius?.box || "2px", y = b.boxSize || "20px", v = b.borderWidth || h.borderWidth || "1px", C = b.checkedBorderWidth || v, A = f ? C : v, O = d ? g.borderColor || "#ededed" : f ? p.checkedBorderColor || p.checkedBackgroundColor || "#000" : p.borderColor || "#e6e6e6", J = d && f ? g.borderColor || "#ededed" : f ? p.checkedBackgroundColor || "#000" : p.backgroundColor || "#fff", F = f ? p.checkedHoverBorderColor || p.checkedBorderColor || "#000" : p.hoverBorderColor || "#ccc", We = f ? p.checkedHoverBackgroundColor || p.checkedBackgroundColor || "#000" : p.hoverBackgroundColor || p.backgroundColor || "#fff", xe = d ? g.checkmarkColor || "#cdcbcb" : p.checkmarkColor || "#e6e6e6", Oe = b.checkmarkWidth || "10px", Ae = b.checkmarkHeight || "8px", ot = b.dashWidth || "8px", Ce = b.dashHeight || "2px", St = h.label?.fontFamily || "Noto Sans, sans-serif", wt = d ? g.labelColor || "#cdcbcb" : h.label?.color || "#2b2b2b", _t = h.subtext?.fontFamily || "Noto Sans, sans-serif", zt = d ? g.subtextColor || "#cdcbcb" : h.subtext?.color || "#454545", Tt = p.focusRingColor || "rgba(0,0,0,0.4)";
  return `
    :host { display: inline-block; }

    .cb-wrapper {
      display: inline-flex;
      align-items: ${l ? "flex-start" : "center"};
      gap: ${b.gap || "6px"};
      cursor: ${d ? "default" : "pointer"};
      user-select: none;
      ${d ? "pointer-events: none;" : ""}
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
      width: ${y};
      height: ${y};
      min-width: ${y};
      min-height: ${y};
      border-width: ${A};
      border-style: solid;
      border-color: ${O};
      border-radius: ${m};
      background-color: ${J};
      transition: ${h.transition || "all 0.15s ease-in-out"};
      cursor: ${d ? "default" : "pointer"};
      position: relative;
      flex-shrink: 0;
    }

    ${d ? "" : `
    .cb-wrapper:hover .cb-box {
      border-color: ${F};
      background-color: ${We};
    }
    `}

    .cb-box:focus-within {
      outline: none;
      box-shadow: ${d ? "none" : `0 0 0 2px ${Tt}`};
    }

    /* Checkmark (checked state) */
    .cb-checkmark {
      display: ${a ? "flex" : "none"};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${xe};
    }
    .cb-checkmark svg {
      width: ${Oe};
      height: ${Ae};
    }

    /* Dash (indeterminate state) */
    .cb-dash {
      display: ${r && !a ? "block" : "none"};
      width: ${ot};
      height: ${Ce};
      background-color: ${xe};
      border-radius: 1px;
    }

    /* Label */
    .cb-label-col {
      display: flex;
      flex-direction: column;
    }

    .cb-label {
      font-family: ${St};
      font-size: ${b.labelFontSize || "14px"};
      line-height: ${b.labelLineHeight || "20px"};
      font-weight: 500;
      color: ${wt};
    }

    .cb-subtext {
      font-family: ${_t};
      font-size: ${b.subtextFontSize || "12px"};
      line-height: ${b.subtextLineHeight || "16px"};
      font-weight: 400;
      color: ${zt};
    }
  `;
}
var Ys = Object.defineProperty, Js = Object.getOwnPropertyDescriptor, ae = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Js(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ys(e, s, o), o;
};
const Zs = `<svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
let Z = class extends x {
  constructor() {
    super(...arguments), this.tarmacVariant = "standard", this.tarmacStyle = "box", this.size = "md", this.checked = !1, this.indeterminate = !1, this.disabled = !1, this.value = "", this.name = "", this.subtext = "", this._checkboxConfig = {};
  }
  connectedCallback() {
    super.connectedCallback(), this._resolveTheme(), this._unsubscribeTheme = E(this, () => {
      this._resolveTheme(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsubscribeTheme?.();
  }
  _resolveTheme() {
    const e = B(this);
    this._checkboxConfig = e?.components?.checkbox || {};
  }
  render() {
    const e = !!this.textContent?.trim() || this.querySelector("[slot]") !== null, s = !!this.subtext, i = Xs({
      config: this._checkboxConfig,
      variant: this.tarmacVariant,
      checkboxStyle: this.tarmacStyle,
      size: this.size,
      checked: this.checked,
      indeterminate: this.indeterminate,
      disabled: this.disabled,
      hasLabel: e
    });
    return c`
      <style>${i}</style>
      <label class="cb-wrapper" @click=${this._handleClick}>
        <input
          class="cb-input"
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name || u}
          value=${this.value || u}
          @change=${this._handleChange}
        />
        <span class="cb-box">
          <span class="cb-checkmark" .innerHTML=${Zs}></span>
          <span class="cb-dash"></span>
        </span>
        ${e || s ? c`
              <span class="cb-label-col">
                <span class="cb-label"><slot></slot></span>
                ${s ? c`<span class="cb-subtext">${this.subtext}</span>` : u}
              </span>
            ` : u}
      </label>
    `;
  }
  _handleClick(e) {
    e.target.tagName;
  }
  _handleChange(e) {
    const s = e.target;
    this.checked = s.checked, this.indeterminate = !1, this.dispatchEvent(new CustomEvent("tarmac-change", {
      bubbles: !0,
      composed: !0,
      detail: {
        checked: this.checked,
        value: this.value
      }
    }));
  }
};
ae([
  n({ type: String, attribute: "tarmac-variant" })
], Z.prototype, "tarmacVariant", 2);
ae([
  n({ type: String, attribute: "tarmac-style" })
], Z.prototype, "tarmacStyle", 2);
ae([
  n({ type: String })
], Z.prototype, "size", 2);
ae([
  n({ type: Boolean })
], Z.prototype, "checked", 2);
ae([
  n({ type: Boolean })
], Z.prototype, "indeterminate", 2);
ae([
  n({ type: Boolean })
], Z.prototype, "disabled", 2);
ae([
  n({ type: String })
], Z.prototype, "value", 2);
ae([
  n({ type: String })
], Z.prototype, "name", 2);
ae([
  n({ type: String })
], Z.prototype, "subtext", 2);
Z = ae([
  z("tarmac-checkbox")
], Z);
var Qs = Object.defineProperty, ei = Object.getOwnPropertyDescriptor, ze = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ei(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Qs(e, s, o), o;
};
const ro = {
  base: { fontFamily: "sans-serif", fontWeight: "500", borderRadius: "999px" },
  types: {
    solid: {
      black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
      white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e0e0e0" },
      coal: { backgroundColor: "#4a4a4a", textColor: "#ffffff" },
      blue: { backgroundColor: "#3b82f6", textColor: "#ffffff" },
      success: { backgroundColor: "#10b981", textColor: "#ffffff" },
      error: { backgroundColor: "#ef4444", textColor: "#ffffff" },
      warning: { backgroundColor: "#f59e0b", textColor: "#7b6414" },
      legacy_blue: { backgroundColor: "#5b80f7", textColor: "#ffffff" }
    },
    subtle: {
      black: { backgroundColor: "#e6e6e6", textColor: "#2b2b2b" },
      white: { backgroundColor: "#3a3a3a", textColor: "#ffffff" },
      coal: { backgroundColor: "#d9d9d9", textColor: "#4a4a4a" },
      blue: { backgroundColor: "#dbeafe", textColor: "#1d4ed8" },
      success: { backgroundColor: "#d1fae5", textColor: "#047857" },
      error: { backgroundColor: "#fee2e2", textColor: "#b91c1c" },
      warning: { backgroundColor: "#fef3c7", textColor: "#7b6414" },
      legacy_blue: { backgroundColor: "#e0e7ff", textColor: "#3b5bdb" }
    },
    outlined: {
      black: { backgroundColor: "transparent", textColor: "#2b2b2b", borderColor: "#2b2b2b" },
      white: { backgroundColor: "transparent", textColor: "#ffffff", borderColor: "#e0e0e0" },
      coal: { backgroundColor: "transparent", textColor: "#4a4a4a", borderColor: "#999999" },
      blue: { backgroundColor: "transparent", textColor: "#1d4ed8", borderColor: "#3b82f6" },
      success: { backgroundColor: "transparent", textColor: "#047857", borderColor: "#10b981" },
      error: { backgroundColor: "transparent", textColor: "#b91c1c", borderColor: "#ef4444" },
      warning: { backgroundColor: "transparent", textColor: "#7b6414", borderColor: "#f59e0b" },
      legacy_blue: { backgroundColor: "transparent", textColor: "#3b5bdb", borderColor: "#5b80f7" }
    }
  },
  variants: { black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" }, white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", borderColor: "#e0e0e0" } },
  sizes: {
    sm: { padding: "4px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    md: { padding: "6px", fontSize: "10px", lineHeight: "12px", iconSize: "12px", gap: "2px" },
    lg: { padding: "6px", fontSize: "12px", lineHeight: "16px", iconSize: "16px", gap: "2px" }
  },
  states: {
    disabled: { backgroundColor: "#dedede", textColor: "#cdcbcb", borderColor: "transparent" },
    ghost: { backgroundColor: "#dedede", textColor: "transparent", borderColor: "transparent" }
  }
};
function ti(t, e, s) {
  return t.types?.[e]?.[s] || t.variants[s] || {};
}
let ce = class extends x {
  constructor() {
    super(...arguments), this.pillVariant = "black", this.pillType = "solid", this.size = "md", this.text = "", this.showStatus = !1, this.isDisabled = !1, this.isGhost = !1, this._cfg = ro;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.pill_tarmac || ro;
  }
  render() {
    const e = this._cfg.sizes[this.size] || {}, s = e.iconSize || "12px";
    let i, o, a, r, d = "";
    if (this.isGhost) {
      const p = this._cfg.states.ghost || {};
      i = p.backgroundColor || "#dedede", o = p.textColor || "transparent", a = "0", r = "transparent", d = "pointer-events:none;";
    } else if (this.isDisabled) {
      const p = this._cfg.states.disabled || {};
      i = "transparent", o = p.textColor || "#cdcbcb", a = "0.5px", r = p.borderColor || "#ededed", d = "cursor:default;";
    } else {
      const p = ti(this._cfg, this.pillType, this.pillVariant);
      i = p.backgroundColor || "#e6e6e6", o = p.textColor || "#2b2b2b", a = p.borderColor ? "0.5px" : "0", r = p.borderColor || "transparent";
    }
    const l = this.isGhost ? "transparent" : this.isDisabled ? "#cdcbcb" : o;
    return c`
      <style>
        :host { display: inline-block; }
        .pill { display:inline-flex; align-items:center; justify-content:center; font-family:${this._cfg.base.fontFamily || "sans-serif"}; font-weight:${Number(this._cfg.base.fontWeight || 500)}; border-radius:${this._cfg.base.borderRadius || "999px"}; padding:${e.padding || "6px"}; font-size:${e.fontSize || "10px"}; line-height:${e.lineHeight || "12px"}; gap:${e.gap || "2px"}; user-select:none; background-color:${i}; color:${o}; border-width:${a}; border-style:solid; border-color:${r}; ${d} }
        .icon { width:${s}; height:${s}; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
        .icon ::slotted(svg), .icon svg { width:${s}; height:${s}; }
        .dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
      </style>
      <span class="pill">
        ${this.showStatus ? c`<span class="dot" style="background-color:${l}"></span>` : u}
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || c`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </span>
    `;
  }
};
ze([
  n({ type: String, attribute: "pill-variant" })
], ce.prototype, "pillVariant", 2);
ze([
  n({ type: String, attribute: "pill-type" })
], ce.prototype, "pillType", 2);
ze([
  n({ type: String })
], ce.prototype, "size", 2);
ze([
  n({ type: String })
], ce.prototype, "text", 2);
ze([
  n({ type: Boolean, attribute: "show-status" })
], ce.prototype, "showStatus", 2);
ze([
  n({ type: Boolean, attribute: "is-disabled" })
], ce.prototype, "isDisabled", 2);
ze([
  n({ type: Boolean, attribute: "is-ghost" })
], ce.prototype, "isGhost", 2);
ce = ze([
  z("tarmac-pill")
], ce);
var oi = Object.defineProperty, si = Object.getOwnPropertyDescriptor, ne = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? si(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && oi(e, s, o), o;
};
const ao = {
  base: { transition: "all 0.15s ease-in-out", focus: { ring: "0 0 0 2px rgba(0,0,0,0.4)" } },
  default: { backgroundColor: "#2b2b2b", textColor: "#ffffff", borderColor: "#e6e6e6", borderWidth: "0.5", hoverBackgroundColor: "#000000", hoverBorderColor: "#cccccc", hoverBorderWidth: "1", focusRingColor: "rgba(0,0,0,0.4)" },
  sizes: {
    xl: { dimension: "48px", fontSize: "20px", lineHeight: "26px", fontWeight: "600", iconSize: "28px", statusDotSize: "12px", statusDotPadding: "2px" },
    lg: { dimension: "40px", fontSize: "16px", lineHeight: "24px", fontWeight: "600", iconSize: "28px", statusDotSize: "8px", statusDotPadding: "2px" },
    md: { dimension: "36px", fontSize: "14px", lineHeight: "20px", fontWeight: "600", iconSize: "24px", statusDotSize: "6px", statusDotPadding: "2px" },
    sm: { dimension: "28px", fontSize: "12px", lineHeight: "16px", fontWeight: "600", iconSize: "16px", statusDotSize: "6px", statusDotPadding: "2px" }
  },
  radius: { round: "999px", square: { xl: "8px", lg: "8px", md: "8px", sm: "4px" } },
  states: { disabled: { backgroundColor: "#e6e6e6", textColor: "#cdcbcb", imageOverlay: "rgba(255,255,255,0.4)" }, ghost: { backgroundColor: "#dedede" } },
  statusDot: { active: "#1ba86e", inactive: "#a0a0a0", idle: "#f5c828", brand: "#ed1b36" }
};
let Q = class extends x {
  constructor() {
    super(...arguments), this.avatarType = "initials", this.shape = "round", this.size = "md", this.src = "", this.alt = "avatar", this.showStatus = !1, this.statusType = "active", this.isDisabled = !1, this.isGhost = !1, this._cfg = ao;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.avatar || ao;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = e.default || {}, o = s.dimension || "36px", a = this.shape === "round" ? e.radius?.round || "999px" : e.radius?.square?.[this.size] || "8px", r = s.iconSize || "24px", d = s.statusDotSize || "6px", l = s.statusDotPadding || "2px", p = e.statusDot?.[this.statusType] || "#1ba86e", b = this.showStatus && this.shape === "round" && !this.isGhost;
    let h, g, f, m, y = "", v = "", C = "";
    return this.isGhost ? (h = e.states?.ghost?.backgroundColor || "#dedede", g = "transparent", f = "0", m = "transparent", y = "pointer-events:none;") : this.isDisabled ? (h = e.states?.disabled?.backgroundColor || "#e6e6e6", g = e.states?.disabled?.textColor || "#cdcbcb", f = "0", m = "transparent", y = "cursor:default;") : (h = i.backgroundColor || "#2b2b2b", g = i.textColor || "#ffffff", f = i.borderWidth || "0.5px", m = i.borderColor || "#e6e6e6", v = `.avatar:hover { background-color:${i.hoverBackgroundColor || "#000"}; border-color:${i.hoverBorderColor || "#ccc"}; cursor:pointer; }`, C = `.avatar:focus { box-shadow:${i.focusRingColor ? `0 0 0 2px ${i.focusRingColor}` : e.base?.focus?.ring || "0 0 0 2px rgba(0,0,0,0.4)"}; outline:none; }`), c`
      <style>
        :host { display:inline-block; position:relative; }
        .avatar { display:inline-flex; align-items:center; justify-content:center; width:${o}; height:${o}; min-width:${o}; min-height:${o}; border-radius:${a}; font-family:sans-serif; font-size:${s.fontSize || "14px"}; line-height:${s.lineHeight || "20px"}; font-weight:${Number(s.fontWeight || 600)}; transition:${e.base?.transition || "all 0.15s ease-in-out"}; user-select:none; position:relative; overflow:visible; box-sizing:border-box; background-color:${h}; color:${g}; border-width:${f}; border-style:solid; border-color:${m}; ${y} }
        ${v} ${C}
        .avatar img { width:100%; height:100%; object-fit:cover; border-radius:${a}; }
        .avatar .icon-wrap { width:${r}; height:${r}; display:inline-flex; align-items:center; justify-content:center; }
        .avatar .icon-wrap ::slotted(svg), .avatar .icon-wrap svg { width:${r}; height:${r}; }
        .status-dot { position:absolute; bottom:0; right:0; width:${d}; height:${d}; border-radius:50%; background-color:${p}; border:${l} solid white; box-sizing:content-box; }
        .overlay { position:absolute; inset:0; border-radius:${a}; background-color:${e.states?.disabled?.imageOverlay || "rgba(255,255,255,0.4)"}; }
      </style>
      <span class="avatar" tabindex="0">
        ${this.isGhost ? u : this.avatarType === "image" && this.src ? c`<img src="${this.src}" alt="${this.alt}" />${this.isDisabled ? c`<span class="overlay"></span>` : u}` : this.avatarType === "icon" ? c`<span class="icon-wrap"><slot name="icon"></slot></span>` : c`<slot></slot>`}
      </span>
      ${b ? c`<span class="status-dot"></span>` : u}
    `;
  }
};
ne([
  n({ type: String, attribute: "avatar-type" })
], Q.prototype, "avatarType", 2);
ne([
  n({ type: String })
], Q.prototype, "shape", 2);
ne([
  n({ type: String })
], Q.prototype, "size", 2);
ne([
  n({ type: String })
], Q.prototype, "src", 2);
ne([
  n({ type: String })
], Q.prototype, "alt", 2);
ne([
  n({ type: Boolean, attribute: "show-status" })
], Q.prototype, "showStatus", 2);
ne([
  n({ type: String, attribute: "status-type" })
], Q.prototype, "statusType", 2);
ne([
  n({ type: Boolean, attribute: "is-disabled" })
], Q.prototype, "isDisabled", 2);
ne([
  n({ type: Boolean, attribute: "is-ghost" })
], Q.prototype, "isGhost", 2);
Q = ne([
  z("tarmac-avatar")
], Q);
var ii = Object.defineProperty, ri = Object.getOwnPropertyDescriptor, Ue = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ri(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && ii(e, s, o), o;
};
const no = {
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
let pe = class extends x {
  constructor() {
    super(...arguments), this.tarmacColor = "black", this.tarmacStyle = "filled", this.tarmacSize = "lg", this.checked = !1, this.disabled = !1, this.isGhost = !1, this._cfg = no;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.toggle_tarmac || no;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.tarmacSize] || {}, i = s.trackWidth || "40px", o = s.trackHeight || "24px", a = s.handleSize || "16px", r = s.handleOffset || "4px", d = e.base?.radius || "999px", l = e.base?.transition || "all 0.15s ease-in-out", p = this.tarmacStyle === "filled";
    let b, h, g, f;
    if (this.isGhost) {
      const y = e.states?.ghost || {};
      b = y.backgroundColor || "#dedede", h = `1px solid ${y.borderColor || "#e6e6e6"}`, g = y.handleColor || "#cdcbcb", f = "default";
    } else if (this.disabled) {
      const y = e.states?.disabled || {};
      b = y.checkedBackgroundColor || "#e6e6e6", h = p ? "none" : `1px solid ${y.borderColor || "#ededed"}`, g = y.handleColor || "#cdcbcb", f = "default";
    } else if (p) {
      const y = e.styles?.filled?.[this.tarmacColor] || {};
      b = this.checked ? y.checkedBackgroundColor || "#000" : y.uncheckedBackgroundColor || "#b3b1b1", h = "none", g = e.base?.handleColor || "#ffffff", f = "pointer";
    } else {
      const y = e.styles?.outlined?.[this.tarmacColor] || {};
      b = this.checked ? y.checkedBackgroundColor || "transparent" : y.uncheckedBackgroundColor || "transparent", h = `${s.borderWidth || "1px"} solid ${this.checked ? y.checkedBorderColor || "#000" : y.uncheckedBorderColor || "#b3b1b1"}`, g = this.checked ? y.handleCheckedColor || "#000" : y.handleUncheckedColor || "#b3b1b1", f = "pointer";
    }
    const m = this.checked ? "flex-end" : "flex-start";
    return c`
      <style>
        .track { position:relative; display:inline-flex; justify-content:${m}; align-items:center; width:${i}; height:${o}; border-radius:${d}; background-color:${b}; border:${h}; cursor:${f}; transition:${l}; padding:${r}; box-sizing:border-box; }
        .handle { width:${a}; height:${a}; border-radius:50%; background-color:${g}; transition:${l}; flex-shrink:0; }
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
pe.styles = yt`:host { display: inline-block; }`;
Ue([
  n({ type: String, attribute: "tarmac-color" })
], pe.prototype, "tarmacColor", 2);
Ue([
  n({ type: String, attribute: "tarmac-style" })
], pe.prototype, "tarmacStyle", 2);
Ue([
  n({ type: String, attribute: "tarmac-size" })
], pe.prototype, "tarmacSize", 2);
Ue([
  n({ type: Boolean })
], pe.prototype, "checked", 2);
Ue([
  n({ type: Boolean })
], pe.prototype, "disabled", 2);
Ue([
  n({ type: Boolean, attribute: "is-ghost" })
], pe.prototype, "isGhost", 2);
pe = Ue([
  z("tarmac-toggle")
], pe);
var ai = Object.defineProperty, ni = Object.getOwnPropertyDescriptor, ct = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ni(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && ai(e, s, o), o;
};
const lo = {
  base: { color: "#cccccc", dashPattern: "6 6" },
  sizes: { "0.5": { strokeWeight: "0.5px" }, 1: { strokeWeight: "1px" }, "1.5": { strokeWeight: "1.5px" } }
};
let Ke = class extends x {
  constructor() {
    super(...arguments), this.dividerType = "line", this.size = "1", this.orientation = "horizontal", this._cfg = lo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.divider || lo;
  }
  render() {
    const e = this._cfg, s = (e.sizes?.[this.size] || {}).strokeWeight || `${this.size}px`, i = this.color || e.base?.color || "#b3b1b1", o = this.dividerType === "dash", a = this.orientation === "vertical", r = o ? a ? `repeating-linear-gradient(to bottom, ${i} 0px, ${i} 6px, transparent 6px, transparent 12px)` : `repeating-linear-gradient(to right, ${i} 0px, ${i} 6px, transparent 6px, transparent 12px)` : "none", d = o ? "transparent" : i, l = a ? `:host{display:inline-block;} hr{border:none;width:${s};height:100%;margin:0;padding:0;flex-shrink:0;background-color:${d};background-image:${r};}` : `:host{display:block;width:100%;} hr{border:none;height:${s};width:100%;margin:0;padding:0;flex-shrink:0;background-color:${d};background-image:${r};}`;
    return c`
      <style>${l}</style>
      <hr role="separator" aria-orientation=${this.orientation} />
    `;
  }
};
ct([
  n({ type: String, attribute: "divider-type" })
], Ke.prototype, "dividerType", 2);
ct([
  n({ type: String })
], Ke.prototype, "size", 2);
ct([
  n({ type: String })
], Ke.prototype, "color", 2);
ct([
  n({ type: String })
], Ke.prototype, "orientation", 2);
Ke = ct([
  z("tarmac-divider")
], Ke);
var li = Object.defineProperty, di = Object.getOwnPropertyDescriptor, pt = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? di(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && li(e, s, o), o;
};
const co = {
  base: { borderRadius: "999px" },
  outerBg: { default: "#f7f7f7", ghost: "#ededed", ghostNumericIcon: "#f2f2f2" },
  sizes: {
    sm: { outerSize: "20px", innerDotSolid: "8px", innerDotOutlined: "6px", fontSize: "10px", lineHeight: "12px", borderWidthDefault: "1px", borderWidthFocused: "2px" },
    md: { outerSize: "28px", innerDotSolid: "12px", innerDotOutlined: "8px", fontSize: "12px", lineHeight: "16px", borderWidthDefault: "1px", borderWidthFocused: "2px" },
    lg: { outerSize: "36px", innerDotSolid: "16px", innerDotOutlined: "12px", fontSize: "14px", lineHeight: "20px", borderWidthDefault: "1px", borderWidthFocused: "2px" }
  },
  styles: {
    black: { innerColor: "#000000", borderColor: "#000000", textColor: "#000000", iconColor: "#000000", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    coal: { innerColor: "#64739b", borderColor: "#64739b", textColor: "#64739b", iconColor: "#64739b", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    dlv_red: { innerColor: "#ed1b36", borderColor: "#ed1b36", textColor: "#ed1b36", iconColor: "#ed1b36", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    blue: { innerColor: "#2396fb", borderColor: "#2396fb", textColor: "#2396fb", iconColor: "#2396fb", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    green: { innerColor: "#1ba86e", borderColor: "#1ba86e", textColor: "#1ba86e", iconColor: "#1ba86e", innerColorDisabled: "#cdcbcb", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb", iconColorDisabled: "#cdcbcb" },
    numeric: { borderColor: "#2b2b2b", textColor: "#2b2b2b", borderColorDisabled: "#ededed", textColorDisabled: "#cdcbcb" },
    icon: { borderColor: "#2b2b2b", iconColor: "#2b2b2b", borderColorDisabled: "#ededed", iconColorDisabled: "#cdcbcb" }
  }
};
let Xe = class extends x {
  constructor() {
    super(...arguments), this.stepperStyle = "numeric", this.variant = "solid", this.size = "lg", this.stepNumber = 1, this._cfg = co;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.stepperIcon_tarmac || co;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = e.styles?.[this.stepperStyle] || {}, o = e.outerBg || {}, a = s.outerSize || "28px", r = e.base?.borderRadius || "999px", d = !["numeric", "icon"].includes(this.stepperStyle), l = this.stepperStyle === "numeric", p = this.stepperStyle === "icon", b = this.variant === "ghost", h = this.variant === "disabled", g = l || p;
    let f, m = "", y = "";
    b ? f = g ? o.ghostNumericIcon || "#f2f2f2" : o.ghost || "#ededed" : h ? (f = g ? i.outerBgDisabled || "#ffffff" : o.default || "#f7f7f7", g && (m = `border:${s.borderWidthDefault || "1px"} solid ${i.borderColorDisabled || "#ededed"};`)) : (f = o.default || "#f7f7f7", (this.variant === "outlined" || this.variant === "focused") && (m = `border:${this.variant === "focused" ? s.borderWidthFocused || "2px" : s.borderWidthDefault || "1px"} solid ${i.borderColor || "#2b2b2b"};`));
    const v = this.variant === "outlined" ? s.innerDotOutlined || "8px" : s.innerDotSolid || "12px", C = h ? i.innerColorDisabled || "#cdcbcb" : i.innerColor || "#000", A = h ? i.textColorDisabled || "#cdcbcb" : i.textColor || "#2b2b2b", O = h ? i.iconColorDisabled || "#cdcbcb" : i.iconColor || "#2b2b2b";
    return c`
      <style>
        :host { display:inline-block; }
        .outer { width:${a}; height:${a}; border-radius:${r}; background-color:${f}; overflow:hidden; display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; box-sizing:border-box; ${m} ${y} }
        .dot { width:${v}; height:${v}; border-radius:50%; background-color:${C}; }
        .num { font-family:${s.fontFamily || "Noto Sans, sans-serif"}; font-size:${s.fontSize || "12px"}; line-height:${s.lineHeight || "16px"}; font-weight:600; color:${A}; }
        .icon-wrap { display:flex; align-items:center; justify-content:center; color:${O}; }
        .icon-wrap ::slotted(svg) { width:${s.iconContainerSize || "16px"}; height:${s.iconContainerSize || "16px"}; }
      </style>
      <div class="outer">
        ${b ? u : d ? c`<span class="dot"></span>` : l ? c`<span class="num">${this.stepNumber}</span>` : c`<span class="icon-wrap"><slot name="icon"></slot></span>`}
      </div>
    `;
  }
};
pt([
  n({ type: String, attribute: "stepper-style" })
], Xe.prototype, "stepperStyle", 2);
pt([
  n({ type: String })
], Xe.prototype, "variant", 2);
pt([
  n({ type: String })
], Xe.prototype, "size", 2);
pt([
  n({ type: Number, attribute: "step-number" })
], Xe.prototype, "stepNumber", 2);
Xe = pt([
  z("tarmac-stepper-icon")
], Xe);
var ci = Object.defineProperty, pi = Object.getOwnPropertyDescriptor, Te = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? pi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && ci(e, s, o), o;
};
const po = {
  base: { fontFamily: "Noto Sans, sans-serif" },
  variants: {
    blue: { color: "#2396fb" },
    black: { color: "#2b2b2b" },
    white: { color: "#ffffff" }
  },
  sizes: {
    xl: { fontSize: "20px", lineHeight: "28px" },
    lg: { fontSize: "16px", lineHeight: "24px" },
    md: { fontSize: "14px", lineHeight: "20px" },
    sm: { fontSize: "12px", lineHeight: "16px" },
    xs: { fontSize: "10px", lineHeight: "14px" }
  },
  states: { disabled: { color: "#cdcbcb", cursor: "default" } }
};
let he = class extends x {
  constructor() {
    super(...arguments), this.linkStyle = "blue", this.size = "md", this.isDisabled = !1, this.text = "", this.href = "", this.target = "", this.rel = "", this._cfg = po;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.link_tarmac || po;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = s.fontSize || "14px", o = s.lineHeight || "20px", a = e.base?.fontFamily || "Noto Sans, sans-serif";
    let r, d, l;
    if (this.isDisabled) {
      const p = e.states?.disabled || {};
      r = p.color || "#cdcbcb", d = p.cursor || "default", l = "none";
    } else
      r = (e.variants?.[this.linkStyle] || {}).color || "#2396fb", d = "pointer", l = "auto";
    return c`
      <style>
        :host { display: inline; }
        .link {
          font-family: ${a};
          font-size: ${i};
          line-height: ${o};
          color: ${r};
          cursor: ${d};
          pointer-events: ${l};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .link:hover { text-decoration: underline; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${i}; height: ${i}; }
      </style>
      <a
        class="link"
        href=${this.href || "javascript:void(0)"}
        target=${this.target || ""}
        rel=${this.rel || ""}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text || c`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </a>
    `;
  }
  _handleClick(e) {
    if (this.isDisabled) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: e }
    }));
  }
};
Te([
  n({ type: String, attribute: "link-style" })
], he.prototype, "linkStyle", 2);
Te([
  n({ type: String })
], he.prototype, "size", 2);
Te([
  n({ type: Boolean, attribute: "is-disabled" })
], he.prototype, "isDisabled", 2);
Te([
  n({ type: String })
], he.prototype, "text", 2);
Te([
  n({ type: String })
], he.prototype, "href", 2);
Te([
  n({ type: String })
], he.prototype, "target", 2);
Te([
  n({ type: String })
], he.prototype, "rel", 2);
he = Te([
  z("tarmac-link")
], he);
var hi = Object.defineProperty, ui = Object.getOwnPropertyDescriptor, xt = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ui(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && hi(e, s, o), o;
};
const ho = {
  base: { fontFamily: "Noto Sans, sans-serif", gap: "4px" },
  variants: {
    success: { color: "#1ba86e" },
    failed: { color: "#dc143c" },
    warning: { color: "#f5c828" },
    information: { color: "#2396fb" },
    synced: { color: "#1ba86e" },
    scheduled: { color: "#64739b" },
    unknown: { color: "#b3b1b1" },
    pause: { color: "#f5c828" },
    play: { color: "#1ba86e" },
    downloading: { color: "#2396fb" },
    pending: { color: "#f5c828" }
  },
  sizes: {
    lg: { fontSize: "14px", lineHeight: "20px", dotSize: "8px" },
    md: { fontSize: "12px", lineHeight: "16px", dotSize: "6px" },
    sm: { fontSize: "10px", lineHeight: "14px", dotSize: "6px" },
    xs: { fontSize: "10px", lineHeight: "12px", dotSize: "4px" }
  }
};
let nt = class extends x {
  constructor() {
    super(...arguments), this.variant = "success", this.size = "md", this.label = "", this._cfg = ho;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.status_indicator_tarmac || ho;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = (e.variants?.[this.variant] || {}).color || "#1ba86e", o = s.fontSize || "12px", a = s.lineHeight || "16px", r = s.dotSize || "6px", d = e.base?.gap || "4px", l = e.base?.fontFamily || "Noto Sans, sans-serif";
    return c`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${d}; }
        .dot { width: ${r}; height: ${r}; border-radius: 50%; flex-shrink: 0; background-color: ${i}; }
        .label { font-family: ${l}; font-size: ${o}; line-height: ${a}; color: inherit; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
      </style>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="dot"></span>
      ${this.label ? c`<span class="label">${this.label}</span>` : u}
    `;
  }
};
xt([
  n({ type: String })
], nt.prototype, "variant", 2);
xt([
  n({ type: String })
], nt.prototype, "size", 2);
xt([
  n({ type: String })
], nt.prototype, "label", 2);
nt = xt([
  z("tarmac-status-indicator")
], nt);
var bi = Object.defineProperty, gi = Object.getOwnPropertyDescriptor, Qe = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? gi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && bi(e, s, o), o;
};
const Wo = "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z", uo = {
  base: { filledColor: "#f5c828", emptyColor: "#e6e6e6", gap: "2px", starPath: Wo },
  sizes: {
    lg: { starSize: "20px" },
    md: { starSize: "16px" },
    sm: { starSize: "14px" }
  }
};
let Ne = class extends x {
  constructor() {
    super(...arguments), this.value = 0, this.maxStars = 5, this.size = "md", this.readOnly = !1, this.allowHalf = !1, this._cfg = uo, this._hoverValue = -1;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.rating_tarmac || uo;
  }
  render() {
    const e = this._cfg, s = (e.sizes?.[this.size] || {}).starSize || "16px", i = e.base?.filledColor || "#f5c828", o = e.base?.emptyColor || "#e6e6e6", a = e.base?.gap || "2px", r = e.base?.starPath || Wo, d = this.readOnly ? "default" : "pointer", l = this._hoverValue >= 0 ? this._hoverValue : this.value, p = [];
    for (let b = 1; b <= this.maxStars; b++) {
      const h = l >= b, g = !h && this.allowHalf && l >= b - 0.5, f = `half-clip-${b}`;
      p.push(c`
        <span
          class="star"
          style="width:${s};height:${s};cursor:${d};"
          @click=${() => this._handleClick(b)}
          @mouseenter=${() => this._handleHover(b)}
          @mouseleave=${this._handleLeave}
        >
          <svg viewBox="0 0 24 24" width=${s} height=${s} xmlns="http://www.w3.org/2000/svg">
            ${g ? Jt`
              <defs>
                <clipPath id=${f}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path d=${r} fill=${o} />
              <path d=${r} fill=${i} clip-path="url(#${f})" />
            ` : Jt`
              <path d=${r} fill=${h ? i : o} />
            `}
          </svg>
        </span>
      `);
    }
    return c`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${a}; }
        .star { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
      </style>
      ${p}
    `;
  }
  _handleClick(e) {
    if (this.readOnly) return;
    const s = this.allowHalf && this.value === e - 0.5 ? e : this.allowHalf ? e - 0.5 : e;
    this.value = s, this.dispatchEvent(new CustomEvent("tarmac-change", {
      bubbles: !0,
      composed: !0,
      detail: { value: this.value }
    }));
  }
  _handleHover(e) {
    this.readOnly || (this._hoverValue = e, this.requestUpdate());
  }
  _handleLeave() {
    this.readOnly || (this._hoverValue = -1, this.requestUpdate());
  }
};
Qe([
  n({ type: Number })
], Ne.prototype, "value", 2);
Qe([
  n({ type: Number, attribute: "max-stars" })
], Ne.prototype, "maxStars", 2);
Qe([
  n({ type: String })
], Ne.prototype, "size", 2);
Qe([
  n({ type: Boolean, attribute: "read-only" })
], Ne.prototype, "readOnly", 2);
Qe([
  n({ type: Boolean, attribute: "allow-half" })
], Ne.prototype, "allowHalf", 2);
Ne = Qe([
  z("tarmac-rating")
], Ne);
var fi = Object.defineProperty, mi = Object.getOwnPropertyDescriptor, Me = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? mi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && fi(e, s, o), o;
};
const bo = {
  base: { trackColor: "#e6e6e6", borderRadius: "999px", transition: "width 0.3s", textFontSize: "12px", textColor: "#2b2b2b" },
  variants: {
    primary: { fillColor: "#2396fb" },
    success: { fillColor: "#1ba86e" },
    warning: { fillColor: "#f5c828" },
    error: { fillColor: "#dc143c" },
    info: { fillColor: "#2396fb" },
    default: { fillColor: "#2b2b2b" }
  },
  sizes: {
    sm: { height: "4px" },
    md: { height: "8px" },
    lg: { height: "12px" }
  }
};
let we = class extends x {
  constructor() {
    super(...arguments), this.value = 0, this.size = "md", this.variant = "primary", this.showPercentage = !1, this._cfg = bo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.progress_bar_tarmac || bo;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = e.variants?.[this.variant] || {}, o = s.height || "8px", a = i.fillColor || "#2396fb", r = this.trackColor || e.base?.trackColor || "#e6e6e6", d = e.base?.borderRadius || "999px", l = e.base?.transition || "width 0.3s", p = this.textColor || e.base?.textColor || "#2b2b2b", b = e.base?.textFontSize || "12px", h = Math.max(0, Math.min(100, this.value));
    return c`
      <style>
        :host { display: block; width: 100%; }
        .wrapper { display: flex; align-items: center; gap: 8px; }
        .track { flex: 1; height: ${o}; background-color: ${r}; border-radius: ${d}; overflow: hidden; }
        .fill { height: 100%; border-radius: ${d}; background-color: ${a}; transition: ${l}; }
        .percentage { font-size: ${b}; color: ${p}; flex-shrink: 0; font-family: Noto Sans, sans-serif; }
      </style>
      <div class="wrapper" role="progressbar" aria-valuenow=${h} aria-valuemin="0" aria-valuemax="100">
        <div class="track">
          <div class="fill" style="width:${h}%"></div>
        </div>
        ${this.showPercentage ? c`<span class="percentage">${h}%</span>` : u}
      </div>
    `;
  }
};
Me([
  n({ type: Number })
], we.prototype, "value", 2);
Me([
  n({ type: String })
], we.prototype, "size", 2);
Me([
  n({ type: String })
], we.prototype, "variant", 2);
Me([
  n({ type: Boolean, attribute: "show-percentage" })
], we.prototype, "showPercentage", 2);
Me([
  n({ type: String, attribute: "track-color" })
], we.prototype, "trackColor", 2);
Me([
  n({ type: String, attribute: "text-color" })
], we.prototype, "textColor", 2);
we = Me([
  z("tarmac-progress-bar")
], we);
var yi = Object.defineProperty, $i = Object.getOwnPropertyDescriptor, ye = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? $i(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && yi(e, s, o), o;
};
const go = {
  base: { trackColor: "#e6e6e6", borderRadius: "999px", transition: "all 0.1s ease" },
  variants: {
    black: { fillColor: "#000000", knobColor: "#000000" },
    coal: { fillColor: "#64739b", knobColor: "#64739b" },
    dlv_red: { fillColor: "#ed1b36", knobColor: "#ed1b36" }
  },
  sizes: {
    sm: { trackHeight: "4px", knobSize: "16px" },
    lg: { trackHeight: "8px", knobSize: "24px" }
  },
  states: { disabled: { fillColor: "#cdcbcb", knobColor: "#e6e6e6" } }
};
let se = class extends x {
  constructor() {
    super(...arguments), this.variant = "black", this.size = "lg", this.sliderType = "single", this.value = 0, this.min = 0, this.max = 100, this.step = 1, this.isDisabled = !1, this._cfg = go, this._dragging = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.slider_tarmac || go;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = s.trackHeight || "4px", o = s.knobSize || "16px", a = e.base?.trackColor || "#e6e6e6", r = e.base?.borderRadius || "999px";
    let d, l, p;
    if (this.isDisabled) {
      const g = e.states?.disabled || {};
      d = g.fillColor || "#cdcbcb", l = g.knobColor || "#e6e6e6", p = "default";
    } else {
      const g = e.variants?.[this.variant] || {};
      d = g.fillColor || "#000000", l = g.knobColor || "#000000", p = "pointer";
    }
    const b = (this.value - this.min) / (this.max - this.min) * 100, h = Math.max(0, Math.min(100, b));
    return c`
      <style>
        :host { display: block; width: 100%; }
        .slider-container { position: relative; width: 100%; padding: calc(${o} / 2) 0; cursor: ${p}; }
        .track { position: relative; width: 100%; height: ${i}; background-color: ${a}; border-radius: ${r}; }
        .fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: ${r}; background-color: ${d}; }
        .knob {
          position: absolute;
          top: 50%;
          width: ${o};
          height: ${o};
          border-radius: 50%;
          background-color: ${l};
          transform: translate(-50%, -50%);
          cursor: ${p};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      </style>
      <div
        class="slider-container"
        role="slider"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        @mousedown=${this._handleMouseDown}
        @touchstart=${this._handleTouchStart}
      >
        <div class="track">
          <div class="fill" style="width:${h}%"></div>
          <div class="knob" style="left:${h}%"></div>
        </div>
      </div>
    `;
  }
  _getValueFromEvent(e) {
    const s = this.shadowRoot?.querySelector(".track");
    if (!s) return this.value;
    const i = s.getBoundingClientRect(), o = Math.max(0, Math.min(1, (e - i.left) / i.width)), a = this.min + o * (this.max - this.min), r = Math.round(a / this.step) * this.step;
    return Math.max(this.min, Math.min(this.max, r));
  }
  _handleMouseDown(e) {
    if (this.isDisabled) return;
    e.preventDefault(), this._dragging = !0, this._updateValue(e.clientX);
    const s = (o) => {
      this._updateValue(o.clientX);
    }, i = (o) => {
      this._dragging = !1, document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", i), this.dispatchEvent(new CustomEvent("tarmac-change-end", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    };
    document.addEventListener("mousemove", s), document.addEventListener("mouseup", i);
  }
  _handleTouchStart(e) {
    if (this.isDisabled) return;
    e.preventDefault(), this._dragging = !0, this._updateValue(e.touches[0].clientX);
    const s = (o) => {
      this._updateValue(o.touches[0].clientX);
    }, i = () => {
      this._dragging = !1, document.removeEventListener("touchmove", s), document.removeEventListener("touchend", i), this.dispatchEvent(new CustomEvent("tarmac-change-end", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    };
    document.addEventListener("touchmove", s), document.addEventListener("touchend", i);
  }
  _updateValue(e) {
    const s = this._getValueFromEvent(e);
    s !== this.value && (this.value = s, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })));
  }
};
ye([
  n({ type: String })
], se.prototype, "variant", 2);
ye([
  n({ type: String })
], se.prototype, "size", 2);
ye([
  n({ type: String, attribute: "slider-type" })
], se.prototype, "sliderType", 2);
ye([
  n({ type: Number })
], se.prototype, "value", 2);
ye([
  n({ type: Number })
], se.prototype, "min", 2);
ye([
  n({ type: Number })
], se.prototype, "max", 2);
ye([
  n({ type: Number })
], se.prototype, "step", 2);
ye([
  n({ type: Boolean, attribute: "is-disabled" })
], se.prototype, "isDisabled", 2);
se = ye([
  z("tarmac-slider")
], se);
var vi = Object.defineProperty, xi = Object.getOwnPropertyDescriptor, Be = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? xi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && vi(e, s, o), o;
};
const fo = {
  base: { fontFamily: "Noto Sans, sans-serif", gap: "4px" },
  variants: {
    black: { color: "#2b2b2b" },
    blue: { color: "#2396fb" },
    dlvRed: { color: "#ed1b36" }
  },
  sizes: {
    lg: { fontSize: "14px", lineHeight: "20px" },
    sm: { fontSize: "12px", lineHeight: "16px" }
  },
  states: {
    disabled: { color: "#cdcbcb" },
    ghost: { backgroundColor: "#dedede", textColor: "transparent" },
    current: { fontWeight: "600" }
  }
};
let ue = class extends x {
  constructor() {
    super(...arguments), this.label = "", this.cellStyle = "black", this.size = "lg", this.isDisabled = !1, this.isGhost = !1, this.isCurrent = !1, this.href = "", this._cfg = fo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.breadcrumb_cell_tarmac || fo;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = s.fontSize || "14px", o = s.lineHeight || "20px", a = e.base?.fontFamily || "Noto Sans, sans-serif", r = e.base?.gap || "4px";
    let d, l, p, b, h = "";
    if (this.isGhost) {
      const f = e.states?.ghost || {};
      d = f.textColor || "transparent", b = f.backgroundColor || "#dedede", l = "default", p = "400", h = `background-color:${b}; border-radius:4px; padding:2px 4px;`;
    } else this.isDisabled ? (d = (e.states?.disabled || {}).color || "#cdcbcb", l = "default", p = "400", h = "pointer-events:none;") : (d = (e.variants?.[this.cellStyle] || {}).color || "#2b2b2b", l = "pointer", p = this.isCurrent ? e.states?.current?.fontWeight || "600" : "400");
    const g = this.href && !this.isDisabled && !this.isGhost ? "a" : "span";
    return c`
      <style>
        :host { display: inline-flex; align-items: center; }
        .cell {
          display: inline-flex;
          align-items: center;
          gap: ${r};
          font-family: ${a};
          font-size: ${i};
          line-height: ${o};
          color: ${d};
          cursor: ${l};
          font-weight: ${p};
          text-decoration: none;
          ${h}
        }
        .cell:hover { text-decoration: ${this.isDisabled || this.isGhost ? "none" : "underline"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${i}; height: ${i}; }
      </style>
      ${g === "a" ? c`<a class="cell" href=${this.href} @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </a>` : c`<span class="cell" @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </span>`}
    `;
  }
  _handleClick(e) {
    if (this.isDisabled || this.isGhost) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: e, label: this.label, href: this.href }
    }));
  }
};
Be([
  n({ type: String })
], ue.prototype, "label", 2);
Be([
  n({ type: String, attribute: "cell-style" })
], ue.prototype, "cellStyle", 2);
Be([
  n({ type: String })
], ue.prototype, "size", 2);
Be([
  n({ type: Boolean, attribute: "is-disabled" })
], ue.prototype, "isDisabled", 2);
Be([
  n({ type: Boolean, attribute: "is-ghost" })
], ue.prototype, "isGhost", 2);
Be([
  n({ type: Boolean, attribute: "is-current" })
], ue.prototype, "isCurrent", 2);
Be([
  n({ type: String })
], ue.prototype, "href", 2);
ue = Be([
  z("tarmac-breadcrumb-cell")
], ue);
var Ci = Object.defineProperty, ki = Object.getOwnPropertyDescriptor, Ct = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ki(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ci(e, s, o), o;
};
const mo = {
  base: { dividerColor: "#2B2B2B", dividerStrokeWidth: "0.5", dividerWidth: "8px" }
};
let lt = class extends x {
  constructor() {
    super(...arguments), this.dividerStyle = "slash", this.size = "lg", this.showDivider = !0, this._cfg = mo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.breadcrumbs_tarmac || mo;
  }
  render() {
    const e = this._cfg;
    e.base?.dividerColor, e.base?.dividerStrokeWidth;
    const s = e.base?.dividerWidth || "8px";
    return c`
      <style>
        :host { display: inline-flex; }
        nav { display: flex; align-items: center; gap: 0; }
        .divider { display: inline-flex; align-items: center; justify-content: center; width: ${s}; margin: 0 4px; flex-shrink: 0; }
        .divider svg { width: ${s}; height: auto; }
        ::slotted(*) { display: inline-flex; }
      </style>
      <nav aria-label="breadcrumb">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `;
  }
  _handleSlotChange() {
    const e = this.shadowRoot?.querySelector("slot");
    if (!e) return;
    const s = e.assignedElements({ flatten: !0 }), i = this.shadowRoot?.querySelector("nav");
    if (i && (i.querySelectorAll(".divider").forEach((o) => o.remove()), !(!this.showDivider || s.length <= 1))) {
      for (let o = 0; o < s.length - 1; o++) {
        const a = document.createElement("span");
        a.className = "divider", a.innerHTML = this._getDividerSVG(), s[o].after(a);
      }
      this.requestUpdate();
    }
  }
  _getDividerSVG() {
    const e = this._cfg, s = e.base?.dividerColor || "#2B2B2B", i = e.base?.dividerStrokeWidth || "0.5";
    return this.dividerStyle === "chevron" ? `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l5 5-5 5" stroke="${s}" stroke-width="${i}" stroke-linecap="round" stroke-linejoin="round"/></svg>` : `<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L2 11" stroke="${s}" stroke-width="${i}" stroke-linecap="round"/></svg>`;
  }
  updated() {
    const e = this.shadowRoot?.querySelector("slot");
    if (!e) return;
    const s = this.shadowRoot?.querySelector("nav");
    if (!s || (s.querySelectorAll(".divider").forEach((a) => a.remove()), !this.showDivider)) return;
    const i = e.assignedElements({ flatten: !0 });
    if (i.length <= 1) return;
    const o = document.createElement("span");
    o.style.display = "contents";
    for (let a = i.length - 1; a > 0; a--) {
      const r = document.createElement("span");
      r.className = "divider", r.setAttribute("aria-hidden", "true"), r.innerHTML = this._getDividerSVG();
      const d = this._cfg.base?.dividerWidth || "8px";
      r.style.display = "inline-flex", r.style.alignItems = "center", r.style.justifyContent = "center", r.style.width = d, r.style.margin = "0 4px", r.style.flexShrink = "0", this.insertBefore(r, i[a]);
    }
  }
};
Ct([
  n({ type: String, attribute: "divider-style" })
], lt.prototype, "dividerStyle", 2);
Ct([
  n({ type: String })
], lt.prototype, "size", 2);
Ct([
  n({ type: Boolean, attribute: "show-divider" })
], lt.prototype, "showDivider", 2);
lt = Ct([
  z("tarmac-breadcrumbs")
], lt);
var Si = Object.defineProperty, wi = Object.getOwnPropertyDescriptor, te = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? wi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Si(e, s, o), o;
};
const yo = {
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
let X = class extends x {
  constructor() {
    super(...arguments), this.tabType = "regular", this.orientation = "horizontal", this.tabStyle = "black", this.size = "lg", this.isPressed = !1, this.isSelected = !1, this.isDisabled = !1, this.isGhost = !1, this.tabTitle = "", this.subtext = "", this._cfg = yo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.tab_cell_tarmac || yo;
  }
  render() {
    const e = this._cfg, s = e.sizes?.[this.size] || {}, i = e.variants?.[this.tabStyle] || {}, o = s.fontSize || "14px", a = s.lineHeight || "20px", r = s.padding || "12px", d = e.base?.fontFamily || "Noto Sans, sans-serif", l = e.base?.gap || "8px", p = this.isPressed || this.isSelected;
    let b, h, g, f, m = "";
    if (this.isGhost) {
      const y = e.states?.ghost || {};
      b = y.textColor || "transparent", h = y.backgroundColor || "#dedede", g = "default", f = "none", m = "pointer-events:none;";
    } else if (this.isDisabled)
      b = (e.states?.disabled || {}).color || "#cdcbcb", h = "transparent", g = "default", f = "none", m = "pointer-events:none;";
    else if (p)
      if (b = i.pressedColor || "#000000", g = "pointer", this.tabType === "regular") {
        h = "transparent";
        const y = e.types?.regular?.borderWidth || "2px";
        this.orientation === "vertical" ? f = `border-left: ${y} solid ${b};` : f = `border-bottom: ${y} solid ${b};`;
      } else
        h = i.pressedBg || "#f5f5f5", f = `border-radius: ${e.types?.button?.borderRadius || "4px"};`;
    else
      b = i.color || "#2b2b2b", h = "transparent", g = "pointer", f = this.tabType === "regular" ? "border-bottom: 2px solid transparent;" : "";
    return c`
      <style>
        :host { display: inline-flex; }
        .tab-cell {
          display: inline-flex;
          align-items: center;
          gap: ${l};
          font-family: ${d};
          font-size: ${o};
          line-height: ${a};
          padding: ${r};
          color: ${b};
          background-color: ${h};
          cursor: ${g};
          border: none;
          outline: none;
          user-select: none;
          white-space: nowrap;
          ${typeof f == "string" && f.includes(":") ? f : ""}
          ${m}
        }
        .tab-cell:hover { opacity: ${this.isDisabled || this.isGhost ? "1" : "0.8"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
        .content { display: flex; flex-direction: column; }
        .title { font-weight: ${p ? "600" : "400"}; }
        .subtext { font-size: calc(${o} - 2px); color: ${this.isDisabled ? "#cdcbcb" : "#64739b"}; }
        .extras { display: inline-flex; align-items: center; gap: 4px; }
      </style>
      <button
        class="tab-cell"
        role="tab"
        aria-selected=${p}
        ?disabled=${this.isDisabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        <span class="content">
          <span class="title">${this.tabTitle}</span>
          ${this.subtext ? c`<span class="subtext">${this.subtext}</span>` : u}
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
  _handleClick(e) {
    if (this.isDisabled || this.isGhost) {
      e.preventDefault(), e.stopPropagation();
      return;
    }
    this.dispatchEvent(new CustomEvent("tarmac-click", {
      bubbles: !0,
      composed: !0,
      detail: { originalEvent: e, title: this.tabTitle }
    }));
  }
};
te([
  n({ type: String, attribute: "tab-type" })
], X.prototype, "tabType", 2);
te([
  n({ type: String })
], X.prototype, "orientation", 2);
te([
  n({ type: String, attribute: "tab-style" })
], X.prototype, "tabStyle", 2);
te([
  n({ type: String })
], X.prototype, "size", 2);
te([
  n({ type: Boolean, attribute: "is-pressed" })
], X.prototype, "isPressed", 2);
te([
  n({ type: Boolean, attribute: "is-selected" })
], X.prototype, "isSelected", 2);
te([
  n({ type: Boolean, attribute: "is-disabled" })
], X.prototype, "isDisabled", 2);
te([
  n({ type: Boolean, attribute: "is-ghost" })
], X.prototype, "isGhost", 2);
te([
  n({ type: String, attribute: "title" })
], X.prototype, "tabTitle", 2);
te([
  n({ type: String })
], X.prototype, "subtext", 2);
X = te([
  z("tarmac-tab-cell")
], X);
var _i = Object.defineProperty, zi = Object.getOwnPropertyDescriptor, V = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? zi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && _i(e, s, o), o;
};
const $o = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", transition: "all 0.15s ease-in-out" },
  types: {
    regular: { borderColor: "#e0e0e0", focusBorderColor: "#2b2b2b" },
    success: { borderColor: "#2e7d32", focusBorderColor: "#2e7d32" },
    error: { borderColor: "#c62828", focusBorderColor: "#c62828" },
    infoBlue: { borderColor: "#1565c0", focusBorderColor: "#1565c0" }
  },
  sizes: {
    lg: { height: "48px", fontSize: "16px", padding: "0 12px" },
    md: { height: "40px", fontSize: "14px", padding: "0 12px" },
    sm: { height: "32px", fontSize: "14px", padding: "0 8px" }
  },
  states: {
    disabled: { borderColor: "#ededed", color: "#cdcbcb", backgroundColor: "#fff" },
    ghost: { backgroundColor: "#ededed", borderColor: "transparent" }
  }
};
let j = class extends x {
  constructor() {
    super(...arguments), this.inputStyle = "tarmac-01", this.inputType = "regular", this.inputSize = "md", this.styleVariant = "standard", this.isDisabled = !1, this.isGhost = !1, this.label = "", this.isMandatory = !1, this.placeholder = "", this.value = "", this.helperTextTop = "", this.helperTextBottom = "", this.subtext = "", this.statusText = "", this._cfg = $o;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.input_tarmac || $o;
  }
  render() {
    const e = this._cfg, s = e.types?.[this.inputType] || e.types?.regular || {}, i = e.sizes?.[this.inputSize] || e.sizes?.md || {}, o = e.base || {}, a = e.states?.disabled || {}, r = e.states?.ghost || {}, d = o.fontFamily || "Noto Sans, sans-serif", l = o.radius || "4px", p = o.transition || "all 0.15s ease-in-out", b = i.height || "40px", h = i.fontSize || "14px", g = i.padding || "0 12px";
    let f, m, y, v;
    this.isDisabled ? (f = a.borderColor || "#ededed", m = a.backgroundColor || "#fff", y = a.color || "#cdcbcb", v = "not-allowed") : this.isGhost ? (f = r.borderColor || "transparent", m = r.backgroundColor || "#ededed", y = "#2b2b2b", v = "text") : (f = s.borderColor || "#e0e0e0", m = "#fff", y = "#2b2b2b", v = "text");
    const C = s.focusBorderColor || "#2b2b2b", A = this.inputType === "error" ? "#c62828" : this.inputType === "success" ? "#2e7d32" : this.inputType === "infoBlue" ? "#1565c0" : "#6b6b6b", O = this.styleVariant === "addonLeft", J = this.styleVariant === "addonRight";
    return c`
      <style>
        :host { display: block; font-family: ${d}; }
        .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label-row { display: flex; align-items: center; gap: 2px; font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .mandatory { color: #c62828; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${A}; }
        .subtext { font-size: 12px; line-height: 16px; color: #8c8c8c; }
        .input-row { display: flex; align-items: center; }
        .addon { display: flex; align-items: center; justify-content: center; height: ${b}; padding: 0 12px; background: #f5f5f5; border: 1px solid ${f}; font-size: ${h}; color: #6b6b6b; white-space: nowrap; }
        .addon-left { border-right: none; border-radius: ${l} 0 0 ${l}; }
        .addon-right { border-left: none; border-radius: 0 ${l} ${l} 0; }
        .input-container { display: flex; align-items: center; flex: 1; height: ${b}; border: 1px solid ${f}; border-radius: ${O ? `0 ${l} ${l} 0` : J ? `${l} 0 0 ${l}` : l}; background-color: ${m}; transition: ${p}; padding: ${g}; gap: 8px; box-sizing: border-box; }
        .input-container:focus-within { border-color: ${this.isDisabled ? f : C}; }
        input { flex: 1; border: none; outline: none; background: transparent; font-family: ${d}; font-size: ${h}; color: ${y}; cursor: ${v}; min-width: 0; }
        input::placeholder { color: #b3b1b1; }
        input:disabled { cursor: not-allowed; }
        .icon-slot { display: flex; align-items: center; color: #6b6b6b; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
      </style>
      <div class="input-wrapper">
        ${this.label ? c`<div class="label-row"><span>${this.label}</span>${this.isMandatory ? c`<span class="mandatory">*</span>` : u}</div>` : u}
        ${this.helperTextTop ? c`<div class="helper-text">${this.helperTextTop}</div>` : u}
        <div class="input-row">
          ${O ? c`<div class="addon addon-left"><slot name="addon"></slot></div>` : u}
          <div class="input-container">
            <span class="icon-slot"><slot name="leading-icon"></slot></span>
            <input
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder || u}
              ?disabled=${this.isDisabled}
              @input=${this._onInput}
              @change=${this._onChange}
              @focus=${this._onFocus}
              @blur=${this._onBlur}
            />
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
          </div>
          ${J ? c`<div class="addon addon-right"><slot name="addon"></slot></div>` : u}
        </div>
        ${this.statusText ? c`<div class="status-text">${this.statusText}</div>` : u}
        ${this.helperTextBottom ? c`<div class="helper-text">${this.helperTextBottom}</div>` : u}
        ${this.subtext ? c`<div class="subtext">${this.subtext}</div>` : u}
      </div>
    `;
  }
  _onInput(e) {
    const s = e.target;
    this.value = s.value, this.dispatchEvent(new CustomEvent("tarmac-input", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onChange(e) {
    const s = e.target;
    this.value = s.value, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onFocus() {
    this.dispatchEvent(new CustomEvent("tarmac-focus", { bubbles: !0, composed: !0 }));
  }
  _onBlur() {
    this.dispatchEvent(new CustomEvent("tarmac-blur", { bubbles: !0, composed: !0 }));
  }
};
V([
  n({ type: String, attribute: "input-style" })
], j.prototype, "inputStyle", 2);
V([
  n({ type: String, attribute: "input-type" })
], j.prototype, "inputType", 2);
V([
  n({ type: String, attribute: "input-size" })
], j.prototype, "inputSize", 2);
V([
  n({ type: String, attribute: "style-variant" })
], j.prototype, "styleVariant", 2);
V([
  n({ type: Boolean, attribute: "is-disabled" })
], j.prototype, "isDisabled", 2);
V([
  n({ type: Boolean, attribute: "is-ghost" })
], j.prototype, "isGhost", 2);
V([
  n({ type: String })
], j.prototype, "label", 2);
V([
  n({ type: Boolean, attribute: "is-mandatory" })
], j.prototype, "isMandatory", 2);
V([
  n({ type: String })
], j.prototype, "placeholder", 2);
V([
  n({ type: String })
], j.prototype, "value", 2);
V([
  n({ type: String, attribute: "helper-text-top" })
], j.prototype, "helperTextTop", 2);
V([
  n({ type: String, attribute: "helper-text-bottom" })
], j.prototype, "helperTextBottom", 2);
V([
  n({ type: String })
], j.prototype, "subtext", 2);
V([
  n({ type: String, attribute: "status-text" })
], j.prototype, "statusText", 2);
j = V([
  z("tarmac-input")
], j);
var Ti = Object.defineProperty, Bi = Object.getOwnPropertyDescriptor, G = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Bi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ti(e, s, o), o;
};
const vo = {
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
let L = class extends x {
  constructor() {
    super(...arguments), this.textAreaStyle = "tarmac-01", this.textAreaType = "regular", this.textAreaSize = "md", this.isDisabled = !1, this.isGhost = !1, this.label = "", this.placeholder = "", this.value = "", this.rows = 4, this.resize = "vertical", this.helperTextTop = "", this.helperTextBottom = "", this.statusText = "", this._cfg = vo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.textarea_tarmac || vo;
  }
  render() {
    const e = this._cfg, s = e.types?.[this.textAreaType] || e.types?.regular || {}, i = e.sizes?.[this.textAreaSize] || e.sizes?.md || {}, o = e.base || {}, a = e.states?.disabled || {}, r = e.states?.ghost || {}, d = o.fontFamily || "Noto Sans, sans-serif", l = o.radius || "4px", p = o.transition || "all 0.15s ease-in-out", b = i.minHeight || "96px", h = i.fontSize || "14px", g = i.padding || "10px 12px";
    let f, m, y, v;
    this.isDisabled ? (f = a.borderColor || "#ededed", m = a.backgroundColor || "#fff", y = a.color || "#cdcbcb", v = "not-allowed") : this.isGhost ? (f = r.borderColor || "transparent", m = r.backgroundColor || "#ededed", y = "#2b2b2b", v = "text") : (f = s.borderColor || "#e0e0e0", m = "#fff", y = "#2b2b2b", v = "text");
    const C = s.focusBorderColor || "#2b2b2b", A = this.textAreaType === "error" ? "#c62828" : this.textAreaType === "success" ? "#2e7d32" : this.textAreaType === "infoBlue" ? "#1565c0" : "#6b6b6b";
    return c`
      <style>
        :host { display: block; font-family: ${d}; }
        .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${A}; }
        textarea {
          width: 100%; min-height: ${b}; border: 1px solid ${f}; border-radius: ${l};
          background-color: ${m}; color: ${y}; font-family: ${d}; font-size: ${h};
          padding: ${g}; box-sizing: border-box; transition: ${p}; resize: ${this.resize};
          cursor: ${v}; outline: none;
        }
        textarea::placeholder { color: #b3b1b1; }
        textarea:focus { border-color: ${this.isDisabled ? f : C}; }
        textarea:disabled { cursor: not-allowed; }
      </style>
      <div class="textarea-wrapper">
        ${this.label ? c`<div class="label">${this.label}</div>` : u}
        ${this.helperTextTop ? c`<div class="helper-text">${this.helperTextTop}</div>` : u}
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder || u}
          ?disabled=${this.isDisabled}
          @input=${this._onInput}
          @change=${this._onChange}
        ></textarea>
        ${this.statusText ? c`<div class="status-text">${this.statusText}</div>` : u}
        ${this.helperTextBottom ? c`<div class="helper-text">${this.helperTextBottom}</div>` : u}
      </div>
    `;
  }
  _onInput(e) {
    const s = e.target;
    this.value = s.value, this.dispatchEvent(new CustomEvent("tarmac-input", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
  _onChange(e) {
    const s = e.target;
    this.value = s.value, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } }));
  }
};
G([
  n({ type: String, attribute: "textarea-style" })
], L.prototype, "textAreaStyle", 2);
G([
  n({ type: String, attribute: "textarea-type" })
], L.prototype, "textAreaType", 2);
G([
  n({ type: String, attribute: "textarea-size" })
], L.prototype, "textAreaSize", 2);
G([
  n({ type: Boolean, attribute: "is-disabled" })
], L.prototype, "isDisabled", 2);
G([
  n({ type: Boolean, attribute: "is-ghost" })
], L.prototype, "isGhost", 2);
G([
  n({ type: String })
], L.prototype, "label", 2);
G([
  n({ type: String })
], L.prototype, "placeholder", 2);
G([
  n({ type: String })
], L.prototype, "value", 2);
G([
  n({ type: Number })
], L.prototype, "rows", 2);
G([
  n({ type: String })
], L.prototype, "resize", 2);
G([
  n({ type: String, attribute: "helper-text-top" })
], L.prototype, "helperTextTop", 2);
G([
  n({ type: String, attribute: "helper-text-bottom" })
], L.prototype, "helperTextBottom", 2);
G([
  n({ type: String, attribute: "status-text" })
], L.prototype, "statusText", 2);
L = G([
  z("tarmac-textarea")
], L);
var Ei = Object.defineProperty, Fi = Object.getOwnPropertyDescriptor, $e = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Fi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ei(e, s, o), o;
};
const xo = {
  base: { fontFamily: "Noto Sans, sans-serif", transition: "all 0.15s ease-in-out" },
  variants: {
    standard: { checkedColor: "#000000", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    blue: { checkedColor: "#2396fb", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    green: { checkedColor: "#1ba86e", borderColor: "#e6e6e6", dotColor: "#ffffff" },
    dlv_red: { checkedColor: "#ed1b36", borderColor: "#e6e6e6", dotColor: "#ffffff" }
  },
  sizes: {
    sm: { radioSize: "16px", dotSize: "6px", labelFontSize: "14px", labelLineHeight: "20px" },
    md: { radioSize: "20px", dotSize: "8px", labelFontSize: "14px", labelLineHeight: "20px" },
    lg: { radioSize: "24px", dotSize: "10px", labelFontSize: "14px", labelLineHeight: "20px" }
  },
  states: { disabled: { borderColor: "#ededed", checkedColor: "#e6e6e6", dotColor: "#cdcbcb", labelColor: "#cdcbcb" } }
};
let ie = class extends x {
  constructor() {
    super(...arguments), this.tarmacVariant = "standard", this.tarmacStyle = "box", this.size = "md", this.checked = !1, this.disabled = !1, this.value = "", this.name = "", this.subtext = "", this._cfg = xo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.radio_tarmac || xo;
  }
  render() {
    const e = this._cfg, s = e.variants?.[this.tarmacVariant] || e.variants?.standard || {}, i = e.sizes?.[this.size] || e.sizes?.md || {}, o = e.base || {}, a = e.states?.disabled || {}, r = o.fontFamily || "Noto Sans, sans-serif", d = o.transition || "all 0.15s ease-in-out", l = i.radioSize || "20px", p = i.dotSize || "8px", b = i.labelFontSize || "14px", h = i.labelLineHeight || "20px";
    let g, f, m, y;
    this.disabled ? (g = a.borderColor || "#ededed", f = this.checked ? a.checkedColor || "#e6e6e6" : "#fff", m = a.dotColor || "#cdcbcb", y = a.labelColor || "#cdcbcb") : (g = this.checked ? s.checkedColor || "#000" : s.borderColor || "#e6e6e6", f = this.checked ? s.checkedColor || "#000" : "#fff", m = s.dotColor || "#ffffff", y = "#2b2b2b");
    const v = !!this.textContent?.trim() || this.querySelector("[slot]") !== null, C = !!this.subtext;
    return c`
      <style>
        :host { display: inline-block; font-family: ${r}; }
        .radio-wrapper { display: inline-flex; align-items: ${C ? "flex-start" : "center"}; gap: 8px; cursor: ${this.disabled ? "default" : "pointer"}; user-select: none; }
        .radio-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
        .radio-circle {
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          width: ${l}; height: ${l}; border-radius: 50%;
          border: 2px solid ${g}; background-color: ${f};
          transition: ${d}; box-sizing: border-box;
        }
        .radio-dot {
          width: ${p}; height: ${p}; border-radius: 50%;
          background-color: ${m};
          display: ${this.checked ? "block" : "none"};
        }
        .label-col { display: flex; flex-direction: column; }
        .label { font-size: ${b}; line-height: ${h}; font-weight: 500; color: ${y}; }
        .subtext { font-size: 12px; line-height: 16px; color: ${this.disabled ? "#cdcbcb" : "#8c8c8c"}; }
      </style>
      <label class="radio-wrapper" @click=${this._handleClick}>
        <input
          class="radio-input"
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name || u}
          value=${this.value || u}
          @change=${this._handleChange}
        />
        <span class="radio-circle"><span class="radio-dot"></span></span>
        ${v || C ? c`
          <span class="label-col">
            <span class="label"><slot></slot></span>
            ${C ? c`<span class="subtext">${this.subtext}</span>` : u}
          </span>
        ` : u}
      </label>
    `;
  }
  _handleClick(e) {
    e.target.tagName;
  }
  _handleChange() {
    this.disabled || (this.checked = !0, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { checked: this.checked, value: this.value } })));
  }
};
$e([
  n({ type: String, attribute: "tarmac-variant" })
], ie.prototype, "tarmacVariant", 2);
$e([
  n({ type: String, attribute: "tarmac-style" })
], ie.prototype, "tarmacStyle", 2);
$e([
  n({ type: String })
], ie.prototype, "size", 2);
$e([
  n({ type: Boolean })
], ie.prototype, "checked", 2);
$e([
  n({ type: Boolean })
], ie.prototype, "disabled", 2);
$e([
  n({ type: String })
], ie.prototype, "value", 2);
$e([
  n({ type: String })
], ie.prototype, "name", 2);
$e([
  n({ type: String })
], ie.prototype, "subtext", 2);
ie = $e([
  z("tarmac-radio")
], ie);
var Di = Object.defineProperty, Oi = Object.getOwnPropertyDescriptor, Y = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Oi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Di(e, s, o), o;
};
const Co = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", transition: "all 0.15s ease-in-out" },
  variants: {
    default: { borderColor: "#e0e0e0", focusBorderColor: "#2b2b2b" },
    success: { borderColor: "#2e7d32", focusBorderColor: "#2e7d32" },
    error: { borderColor: "#c62828", focusBorderColor: "#c62828" },
    info: { borderColor: "#1565c0", focusBorderColor: "#1565c0" }
  },
  sizes: {
    sm: { boxSize: "32px", fontSize: "14px" },
    md: { boxSize: "40px", fontSize: "16px" },
    lg: { boxSize: "48px", fontSize: "18px" }
  },
  states: { disabled: { borderColor: "#ededed", color: "#cdcbcb", backgroundColor: "#f5f5f5" } }
};
let I = class extends x {
  constructor() {
    super(...arguments), this.numDigits = 6, this.otpStyle = "tarmac-01", this.otpSize = "md", this.otpVariant = "default", this.isDisabled = !1, this.placeholder = "", this.inputType = "text", this.label = "", this.helperText = "", this.value = "", this._digits = [], this._cfg = Co;
  }
  connectedCallback() {
    super.connectedCallback(), this._digits = Array.from({ length: this.numDigits }, (e, s) => this.value[s] || ""), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.otp_tarmac || Co;
  }
  updated(e) {
    (e.has("numDigits") || e.has("value")) && (this._digits = Array.from({ length: this.numDigits }, (s, i) => this.value[i] || ""));
  }
  render() {
    const e = this._cfg, s = e.variants?.[this.otpVariant] || e.variants?.default || {}, i = e.sizes?.[this.otpSize] || e.sizes?.md || {}, o = e.base || {}, a = e.states?.disabled || {}, r = o.fontFamily || "Noto Sans, sans-serif", d = o.radius || "4px", l = o.transition || "all 0.15s ease-in-out", p = i.boxSize || "40px", b = i.fontSize || "16px";
    let h, g, f;
    this.isDisabled ? (h = a.borderColor || "#ededed", g = a.backgroundColor || "#f5f5f5", f = a.color || "#cdcbcb") : (h = s.borderColor || "#e0e0e0", g = "#fff", f = "#2b2b2b");
    const m = s.focusBorderColor || "#2b2b2b", y = this.otpVariant === "error" ? "#c62828" : this.otpVariant === "success" ? "#2e7d32" : "#6b6b6b", v = this.inputType === "number" ? "tel" : this.inputType;
    return c`
      <style>
        :host { display: block; font-family: ${r}; }
        .otp-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: ${y}; }
        .otp-row { display: flex; gap: 8px; }
        .otp-box {
          width: ${p}; height: ${p}; border: 1px solid ${h}; border-radius: ${d};
          background-color: ${g}; color: ${f}; font-family: ${r}; font-size: ${b};
          text-align: center; outline: none; transition: ${l}; box-sizing: border-box;
        }
        .otp-box:focus { border-color: ${this.isDisabled ? h : m}; }
        .otp-box:disabled { cursor: not-allowed; }
      </style>
      <div class="otp-wrapper">
        ${this.label ? c`<div class="label">${this.label}</div>` : u}
        <div class="otp-row">
          ${this._digits.map((C, A) => c`
            <input
              class="otp-box"
              type=${v}
              maxlength="1"
              .value=${C}
              placeholder=${this.placeholder ? this.placeholder[0] || "" : u}
              ?disabled=${this.isDisabled}
              @input=${(O) => this._onDigitInput(O, A)}
              @keydown=${(O) => this._onKeyDown(O, A)}
              @paste=${(O) => this._onPaste(O, A)}
            />
          `)}
        </div>
        ${this.helperText ? c`<div class="helper-text">${this.helperText}</div>` : u}
      </div>
    `;
  }
  _getInputs() {
    return Array.from(this.shadowRoot?.querySelectorAll(".otp-box") || []);
  }
  _onDigitInput(e, s) {
    const i = e.target.value.slice(-1);
    this._digits = [...this._digits], this._digits[s] = i, this.value = this._digits.join(""), this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })), i && s < this.numDigits - 1 && this._getInputs()[s + 1]?.focus(), this.value.length === this.numDigits && !this._digits.includes("") && this.dispatchEvent(new CustomEvent("tarmac-complete", { bubbles: !0, composed: !0, detail: { value: this.value } })), this.requestUpdate();
  }
  _onKeyDown(e, s) {
    if (e.key === "Backspace" && !this._digits[s] && s > 0) {
      const i = this._getInputs();
      this._digits = [...this._digits], this._digits[s - 1] = "", this.value = this._digits.join(""), i[s - 1]?.focus(), this.requestUpdate();
    }
  }
  _onPaste(e, s) {
    e.preventDefault();
    const i = e.clipboardData?.getData("text") || "";
    this._digits = [...this._digits];
    for (let r = 0; r < i.length && s + r < this.numDigits; r++)
      this._digits[s + r] = i[r];
    this.value = this._digits.join(""), this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { value: this.value } })), this.value.length === this.numDigits && !this._digits.includes("") && this.dispatchEvent(new CustomEvent("tarmac-complete", { bubbles: !0, composed: !0, detail: { value: this.value } }));
    const o = this._getInputs(), a = Math.min(s + i.length, this.numDigits - 1);
    o[a]?.focus(), this.requestUpdate();
  }
};
Y([
  n({ type: Number, attribute: "num-digits" })
], I.prototype, "numDigits", 2);
Y([
  n({ type: String, attribute: "otp-style" })
], I.prototype, "otpStyle", 2);
Y([
  n({ type: String, attribute: "otp-size" })
], I.prototype, "otpSize", 2);
Y([
  n({ type: String, attribute: "otp-variant" })
], I.prototype, "otpVariant", 2);
Y([
  n({ type: Boolean, attribute: "is-disabled" })
], I.prototype, "isDisabled", 2);
Y([
  n({ type: String })
], I.prototype, "placeholder", 2);
Y([
  n({ type: String, attribute: "input-type" })
], I.prototype, "inputType", 2);
Y([
  n({ type: String })
], I.prototype, "label", 2);
Y([
  n({ type: String, attribute: "helper-text" })
], I.prototype, "helperText", 2);
Y([
  n({ type: String })
], I.prototype, "value", 2);
Y([
  ee()
], I.prototype, "_digits", 2);
I = Y([
  z("tarmac-otp-input")
], I);
var Ai = Object.defineProperty, Pi = Object.getOwnPropertyDescriptor, Ee = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Pi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ai(e, s, o), o;
};
const ko = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)", transition: "all 0.2s ease-in-out" },
  sizes: { sm: { maxWidth: "400px" }, md: { maxWidth: "520px" }, lg: { maxWidth: "720px" } }
}, ji = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let be = class extends x {
  constructor() {
    super(...arguments), this.isOpen = !1, this.size = "md", this.title = "", this.closable = !0, this.maskClosable = !0, this.width = "", this.centered = !1, this._cfg = ko, this._onEsc = (e) => {
      e.key === "Escape" && this.isOpen && this.closable && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.modal_tarmac || ko;
  }
  render() {
    if (!this.isOpen) return u;
    const e = this._cfg, s = e.base || {}, i = e.sizes?.[this.size] || e.sizes?.md || {}, o = s.fontFamily || "Noto Sans, sans-serif", a = s.radius || "8px", r = s.overlayBg || "rgba(0,0,0,0.45)", d = s.shadow || "0 4px 24px rgba(0,0,0,0.15)", l = this.width || i.maxWidth || "520px";
    return c`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${this.centered ? "center" : "flex-start"};
          justify-content: center; padding: ${this.centered ? "0" : "80px 0"};
          background: ${r}; font-family: ${o};
        }
        .container {
          background: #fff; border-radius: ${a}; box-shadow: ${d};
          width: 90%; max-width: ${l}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; justify-content: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Modal"} @click=${(p) => p.stopPropagation()}>
          ${this.title || this.closable ? c`
            <div class="header">
              <h2 class="title">${this.title}</h2>
              ${this.closable ? c`<button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${ji}></span></button>` : u}
            </div>
          ` : u}
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `;
  }
  _onOverlayClick() {
    this.maskClosable && this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
Ee([
  n({ type: Boolean, attribute: "is-open" })
], be.prototype, "isOpen", 2);
Ee([
  n({ type: String })
], be.prototype, "size", 2);
Ee([
  n({ type: String })
], be.prototype, "title", 2);
Ee([
  n({ type: Boolean })
], be.prototype, "closable", 2);
Ee([
  n({ type: Boolean, attribute: "mask-closable" })
], be.prototype, "maskClosable", 2);
Ee([
  n({ type: String })
], be.prototype, "width", 2);
Ee([
  n({ type: Boolean })
], be.prototype, "centered", 2);
be = Ee([
  z("tarmac-modal")
], be);
var Hi = Object.defineProperty, Ni = Object.getOwnPropertyDescriptor, ve = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ni(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Hi(e, s, o), o;
};
const So = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", shadow: "0 4px 16px rgba(0,0,0,0.12)" },
  variants: {
    success: { accentColor: "#1ba86e" },
    error: { accentColor: "#dc143c" },
    warning: { accentColor: "#f5c828" },
    info: { accentColor: "#2396fb" },
    default: { accentColor: "#2b2b2b" }
  }
}, Ri = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let re = class extends x {
  constructor() {
    super(...arguments), this.message = "", this.title = "", this.variant = "default", this.size = "md", this.duration = 3e3, this.closable = !1, this.position = "top-right", this._visible = !0, this._cfg = So;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this._clearTimer();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.toast_tarmac || So;
  }
  updated(e) {
    e.has("duration") && (this._clearTimer(), this._startTimer());
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
    if (!this._visible) return u;
    const e = this._cfg, s = e.base || {}, i = e.variants?.[this.variant] || e.variants?.default || {}, o = s.fontFamily || "Noto Sans, sans-serif", a = s.radius || "8px", r = s.shadow || "0 4px 16px rgba(0,0,0,0.12)", d = i.accentColor || "#2b2b2b", l = this.size === "sm" ? "8px 12px" : this.size === "lg" ? "16px 20px" : "12px 16px", p = this.size === "sm" ? "12px" : this.size === "lg" ? "16px" : "14px", b = this.size === "sm" ? "12px" : this.size === "lg" ? "14px" : "13px";
    let h = "";
    switch (this.position) {
      case "top-right":
        h = "top:16px;right:16px;";
        break;
      case "top-left":
        h = "top:16px;left:16px;";
        break;
      case "bottom-right":
        h = "bottom:16px;right:16px;";
        break;
      case "bottom-left":
        h = "bottom:16px;left:16px;";
        break;
      case "top":
        h = "top:16px;left:50%;transform:translateX(-50%);";
        break;
      case "bottom":
        h = "bottom:16px;left:50%;transform:translateX(-50%);";
        break;
    }
    return c`
      <style>
        :host { display: contents; }
        .toast {
          position: fixed; ${h} z-index: 1100;
          display: flex; align-items: flex-start; gap: 12px;
          background: #fff; border-left: 4px solid ${d};
          border-radius: ${a}; box-shadow: ${r};
          padding: ${l}; font-family: ${o};
          min-width: 280px; max-width: 420px;
          animation: toastIn 0.25s ease-out;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; color: ${d}; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${p}; font-weight: 600; color: #2b2b2b; line-height: 1.4; }
        .message { font-size: ${b}; color: #6b6b6b; line-height: 1.4; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: #6b6b6b;
          display: flex; align-items: center; flex-shrink: 0;
        }
        .close-btn:hover { color: #2b2b2b; }
      </style>
      <div class="toast" role="alert">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content">
          ${this.title ? c`<div class="title">${this.title}</div>` : u}
          ${this.message ? c`<div class="message">${this.message}</div>` : u}
        </div>
        ${this.closable ? c`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${Ri}></span></button>` : u}
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
ve([
  n({ type: String })
], re.prototype, "message", 2);
ve([
  n({ type: String })
], re.prototype, "title", 2);
ve([
  n({ type: String })
], re.prototype, "variant", 2);
ve([
  n({ type: String })
], re.prototype, "size", 2);
ve([
  n({ type: Number })
], re.prototype, "duration", 2);
ve([
  n({ type: Boolean })
], re.prototype, "closable", 2);
ve([
  n({ type: String })
], re.prototype, "position", 2);
ve([
  ee()
], re.prototype, "_visible", 2);
re = ve([
  z("tarmac-toast")
], re);
var Li = Object.defineProperty, Vi = Object.getOwnPropertyDescriptor, q = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Vi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Li(e, s, o), o;
};
const wo = {
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
}, Ui = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let U = class extends x {
  constructor() {
    super(...arguments), this.message = "", this.title = "", this.variant = "black", this.snackbarStyle = "singleText", this.size = "lg", this.trailingIcon = !1, this.ctAs = !1, this.denyText = "", this.approveText = "", this.duration = 5e3, this.position = "bottom", this._visible = !0, this._cfg = wo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._startTimer();
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this._clearTimer();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.snackbar_tarmac || wo;
  }
  updated(e) {
    e.has("duration") && (this._clearTimer(), this._startTimer());
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
    if (!this._visible) return u;
    const e = this._cfg, s = e.base || {}, i = e.variants?.[this.variant] || e.variants?.black || {}, o = s.fontFamily || "Noto Sans, sans-serif", a = s.radius || "8px", r = s.shadow || "0 4px 16px rgba(0,0,0,0.12)", d = i.backgroundColor || "#2b2b2b", l = i.textColor || "#ffffff", p = this.size === "sm" ? "8px 12px" : "12px 16px", b = this.size === "sm" ? "12px" : "14px", h = this.snackbarStyle === "dualText";
    let g = "";
    switch (this.position) {
      case "top-right":
        g = "top:16px;right:16px;";
        break;
      case "top-left":
        g = "top:16px;left:16px;";
        break;
      case "bottom-right":
        g = "bottom:16px;right:16px;";
        break;
      case "bottom-left":
        g = "bottom:16px;left:16px;";
        break;
      case "top":
        g = "top:16px;left:50%;transform:translateX(-50%);";
        break;
      case "bottom":
        g = "bottom:16px;left:50%;transform:translateX(-50%);";
        break;
    }
    return c`
      <style>
        :host { display: contents; }
        .snackbar {
          position: fixed; ${g} z-index: 1100;
          display: flex; align-items: center; gap: 12px;
          background: ${d}; color: ${l};
          border-radius: ${a}; box-shadow: ${r};
          padding: ${p}; font-family: ${o};
          min-width: 280px; max-width: 560px;
          animation: snackIn 0.25s ease-out;
        }
        @keyframes snackIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${b}; font-weight: 600; line-height: 1.4; }
        .message { font-size: ${b}; line-height: 1.4; opacity: ${h ? "0.8" : "1"}; }
        .actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .action-btn {
          background: none; border: 1px solid ${l}40; color: ${l};
          border-radius: 4px; padding: 4px 12px; font-size: 12px; font-weight: 500;
          cursor: pointer; font-family: ${o};
        }
        .action-btn:hover { background: ${l}15; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: ${l};
          display: flex; align-items: center; flex-shrink: 0; opacity: 0.7;
        }
        .close-btn:hover { opacity: 1; }
      </style>
      <div class="snackbar" role="alert">
        <span class="icon-slot"><slot name="leading-icon"></slot></span>
        <div class="content">
          ${h && this.title ? c`<div class="title">${this.title}</div>` : u}
          ${this.message ? c`<div class="message">${this.message}</div>` : u}
        </div>
        ${this.ctAs ? c`
          <div class="actions">
            ${this.denyText ? c`<button class="action-btn" @click=${this._handleDeny}>${this.denyText}</button>` : u}
            ${this.approveText ? c`<button class="action-btn" @click=${this._handleApprove}>${this.approveText}</button>` : u}
          </div>
        ` : u}
        ${this.trailingIcon ? c`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${Ui}></span></button>` : u}
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
q([
  n({ type: String })
], U.prototype, "message", 2);
q([
  n({ type: String })
], U.prototype, "title", 2);
q([
  n({ type: String })
], U.prototype, "variant", 2);
q([
  n({ type: String, attribute: "snackbar-style" })
], U.prototype, "snackbarStyle", 2);
q([
  n({ type: String })
], U.prototype, "size", 2);
q([
  n({ type: Boolean, attribute: "trailing-icon" })
], U.prototype, "trailingIcon", 2);
q([
  n({ type: Boolean, attribute: "ct-as" })
], U.prototype, "ctAs", 2);
q([
  n({ type: String, attribute: "deny-text" })
], U.prototype, "denyText", 2);
q([
  n({ type: String, attribute: "approve-text" })
], U.prototype, "approveText", 2);
q([
  n({ type: Number })
], U.prototype, "duration", 2);
q([
  n({ type: String })
], U.prototype, "position", 2);
q([
  ee()
], U.prototype, "_visible", 2);
U = q([
  z("tarmac-snackbar")
], U);
var Mi = Object.defineProperty, Wi = Object.getOwnPropertyDescriptor, Fe = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Wi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Mi(e, s, o), o;
};
const _o = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", shadow: "0 2px 8px rgba(0,0,0,0.15)", arrowSize: "6px" },
  variants: {
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b" },
    black: { backgroundColor: "#2b2b2b", textColor: "#ffffff" },
    coal: { backgroundColor: "#64739b", textColor: "#ffffff" }
  },
  sizes: {
    sm: { padding: "4px 8px", fontSize: "12px" },
    md: { padding: "8px 12px", fontSize: "13px" },
    lg: { padding: "12px 16px", fontSize: "14px" }
  }
};
let ge = class extends x {
  constructor() {
    super(...arguments), this.content = "", this.placement = "top", this.trigger = "hover", this.variant = "black", this.size = "md", this.visible = !1, this._show = !1, this._cfg = _o;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), this.visible && (this._show = !0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.tooltip_tarmac || _o;
  }
  updated(e) {
    e.has("visible") && (this._show = this.visible);
  }
  render() {
    const e = this._cfg, s = e.base || {}, i = e.variants?.[this.variant] || e.variants?.black || {}, o = e.sizes?.[this.size] || e.sizes?.md || {}, a = s.fontFamily || "Noto Sans, sans-serif", r = s.radius || "4px", d = s.shadow || "0 2px 8px rgba(0,0,0,0.15)", l = s.arrowSize || "6px", p = i.backgroundColor || "#2b2b2b", b = i.textColor || "#ffffff", h = o.padding || "8px 12px", g = o.fontSize || "13px", f = this.placement.split("-")[0];
    let m = "", y = "";
    switch (f) {
      case "top":
        m = "bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;", y = `bottom: -${l}; left: 50%; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-top: ${l} solid ${p};`;
        break;
      case "bottom":
        m = "top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;", y = `top: -${l}; left: 50%; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-bottom: ${l} solid ${p};`;
        break;
      case "left":
        m = "right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;", y = `right: -${l}; top: 50%; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-left: ${l} solid ${p};`;
        break;
      case "right":
        m = "left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;", y = `left: -${l}; top: 50%; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-right: ${l} solid ${p};`;
        break;
    }
    return c`
      <style>
        :host { display: inline-block; position: relative; }
        .trigger { display: inline-block; }
        .tooltip-container {
          position: absolute; ${m} z-index: 1000;
          background: ${p}; color: ${b};
          border-radius: ${r}; box-shadow: ${d};
          padding: ${h}; font-family: ${a}; font-size: ${g};
          line-height: 1.4; white-space: nowrap; pointer-events: none;
          opacity: ${this._show ? "1" : "0"};
          visibility: ${this._show ? "visible" : "hidden"};
          transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        }
        .arrow { position: absolute; width: 0; height: 0; ${y} }
      </style>
      <div class="trigger"
        @mouseenter=${this.trigger === "hover" ? this._onShow : u}
        @mouseleave=${this.trigger === "hover" ? this._onHide : u}
        @click=${this.trigger === "click" ? this._onToggle : u}
        @focusin=${this.trigger === "focus" ? this._onShow : u}
        @focusout=${this.trigger === "focus" ? this._onHide : u}
      >
        <slot></slot>
      </div>
      ${this.content ? c`
        <div class="tooltip-container" role="tooltip">
          ${this.content}
          <span class="arrow"></span>
        </div>
      ` : u}
    `;
  }
  _onShow() {
    this._show = !0, this._emitChange();
  }
  _onHide() {
    this._show = !1, this._emitChange();
  }
  _onToggle() {
    this._show = !this._show, this._emitChange();
  }
  _emitChange() {
    this.dispatchEvent(new CustomEvent("tarmac-visible-change", { bubbles: !0, composed: !0, detail: { visible: this._show } }));
  }
};
Fe([
  n({ type: String })
], ge.prototype, "content", 2);
Fe([
  n({ type: String })
], ge.prototype, "placement", 2);
Fe([
  n({ type: String })
], ge.prototype, "trigger", 2);
Fe([
  n({ type: String })
], ge.prototype, "variant", 2);
Fe([
  n({ type: String })
], ge.prototype, "size", 2);
Fe([
  n({ type: Boolean })
], ge.prototype, "visible", 2);
Fe([
  ee()
], ge.prototype, "_show", 2);
ge = Fe([
  z("tarmac-tooltip")
], ge);
var Gi = Object.defineProperty, Ii = Object.getOwnPropertyDescriptor, De = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Ii(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Gi(e, s, o), o;
};
const zo = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)" },
  sizes: { xs: { maxWidth: "320px" }, sm: { maxWidth: "400px" }, md: { maxWidth: "520px" }, lg: { maxWidth: "640px" }, xl: { maxWidth: "800px" } }
}, qi = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let fe = class extends x {
  constructor() {
    super(...arguments), this.isOpen = !1, this.size = "md", this.title = "", this.subtext = "", this.showFooter = !1, this.closeOnOverlay = !0, this.closeOnEsc = !0, this._cfg = zo, this._onEsc = (t) => {
      t.key === "Escape" && this.isOpen && this.closeOnEsc && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const t = B(this);
    this._cfg = t?.components?.popup_tarmac || zo;
  }
  render() {
    if (!this.isOpen) return u;
    const t = this._cfg, e = t.base || {}, s = t.sizes?.[this.size] || t.sizes?.md || {}, i = e.fontFamily || "Noto Sans, sans-serif", o = e.radius || "8px", a = e.overlayBg || "rgba(0,0,0,0.45)", r = e.shadow || "0 4px 24px rgba(0,0,0,0.15)", d = s.maxWidth || "520px";
    return c`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: center; justify-content: center;
          background: ${a}; font-family: ${i};
        }
        .container {
          background: #fff; border-radius: ${o}; box-shadow: ${r};
          width: 90%; max-width: ${d}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: popupIn 0.2s ease-out;
        }
        @keyframes popupIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .header-row { display: flex; align-items: center; gap: 8px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px; flex-shrink: 0;
        }
        .close-btn:hover { background: #f5f5f5; }
        .icon-slot { display: flex; align-items: center; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Popup"} @click=${(l) => l.stopPropagation()}>
          <div class="header">
            <div class="header-content">
              <div class="header-row">
                <span class="icon-slot"><slot name="leading-icon"></slot></span>
                <h2 class="title">${this.title}</h2>
              </div>
              ${this.subtext ? c`<div class="subtext">${this.subtext}</div>` : u}
            </div>
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
            <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${qi}></span></button>
          </div>
          <div class="body"><slot></slot></div>
          ${this.showFooter ? c`<div class="footer"><slot name="footer"></slot></div>` : u}
        </div>
      </div>
    `;
  }
  _onOverlayClick() {
    this.closeOnOverlay && this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
De([
  n({ type: Boolean, attribute: "is-open" })
], fe.prototype, "isOpen", 2);
De([
  n({ type: String })
], fe.prototype, "size", 2);
De([
  n({ type: String })
], fe.prototype, "title", 2);
De([
  n({ type: String })
], fe.prototype, "subtext", 2);
De([
  n({ type: Boolean, attribute: "show-footer" })
], fe.prototype, "showFooter", 2);
De([
  n({ type: Boolean, attribute: "close-on-overlay" })
], fe.prototype, "closeOnOverlay", 2);
De([
  n({ type: Boolean, attribute: "close-on-esc" })
], fe.prototype, "closeOnEsc", 2);
fe = De([
  z("tarmac-popup")
], fe);
var Ki = Object.defineProperty, Xi = Object.getOwnPropertyDescriptor, K = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Xi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ki(e, s, o), o;
};
const To = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", overlayBg: "rgba(0,0,0,0.45)", shadow: "0 4px 24px rgba(0,0,0,0.15)" }
}, Yi = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
let M = class extends x {
  constructor() {
    super(...arguments), this.isOpen = !1, this.type = "standard", this.size = "web", this.title = "", this.subtext = "", this.heading = "", this.description = "", this.showHeader = !0, this.showFooter = !0, this.showCheckbox = !1, this.checkboxLabel = "", this.checkboxChecked = !1, this._cfg = To, this._onEsc = (t) => {
      t.key === "Escape" && this.isOpen && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const t = B(this);
    this._cfg = t?.components?.dialog_box_tarmac || To;
  }
  render() {
    if (!this.isOpen) return u;
    const t = this._cfg.base || {}, e = t.fontFamily || "Noto Sans, sans-serif", s = t.radius || "8px", i = t.overlayBg || "rgba(0,0,0,0.45)", o = t.shadow || "0 4px 24px rgba(0,0,0,0.15)", a = this.size === "mobile";
    return c`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${a ? "flex-end" : "center"}; justify-content: center;
          background: ${i}; font-family: ${e};
        }
        .container {
          background: #fff; border-radius: ${a ? `${s} ${s} 0 0` : s};
          box-shadow: ${o}; display: flex; flex-direction: column; overflow: hidden;
          width: ${a ? "100%" : "90%"}; max-width: ${a ? "100%" : "480px"};
          max-height: 80vh; animation: dialogIn 0.2s ease-out;
        }
        @keyframes dialogIn { from { opacity: 0; transform: ${a ? "translateY(20px)" : "scale(0.95)"}; } to { opacity: 1; transform: ${a ? "translateY(0)" : "scale(1)"}; } }
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
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title || "Dialog"} @click=${(r) => r.stopPropagation()}>
          ${this.showHeader ? c`
            <div class="header">
              <div class="header-content">
                ${this.title ? c`<h2 class="title">${this.title}</h2>` : u}
                ${this.subtext ? c`<div class="subtext">${this.subtext}</div>` : u}
              </div>
              <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${Yi}></span></button>
            </div>
          ` : u}
          <div class="illustration"><slot name="illustration"></slot></div>
          <div class="snackbar-slot"><slot name="snackbar"></slot></div>
          <div class="body">
            ${this.heading ? c`<h3 class="heading">${this.heading}</h3>` : u}
            ${this.description ? c`<p class="description">${this.description}</p>` : u}
            <slot></slot>
          </div>
          ${this.showCheckbox ? c`
            <label class="checkbox-row">
              <input type="checkbox" .checked=${this.checkboxChecked} @change=${this._onCheckbox} />
              <span class="checkbox-label">${this.checkboxLabel}</span>
            </label>
          ` : u}
          ${this.showFooter ? c`<div class="footer"><slot name="footer"></slot></div>` : u}
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
  _onCheckbox(t) {
    const e = t.target.checked;
    this.checkboxChecked = e, this.dispatchEvent(new CustomEvent("tarmac-checkbox-change", { bubbles: !0, composed: !0, detail: { checked: e } }));
  }
};
K([
  n({ type: Boolean, attribute: "is-open" })
], M.prototype, "isOpen", 2);
K([
  n({ type: String })
], M.prototype, "type", 2);
K([
  n({ type: String })
], M.prototype, "size", 2);
K([
  n({ type: String })
], M.prototype, "title", 2);
K([
  n({ type: String })
], M.prototype, "subtext", 2);
K([
  n({ type: String })
], M.prototype, "heading", 2);
K([
  n({ type: String })
], M.prototype, "description", 2);
K([
  n({ type: Boolean, attribute: "show-header" })
], M.prototype, "showHeader", 2);
K([
  n({ type: Boolean, attribute: "show-footer" })
], M.prototype, "showFooter", 2);
K([
  n({ type: Boolean, attribute: "show-checkbox" })
], M.prototype, "showCheckbox", 2);
K([
  n({ type: String, attribute: "checkbox-label" })
], M.prototype, "checkboxLabel", 2);
K([
  n({ type: Boolean, attribute: "checkbox-checked" })
], M.prototype, "checkboxChecked", 2);
M = K([
  z("tarmac-dialog-box")
], M);
var Ji = Object.defineProperty, Zi = Object.getOwnPropertyDescriptor, ht = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? Zi(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Ji(e, s, o), o;
};
const Bo = {
  base: { fontFamily: "Noto Sans, sans-serif", overlayBg: "rgba(0,0,0,0.45)", shadow: "-4px 0 24px rgba(0,0,0,0.15)", transition: "transform 0.3s ease-in-out" },
  variants: { narrow: { width: "400px" }, extended: { width: "640px" } }
};
let Ye = class extends x {
  constructor() {
    super(...arguments), this.isOpen = !1, this.variant = "narrow", this.closeOnOverlay = !0, this.closeOnEsc = !0, this._cfg = Bo, this._onEsc = (t) => {
      t.key === "Escape" && this.isOpen && this.closeOnEsc && this._close();
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), document.addEventListener("keydown", this._onEsc);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("keydown", this._onEsc);
  }
  _resolve() {
    const t = B(this);
    this._cfg = t?.components?.side_drawer_tarmac || Bo;
  }
  render() {
    if (!this.isOpen) return u;
    const t = this._cfg, e = t.base || {}, s = t.variants?.[this.variant] || t.variants?.narrow || {}, i = e.fontFamily || "Noto Sans, sans-serif", o = e.overlayBg || "rgba(0,0,0,0.45)", a = e.shadow || "-4px 0 24px rgba(0,0,0,0.15)", r = s.width || "400px";
    return c`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: ${o}; font-family: ${i};
          animation: overlayIn 0.2s ease-out;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 1001;
          width: ${r}; max-width: 90vw; background: #fff;
          box-shadow: ${a}; overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="drawer" role="dialog" aria-modal="true">
        <slot></slot>
      </div>
    `;
  }
  _onOverlayClick() {
    this.closeOnOverlay && this._close();
  }
  _close() {
    this.dispatchEvent(new CustomEvent("tarmac-close", { bubbles: !0, composed: !0 }));
  }
};
ht([
  n({ type: Boolean, attribute: "is-open" })
], Ye.prototype, "isOpen", 2);
ht([
  n({ type: String })
], Ye.prototype, "variant", 2);
ht([
  n({ type: Boolean, attribute: "close-on-overlay" })
], Ye.prototype, "closeOnOverlay", 2);
ht([
  n({ type: Boolean, attribute: "close-on-esc" })
], Ye.prototype, "closeOnEsc", 2);
Ye = ht([
  z("tarmac-side-drawer")
], Ye);
var Qi = Object.defineProperty, er = Object.getOwnPropertyDescriptor, kt = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? er(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && Qi(e, s, o), o;
};
const Eo = {
  base: { fontFamily: "Noto Sans, sans-serif", borderColor: "#e6e6e6", radius: "4px", transition: "all 0.2s ease-in-out", headerPadding: "12px", contentPadding: "12px", headerFontSize: "14px", headerLineHeight: "20px" }
}, tr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
let dt = class extends x {
  constructor() {
    super(...arguments), this.accordion = !1, this.activeKey = "", this._openKeys = /* @__PURE__ */ new Set(), this._cfg = Eo;
  }
  connectedCallback() {
    super.connectedCallback(), this.activeKey && (this._openKeys = new Set(this.activeKey.split(",").map((e) => e.trim()))), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.collapse_tarmac || Eo;
  }
  updated(e) {
    e.has("activeKey") && this.activeKey && (this._openKeys = new Set(this.activeKey.split(",").map((s) => s.trim())));
  }
  render() {
    const e = this._cfg.base || {}, s = e.fontFamily || "Noto Sans, sans-serif", i = e.borderColor || "#e6e6e6", o = e.radius || "4px", a = e.transition || "all 0.2s ease-in-out", r = e.headerPadding || "12px", d = e.contentPadding || "12px", l = e.headerFontSize || "14px", p = e.headerLineHeight || "20px", b = Array.from(this.children).filter((h) => h.hasAttribute("data-key"));
    return c`
      <style>
        :host { display: block; font-family: ${s}; }
        .collapse { border: 1px solid ${i}; border-radius: ${o}; overflow: hidden; }
        .panel { border-bottom: 1px solid ${i}; }
        .panel:last-child { border-bottom: none; }
        .panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: ${r}; cursor: pointer; user-select: none;
          font-size: ${l}; line-height: ${p};
          font-weight: 500; color: #2b2b2b; background: #fff;
        }
        .panel-header:hover { background: #fafafa; }
        .chevron { display: flex; align-items: center; transition: ${a}; color: #6b6b6b; }
        .chevron.open { transform: rotate(180deg); }
        .panel-content {
          overflow: hidden; max-height: 0; transition: max-height 0.2s ease-in-out;
        }
        .panel-content.open { max-height: 1000px; }
        .panel-content-inner { padding: ${d}; border-top: 1px solid ${i}; }
      </style>
      <div class="collapse">
        ${b.map((h) => {
      const g = h.getAttribute("data-key") || "", f = h.getAttribute("data-title") || g, m = this._openKeys.has(g);
      return c`
            <div class="panel">
              <div class="panel-header" @click=${() => this._togglePanel(g)}>
                <span>${f}</span>
                <span class="chevron ${m ? "open" : ""}" .innerHTML=${tr}></span>
              </div>
              <div class="panel-content ${m ? "open" : ""}">
                <div class="panel-content-inner"></div>
              </div>
            </div>
          `;
    })}
        <div style="display:none;"><slot></slot></div>
      </div>
    `;
  }
  _togglePanel(e) {
    const s = new Set(this._openKeys);
    s.has(e) ? s.delete(e) : (this.accordion && s.clear(), s.add(e)), this._openKeys = s, this.dispatchEvent(new CustomEvent("tarmac-change", { bubbles: !0, composed: !0, detail: { activeKey: Array.from(s).join(",") } }));
  }
};
kt([
  n({ type: Boolean })
], dt.prototype, "accordion", 2);
kt([
  n({ type: String, attribute: "active-key" })
], dt.prototype, "activeKey", 2);
kt([
  ee()
], dt.prototype, "_openKeys", 2);
dt = kt([
  z("tarmac-collapse")
], dt);
var or = Object.defineProperty, sr = Object.getOwnPropertyDescriptor, ut = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? sr(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && or(e, s, o), o;
};
const Fo = {
  base: { size: "56px", shadow: "0 4px 12px rgba(0,0,0,0.2)", transition: "all 0.2s ease-in-out" },
  variants: {
    light: { backgroundColor: "#ffffff", iconColor: "#2b2b2b" },
    dark: { backgroundColor: "#2b2b2b", iconColor: "#ffffff" },
    "info-blue": { backgroundColor: "#2396fb", iconColor: "#ffffff" }
  }
}, ir = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';
let Je = class extends x {
  constructor() {
    super(...arguments), this.position = "bottom-right", this.variant = "light", this.positionMode = "fixed", this._isOpen = !1, this._cfg = Fo;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.fab_tarmac || Fo;
  }
  render() {
    const e = this._cfg, s = e.base || {}, i = e.variants?.[this.variant] || e.variants?.light || {}, o = s.size || "56px", a = s.shadow || "0 4px 12px rgba(0,0,0,0.2)", r = s.transition || "all 0.2s ease-in-out", d = i.backgroundColor || "#ffffff", l = i.iconColor || "#2b2b2b";
    let p = "";
    switch (this.position) {
      case "bottom-right":
        p = "bottom: 24px; right: 24px;";
        break;
      case "bottom-left":
        p = "bottom: 24px; left: 24px;";
        break;
      case "top-right":
        p = "top: 24px; right: 24px;";
        break;
      case "top-left":
        p = "top: 24px; left: 24px;";
        break;
    }
    const b = this.position.startsWith("bottom");
    return c`
      <style>
        :host { display: contents; }
        .fab-wrapper {
          position: ${this.positionMode}; ${p} z-index: 900;
          display: flex; flex-direction: ${b ? "column-reverse" : "column"}; align-items: center; gap: 8px;
        }
        .fab-trigger {
          width: ${o}; height: ${o}; border-radius: 50%;
          background: ${d}; color: ${l};
          border: none; cursor: pointer; box-shadow: ${a};
          display: flex; align-items: center; justify-content: center;
          transition: ${r}; padding: 0;
        }
        .fab-trigger:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.25); }
        .fab-trigger.open { transform: rotate(45deg); }
        .fab-trigger ::slotted(*) { width: 24px; height: 24px; }
        .fab-menu {
          display: ${this._isOpen ? "flex" : "none"};
          flex-direction: column; gap: 8px; align-items: center;
          animation: menuIn 0.2s ease-out;
        }
        @keyframes menuIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      </style>
      <div class="fab-wrapper">
        <button class="fab-trigger ${this._isOpen ? "open" : ""}" @click=${this._toggle} aria-label="Toggle menu">
          <slot name="trigger"><span .innerHTML=${ir}></span></slot>
        </button>
        <div class="fab-menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `;
  }
  _toggle() {
    this._isOpen = !this._isOpen, this.dispatchEvent(new CustomEvent("tarmac-toggle", { bubbles: !0, composed: !0, detail: { isOpen: this._isOpen } }));
  }
};
ut([
  n({ type: String })
], Je.prototype, "position", 2);
ut([
  n({ type: String })
], Je.prototype, "variant", 2);
ut([
  n({ type: String, attribute: "position-mode" })
], Je.prototype, "positionMode", 2);
ut([
  ee()
], Je.prototype, "_isOpen", 2);
Je = ut([
  z("tarmac-fab")
], Je);
var rr = Object.defineProperty, ar = Object.getOwnPropertyDescriptor, et = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? ar(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && rr(e, s, o), o;
};
const Do = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "8px", shadow: "0 4px 16px rgba(0,0,0,0.12)", arrowSize: "8px" },
  variants: {
    white: { backgroundColor: "#ffffff", textColor: "#2b2b2b", descriptionColor: "#6b6b6b" },
    black: { backgroundColor: "#2b2b2b", textColor: "#ffffff", descriptionColor: "#b3b1b1" }
  },
  sizes: { sm: { width: "264px" }, lg: { width: "300px" } }
};
let Re = class extends x {
  constructor() {
    super(...arguments), this.variant = "white", this.size = "lg", this.arrowPosition = "bottom-center", this.title = "", this.description = "", this._cfg = Do;
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.();
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.coachmarks_tarmac || Do;
  }
  render() {
    const e = this._cfg, s = e.base || {}, i = e.variants?.[this.variant] || e.variants?.white || {}, o = e.sizes?.[this.size] || e.sizes?.lg || {}, a = s.fontFamily || "Noto Sans, sans-serif", r = s.radius || "8px", d = s.shadow || "0 4px 16px rgba(0,0,0,0.12)", l = s.arrowSize || "8px", p = i.backgroundColor || "#ffffff", b = i.textColor || "#2b2b2b", h = i.descriptionColor || "#6b6b6b", g = o.width || "300px", [f, m] = this.arrowPosition.split("-");
    let y = "";
    const v = m === "start" ? "16px" : m === "end" ? "calc(100% - 24px)" : "50%";
    switch (f) {
      case "top":
        y = `top: -${l}; left: ${v}; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-bottom: ${l} solid ${p};`;
        break;
      case "bottom":
        y = `bottom: -${l}; left: ${v}; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-top: ${l} solid ${p};`;
        break;
      case "left":
        y = `left: -${l}; top: ${v}; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-right: ${l} solid ${p};`;
        break;
      case "right":
        y = `right: -${l}; top: ${v}; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-left: ${l} solid ${p};`;
        break;
    }
    return c`
      <style>
        :host { display: inline-block; position: relative; }
        .coachmark {
          width: ${g}; background: ${p}; color: ${b};
          border-radius: ${r}; box-shadow: ${d};
          padding: 16px; font-family: ${a}; position: relative;
        }
        .arrow { position: absolute; width: 0; height: 0; ${y} }
        .image-slot { margin-bottom: 12px; }
        .image-slot ::slotted(*) { width: 100%; border-radius: 4px; }
        .title { font-size: 14px; font-weight: 600; line-height: 20px; margin: 0 0 4px; color: ${b}; }
        .description { font-size: 13px; line-height: 18px; color: ${h}; margin: 0 0 12px; }
        .badges-slot { margin-bottom: 12px; }
        .ctas-slot { display: flex; gap: 8px; }
      </style>
      <div class="coachmark">
        <span class="arrow"></span>
        <div class="image-slot"><slot name="image"></slot></div>
        ${this.title ? c`<h4 class="title">${this.title}</h4>` : u}
        ${this.description ? c`<p class="description">${this.description}</p>` : u}
        <div class="badges-slot"><slot name="badges"></slot></div>
        <div class="ctas-slot"><slot name="ctas"></slot></div>
      </div>
    `;
  }
};
et([
  n({ type: String })
], Re.prototype, "variant", 2);
et([
  n({ type: String })
], Re.prototype, "size", 2);
et([
  n({ type: String, attribute: "arrow-position" })
], Re.prototype, "arrowPosition", 2);
et([
  n({ type: String })
], Re.prototype, "title", 2);
et([
  n({ type: String })
], Re.prototype, "description", 2);
Re = et([
  z("tarmac-coachmarks")
], Re);
var nr = Object.defineProperty, lr = Object.getOwnPropertyDescriptor, Lt = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? lr(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && nr(e, s, o), o;
};
const Oo = {
  base: { fontFamily: "Noto Sans, sans-serif", borderColor: "#e6e6e6" }
};
let mt = class extends x {
  constructor() {
    super(...arguments), this.orientation = "horizontal", this.size = "lg", this._cfg = Oo, this._onTabClick = (e) => {
      const s = e.target.closest("tarmac-tab-cell");
      if (!s) return;
      const i = Array.from(this.querySelectorAll("tarmac-tab-cell")).indexOf(s);
      i >= 0 && this.dispatchEvent(new CustomEvent("tarmac-tab-change", { bubbles: !0, composed: !0, detail: { index: i } }));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), this.addEventListener("click", this._onTabClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), this.removeEventListener("click", this._onTabClick);
  }
  _resolve() {
    const e = B(this);
    this._cfg = e?.components?.tab_group_tarmac || Oo;
  }
  render() {
    const e = this._cfg.base || {}, s = e.fontFamily || "Noto Sans, sans-serif", i = e.borderColor || "#e6e6e6", o = this.orientation === "horizontal";
    return c`
      <style>
        :host { display: block; font-family: ${s}; }
        .tab-group {
          display: flex;
          flex-direction: ${o ? "row" : "column"};
          ${o ? `border-bottom: 1px solid ${i};` : `border-right: 1px solid ${i};`}
          gap: 0;
        }
        ::slotted(*) { cursor: pointer; }
      </style>
      <div class="tab-group" role="tablist" aria-orientation=${this.orientation}>
        <slot></slot>
      </div>
    `;
  }
};
Lt([
  n({ type: String })
], mt.prototype, "orientation", 2);
Lt([
  n({ type: String })
], mt.prototype, "size", 2);
mt = Lt([
  z("tarmac-tab-group")
], mt);
var dr = Object.defineProperty, cr = Object.getOwnPropertyDescriptor, tt = (t, e, s, i) => {
  for (var o = i > 1 ? void 0 : i ? cr(e, s) : e, a = t.length - 1, r; a >= 0; a--)
    (r = t[a]) && (o = (i ? r(e, s, o) : r(o)) || o);
  return i && o && dr(e, s, o), o;
};
const Ao = {
  base: { fontFamily: "Noto Sans, sans-serif", radius: "4px", borderColor: "#e0e0e0", shadow: "0 4px 16px rgba(0,0,0,0.12)" }
}, pr = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';
let Le = class extends x {
  constructor() {
    super(...arguments), this.placeholder = "Select", this.size = "lg", this.options = "[]", this._isOpen = !1, this._selected = /* @__PURE__ */ new Set(), this._cfg = Ao, this._parsedOptions = [], this._onDocClick = (t) => {
      this._isOpen && (t.composedPath().includes(this) || (this._isOpen = !1));
    };
  }
  connectedCallback() {
    super.connectedCallback(), this._resolve(), this._unsub = E(this, () => {
      this._resolve(), this.requestUpdate();
    }), this._parseOptions(), document.addEventListener("click", this._onDocClick);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._unsub?.(), document.removeEventListener("click", this._onDocClick);
  }
  _resolve() {
    const t = B(this);
    this._cfg = t?.components?.filter_dropdown_tarmac || Ao;
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
    const t = this._cfg.base || {}, e = t.fontFamily || "Noto Sans, sans-serif", s = t.radius || "4px", i = t.borderColor || "#e0e0e0", o = t.shadow || "0 4px 16px rgba(0,0,0,0.12)", a = this.size === "sm" ? "6px 10px" : "8px 12px", r = this.size === "sm" ? "13px" : "14px", d = this._selected.size;
    return c`
      <style>
        :host { display: inline-block; position: relative; font-family: ${e}; }
        .trigger {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid ${i}; border-radius: ${s};
          padding: ${a}; cursor: pointer; background: #fff;
          font-size: ${r}; color: #2b2b2b; user-select: none;
          min-width: 120px;
        }
        .trigger:hover { border-color: #b3b1b1; }
        .trigger-text { flex: 1; }
        .badge { background: #2396fb; color: #fff; border-radius: 10px; padding: 0 6px; font-size: 11px; font-weight: 600; line-height: 18px; }
        .chevron { display: flex; align-items: center; color: #6b6b6b; transition: transform 0.15s; }
        .chevron.open { transform: rotate(180deg); }
        .dropdown {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
          background: #fff; border: 1px solid ${i}; border-radius: ${s};
          box-shadow: ${o}; z-index: 100; max-height: 280px; display: flex; flex-direction: column;
        }
        .options { overflow-y: auto; flex: 1; padding: 4px 0; }
        .option {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; font-size: ${r}; color: #2b2b2b;
        }
        .option:hover { background: #f5f5f5; }
        .option.disabled { opacity: 0.5; cursor: default; pointer-events: none; }
        .option input { margin: 0; cursor: pointer; }
        .footer {
          display: flex; justify-content: space-between; padding: 8px 12px;
          border-top: 1px solid ${i};
        }
        .footer-btn {
          background: none; border: none; cursor: pointer; font-size: 13px;
          font-weight: 500; font-family: ${e}; padding: 4px 8px; border-radius: 4px;
        }
        .clear-btn { color: #6b6b6b; }
        .clear-btn:hover { background: #f5f5f5; }
        .apply-btn { color: #2396fb; }
        .apply-btn:hover { background: #eff8ff; }
      </style>
      <div class="trigger" @click=${this._toggleDropdown}>
        <span class="trigger-text">${this.placeholder}</span>
        ${d > 0 ? c`<span class="badge">${d}</span>` : u}
        <span class="chevron ${this._isOpen ? "open" : ""}" .innerHTML=${pr}></span>
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
      ` : u}
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
tt([
  n({ type: String })
], Le.prototype, "placeholder", 2);
tt([
  n({ type: String })
], Le.prototype, "size", 2);
tt([
  n({ type: String })
], Le.prototype, "options", 2);
tt([
  ee()
], Le.prototype, "_isOpen", 2);
tt([
  ee()
], Le.prototype, "_selected", 2);
Le = tt([
  z("tarmac-filter-dropdown")
], Le);
function hr() {
  return `:host {
${Object.entries(Mo).map(([t, e]) => `  ${t}: ${e};`).join(`
`)}
}`;
}
const ur = hr();
class gn extends x {
  static {
    this.tokenStyles = At(ur);
  }
  static {
    this.baseStyles = yt`
    :host {
      display: inline-block;
      box-sizing: border-box;
      font-family: 'Noto Sans', 'IBM Plex Sans', sans-serif;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }
  `;
  }
}
const fn = {
  install(t) {
    t.config.compilerOptions.isCustomElement = (e) => e.startsWith("tarmac-");
  }
}, br = k({
  name: "TarmacButton",
  props: {
    variant: { type: String, default: "primary" },
    size: { type: String, default: "md" },
    buttonStyle: { type: String, default: "primary" },
    buttonType: { type: String, default: "button" },
    isLoading: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    isRounded: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 },
    text: { type: String, default: "" },
    backgroundColor: { type: String, default: void 0 },
    borderColor: { type: String, default: void 0 },
    textColor: { type: String, default: void 0 },
    hoverColor: { type: String, default: void 0 },
    radius: { type: String, default: void 0 },
    border: { type: String, default: void 0 }
  },
  emits: ["click"]
}), T = (t, e) => {
  const s = t.__vccOpts || t;
  for (const [i, o] of e)
    s[i] = o;
  return s;
};
function gr(t, e, s, i, o, a) {
  const r = S("tarmac-button", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    "button-style": t.buttonStyle,
    "button-type": t.buttonType,
    "is-loading": t.isLoading || void 0,
    disabled: t.disabled || void 0,
    "is-rounded": t.isRounded || void 0,
    "is-ghost": t.isGhost || void 0,
    text: t.text,
    "background-color": t.backgroundColor,
    "border-color": t.borderColor,
    "text-color": t.textColor,
    "hover-color": t.hoverColor,
    radius: t.radius,
    border: t.border,
    onTarmacClick: e[0] || (e[0] = (d) => t.$emit("click", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "default"),
      $(t.$slots, "trailing-icon")
    ]),
    _: 3
  }, 8, ["variant", "size", "button-style", "button-type", "is-loading", "disabled", "is-rounded", "is-ghost", "text", "background-color", "border-color", "text-color", "hover-color", "radius", "border"]);
}
const mn = /* @__PURE__ */ T(br, [["render", gr]]), fr = k({
  name: "TarmacAlert",
  props: {
    variant: { type: String, default: "default" },
    size: { type: String, default: "md" },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    closable: { type: Boolean, default: !1 },
    alertStyle: { type: String, default: "singleText" },
    showCtas: { type: Boolean, default: !1 },
    cancelText: { type: String, default: "Cancel" },
    proceedText: { type: String, default: "Proceed" },
    backgroundColor: { type: String, default: void 0 },
    borderColor: { type: String, default: void 0 },
    textColor: { type: String, default: void 0 },
    iconColor: { type: String, default: void 0 }
  },
  emits: ["close", "cancel", "proceed"]
});
function mr(t, e, s, i, o, a) {
  const r = S("tarmac-alert", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    title: t.title,
    description: t.description,
    closable: t.closable || void 0,
    "alert-style": t.alertStyle,
    "show-ctas": t.showCtas || void 0,
    "cancel-text": t.cancelText,
    "proceed-text": t.proceedText,
    "background-color": t.backgroundColor,
    "border-color": t.borderColor,
    "text-color": t.textColor,
    "icon-color": t.iconColor,
    onTarmacClose: e[0] || (e[0] = (d) => t.$emit("close", d)),
    onTarmacCancel: e[1] || (e[1] = (d) => t.$emit("cancel", d)),
    onTarmacProceed: e[2] || (e[2] = (d) => t.$emit("proceed", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "trailing-icon"),
      $(t.$slots, "cta-actions"),
      $(t.$slots, "icon"),
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["variant", "size", "title", "description", "closable", "alert-style", "show-ctas", "cancel-text", "proceed-text", "background-color", "border-color", "text-color", "icon-color"]);
}
const yn = /* @__PURE__ */ T(fr, [["render", mr]]), yr = k({
  name: "TarmacBadge",
  props: {
    variant: { type: String, default: "black" },
    size: { type: String, default: "md" },
    badgeType: { type: String, default: "solid" },
    text: { type: String, default: "" },
    showStatus: { type: Boolean, default: !1 },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 }
  }
});
function $r(t, e, s, i, o, a) {
  const r = S("tarmac-badge", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    "badge-type": t.badgeType,
    text: t.text,
    "show-status": t.showStatus || void 0,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "default"),
      $(t.$slots, "trailing-icon")
    ]),
    _: 3
  }, 8, ["variant", "size", "badge-type", "text", "show-status", "is-disabled", "is-ghost"]);
}
const $n = /* @__PURE__ */ T(yr, [["render", $r]]), vr = k({
  name: "TarmacSpinner",
  props: {
    size: { type: String, default: "md" },
    variant: { type: String, default: "default" },
    tarmacVariant: { type: String, default: void 0 },
    tarmacSize: { type: String, default: "24px" },
    color: { type: String, default: void 0 },
    trackColor: { type: String, default: void 0 }
  }
});
function xr(t, e, s, i, o, a) {
  const r = S("tarmac-spinner", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    "tarmac-variant": t.tarmacVariant,
    "tarmac-size": t.tarmacSize,
    color: t.color,
    "track-color": t.trackColor
  }, null, 8, ["variant", "size", "tarmac-variant", "tarmac-size", "color", "track-color"]);
}
const vn = /* @__PURE__ */ T(vr, [["render", xr]]), Cr = k({
  name: "TarmacChip",
  props: {
    chipType: { type: String, default: "black" },
    chipVariant: { type: String, default: "standard" },
    size: { type: String, default: "md" },
    text: { type: String, default: "" },
    statusLeft: { type: Boolean, default: !1 },
    statusRight: { type: Boolean, default: !1 },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 }
  },
  emits: ["click"]
});
function kr(t, e, s, i, o, a) {
  const r = S("tarmac-chip", !0);
  return w(), _(r, {
    "chip-type": t.chipType,
    "chip-variant": t.chipVariant,
    size: t.size,
    text: t.text,
    "status-left": t.statusLeft || void 0,
    "status-right": t.statusRight || void 0,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0,
    onTarmacClick: e[0] || (e[0] = (d) => t.$emit("click", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "default"),
      $(t.$slots, "trailing-icon")
    ]),
    _: 3
  }, 8, ["chip-type", "chip-variant", "size", "text", "status-left", "status-right", "is-disabled", "is-ghost"]);
}
const xn = /* @__PURE__ */ T(Cr, [["render", kr]]), Sr = k({
  name: "TarmacCheckbox",
  props: {
    modelValue: { type: Boolean, default: !1 },
    tarmacVariant: { type: String, default: "standard" },
    tarmacStyle: { type: String, default: "box" },
    size: { type: String, default: "md" },
    indeterminate: { type: Boolean, default: !1 },
    disabled: { type: Boolean, default: !1 },
    value: { type: String, default: "" },
    name: { type: String, default: "" },
    subtext: { type: String, default: "" }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    handleChange(t) {
      const e = t.detail?.checked ?? !1;
      this.$emit("update:modelValue", e), this.$emit("change", { checked: e, value: t.detail?.value });
    }
  }
});
function wr(t, e, s, i, o, a) {
  const r = S("tarmac-checkbox", !0);
  return w(), _(r, {
    "tarmac-variant": t.tarmacVariant,
    "tarmac-style": t.tarmacStyle,
    size: t.size,
    checked: t.modelValue || void 0,
    indeterminate: t.indeterminate || void 0,
    disabled: t.disabled || void 0,
    value: t.value,
    name: t.name,
    subtext: t.subtext,
    onTarmacChange: t.handleChange
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["tarmac-variant", "tarmac-style", "size", "checked", "indeterminate", "disabled", "value", "name", "subtext", "onTarmacChange"]);
}
const Cn = /* @__PURE__ */ T(Sr, [["render", wr]]), _r = k({
  name: "TarmacPill",
  props: {
    pillVariant: { type: String, default: "black" },
    pillType: { type: String, default: "solid" },
    size: { type: String, default: "md" },
    text: { type: String, default: "" },
    showStatus: { type: Boolean, default: !1 },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 }
  }
});
function zr(t, e, s, i, o, a) {
  const r = S("tarmac-pill", !0);
  return w(), _(r, {
    "pill-variant": t.pillVariant,
    "pill-type": t.pillType,
    size: t.size,
    text: t.text,
    "show-status": t.showStatus || void 0,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "default"),
      $(t.$slots, "trailing-icon")
    ]),
    _: 3
  }, 8, ["pill-variant", "pill-type", "size", "text", "show-status", "is-disabled", "is-ghost"]);
}
const kn = /* @__PURE__ */ T(_r, [["render", zr]]), Tr = k({
  name: "TarmacAvatar",
  props: {
    avatarType: { type: String, default: "initials" },
    shape: { type: String, default: "round" },
    size: { type: String, default: "md" },
    src: { type: String, default: "" },
    alt: { type: String, default: "avatar" },
    showStatus: { type: Boolean, default: !1 },
    statusType: { type: String, default: "active" },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 }
  }
});
function Br(t, e, s, i, o, a) {
  const r = S("tarmac-avatar", !0);
  return w(), _(r, {
    "avatar-type": t.avatarType,
    shape: t.shape,
    size: t.size,
    src: t.src,
    alt: t.alt,
    "show-status": t.showStatus || void 0,
    "status-type": t.statusType,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0
  }, {
    default: D(() => [
      $(t.$slots, "icon"),
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["avatar-type", "shape", "size", "src", "alt", "show-status", "status-type", "is-disabled", "is-ghost"]);
}
const Sn = /* @__PURE__ */ T(Tr, [["render", Br]]), Er = k({
  name: "TarmacToggle",
  props: {
    modelValue: { type: Boolean, default: !1 },
    tarmacColor: { type: String, default: "black" },
    tarmacStyle: { type: String, default: "filled" },
    tarmacSize: { type: String, default: "lg" },
    disabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    handleChange(t) {
      const e = t.detail?.checked ?? !1;
      this.$emit("update:modelValue", e), this.$emit("change", { checked: e });
    }
  }
});
function Fr(t, e, s, i, o, a) {
  const r = S("tarmac-toggle", !0);
  return w(), _(r, {
    "tarmac-color": t.tarmacColor,
    "tarmac-style": t.tarmacStyle,
    "tarmac-size": t.tarmacSize,
    checked: t.modelValue || void 0,
    disabled: t.disabled || void 0,
    "is-ghost": t.isGhost || void 0,
    onTarmacChange: t.handleChange
  }, null, 8, ["tarmac-color", "tarmac-style", "tarmac-size", "checked", "disabled", "is-ghost", "onTarmacChange"]);
}
const wn = /* @__PURE__ */ T(Er, [["render", Fr]]), Dr = k({
  name: "TarmacDivider",
  props: {
    dividerType: { type: String, default: "line" },
    size: { type: String, default: "1" },
    color: { type: String, default: void 0 },
    orientation: { type: String, default: "horizontal" }
  }
});
function Or(t, e, s, i, o, a) {
  const r = S("tarmac-divider", !0);
  return w(), _(r, {
    "divider-type": t.dividerType,
    size: t.size,
    color: t.color,
    orientation: t.orientation
  }, null, 8, ["divider-type", "size", "color", "orientation"]);
}
const _n = /* @__PURE__ */ T(Dr, [["render", Or]]), Ar = k({
  name: "TarmacStepperIcon",
  props: {
    stepperStyle: { type: String, default: "numeric" },
    variant: { type: String, default: "solid" },
    size: { type: String, default: "lg" },
    stepNumber: { type: Number, default: 1 }
  }
});
function Pr(t, e, s, i, o, a) {
  const r = S("tarmac-stepper-icon", !0);
  return w(), _(r, {
    "stepper-style": t.stepperStyle,
    variant: t.variant,
    size: t.size,
    "step-number": t.stepNumber
  }, {
    default: D(() => [
      $(t.$slots, "icon")
    ]),
    _: 3
  }, 8, ["stepper-style", "variant", "size", "step-number"]);
}
const zn = /* @__PURE__ */ T(Ar, [["render", Pr]]), jr = k({
  name: "TarmacThemeProvider",
  props: {
    source: { type: String, default: "" },
    activeTheme: { type: String, default: "light" }
  },
  emits: ["theme-loaded"]
});
function Hr(t, e, s, i, o, a) {
  const r = S("tarmac-theme-provider", !0);
  return w(), _(r, {
    source: t.source,
    "active-theme": t.activeTheme,
    onTarmacThemeLoaded: e[0] || (e[0] = (d) => t.$emit("theme-loaded", d))
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["source", "active-theme"]);
}
const Tn = /* @__PURE__ */ T(jr, [["render", Hr]]), Nr = k({
  name: "TarmacLink",
  props: {
    linkStyle: { type: String, default: "blue" },
    size: { type: String, default: "md" },
    isDisabled: { type: Boolean, default: !1 },
    text: { type: String, default: "" },
    href: { type: String, default: "" },
    target: { type: String, default: "" },
    rel: { type: String, default: "" }
  },
  emits: ["click"]
});
function Rr(t, e, s, i, o, a) {
  const r = S("tarmac-link", !0);
  return w(), _(r, {
    "link-style": t.linkStyle,
    size: t.size,
    "is-disabled": t.isDisabled || void 0,
    text: t.text,
    href: t.href,
    target: t.target,
    rel: t.rel,
    onTarmacClick: e[0] || (e[0] = (d) => t.$emit("click", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "default"),
      $(t.$slots, "trailing-icon")
    ]),
    _: 3
  }, 8, ["link-style", "size", "is-disabled", "text", "href", "target", "rel"]);
}
const Bn = /* @__PURE__ */ T(Nr, [["render", Rr]]), Lr = k({
  name: "TarmacStatusIndicator",
  props: {
    variant: { type: String, default: "success" },
    size: { type: String, default: "md" },
    label: { type: String, default: "" }
  }
});
function Vr(t, e, s, i, o, a) {
  const r = S("tarmac-status-indicator", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    label: t.label
  }, {
    default: D(() => [
      $(t.$slots, "icon")
    ]),
    _: 3
  }, 8, ["variant", "size", "label"]);
}
const En = /* @__PURE__ */ T(Lr, [["render", Vr]]), Ur = k({
  name: "TarmacRating",
  props: {
    modelValue: { type: Number, default: 0 },
    maxStars: { type: Number, default: 5 },
    size: { type: String, default: "md" },
    readOnly: { type: Boolean, default: !1 },
    allowHalf: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    handleChange(t) {
      const e = t.detail?.value ?? 0;
      this.$emit("update:modelValue", e), this.$emit("change", { value: e });
    }
  }
});
function Mr(t, e, s, i, o, a) {
  const r = S("tarmac-rating", !0);
  return w(), _(r, {
    value: t.modelValue,
    "max-stars": t.maxStars,
    size: t.size,
    "read-only": t.readOnly || void 0,
    "allow-half": t.allowHalf || void 0,
    onTarmacChange: t.handleChange
  }, null, 8, ["value", "max-stars", "size", "read-only", "allow-half", "onTarmacChange"]);
}
const Fn = /* @__PURE__ */ T(Ur, [["render", Mr]]), Wr = k({
  name: "TarmacProgressBar",
  props: {
    value: { type: Number, default: 0 },
    size: { type: String, default: "md" },
    variant: { type: String, default: "primary" },
    showPercentage: { type: Boolean, default: !1 },
    trackColor: { type: String, default: void 0 },
    textColor: { type: String, default: void 0 }
  }
});
function Gr(t, e, s, i, o, a) {
  const r = S("tarmac-progress-bar", !0);
  return w(), _(r, {
    value: t.value,
    size: t.size,
    variant: t.variant,
    "show-percentage": t.showPercentage || void 0,
    "track-color": t.trackColor,
    "text-color": t.textColor
  }, null, 8, ["value", "size", "variant", "show-percentage", "track-color", "text-color"]);
}
const Dn = /* @__PURE__ */ T(Wr, [["render", Gr]]), Ir = k({
  name: "TarmacSlider",
  props: {
    modelValue: { type: Number, default: 0 },
    variant: { type: String, default: "black" },
    size: { type: String, default: "lg" },
    sliderType: { type: String, default: "single" },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 1 },
    isDisabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "change", "change-end"],
  methods: {
    handleChange(t) {
      const e = t.detail?.value ?? 0;
      this.$emit("update:modelValue", e), this.$emit("change", { value: e });
    },
    handleChangeEnd(t) {
      const e = t.detail?.value ?? 0;
      this.$emit("change-end", { value: e });
    }
  }
});
function qr(t, e, s, i, o, a) {
  const r = S("tarmac-slider", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    "slider-type": t.sliderType,
    value: t.modelValue,
    min: t.min,
    max: t.max,
    step: t.step,
    "is-disabled": t.isDisabled || void 0,
    onTarmacChange: t.handleChange,
    onTarmacChangeEnd: t.handleChangeEnd
  }, null, 8, ["variant", "size", "slider-type", "value", "min", "max", "step", "is-disabled", "onTarmacChange", "onTarmacChangeEnd"]);
}
const On = /* @__PURE__ */ T(Ir, [["render", qr]]), Kr = k({
  name: "TarmacBreadcrumbCell",
  props: {
    label: { type: String, default: "" },
    cellStyle: { type: String, default: "black" },
    size: { type: String, default: "lg" },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 },
    isCurrent: { type: Boolean, default: !1 },
    href: { type: String, default: "" }
  },
  emits: ["click"]
});
function Xr(t, e, s, i, o, a) {
  const r = S("tarmac-breadcrumb-cell", !0);
  return w(), _(r, {
    label: t.label,
    "cell-style": t.cellStyle,
    size: t.size,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0,
    "is-current": t.isCurrent || void 0,
    href: t.href,
    onTarmacClick: e[0] || (e[0] = (d) => t.$emit("click", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "trailing-icon"),
      $(t.$slots, "pill")
    ]),
    _: 3
  }, 8, ["label", "cell-style", "size", "is-disabled", "is-ghost", "is-current", "href"]);
}
const An = /* @__PURE__ */ T(Kr, [["render", Xr]]), Yr = k({
  name: "TarmacBreadcrumbs",
  props: {
    dividerStyle: { type: String, default: "slash" },
    size: { type: String, default: "lg" },
    showDivider: { type: Boolean, default: !0 }
  }
});
function Jr(t, e, s, i, o, a) {
  const r = S("tarmac-breadcrumbs", !0);
  return w(), _(r, {
    "divider-style": t.dividerStyle,
    size: t.size,
    "show-divider": t.showDivider || void 0
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["divider-style", "size", "show-divider"]);
}
const Pn = /* @__PURE__ */ T(Yr, [["render", Jr]]), Zr = k({
  name: "TarmacTabCell",
  props: {
    tabType: { type: String, default: "regular" },
    orientation: { type: String, default: "horizontal" },
    tabStyle: { type: String, default: "black" },
    size: { type: String, default: "lg" },
    isPressed: { type: Boolean, default: !1 },
    isSelected: { type: Boolean, default: !1 },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 },
    title: { type: String, default: "" },
    subtext: { type: String, default: "" }
  },
  emits: ["click"]
});
function Qr(t, e, s, i, o, a) {
  const r = S("tarmac-tab-cell", !0);
  return w(), _(r, {
    "tab-type": t.tabType,
    orientation: t.orientation,
    "tab-style": t.tabStyle,
    size: t.size,
    "is-pressed": t.isPressed || void 0,
    "is-selected": t.isSelected || void 0,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0,
    title: t.title,
    subtext: t.subtext,
    onTarmacClick: e[0] || (e[0] = (d) => t.$emit("click", d))
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon"),
      $(t.$slots, "trailing-icon"),
      $(t.$slots, "badge"),
      $(t.$slots, "pill"),
      $(t.$slots, "status")
    ]),
    _: 3
  }, 8, ["tab-type", "orientation", "tab-style", "size", "is-pressed", "is-selected", "is-disabled", "is-ghost", "title", "subtext"]);
}
const jn = /* @__PURE__ */ T(Zr, [["render", Qr]]), ea = k({
  name: "TarmacInput",
  props: {
    modelValue: { type: String, default: "" },
    inputStyle: { type: String, default: "tarmac-01" },
    inputType: { type: String, default: "regular" },
    inputSize: { type: String, default: "md" },
    styleVariant: { type: String, default: "standard" },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 },
    label: { type: String, default: "" },
    isMandatory: { type: Boolean, default: !1 },
    placeholder: { type: String, default: "" },
    helperTextTop: { type: String, default: "" },
    helperTextBottom: { type: String, default: "" },
    subtext: { type: String, default: "" },
    statusText: { type: String, default: "" }
  },
  emits: ["update:modelValue", "input", "change", "focus", "blur"],
  methods: {
    handleInput(t) {
      const e = t.detail?.value ?? "";
      this.$emit("update:modelValue", e), this.$emit("input", { value: e });
    },
    handleChange(t) {
      const e = t.detail?.value ?? "";
      this.$emit("change", { value: e });
    },
    handleFocus() {
      this.$emit("focus");
    },
    handleBlur() {
      this.$emit("blur");
    }
  }
});
function ta(t, e, s, i, o, a) {
  const r = S("tarmac-input", !0);
  return w(), _(r, {
    "input-style": t.inputStyle,
    "input-type": t.inputType,
    "input-size": t.inputSize,
    "style-variant": t.styleVariant,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0,
    label: t.label,
    "is-mandatory": t.isMandatory || void 0,
    placeholder: t.placeholder,
    value: t.modelValue,
    "helper-text-top": t.helperTextTop,
    "helper-text-bottom": t.helperTextBottom,
    subtext: t.subtext,
    "status-text": t.statusText,
    onTarmacInput: t.handleInput,
    onTarmacChange: t.handleChange,
    onTarmacFocus: t.handleFocus,
    onTarmacBlur: t.handleBlur
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon", { slot: "leading-icon" }),
      $(t.$slots, "trailing-icon", { slot: "trailing-icon" }),
      $(t.$slots, "addon", { slot: "addon" })
    ]),
    _: 3
  }, 8, ["input-style", "input-type", "input-size", "style-variant", "is-disabled", "is-ghost", "label", "is-mandatory", "placeholder", "value", "helper-text-top", "helper-text-bottom", "subtext", "status-text", "onTarmacInput", "onTarmacChange", "onTarmacFocus", "onTarmacBlur"]);
}
const Hn = /* @__PURE__ */ T(ea, [["render", ta]]), oa = k({
  name: "TarmacTextArea",
  props: {
    modelValue: { type: String, default: "" },
    textAreaStyle: { type: String, default: "tarmac-01" },
    textAreaType: { type: String, default: "regular" },
    textAreaSize: { type: String, default: "md" },
    isDisabled: { type: Boolean, default: !1 },
    isGhost: { type: Boolean, default: !1 },
    label: { type: String, default: "" },
    placeholder: { type: String, default: "" },
    rows: { type: Number, default: 4 },
    resize: { type: String, default: "vertical" },
    helperTextTop: { type: String, default: "" },
    helperTextBottom: { type: String, default: "" },
    statusText: { type: String, default: "" }
  },
  emits: ["update:modelValue", "input", "change"],
  methods: {
    handleInput(t) {
      const e = t.detail?.value ?? "";
      this.$emit("update:modelValue", e), this.$emit("input", { value: e });
    },
    handleChange(t) {
      const e = t.detail?.value ?? "";
      this.$emit("change", { value: e });
    }
  }
});
function sa(t, e, s, i, o, a) {
  const r = S("tarmac-textarea");
  return w(), _(r, {
    "textarea-style": t.textAreaStyle,
    "textarea-type": t.textAreaType,
    "textarea-size": t.textAreaSize,
    "is-disabled": t.isDisabled || void 0,
    "is-ghost": t.isGhost || void 0,
    label: t.label,
    placeholder: t.placeholder,
    value: t.modelValue,
    rows: t.rows,
    resize: t.resize,
    "helper-text-top": t.helperTextTop,
    "helper-text-bottom": t.helperTextBottom,
    "status-text": t.statusText,
    onTarmacInput: t.handleInput,
    onTarmacChange: t.handleChange
  }, null, 8, ["textarea-style", "textarea-type", "textarea-size", "is-disabled", "is-ghost", "label", "placeholder", "value", "rows", "resize", "helper-text-top", "helper-text-bottom", "status-text", "onTarmacInput", "onTarmacChange"]);
}
const Nn = /* @__PURE__ */ T(oa, [["render", sa]]), ia = k({
  name: "TarmacRadio",
  props: {
    modelValue: { type: Boolean, default: !1 },
    tarmacVariant: { type: String, default: "standard" },
    tarmacStyle: { type: String, default: "box" },
    size: { type: String, default: "md" },
    disabled: { type: Boolean, default: !1 },
    value: { type: String, default: "" },
    name: { type: String, default: "" },
    subtext: { type: String, default: "" }
  },
  emits: ["update:modelValue", "change"],
  methods: {
    handleChange(t) {
      const e = t.detail?.checked ?? !1;
      this.$emit("update:modelValue", e), this.$emit("change", { checked: e, value: t.detail?.value });
    }
  }
});
function ra(t, e, s, i, o, a) {
  const r = S("tarmac-radio", !0);
  return w(), _(r, {
    "tarmac-variant": t.tarmacVariant,
    "tarmac-style": t.tarmacStyle,
    size: t.size,
    checked: t.modelValue || void 0,
    disabled: t.disabled || void 0,
    value: t.value,
    name: t.name,
    subtext: t.subtext,
    onTarmacChange: t.handleChange
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["tarmac-variant", "tarmac-style", "size", "checked", "disabled", "value", "name", "subtext", "onTarmacChange"]);
}
const Rn = /* @__PURE__ */ T(ia, [["render", ra]]), aa = k({
  name: "TarmacOtpInput",
  props: {
    modelValue: { type: String, default: "" },
    numDigits: { type: Number, default: 6 },
    otpStyle: { type: String, default: "tarmac-01" },
    otpSize: { type: String, default: "md" },
    otpVariant: { type: String, default: "default" },
    isDisabled: { type: Boolean, default: !1 },
    placeholder: { type: String, default: "" },
    inputType: { type: String, default: "text" },
    label: { type: String, default: "" },
    helperText: { type: String, default: "" }
  },
  emits: ["update:modelValue", "change", "complete"],
  methods: {
    handleChange(t) {
      const e = t.detail?.value ?? "";
      this.$emit("update:modelValue", e), this.$emit("change", { value: e });
    },
    handleComplete(t) {
      const e = t.detail?.value ?? "";
      this.$emit("complete", { value: e });
    }
  }
});
function na(t, e, s, i, o, a) {
  const r = S("tarmac-otp-input", !0);
  return w(), _(r, {
    "num-digits": t.numDigits,
    "otp-style": t.otpStyle,
    "otp-size": t.otpSize,
    "otp-variant": t.otpVariant,
    "is-disabled": t.isDisabled || void 0,
    placeholder: t.placeholder,
    "input-type": t.inputType,
    label: t.label,
    "helper-text": t.helperText,
    value: t.modelValue,
    onTarmacChange: t.handleChange,
    onTarmacComplete: t.handleComplete
  }, null, 8, ["num-digits", "otp-style", "otp-size", "otp-variant", "is-disabled", "placeholder", "input-type", "label", "helper-text", "value", "onTarmacChange", "onTarmacComplete"]);
}
const Ln = /* @__PURE__ */ T(aa, [["render", na]]), la = k({
  name: "TarmacModal",
  props: {
    isOpen: { type: Boolean, default: !1 },
    size: { type: String, default: "md" },
    title: { type: String, default: "" },
    closable: { type: Boolean, default: !0 },
    maskClosable: { type: Boolean, default: !0 },
    width: { type: String, default: "" },
    centered: { type: Boolean, default: !1 }
  },
  emits: ["close", "ok"],
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleOk() {
      this.$emit("ok");
    }
  }
});
function da(t, e, s, i, o, a) {
  const r = S("tarmac-modal", !0);
  return w(), _(r, {
    "is-open": t.isOpen || void 0,
    size: t.size,
    title: t.title,
    closable: t.closable || void 0,
    "mask-closable": t.maskClosable || void 0,
    width: t.width,
    centered: t.centered || void 0,
    onTarmacClose: t.handleClose,
    onTarmacOk: t.handleOk
  }, {
    default: D(() => [
      $(t.$slots, "default"),
      $(t.$slots, "footer", { slot: "footer" })
    ]),
    _: 3
  }, 8, ["is-open", "size", "title", "closable", "mask-closable", "width", "centered", "onTarmacClose", "onTarmacOk"]);
}
const Vn = /* @__PURE__ */ T(la, [["render", da]]), ca = k({
  name: "TarmacToast",
  props: {
    message: { type: String, default: "" },
    title: { type: String, default: "" },
    variant: { type: String, default: "default" },
    size: { type: String, default: "md" },
    duration: { type: Number, default: 3e3 },
    closable: { type: Boolean, default: !1 },
    position: { type: String, default: "top-right" }
  },
  emits: ["close"],
  methods: {
    handleClose() {
      this.$emit("close");
    }
  }
});
function pa(t, e, s, i, o, a) {
  const r = S("tarmac-toast", !0);
  return w(), _(r, {
    message: t.message,
    title: t.title,
    variant: t.variant,
    size: t.size,
    duration: t.duration,
    closable: t.closable || void 0,
    position: t.position,
    onTarmacClose: t.handleClose
  }, {
    default: D(() => [
      $(t.$slots, "icon", { slot: "icon" })
    ]),
    _: 3
  }, 8, ["message", "title", "variant", "size", "duration", "closable", "position", "onTarmacClose"]);
}
const Un = /* @__PURE__ */ T(ca, [["render", pa]]), ha = k({
  name: "TarmacSnackbar",
  props: {
    message: { type: String, default: "" },
    title: { type: String, default: "" },
    variant: { type: String, default: "black" },
    snackbarStyle: { type: String, default: "singleText" },
    size: { type: String, default: "lg" },
    trailingIcon: { type: Boolean, default: !1 },
    ctAs: { type: Boolean, default: !1 },
    denyText: { type: String, default: "" },
    approveText: { type: String, default: "" },
    duration: { type: Number, default: 5e3 },
    position: { type: String, default: "bottom" }
  },
  emits: ["close", "deny", "approve"],
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleDeny() {
      this.$emit("deny");
    },
    handleApprove() {
      this.$emit("approve");
    }
  }
});
function ua(t, e, s, i, o, a) {
  const r = S("tarmac-snackbar", !0);
  return w(), _(r, {
    message: t.message,
    title: t.title,
    variant: t.variant,
    "snackbar-style": t.snackbarStyle,
    size: t.size,
    "trailing-icon": t.trailingIcon || void 0,
    "ct-as": t.ctAs || void 0,
    "deny-text": t.denyText,
    "approve-text": t.approveText,
    duration: t.duration,
    position: t.position,
    onTarmacClose: t.handleClose,
    onTarmacDeny: t.handleDeny,
    onTarmacApprove: t.handleApprove
  }, {
    default: D(() => [
      $(t.$slots, "leading-icon", { slot: "leading-icon" })
    ]),
    _: 3
  }, 8, ["message", "title", "variant", "snackbar-style", "size", "trailing-icon", "ct-as", "deny-text", "approve-text", "duration", "position", "onTarmacClose", "onTarmacDeny", "onTarmacApprove"]);
}
const Mn = /* @__PURE__ */ T(ha, [["render", ua]]), ba = k({
  name: "TarmacTooltip",
  props: {
    content: { type: String, default: "" },
    placement: { type: String, default: "top" },
    trigger: { type: String, default: "hover" },
    variant: { type: String, default: "black" },
    size: { type: String, default: "md" },
    visible: { type: Boolean, default: !1 }
  },
  emits: ["visible-change"],
  methods: {
    handleVisibleChange(t) {
      this.$emit("visible-change", { visible: t.detail?.visible });
    }
  }
});
function ga(t, e, s, i, o, a) {
  const r = S("tarmac-tooltip", !0);
  return w(), _(r, {
    content: t.content,
    placement: t.placement,
    trigger: t.trigger,
    variant: t.variant,
    size: t.size,
    visible: t.visible || void 0,
    onTarmacVisibleChange: t.handleVisibleChange
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["content", "placement", "trigger", "variant", "size", "visible", "onTarmacVisibleChange"]);
}
const Wn = /* @__PURE__ */ T(ba, [["render", ga]]), fa = k({
  name: "TarmacPopup",
  props: {
    isOpen: { type: Boolean, default: !1 },
    size: { type: String, default: "md" },
    title: { type: String, default: "" },
    subtext: { type: String, default: "" },
    showFooter: { type: Boolean, default: !1 },
    closeOnOverlay: { type: Boolean, default: !0 },
    closeOnEsc: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  methods: {
    handleClose() {
      this.$emit("close");
    }
  }
});
function ma(t, e, s, i, o, a) {
  const r = S("tarmac-popup", !0);
  return w(), _(r, {
    "is-open": t.isOpen || void 0,
    size: t.size,
    title: t.title,
    subtext: t.subtext,
    "show-footer": t.showFooter || void 0,
    "close-on-overlay": t.closeOnOverlay || void 0,
    "close-on-esc": t.closeOnEsc || void 0,
    onTarmacClose: t.handleClose
  }, {
    default: D(() => [
      $(t.$slots, "default"),
      $(t.$slots, "footer", { slot: "footer" }),
      $(t.$slots, "leading-icon", { slot: "leading-icon" }),
      $(t.$slots, "trailing-icon", { slot: "trailing-icon" })
    ]),
    _: 3
  }, 8, ["is-open", "size", "title", "subtext", "show-footer", "close-on-overlay", "close-on-esc", "onTarmacClose"]);
}
const Gn = /* @__PURE__ */ T(fa, [["render", ma]]), ya = k({
  name: "TarmacDialogBox",
  props: {
    isOpen: { type: Boolean, default: !1 },
    type: { type: String, default: "standard" },
    size: { type: String, default: "web" },
    title: { type: String, default: "" },
    subtext: { type: String, default: "" },
    heading: { type: String, default: "" },
    description: { type: String, default: "" },
    showHeader: { type: Boolean, default: !0 },
    showFooter: { type: Boolean, default: !0 },
    showCheckbox: { type: Boolean, default: !1 },
    checkboxLabel: { type: String, default: "" },
    checkboxChecked: { type: Boolean, default: !1 }
  },
  emits: ["close", "checkbox-change"],
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleCheckboxChange(t) {
      this.$emit("checkbox-change", { checked: t.detail?.checked });
    }
  }
});
function $a(t, e, s, i, o, a) {
  const r = S("tarmac-dialog-box", !0);
  return w(), _(r, {
    "is-open": t.isOpen || void 0,
    type: t.type,
    size: t.size,
    title: t.title,
    subtext: t.subtext,
    heading: t.heading,
    description: t.description,
    "show-header": t.showHeader || void 0,
    "show-footer": t.showFooter || void 0,
    "show-checkbox": t.showCheckbox || void 0,
    "checkbox-label": t.checkboxLabel,
    "checkbox-checked": t.checkboxChecked || void 0,
    onTarmacClose: t.handleClose,
    onTarmacCheckboxChange: t.handleCheckboxChange
  }, {
    default: D(() => [
      $(t.$slots, "default"),
      $(t.$slots, "illustration", { slot: "illustration" }),
      $(t.$slots, "snackbar", { slot: "snackbar" }),
      $(t.$slots, "footer", { slot: "footer" })
    ]),
    _: 3
  }, 8, ["is-open", "type", "size", "title", "subtext", "heading", "description", "show-header", "show-footer", "show-checkbox", "checkbox-label", "checkbox-checked", "onTarmacClose", "onTarmacCheckboxChange"]);
}
const In = /* @__PURE__ */ T(ya, [["render", $a]]), va = k({
  name: "TarmacSideDrawer",
  props: {
    isOpen: { type: Boolean, default: !1 },
    variant: { type: String, default: "narrow" },
    closeOnOverlay: { type: Boolean, default: !0 },
    closeOnEsc: { type: Boolean, default: !0 }
  },
  emits: ["close"],
  methods: {
    handleClose() {
      this.$emit("close");
    }
  }
});
function xa(t, e, s, i, o, a) {
  const r = S("tarmac-side-drawer", !0);
  return w(), _(r, {
    "is-open": t.isOpen || void 0,
    variant: t.variant,
    "close-on-overlay": t.closeOnOverlay || void 0,
    "close-on-esc": t.closeOnEsc || void 0,
    onTarmacClose: t.handleClose
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["is-open", "variant", "close-on-overlay", "close-on-esc", "onTarmacClose"]);
}
const qn = /* @__PURE__ */ T(va, [["render", xa]]), Ca = k({
  name: "TarmacCollapse",
  props: {
    accordion: { type: Boolean, default: !1 },
    activeKey: { type: String, default: "" }
  },
  emits: ["change"],
  methods: {
    handleChange(t) {
      this.$emit("change", { activeKey: t.detail?.activeKey });
    }
  }
});
function ka(t, e, s, i, o, a) {
  const r = S("tarmac-collapse", !0);
  return w(), _(r, {
    accordion: t.accordion || void 0,
    "active-key": t.activeKey,
    onTarmacChange: t.handleChange
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["accordion", "active-key", "onTarmacChange"]);
}
const Kn = /* @__PURE__ */ T(Ca, [["render", ka]]), Sa = k({
  name: "TarmacFab",
  props: {
    position: { type: String, default: "bottom-right" },
    variant: { type: String, default: "light" },
    positionMode: { type: String, default: "fixed" }
  },
  emits: ["toggle"],
  methods: {
    handleToggle(t) {
      this.$emit("toggle", { isOpen: t.detail?.isOpen });
    }
  }
});
function wa(t, e, s, i, o, a) {
  const r = S("tarmac-fab", !0);
  return w(), _(r, {
    position: t.position,
    variant: t.variant,
    "position-mode": t.positionMode,
    onTarmacToggle: t.handleToggle
  }, {
    default: D(() => [
      $(t.$slots, "trigger", { slot: "trigger" }),
      $(t.$slots, "menu", { slot: "menu" })
    ]),
    _: 3
  }, 8, ["position", "variant", "position-mode", "onTarmacToggle"]);
}
const Xn = /* @__PURE__ */ T(Sa, [["render", wa]]), _a = k({
  name: "TarmacCoachmarks",
  props: {
    variant: { type: String, default: "white" },
    size: { type: String, default: "lg" },
    arrowPosition: { type: String, default: "bottom-center" },
    title: { type: String, default: "" },
    description: { type: String, default: "" }
  }
});
function za(t, e, s, i, o, a) {
  const r = S("tarmac-coachmarks", !0);
  return w(), _(r, {
    variant: t.variant,
    size: t.size,
    "arrow-position": t.arrowPosition,
    title: t.title,
    description: t.description
  }, {
    default: D(() => [
      $(t.$slots, "image", { slot: "image" }),
      $(t.$slots, "badges", { slot: "badges" }),
      $(t.$slots, "ctas", { slot: "ctas" })
    ]),
    _: 3
  }, 8, ["variant", "size", "arrow-position", "title", "description"]);
}
const Yn = /* @__PURE__ */ T(_a, [["render", za]]), Ta = k({
  name: "TarmacTabGroup",
  props: {
    orientation: { type: String, default: "horizontal" },
    size: { type: String, default: "lg" }
  },
  emits: ["tab-change"],
  methods: {
    handleTabChange(t) {
      this.$emit("tab-change", { index: t.detail?.index });
    }
  }
});
function Ba(t, e, s, i, o, a) {
  const r = S("tarmac-tab-group", !0);
  return w(), _(r, {
    orientation: t.orientation,
    size: t.size,
    onTarmacTabChange: t.handleTabChange
  }, {
    default: D(() => [
      $(t.$slots, "default")
    ]),
    _: 3
  }, 8, ["orientation", "size", "onTarmacTabChange"]);
}
const Jn = /* @__PURE__ */ T(Ta, [["render", Ba]]), Ea = k({
  name: "TarmacFilterDropdown",
  props: {
    placeholder: { type: String, default: "Select" },
    size: { type: String, default: "lg" },
    options: { type: String, default: "[]" }
  },
  emits: ["change", "apply", "clear"],
  methods: {
    handleChange(t) {
      this.$emit("change", { values: t.detail?.values });
    },
    handleApply(t) {
      this.$emit("apply", { values: t.detail?.values });
    },
    handleClear() {
      this.$emit("clear");
    }
  }
});
function Fa(t, e, s, i, o, a) {
  const r = S("tarmac-filter-dropdown", !0);
  return w(), _(r, {
    placeholder: t.placeholder,
    size: t.size,
    options: t.options,
    onTarmacChange: t.handleChange,
    onTarmacApply: t.handleApply,
    onTarmacClear: t.handleClear
  }, null, 8, ["placeholder", "size", "options", "onTarmacChange", "onTarmacApply", "onTarmacClear"]);
}
const Zn = /* @__PURE__ */ T(Ea, [["render", Fa]]), Qn = {
  // Brand
  "--delhivery-red": "#ED4136",
  "--delhivery-blue": "#5b80f7",
  // ── Success ──────────────────────────────────────────────
  "--success-bg-lightest": "#E6F4EA",
  "--success-bg": "#C6E6D4",
  "--success-bg-darkest": "#A6D8BE",
  "--success-stroke-lighter": "#8CCBAA",
  "--success-stroke": "#6EBF96",
  "--success-stroke-dark": "#50B382",
  "--success": "#34A853",
  "--success-dark": "#2E8B47",
  "--success-font-dark": "#1A6E3A",
  "--success-font-light": "#B7E1C7",
  // ── Error ────────────────────────────────────────────────
  "--error-bg-lightest": "#FCE8E6",
  "--error-bg": "#F9D1D1",
  "--error-bg-darkest": "#F6BABA",
  "--error-stroke-lighter": "#F4A3A3",
  "--error-stroke": "#F28C8C",
  "--error-stroke-dark": "#F07575",
  "--error": "#EA4335",
  "--error-dark": "#D32F2F",
  "--error-font-dark": "#B71C1C",
  "--error-font-light": "#F5B7B1",
  // ── Warning ──────────────────────────────────────────────
  "--warning-bg-lightest": "#FFF3E0",
  "--warning-bg": "#FFE0B2",
  "--warning-bg-darkest": "#FFCC80",
  "--warning-stroke-lighter": "#FFB74D",
  "--warning-stroke": "#FFA726",
  "--warning-stroke-dark": "#FF9800",
  "--warning": "#FBBC05",
  "--warning-dark": "#F57C00",
  "--warning-font-dark": "#E65100",
  "--warning-font-light": "#FFE0B2",
  // ── Information ──────────────────────────────────────────
  "--information-bg-lightest": "#E3F2FD",
  "--information-bg-lighter": "#BBDEFB",
  "--information-bg": "#90CAF9",
  "--information-bg-dark": "#64B5F6",
  "--information-bg-darkest": "#42A5F5",
  "--information-stroke-lightest": "#E3F2FD",
  "--information-stroke-lighter": "#BBDEFB",
  "--information-stroke": "#90CAF9",
  "--information-stroke-dark": "#64B5F6",
  "--information-stroke-darkest": "#42A5F5",
  "--information": "#2196F3",
  "--information-dark": "#1E88E5",
  "--information-light": "#BBDEFB",
  // ── Failure ──────────────────────────────────────────────
  "--failure-bg-lightest": "#FFEBEE",
  "--failure-bg-lighter": "#FFCDD2",
  "--failure-bg": "#EF9A9A",
  "--failure-bg-dark": "#E57373",
  "--failure-bg-darkest": "#EF5350",
  "--failure-stroke-lightest": "#FFEBEE",
  "--failure-stroke-lighter": "#FFCDD2",
  "--failure-stroke": "#EF9A9A",
  "--failure-stroke-dark": "#E57373",
  "--failure-stroke-darkest": "#EF5350",
  "--failure": "#F44336",
  "--failure-dark": "#E53935",
  "--failure-light": "#FFCDD2",
  // ── Pending ──────────────────────────────────────────────
  "--pending-bg-lightest": "#FFF3E0",
  "--pending-bg-lighter": "#FFE0B2",
  "--pending-bg": "#FFCC80",
  "--pending-bg-dark": "#FFB74D",
  "--pending-bg-darkest": "#FFA726",
  "--pending-stroke-lightest": "#FFF3E0",
  "--pending-stroke-lighter": "#FFE0B2",
  "--pending-stroke": "#FFCC80",
  "--pending-stroke-dark": "#FFB74D",
  "--pending-stroke-darkest": "#FFA726",
  "--pending": "#FF9800",
  "--pending-dark": "#FB8C00",
  "--pending-light": "#FFE0B2",
  // ── Shadows ──────────────────────────────────────────────
  "--primary-shadow": "0 35px 60px -15px rgba(0,0,0,0.3)",
  "--warning-shadow": "0 0 0 4px rgba(245, 158, 11, 0.1), 0 1px 3px 0 rgba(245, 158, 11, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
  "--success-shadow": "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
}, el = {
  text: {
    primary: "#5B80F7",
    heading: "#3D445C",
    body: "#525B7A",
    muted: "#A3AAC2",
    badge: "#474747"
  },
  bg: {
    surface: "#F9F9FB",
    dark: "#1F222E"
  },
  border: {
    default: "#E0E3EB",
    badge: "#9d9d9d"
  }
}, tl = {
  delhiveryRed: "#ED4136",
  delhiveryBlue: "#5b80f7"
};
export {
  yn as TarmacAlert,
  Sn as TarmacAvatar,
  $n as TarmacBadge,
  An as TarmacBreadcrumbCell,
  Pn as TarmacBreadcrumbs,
  mn as TarmacButton,
  Cn as TarmacCheckbox,
  xn as TarmacChip,
  Yn as TarmacCoachmarks,
  Kn as TarmacCollapse,
  In as TarmacDialogBox,
  _n as TarmacDivider,
  Xn as TarmacFab,
  Zn as TarmacFilterDropdown,
  Hn as TarmacInput,
  Bn as TarmacLink,
  Vn as TarmacModal,
  Ln as TarmacOtpInput,
  kn as TarmacPill,
  fn as TarmacPlugin,
  Gn as TarmacPopup,
  Dn as TarmacProgressBar,
  Rn as TarmacRadio,
  Fn as TarmacRating,
  qn as TarmacSideDrawer,
  On as TarmacSlider,
  Mn as TarmacSnackbar,
  vn as TarmacSpinner,
  En as TarmacStatusIndicator,
  zn as TarmacStepperIcon,
  jn as TarmacTabCell,
  Jn as TarmacTabGroup,
  Nn as TarmacTextArea,
  Tn as TarmacThemeProvider,
  Un as TarmacToast,
  wn as TarmacToggle,
  Wn as TarmacTooltip,
  tl as brandColors,
  el as colors,
  Qn as themeVariables
};
