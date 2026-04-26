import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultConfig";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: defaultTheme.theme,
  plugins: [],
};

export default config;
