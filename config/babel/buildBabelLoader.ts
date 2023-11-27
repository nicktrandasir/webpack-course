import {removeDataTestIdBabelPlugin} from "./removeDataTestIdBabelPlugin";
import {BuildOptions} from "../build/types/types";

export function buildBabelLoader({mode}: BuildOptions) {
    const isDev = mode === 'development';
    const isProd = mode === 'production';

    let plugins = [];

    if (isProd) {
        plugins.push(
            [
                removeDataTestIdBabelPlugin,
                {
                    props: ['data-testid']
                }
            ]
        )
    }

    return {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {   // Вынес в babel.config.json - можно и так и так
                presets: ['@babel/preset-env', "@babel/preset-typescript", ["@babel/preset-react", {
                    runtime: isDev ? 'automatic' : 'classic'
                }]
                ],
                plugins: plugins.length ? plugins : undefined
            }
        }
    }
}