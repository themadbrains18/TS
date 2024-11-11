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
        inter:['var(--font-inter)'],
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
  },

  plugins: [],
};
export default config;
