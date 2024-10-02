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
        primary:{
          1: "#FFD094", //khaki
          2: "#403737", //brown
          3: "#fa8811" //orange
        },
        secondary:{
          1: "#FFFFFF",
          2: "#000000",
        },
        shade: {
          1: "#F19D55", //orange-shade
          2: "#B6E3CE", //green-shade
          3: "#54136C", //violet shade
          4: "#F0E7E7", //white-shade
          5: "#BEACAC", //brown-shade
          6: "#FFE3BF", //brown-shade
        }
      },
    },
  },
  plugins: [],
};
export default config;
