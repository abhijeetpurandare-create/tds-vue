/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, N = O.ShadowRoot && (O.ShadyCSS === void 0 || O.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, R = Symbol(), q = /* @__PURE__ */ new WeakMap();
let it = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== R) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (N && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = q.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && q.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const rt = (r) => new it(typeof r == "string" ? r : r + "", void 0, R), ct = (r, ...t) => {
  const e = r.length === 1 ? r[0] : t.reduce((s, i, n) => s + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[n + 1], r[0]);
  return new it(e, r, R);
}, dt = (r, t) => {
  if (N) r.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const s = document.createElement("style"), i = O.litNonce;
    i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, r.appendChild(s);
  }
}, J = N ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules) e += s.cssText;
  return rt(e);
})(r) : r;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: pt, defineProperty: ut, getOwnPropertyDescriptor: $t, getOwnPropertyNames: ft, getOwnPropertySymbols: gt, getPrototypeOf: _t } = Object, D = globalThis, Z = D.trustedTypes, mt = Z ? Z.emptyScript : "", At = D.reactiveElementPolyfillSupport, C = (r, t) => r, B = { toAttribute(r, t) {
  switch (t) {
    case Boolean:
      r = r ? mt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, t) {
  let e = r;
  switch (t) {
    case Boolean:
      e = r !== null;
      break;
    case Number:
      e = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(r);
      } catch {
        e = null;
      }
  }
  return e;
} }, j = (r, t) => !pt(r, t), K = { attribute: !0, type: String, converter: B, reflect: !1, useDefault: !1, hasChanged: j };
Symbol.metadata ??= Symbol("metadata"), D.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let y = class extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ??= []).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = K) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(t) && ((e = Object.create(e)).wrapped = !0), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && ut(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: n } = $t(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get: i, set(o) {
      const h = i?.call(this);
      n?.call(this, o), this.requestUpdate(t, h, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? K;
  }
  static _$Ei() {
    if (this.hasOwnProperty(C("elementProperties"))) return;
    const t = _t(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(C("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(C("properties"))) {
      const e = this.properties, s = [...ft(e), ...gt(e)];
      for (const i of s) this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [s, i] of e) this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s) e.unshift(J(i));
    } else t !== void 0 && e.push(J(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t) => this.enableUpdating = t), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t) => t(this));
  }
  addController(t) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t), this.renderRoot !== void 0 && this.isConnected && t.hostConnected?.();
  }
  removeController(t) {
    this._$EO?.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys()) this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return dt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((t) => t.hostConnected?.());
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t) => t.hostDisconnected?.());
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ET(t, e) {
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const n = (s.converter?.toAttribute !== void 0 ? s.converter : B).toAttribute(e, s.type);
      this._$Em = t, n == null ? this.removeAttribute(i) : this.setAttribute(i, n), this._$Em = null;
    }
  }
  _$AK(t, e) {
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const n = s.getPropertyOptions(i), o = typeof n.converter == "function" ? { fromAttribute: n.converter } : n.converter?.fromAttribute !== void 0 ? n.converter : B;
      this._$Em = i;
      const h = o.fromAttribute(e, n.type);
      this[i] = h ?? this._$Ej?.get(i) ?? h, this._$Em = null;
    }
  }
  requestUpdate(t, e, s, i = !1, n) {
    if (t !== void 0) {
      const o = this.constructor;
      if (i === !1 && (n = this[t]), s ??= o.getPropertyOptions(t), !((s.hasChanged ?? j)(n, e) || s.useDefault && s.reflect && n === this._$Ej?.get(t) && !this.hasAttribute(o._$Eu(t, s)))) return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(t, e, { useDefault: s, reflect: i, wrapped: n }, o) {
    s && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t) && (this._$Ej.set(t, o ?? e ?? this[t]), n !== !0 || o !== void 0) || (this._$AL.has(t) || (this.hasUpdated || s || (e = void 0), this._$AL.set(t, e)), i === !0 && this._$Em !== t && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, n] of this._$Ep) this[i] = n;
        this._$Ep = void 0;
      }
      const s = this.constructor.elementProperties;
      if (s.size > 0) for (const [i, n] of s) {
        const { wrapped: o } = n, h = this[i];
        o !== !0 || this._$AL.has(i) || h === void 0 || this.C(i, void 0, n, h);
      }
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), this._$EO?.forEach((s) => s.hostUpdate?.()), this.update(e)) : this._$EM();
    } catch (s) {
      throw t = !1, this._$EM(), s;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    this._$EO?.forEach((e) => e.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
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
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Eq &&= this._$Eq.forEach((e) => this._$ET(e, this[e])), this._$EM();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[C("elementProperties")] = /* @__PURE__ */ new Map(), y[C("finalized")] = /* @__PURE__ */ new Map(), At?.({ ReactiveElement: y }), (D.reactiveElementVersions ??= []).push("2.1.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, G = (r) => r, U = L.trustedTypes, Q = U ? U.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, nt = "$lit$", f = `lit$${Math.random().toFixed(9).slice(2)}$`, ot = "?" + f, yt = `<${ot}>`, A = document, S = () => A.createComment(""), k = (r) => r === null || typeof r != "object" && typeof r != "function", z = Array.isArray, Et = (r) => z(r) || typeof r?.[Symbol.iterator] == "function", M = `[ 	
\f\r]`, w = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, X = /-->/g, Y = />/g, _ = RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), tt = /'/g, et = /"/g, at = /^(?:script|style|textarea|title)$/i, ht = (r) => (t, ...e) => ({ _$litType$: r, strings: t, values: e }), vt = ht(1), Vt = ht(2), E = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), st = /* @__PURE__ */ new WeakMap(), m = A.createTreeWalker(A, 129);
function lt(r, t) {
  if (!z(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Q !== void 0 ? Q.createHTML(t) : t;
}
const bt = (r, t) => {
  const e = r.length - 1, s = [];
  let i, n = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", o = w;
  for (let h = 0; h < e; h++) {
    const a = r[h];
    let c, p, l = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); ) u = o.lastIndex, o === w ? p[1] === "!--" ? o = X : p[1] !== void 0 ? o = Y : p[2] !== void 0 ? (at.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = _) : p[3] !== void 0 && (o = _) : o === _ ? p[0] === ">" ? (o = i ?? w, l = -1) : p[1] === void 0 ? l = -2 : (l = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? _ : p[3] === '"' ? et : tt) : o === et || o === tt ? o = _ : o === X || o === Y ? o = w : (o = _, i = void 0);
    const $ = o === _ && r[h + 1].startsWith("/>") ? " " : "";
    n += o === w ? a + yt : l >= 0 ? (s.push(c), a.slice(0, l) + nt + a.slice(l) + f + $) : a + f + (l === -2 ? h : $);
  }
  return [lt(r, n + (r[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), s];
};
class P {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let n = 0, o = 0;
    const h = t.length - 1, a = this.parts, [c, p] = bt(t, e);
    if (this.el = P.createElement(c, s), m.currentNode = this.el.content, e === 2 || e === 3) {
      const l = this.el.content.firstChild;
      l.replaceWith(...l.childNodes);
    }
    for (; (i = m.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const l of i.getAttributeNames()) if (l.endsWith(nt)) {
          const u = p[o++], $ = i.getAttribute(l).split(f), x = /([.?@])?(.*)/.exec(u);
          a.push({ type: 1, index: n, name: x[2], strings: $, ctor: x[1] === "." ? Ct : x[1] === "?" ? Ft : x[1] === "@" ? St : H }), i.removeAttribute(l);
        } else l.startsWith(f) && (a.push({ type: 6, index: n }), i.removeAttribute(l));
        if (at.test(i.tagName)) {
          const l = i.textContent.split(f), u = l.length - 1;
          if (u > 0) {
            i.textContent = U ? U.emptyScript : "";
            for (let $ = 0; $ < u; $++) i.append(l[$], S()), m.nextNode(), a.push({ type: 2, index: ++n });
            i.append(l[u], S());
          }
        }
      } else if (i.nodeType === 8) if (i.data === ot) a.push({ type: 2, index: n });
      else {
        let l = -1;
        for (; (l = i.data.indexOf(f, l + 1)) !== -1; ) a.push({ type: 7, index: n }), l += f.length - 1;
      }
      n++;
    }
  }
  static createElement(t, e) {
    const s = A.createElement("template");
    return s.innerHTML = t, s;
  }
}
function v(r, t, e = r, s) {
  if (t === E) return t;
  let i = s !== void 0 ? e._$Co?.[s] : e._$Cl;
  const n = k(t) ? void 0 : t._$litDirective$;
  return i?.constructor !== n && (i?._$AO?.(!1), n === void 0 ? i = void 0 : (i = new n(r), i._$AT(r, e, s)), s !== void 0 ? (e._$Co ??= [])[s] = i : e._$Cl = i), i !== void 0 && (t = v(r, i._$AS(r, t.values), i, s)), t;
}
class wt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = (t?.creationScope ?? A).importNode(e, !0);
    m.currentNode = i;
    let n = m.nextNode(), o = 0, h = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new T(n, n.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(n, a.name, a.strings, this, t) : a.type === 6 && (c = new kt(n, this, t)), this._$AV.push(c), a = s[++h];
      }
      o !== a?.index && (n = m.nextNode(), o++);
    }
    return m.currentNode = A, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV) s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class T {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && t?.nodeType === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = v(this, t, e), k(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== E && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Et(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== d && k(this._$AH) ? this._$AA.nextSibling.data = t : this.T(A.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = P.createElement(lt(s.h, s.h[0]), this.options)), s);
    if (this._$AH?._$AD === i) this._$AH.p(e);
    else {
      const n = new wt(i, this), o = n.u(this.options);
      n.p(e), this.T(o), this._$AH = n;
    }
  }
  _$AC(t) {
    let e = st.get(t.strings);
    return e === void 0 && st.set(t.strings, e = new P(t)), e;
  }
  k(t) {
    z(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const n of t) i === e.length ? e.push(s = new T(this.O(S()), this.O(S()), this, this.options)) : s = e[i], s._$AI(n), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    for (this._$AP?.(!1, !0, e); t !== this._$AB; ) {
      const s = G(t).nextSibling;
      G(t).remove(), t = s;
    }
  }
  setConnected(t) {
    this._$AM === void 0 && (this._$Cv = t, this._$AP?.(t));
  }
}
class H {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, n) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = n, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const n = this.strings;
    let o = !1;
    if (n === void 0) t = v(this, t, e, 0), o = !k(t) || t !== this._$AH && t !== E, o && (this._$AH = t);
    else {
      const h = t;
      let a, c;
      for (t = n[0], a = 0; a < n.length - 1; a++) c = v(this, h[s + a], e, a), c === E && (c = this._$AH[a]), o ||= !k(c) || c !== this._$AH[a], c === d ? t = d : t !== d && (t += (c ?? "") + n[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ct extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class Ft extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class St extends H {
  constructor(t, e, s, i, n) {
    super(t, e, s, i, n), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = v(this, t, e, 0) ?? d) === E) return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, n = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), n && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class kt {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    v(this, t);
  }
}
const Pt = L.litHtmlPolyfillSupport;
Pt?.(P, T), (L.litHtmlVersions ??= []).push("3.3.2");
const Tt = (r, t, e) => {
  const s = e?.renderBefore ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const n = e?.renderBefore ?? null;
    s._$litPart$ = i = new T(t.insertBefore(S(), n), n, void 0, e ?? {});
  }
  return i._$AI(r), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis;
class F extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t.firstChild, t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Tt(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return E;
  }
}
F._$litElement$ = !0, F.finalized = !0, I.litElementHydrateSupport?.({ LitElement: F });
const xt = I.litElementPolyfillSupport;
xt?.({ LitElement: F });
(I.litElementVersions ??= []).push("4.2.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ot = (r) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(r, t);
  }) : customElements.define(r, t);
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Bt = { attribute: !0, type: String, converter: B, reflect: !1, hasChanged: j }, Ut = (r = Bt, t, e) => {
  const { kind: s, metadata: i } = e;
  let n = globalThis.litPropertyMetadata.get(i);
  if (n === void 0 && globalThis.litPropertyMetadata.set(i, n = /* @__PURE__ */ new Map()), s === "setter" && ((r = Object.create(r)).wrapped = !0), n.set(e.name, r), s === "accessor") {
    const { name: o } = e;
    return { set(h) {
      const a = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(o, a, r, !0, h);
    }, init(h) {
      return h !== void 0 && this.C(o, void 0, r, h), h;
    } };
  }
  if (s === "setter") {
    const { name: o } = e;
    return function(h) {
      const a = this[o];
      t.call(this, h), this.requestUpdate(o, a, r, !0, h);
    };
  }
  throw Error("Unsupported decorator location: " + s);
};
function V(r) {
  return (t, e) => typeof e == "object" ? Ut(r, t, e) : ((s, i, n) => {
    const o = i.hasOwnProperty(n);
    return i.constructor.createProperty(n, s), o ? Object.getOwnPropertyDescriptor(i, n) : void 0;
  })(r, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function W(r) {
  return V({ ...r, state: !0, attribute: !1 });
}
const Dt = {
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
async function Ht(r) {
  const { source: t, activeTheme: e = "light", overrides: s = {} } = r;
  let i = {};
  try {
    const n = Mt(t) || t.startsWith("/") || t.startsWith("./") ? t : `/${t}`, o = await fetch(n, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!o.ok)
      throw new Error(`Failed to load theme: HTTP ${o.status}`);
    if (o.headers.get("Content-Type") !== "application/json") {
      const h = await o.text();
      try {
        const a = JSON.parse(h);
        i = a.record ?? a;
      } catch {
        throw new Error(`Invalid JSON in theme file: ${t}`);
      }
    } else
      i = await o.json();
  } catch (n) {
    throw console.error("[Tarmac Tokens] Error loading theme:", n), n;
  }
  return { ...i[e] ? i[e] : i, ...s };
}
function Mt(r) {
  try {
    return new URL(r), !0;
  } catch {
    return !1;
  }
}
var Nt = Object.defineProperty, Rt = Object.getOwnPropertyDescriptor, b = (r, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? Rt(t, e) : t, n = r.length - 1, o; n >= 0; n--)
    (o = r[n]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && Nt(t, e, i), i;
};
const jt = "tarmac-theme-loaded", Wt = "tarmac-theme-updated";
let g = class extends F {
  constructor() {
    super(...arguments), this.source = "", this.activeTheme = "light", this.theme = {}, this.isLoading = !1, this.isReady = !1;
  }
  connectedCallback() {
    super.connectedCallback(), this.source ? this._loadTheme() : this.isReady = !0;
  }
  updated(r) {
    r.has("source") && this.source && this._loadTheme();
  }
  async _loadTheme() {
    this.isLoading = !0, this.isReady = !1;
    try {
      this.theme = await Ht({
        source: this.source,
        activeTheme: this.activeTheme
      }), this.dispatchEvent(
        new CustomEvent(jt, {
          bubbles: !0,
          composed: !0,
          detail: { theme: this.theme }
        })
      );
    } catch (r) {
      console.error("[tarmac-theme-provider] Failed to load theme:", r);
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
    return vt`<slot></slot>`;
  }
};
g.styles = [
  rt(Lt()),
  ct`
      :host {
        display: contents;
      }
    `
];
b([
  V({ type: String })
], g.prototype, "source", 2);
b([
  V({ type: String, attribute: "active-theme" })
], g.prototype, "activeTheme", 2);
b([
  W()
], g.prototype, "theme", 2);
b([
  W()
], g.prototype, "isLoading", 2);
b([
  W()
], g.prototype, "isReady", 2);
g = b([
  Ot("tarmac-theme-provider")
], g);
function Lt() {
  return `:host {
${Object.entries(Dt).map(([t, e]) => `  ${t}: ${e};`).join(`
`)}
}`;
}
export {
  d as A,
  g as T,
  ct as a,
  Dt as b,
  vt as c,
  W as d,
  jt as e,
  Wt as f,
  F as i,
  V as n,
  rt as r,
  Ot as t,
  Vt as w
};
