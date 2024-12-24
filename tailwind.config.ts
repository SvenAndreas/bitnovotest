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
        primary: "var(--primary)",
        "text-d":"var(--text-d)",
        'primary-l':'var(--primary-l)',
        'primary-d':'var(--primary-d)',
        bg:'var(--bg)',
        secondary:'var(--secondary)',
        'secondary-l':'var(--secondary-l)',
        tertiary:'var(--tertiary)',
      },
      fontSize: {
        'font-xl': 'var(--font-xl)',
        'font-l': 'var(--font-l)',
        'font-m': 'var(--font-m)',
        'font-n': 'var(--font-n)',
        'font-s': 'var(--font-s)',
        'font-xn': 'var(--font-xn)',
      },
      fontWeight: {
        'w-bold': 'var(--weight-bold)',
        'w-normal': 'var(--weight-normal)',
      },
    },
  },
  plugins: [],
};
export default config;
