/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
// Omit deprecated Tailwind v2/v3 palette names to silence rename warnings (use sky, stone, neutral, gray, slate)
const { lightBlue, warmGray, trueGray, coolGray, blueGray, ...tailwindColors } = colors;

export default {
  mode: "jit",
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,.css}",
    "./.storybook/**/*.{js,jsx,ts,tsx,jsx, css}",
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindColors,
        success: "#059669",
        success_background: "#ecfdf5",
        pending: "#d97706",
        pending_background: "#fffbeb",
        disabled_background: "#f0f0f0",
        intermediate_3: "#7c3aed",
        intermediate_3_background: "#f5f3ff",
        main_state_in_transit: "#5B80F7",
        main_state_in_transit_background: "#ECF0FF",
        intermediate_1_background: "#FFF7ED",
        failure: "#DC2626",
        intermediate_4_returns: "#DB2777",
        intermediate_4_returns_background: "#FDF2F8",
        intermediate_2: "#ECFEFF",
        delhivery_red: "#ED4136",
        delhivery_black: "#000000",
        default_black: "#3D445C",
        labels: "#525B7A",
        descriptions_placeholder: "#A3AAC2",
        gray_300: "#DDDDDD",
        gray_400: "#999999",
        gray_600: "#4D4D4D",
        heading: "#991B1B",
        background: "#FEF2F2",
        warning_icon_bg: "#d97706",
        warning: "#F59E0B",
        alerts_error: "#FA3A2E",
        default_background: "#F9F9FB",
        outline: "#f9f9fb",
        outlines_section_outlines: "#F9F9FB",
        sections_and_dividers: "#E0E3EB",
        hyper_dark: "#1F222E",
        info_body: "#3F61CD",
        primary: "#5B80F7",
        proof_text: "#474747",
        proof_border: "#9d9d9d",
      },
      backgroundImage: {
        "proof-icon":
          "linear-gradient(160deg, #a8b1b0 8%, rgba(0, 0, 0, 0.91) 91%)",
      },
      keyframes: {
        glow: {
          "0%": {opacity: "1"},
          "50%": {opacity: "0"},
          "100%": {opacity: "1"},
        },
        marquee: {
          from: {transform: "translateX(0%)"},
          to: {transform: "translateX(-100%)"},
        },
        marqueeHeader: {
          from: {transform: "translateX(100vw)"},
          to: {transform: "translateX(-100%)"},
        },
        vehicleMotion: {
          from: {transform: "translateX(0%)"},
          to: {transform: "translateX(60%)"},
        },
        animatePathMotion: {
          from: {transform: "translateX(-100%)"},
          to: {transform: "translateX(-37%)"},
        },
        loader: {
          "0%": {
            boxShadow: "20px 0 #000, -20px 0 #0002",
            background: "#000",
          },
          "33%": {
            boxShadow: "20px 0 #000, -20px 0 #0002",
            background: "#0002",
          },
          "66%": {
            boxShadow: "20px 0 #0002, -20px 0 #000",
            background: "#0002",
          },
          "100%": {
            boxShadow: "20px 0 #0002, -20px 0 #000",
            background: "#000",
          },
        },
      },
      animation: {
        glow: "glow 3s infinite",
        marqueeSlow: "marquee 25s linear infinite",
        marqueeFast: "marquee 15s linear infinite",
        vehicleMotion: "vehicleMotion 8s linear forwards",
        animatePathMotion: "animatePathMotion 8s linear forwards",
        "loader-spin": "spin var(--spin-time) linear infinite",
        marqueeHeaderTwenty: "marqueeHeader 50s linear infinite",
        loader: "loader 1s infinite linear alternate",
      },
      screens: {
        portrait: {raw: "(orientation: portrait)"},
      },
      width: {
        "fill-available": "-webkit-fill-available",
      },
    },
  },
  plugins: [],
};
