import webpack from 'webpack';
import {buildWebpack} from "./config/build/buildWebpack";
import {BuildMode, BuildPaths, BuildPlatform} from "./config/build/types/types";
import path from "path";

export interface EnvVariables {
    mode?: BuildMode;
    port?: number;
    platform?: BuildPlatform;
    analyzer?: boolean;
}
export default (env: EnvVariables) => {
    const paths:BuildPaths = {
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: path.resolve(__dirname, 'build'),
        html: path.resolve(__dirname, 'public', 'index.html'),
        src: path.resolve(__dirname, 'src'),
        public: path.resolve(__dirname, 'public'),
    }

    const config: webpack.Configuration = buildWebpack({
        port: env.port ?? 5001,
        mode: env.mode ?? 'development',
        paths,
        analyzer: env.analyzer,
        platform: env.platform ?? 'desktop'
    })

    return config;
};
