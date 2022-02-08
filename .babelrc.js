module.exports = api => {
    const env = api.env(); // process.env.BABEL_ENV || process.env.NODE_ENV

    // api.cache.using(() => env === 'development');

    const plugins = [
        '@babel/plugin-syntax-dynamic-import',
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-optional-chaining",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-syntax-class-properties",
        "@babel/plugin-proposal-nullish-coalescing-operator"
    ];

    if (env === 'development') {
        plugins.push('react-hot-loader/babel');
    }

    return {
        presets: [
            '@babel/react',
            [
                '@babel/env',
                {
                    debug: false,
                    spec: true,
                    loose: false,
                    modules: env === 'test' ? 'auto' : false,
                },
            ],
        ],
        plugins,
    };
};
