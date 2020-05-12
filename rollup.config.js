import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import globals from 'rollup-plugin-node-globals'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import {terser} from 'rollup-plugin-terser'
import process from 'process'

const production = process.env.NODE_ENV === 'production'

export default {
    input: 'src/index.js',
    output: {
        file: `dist/vue-xivtooltips${production ? '.min' : ''}.js`,
        name: 'VueXIVTooltips',
        format: 'umd',
        globals: {
            'axios': 'axios',
            'vue': 'vue',
        }
    },
    plugins: [
        resolve(),
        commonjs(),
        postcss({ extract: true }),
        vue({
            css: false,
        }),
        globals(),
        (production && terser())
    ],
    external: [
        'vue',
        'axios',
    ],
}