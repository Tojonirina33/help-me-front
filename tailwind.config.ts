import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "gradient-grey": "",
      },
      screens: {
        xs: "320px",
        xsm: "410px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        xlx: "1680px",
        xxl: "1980px",
      },
      colors: {
        primary: "#00ADEF",
        white: "#FFFFFF",
        "black-text": "#323232",
        "grey-text": "#C7C7C7",
        "grey-bg": "#EAE3EE",
        purple1: "#C071F6",
        purple2: "#D8A9F9",
        "cyan-light": "#F0EEF6",
        red1: "#F56965",
        red2: "#f34b45"
      },
      fontSize: {
        base: "1rem",
        md: "0.925rem",
        sm: "0.875rem",
        xs: "0.825rem",
        xxs: "0.75rem",
        xl: "2.5rem",
        lg: "1.2rem",
        xxl: "50px",
      },
      fontFamily: {},
      borderRadius: {
        md: "10px",
        sm: "8px",
        xs: "6px",
        xxs: "4px",
        lg: "14px",
        xl: "18px",
        xxl: "24px",
        xxxl: "30px",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
};
export default config;
