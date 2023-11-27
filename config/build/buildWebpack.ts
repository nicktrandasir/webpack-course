import {buildPlugins} from "./buildPlugins";
import {buildLoaders} from "./buildLoaders";
import {buildResolvers} from "./buildResolvers";
import {buildDevServer} from "./buildDevServer";
import {BuildOptions} from "./types/types";

export function buildWebpack(options: BuildOptions) {
    const {mode, paths} = options;
    const isDev = mode === 'development'

    return {
        mode: mode ?? 'development', // development || production Тип сборки. Отличается оптимизацией, удалением лишнего к примеру комметариев, пробелов и сжатием.
        // Хорошей практикой считается динамическое изменение mode
        entry: paths.entry,  // Entry - точка входа! Обычно одна точка входа
        // entry: {   // Но может быть и несколько точек входа:
        //     helloWorld1: path.resolve(__dirname, 'src', "index1.js"),
        //     helloWorld2: path.resolve(__dirname, 'src', "index2.js")
        // }
        output: { // Output - назначение и название. Куда сохраниться сборка
            path: paths.output, // Куда сохранить файл после сборки
            filename: '[name].[contenthash].js', // Какое имя присвоить файлу сборки. По умолчанию - name = main
            clean: true, // Очистит/удалит все предыдущие файлы сборки
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        }, // Подключаем TypeScript и расширения ts, tsx
        resolve:  buildResolvers(options), // Расширения, которые необходимо обработать
        devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map' ,
        devServer: isDev ?  buildDevServer(options) : undefined, // DevServer для отображения изменений без перезагрузки приложения
    }
}