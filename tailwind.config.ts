import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: colors.white,
      black: colors.black,
      gray: colors.gray,
      blue: colors.blue,
      green: colors.green,
      amber: colors.amber,
      red: colors.red,
      cyan: colors.cyan,
      slate: colors.slate,
      emerald: colors.emerald,
      orange: colors.orange,
      rose: colors.rose,
    },
    extend: {},
  },
  plugins: [],
};

export default config;
