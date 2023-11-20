import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths} from "./config/build/types/types";
import path from "path";

export interface EnvVariables {
    mode: BuildMode;
    port: number;
    analyzer?: boolean;
}
export default (env: EnvVariables) => {
    const paths:BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html')
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 5001,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer
    })

    return config;
};
