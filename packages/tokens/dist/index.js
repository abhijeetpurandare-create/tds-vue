import i from "./variables.js";
const y = {
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
}, p = {
  delhiveryRed: "#ED4136",
  delhiveryBlue: "#5b80f7"
}, g = {
  sans: ['"IBM Plex Sans"', "sans-serif"],
  display: ['"Noto Sans"', "sans-serif"],
  heading: ['"Noto Sans"', "sans-serif"],
  body: ['"Noto Sans"', "sans-serif"],
  caption: ['"Noto Sans"', "sans-serif"]
}, b = {
  display: 900,
  bold: 700,
  semibold: 600,
  medium: 500,
  regular: 400,
  light: 300
}, T = {
  0: 0,
  25: 0.5,
  50: 1,
  75: 1.5,
  100: 2,
  150: 3,
  200: 4,
  300: 6,
  400: 8,
  450: 10,
  500: 12,
  550: 14,
  600: 16,
  700: 20,
  800: 24,
  825: 26,
  850: 28,
  900: 32,
  925: 34,
  950: 36,
  975: 38,
  1e3: 40,
  1100: 44,
  1125: 48,
  1150: 52,
  1175: 58,
  1190: 60,
  1200: 64,
  1225: 68,
  1250: 72,
  1275: 76,
  1290: 78,
  1300: 80,
  1325: 82,
  1350: 86,
  1375: 88,
  1400: 92,
  1425: 94,
  1500: 999
}, E = {
  none: 0,
  small: 0.5,
  default: 1,
  medium: 1.5,
  large: 2,
  xlarge: 4
}, k = {
  none: 0,
  small: 2,
  default: 4,
  medium: 8,
  large: 12,
  xlarge: 16,
  max: 999
};
function w(t = document.documentElement, e = {}) {
  const s = { ...i, ...e };
  for (const [n, o] of Object.entries(s))
    t.style.setProperty(n, o);
}
function j(t = document.documentElement) {
  for (const e of Object.keys(i))
    t.style.removeProperty(e);
}
function v(t = {}) {
  const e = { ...i, ...t };
  return `:host, :root {
${Object.entries(e).map(([n, o]) => `  ${n}: ${o};`).join(`
`)}
}`;
}
async function x(t) {
  const { source: e, activeTheme: s = "light", overrides: n = {} } = t;
  let o = {};
  try {
    const l = m(e) || e.startsWith("/") || e.startsWith("./") ? e : `/${e}`, r = await fetch(l, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });
    if (!r.ok)
      throw new Error(`Failed to load theme: HTTP ${r.status}`);
    if (r.headers.get("Content-Type") !== "application/json") {
      const d = await r.text();
      try {
        const c = JSON.parse(d);
        o = c.record ?? c;
      } catch {
        throw new Error(`Invalid JSON in theme file: ${e}`);
      }
    } else
      o = await r.json();
  } catch (a) {
    throw console.error("[Tarmac Tokens] Error loading theme:", a), a;
  }
  return { ...o[s] ? o[s] : o, ...n };
}
function m(t) {
  try {
    return new URL(t), !0;
  } catch {
    return !1;
  }
}
export {
  k as borderRadius,
  E as borderWidth,
  p as brandColors,
  y as colors,
  g as fontFamily,
  b as fontWeight,
  w as injectTokens,
  x as loadTheme,
  j as removeTokens,
  T as scale,
  i as themeVariables,
  i as themeVariablesDefault,
  v as tokensToCssString
};
