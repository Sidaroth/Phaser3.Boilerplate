
import { defineConfig, UserConfigFn, UserConfig } from 'vite';
import stripCode from 'rollup-plugin-strip-code';
import { resolve } from 'path';
import { execSync } from 'child_process';
import dts from 'vite-plugin-dts';
import { setDefaultResultOrder } from 'dns'
setDefaultResultOrder('verbatim')

const getConfig: UserConfigFn = ({ mode }) => {
    const baseConfig: UserConfig = {
        build: {
            lib: {
                entry: resolve(__dirname, 'src/index.ts'),
                name: 'phaser-boilerplate',
                formats: ['es'],
                fileName: (format) => `phaser-boilerplate.${format}.js`,
            },
            outDir: 'lib',
        },
        base: './',
        plugins: [
            dts({
                tsconfigPath: "./tsconfig.json",
                copyDtsFiles: true,
                include: ["src/**/*"]
            }),
        ],
        resolve: {
            alias: {
                configs: resolve(__dirname, "./src/configs"),
                core: resolve(__dirname, "./src/core"),
                styles: resolve(__dirname, "./styles"),
                assets: resolve(__dirname, "./assets"),
                scenes: resolve(__dirname, "./src/scenes"),
                entities: resolve(__dirname, "./src/entities"),
                components: resolve(__dirname, "./src/components"),
                utils: resolve(__dirname, "./src/utils"),
                root: resolve(__dirname, "./src"),
            },
        },
        // test: {
        //     globals: true,
        //     environment: 'happy-dom',
        //     coverage: {
        //         reporter: ['text', 'json', 'html']
        //     },
        //     exclude: [
        //         ...configDefaults.exclude,
        //         '/test/**/*',
        //         'scripts/**/*',
        //     ],
        // },
        define: {
            'IS_DEV': mode === 'development',
            'GAME_VERSION': JSON.stringify(process.env.npm_package_version),
            'GAME_BRANCH': JSON.stringify(execSync('git rev-parse --abbrev-ref HEAD').toString().trimEnd()),
            'GAME_TIMESTAMP': JSON.stringify(new Date().toLocaleString()),
        },
        server: {
            port: 3000,
            proxy: {
            },
        }
    };

    if (mode === 'production') {
        return Object.assign(baseConfig, {
            plugins: [...baseConfig.plugins,
            stripCode({
                start_comment: 'develblock:start',
                end_comment: 'develblock:end',
            }),
            ],
        });
    }

    return baseConfig;
}

// https://vitejs.dev/config/
export default defineConfig(getConfig);