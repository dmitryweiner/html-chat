const webpackConfig = require('../configs/webpack.common.js');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        // '@storybook/preset-create-react-app',
        '@storybook/addon-links',
        '@storybook/addon-essentials'
    ],
    webpackFinal: config => ({
        ...config,
        resolve: {
            ...config.resolve,
            alias: {
                ...config.resolve.alias,
                ...webpackConfig.resolve.alias
            }
        }
    })
};
