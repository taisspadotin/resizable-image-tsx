var path = require('path');

module.exports = {
mode: 'production',
entry: './src/index.tsx',
output: {
    path: path.resolve('lib'),
    filename: 'index.tsx',
    libraryTarget: 'commonjs2'
},
module: {
    rules: [
        {
            test: /\.tsx?$/,
            exclude: /(node_modules)/,
            use: 'babel-loader'
        }
    ]
}
}