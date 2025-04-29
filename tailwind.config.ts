import type {Config} from "tailwindcss";

const config: Config = {
    content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
    theme: {
        extend: {
            colors: {},
            fontFamily: {
                sans: ["Fredoka", "sans-serif"],
            },
        }
    },
    plugins: []
};

export default config;
