const path = require('path');
const { logout } = require('./server/controllers/Account');

module.exports = {
    entry: {
        app: './client/maker.jsx',
        login: './client/login.jsx',
        change: './client/change.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'production',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]Bundle.js',
    },
};