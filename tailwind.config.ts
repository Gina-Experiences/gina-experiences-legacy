import type { Config } from 'tailwindcss';
import { COLORS } from './src/configurations/colors';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                ginaYellow: COLORS.ginaYellow,
                ginaBlue: COLORS.ginaBlue,
                ginaGreen: COLORS.ginaGreen,
                ginaOrange: COLORS.ginaOrange,
                ginaWhite: COLORS.ginaWhite,
                ginaGray: COLORS.ginaGray,
                ginaBlack: COLORS.ginaBlack,
                ginaLightYellow: COLORS.ginaLightYellow,
            },
            width: {
                '1/5': '20%',
            },
        },
    },
    plugins: [],
};
export default config;
