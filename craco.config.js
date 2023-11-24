const path = require('path');

console.log(process.env);

module.exports = {
    typescript: {
        enableTypeChecking: true /* (default value) */,
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
        configure: (webpackConfig, { env, paths }) => {
            return {
                ...webpackConfig,
                entry: {
                    main: [
                        env === "development" &&
                        require.resolve("react-dev-utils/webpackHotDevClient"),
                        paths.appIndexJs,
                    ].filter(Boolean),
                    // background: paths.appSrc + "/background/background.ts",
                },
                output: {
                    ...webpackConfig.output,
                    filename: "static/js/[name].js",
                },
                optimization: {
                    ...webpackConfig.optimization,
                    runtimeChunk: false,
                },
            };
        },
    },
};
