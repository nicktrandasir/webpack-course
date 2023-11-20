import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import {BuildOptions,} from "./types/types";

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {

    return {
        port: port ?? 5005,
        open: true,
        historyApiFallback: true // работает только в дев окружении. Если прод и раздача статики через nginx, то нужно делать проксирование на index.html
    }
}