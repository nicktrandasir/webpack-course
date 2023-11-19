import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions,} from "./types/types";

export function buildDevServer({mode, port}: BuildOptions): DevServerConfiguration {
    const isDev = mode === 'development'

    return isDev ? {
            port: port ?? 5005,
            open: true
        } : undefined}
