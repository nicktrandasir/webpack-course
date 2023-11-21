import MiniCssExtractPlugin, {Configuration} from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack, { DefinePlugin } from "webpack";
import {BuildOptions} from "./types/types";
const WebpackBundleAnalyzer = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
export function buildPlugins({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] {
    const isDev = mode === 'development'
    const isProd = mode === 'production'

    const plugins: Configuration['plugins'] = [  // Плагины
        new HtmlWebpackPlugin({template: paths.html}), // Собирает html-файл атоматически подставляя js-файл билда в тег scrypt из html
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(platform),
            __EMV__: JSON.stringify(mode)
        })
    ];

    if (isDev) { // Плагины для дева
        plugins.push(new webpack.ProgressPlugin()) // Плагин для индикации прогресса сборки вебпаком. В проде лучше не использовать т.к. может замедлять сборку
    }

    if (isProd) { // Плагины для прода
        plugins.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css'
        })) // Css отдельным файлом
        plugins.push(new WebpackBundleAnalyzer({
         //   openAnalyzer: true,
            analyzerMode: 'static',
            reportFilename: "BundleAnalyzerReport.html"
        }))
    }

    if (analyzer)  plugins.push(new WebpackBundleAnalyzer({analyzerMode: 'static', reportFilename: "BundleAnalyzerReport.html"}))

    return plugins;
}