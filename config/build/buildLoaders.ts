import MiniCssExtractPlugin, {Configuration} from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export function buildLoaders({mode}: BuildOptions): Configuration['loader'] {
    const isDev = mode === 'development';

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader, // Creates `style` nodes from JS strings
            "css-loader",   // Translates CSS into CommonJS
            "sass-loader",  // Compiles Sass to CSS
        ],
    };

    const tsLoader = {
        test: /\.tsx?$/, // Регулярка для расширений лоудера и также понимает JSX
        use: 'ts-loader', // TS-лоудер для обработки файлов
        exclude: /node_modules/,
    };

    return {rules: [scssLoader, tsLoader]}
}