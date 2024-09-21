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
        Subheading: "#282046",
        Subparagraph: "#5D5775",
        BGcolor: "#FAFAFA",
        bgblack: "#0D0C0D",
        lightsilver: "#C1C1C1",
        Textheading: "#110833",
        Textparagraph: "#544E4E",
        Primarycyan: "#00BCFF",
        Primarygreen: "#00CF7F",
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
    },
  },
  plugins: [],
};
export default config;
