/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Apple Design System
        primary: {
          DEFAULT: "#0066cc",
          focus: "#0071e3",
          "on-dark": "#2997ff",
        },
        ink: {
          DEFAULT: "#1d1d1f",
          "muted-80": "#333333",
          "muted-48": "#7a7a7a",
        },
        canvas: {
          DEFAULT: "#ffffff",
          parchment: "#f5f5f7",
        },
        surface: {
          pearl: "#fafafc",
          "tile-1": "#272729",
          "tile-2": "#2a2a2c",
          "tile-3": "#252527",
          black: "#000000",
          "chip-translucent": "#d2d2d7",
        },
        hairline: "#e0e0e0",
        "divider-soft": "#f0f0f0",
        "body-muted": "#cccccc",
        // Legacy alias for any remaining brand-* usage
        brand: {
          50: "#e6f0ff",
          100: "#cce0ff",
          200: "#99c2ff",
          300: "#66a3ff",
          400: "#3385ff",
          500: "#0066cc",
          600: "#0066cc",
          700: "#0066cc",
          800: "#004d99",
          900: "#1d1d1f",
          950: "#1d1d1f",
        },
      },
      fontFamily: {
        display: [
          "Inter",
          "SF Pro Display",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        body: [
          "Inter",
          "SF Pro Text",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      fontSize: {
        "hero-display": ["56px", { lineHeight: "1.07", letterSpacing: "-0.28px", fontWeight: "600" }],
        "display-lg": ["40px", { lineHeight: "1.1", letterSpacing: "0", fontWeight: "600" }],
        "display-md": ["34px", { lineHeight: "1.47", letterSpacing: "-0.374px", fontWeight: "600" }],
        lead: ["28px", { lineHeight: "1.14", letterSpacing: "0.196px", fontWeight: "400" }],
        "lead-airy": ["24px", { lineHeight: "1.5", letterSpacing: "0", fontWeight: "300" }],
        tagline: ["21px", { lineHeight: "1.19", letterSpacing: "0.231px", fontWeight: "600" }],
        "body-strong": ["17px", { lineHeight: "1.24", letterSpacing: "-0.374px", fontWeight: "600" }],
        body: ["17px", { lineHeight: "1.47", letterSpacing: "-0.374px", fontWeight: "400" }],
        "dense-link": ["17px", { lineHeight: "2.41", letterSpacing: "0", fontWeight: "400" }],
        caption: ["14px", { lineHeight: "1.43", letterSpacing: "-0.224px", fontWeight: "400" }],
        "caption-strong": ["14px", { lineHeight: "1.29", letterSpacing: "-0.224px", fontWeight: "600" }],
        "button-large": ["18px", { lineHeight: "1.0", letterSpacing: "0", fontWeight: "300" }],
        "button-utility": ["14px", { lineHeight: "1.29", letterSpacing: "-0.224px", fontWeight: "400" }],
        "fine-print": ["12px", { lineHeight: "1.0", letterSpacing: "-0.12px", fontWeight: "400" }],
        "micro-legal": ["10px", { lineHeight: "1.3", letterSpacing: "-0.08px", fontWeight: "400" }],
        "nav-link": ["12px", { lineHeight: "1.0", letterSpacing: "-0.12px", fontWeight: "400" }],
      },
      borderRadius: {
        xs: "5px",
        sm: "8px",
        md: "11px",
        lg: "18px",
        pill: "9999px",
      },
      spacing: {
        "section": "80px",
      },
    },
  },
  plugins: [],
};
