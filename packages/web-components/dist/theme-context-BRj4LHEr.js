import { e as s } from "./index-8C405PPW.js";
function a(t) {
  let e = t;
  for (; e; ) {
    if (e instanceof HTMLElement && e.tagName === "TARMAC-THEME-PROVIDER")
      return e.getTheme?.() ?? {};
    e instanceof HTMLElement && e.assignedSlot ? e = e.assignedSlot : e.host ? e = e.host : e = e.parentNode;
  }
  return {};
}
function m(t, e) {
  const n = (i) => {
    const o = i.detail;
    o?.theme && e(o.theme);
  };
  return window.addEventListener(s, n), () => {
    window.removeEventListener(s, n);
  };
}
export {
  a as g,
  m as s
};
