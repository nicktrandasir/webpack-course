export type BuildMode = 'development' | 'production';
export type BuildPlatform = 'module' | 'desktop';

export interface BuildPaths {
    entry: string;
    html: string;
    output: string;
    src: string;
}

export interface BuildOptions {
    paths: BuildPaths;
    mode: BuildMode;
    port: number;
    platform: BuildPlatform;
    analyzer?: boolean;
}
