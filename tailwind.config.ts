import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        colors: {
          primary: "#EFADFF",
          "primary-hover": "#D298E0",
          secondary: "#6F6470",
          "text-primary": "#484149",
          "text-secondary": "#6F6470",
          "background": "#FFFFFF",
          "background-alt": "#F8DEFF",
          "border": "#5A525B",
        },
      fontFamily: {
        sans: ["var(--font-montserrat)", "Montserrat", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
        headline: ["var(--font-montserrat)", "Montserrat", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      letterSpacing: {
        headline: "-2.5px",
        subheadline: "-1.5px",
      },
    },
  },
  plugins: [],
};

export default config;