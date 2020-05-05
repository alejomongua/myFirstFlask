const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = require('path').resolve;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

const cssRule = { 
    test: /\.scss$/, 
    loader: [
        MiniCSSExtractPlugin.loader,
        "css-loader",
        "sass-loader"
    ]
}

const plugins = [
    new HtmlWebpackPlugin({  
        template: 'src/base.html',
        filename: '../../app/templates/base.html',
    }),
    new MiniCSSExtractPlugin(),
    // Lo siguiente se hace para que no me agregue scripts al html, ya que ya
    // los agregué a la plantilla y no puedo agregar automáticamente dos 
    // scripts en un mismo archivo
    new ScriptExtHtmlWebpackPlugin({
        custom: [
            {
                test: /\.js$/,
                attribute: 'src',
                value: ''
            },
        ]
    })
]


const legacyConfig = {
    devtool: 'eval-source-map',
    entry: __dirname + '/index.js',
    output: {
        path: resolve('../public/dist'),
        filename: 'bundle-legacy.js',
        publicPath: "/dist"
    },
    module: {
        rules: [
              {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                     presets: [[
                        "@babel/preset-env", 
                        {
                            useBuiltIns: "usage",
                            "corejs": 3,
                            targets: {
                                esmodules: false
                            }
                        }
                    ]]
                }
            },
            cssRule,
        ]
    },
    plugins
}

const moduleConfig = {
    //devtool: 'eval-source-map',
    entry: __dirname + '/index.js',
    output:{
        path: resolve('../public/dist'),
        filename: 'bundle.js',
        publicPath: "/dist"
    },
    resolve: {
        extensions: ['.js','.jsx','.css']
    },
    module: {
        rules: [
           {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: [[
                        "@babel/preset-env", 
                        {
                            useBuiltIns: "usage",
                            "corejs": 3,
                            targets: {
                                esmodules: true
                            }
                        }
                    ]]
                }
           },
           cssRule
        ]
    },
    plugins
};

module.exports = [
 legacyConfig, moduleConfig      
];