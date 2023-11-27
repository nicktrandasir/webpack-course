import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";
import {ModuleOptions} from 'webpack'
import {buildBabelLoader} from "../babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const svgrLoader = {
        test: /\.svg$/i,
        use: [
            {
                loader: '@svgr/webpack',
                options: {
                    icon: true,
                    svgoConfig: {
                        plugins: [
                            {
                                name: 'convertColors',
                                params: {
                                    currentColor: true,
                                }
                            }
                        ]
                    }
                }
            }
        ],
    }

    const assetsLoader = {
        test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2)$/i,
        // More information here https://webpack.js.org/guides/asset-modules/
        type: "asset/resource",
    };

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
            },
        },
    }

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            cssLoaderWithModules,
            // Compiles Sass to CSS
            "sass-loader",
        ],
    }

    // const tsLoader = {
    //     test: /\.tsx?$/, // Регулярка для расширений лоудера и также понимает JSX
    //     use: 'ts-loader', // TS-лоудер для обработки файлов
    //     exclude: /node_modules/,
    // };

    // const tsLoader = {
    //     test: /\.tsx?$/, // Регулярка для расширений лоудера и также понимает JSX
    //     use: [
    //         {
    //             loader: require.resolve('ts-loader'),
    //             options: {
    //                 getCustomTransformers: () => ({
    //                     before: [isDev && ReactRefreshTypeScript()].filter(Boolean),
    //                 }),
    //                 transpileOnly: isDev,
    //             },
    //         },
    //     ],
    //     exclude: /node_modules/,
    // };
    const babelLoader = buildBabelLoader(options)

    // Очередность лоудеров важна!
    return [assetsLoader, svgrLoader, scssLoader, babelLoader];
}