/** @type {import('tailwindcss').Config} */

export default {
  mode: "jit",
  content: ["./src/**/*.{html,js,jsx,ts,tsx,css}", "./dev-server.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"IBM Plex Sans"', "sans-serif"],
      },
      colors: {
        text: {
          primary: "#5B80F7",
          heading: "#3D445C",
          body: "#525B7A",
          muted: "#A3AAC2",
          badge: "#474747",
        },
        bg: {
          surface: "#F9F9FB",
          dark: "#1F222E",
        },
        border: {
          default: "#E0E3EB",
          badge: "#9d9d9d",
        },
      },
      backgroundImage: {
        "proof-icon":
          "linear-gradient(160deg, #a8b1b0 8%, rgba(0, 0, 0, 0.91) 91%)",
      },
    },
  },
  plugins: [],
};
