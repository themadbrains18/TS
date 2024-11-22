import type { Config } from "tailwindcss";
/**
 *  Tailwind CSS Configuration
 */
const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        open: ['var(--font-open)'],
        inter: ['var(--font-inter)'],
      },
      screens: {
        "tab": "500px"
      },
      colors: {
        subheading: "#282046",
        subparagraph: "#5D5775",
        bgcolor: "#FAFAFA",
        bgblack: "#0D0C0D",
        lightsilver: "#C1C1C1",
        textheading: "#110833",
        textparagraph: "#544E4E",
        primarycyan: "#00BCFF",
        primarygreen: "#00CF7F",
        divider: {
          100: "#F2EEFE",
          200: "#F2EEFE",
        },
        primary: {
          100: "#AD54F2",
          200: "#FBF6FE",
          300: "#F5EAFD",
          600: "#DEBBFA",
          700: "#B659FF",
          800: "#C687F6",
          900: "#BA6EF4",
        },

        orange: {
          100: "#FF4D12",
          200: "#FF7361",
        },
        neutral: {
          400: "#9CA3AF",
          600: "#4B5563",
          900: "#111827",
        },
        action: {
          900: "#0A394F",
        },
      },
      boxShadow: {
        1: "0px 0px 30px 0px rgba(182, 89, 255, 0.04), 0px 8px 40px 0px rgba(0, 0, 0, 0.06);",
      },
    },

    gridTemplateAreas: {
      'layout': [
        'header header',
        'sidebar content',
        'footer footer',
      ],
    },

    animation: {
      // Fade up and down
      "fade-up": "fade-up 0.5s",
      "fade-down": "fade-down 0.5s",
      // Tooltip
      "slide-up-fade": "slide-up-fade 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      "slide-down-fade": "slide-down-fade 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      // Additional animations
      "bounce": "bounce 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)",
      "shake": "shake 0.3s ease-in-out",
      "zoom": "zoom 0.4s",
      // "zoom": "zoom 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
    },

    keyframes: {
      // Fade up and down
      "fade-up": {
        "0%": { opacity: "0", transform: "translateY(10px)" },
        "80%": { opacity: "0.6" },
        "100%": { opacity: "1", transform: "translateY(0px)" },
      },
      "fade-down": {
        "0%": { opacity: "0", transform: "translateY(-10px)" },
        "80%": { opacity: "0.6" },
        "100%": { opacity: "1", transform: "translateY(0px)" },
      },
      // Tooltip
      "slide-up-fade": {
        "0%": { opacity: "0", transform: "translateY(6px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      "slide-down-fade": {
        "0%": { opacity: "0", transform: "translateY(-6px)" },
        "100%": { opacity: "1", transform: "translateY(0)" },
      },
      // Bounce Animation
      "bounce": {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-20px)" },
      },
      // Shake Animation
      "shake": {
        "0%": { transform: "translateX(0)" },
        "25%": { transform: "translateX(-5px)" },
        "50%": { transform: "translateX(5px)" },
        "75%": { transform: "translateX(-5px)" },
        "100%": { transform: "translateX(0)" },
      },
      // Zoom Animation
      "zoom": {
        "0%": { transform: "scale(0.9)", opacity: "0" },
        "100%": { transform: "scale(1)", opacity: "1" },
      },
    }

  },
  plugins: [],
};
export default config;
