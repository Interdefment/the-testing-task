const colors = require('tailwindcss/colors');

module.exports = {
    purge: [
        './src/**/*.html',
        './src/**/*.ts',
        './src/**/*.tsx',
        './src/**/*.scss',
        './node_modules/@vechaiui/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                danger: colors.red,
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        // eslint-disable-next-line global-require
        require('@tailwindcss/forms'),
        // eslint-disable-next-line global-require
        require('@vechaiui/core')({
            colors: [ 'danger' ],
        }),
    ],
};
