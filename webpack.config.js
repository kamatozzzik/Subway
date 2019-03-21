const path = require('path');

module.exports = {
    entry: './src/js/startApp.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
};
