"use strict";
const { resolve, join } = require("path");
const merge = require("webpack-merge");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const { BabelMultiTargetPlugin } = require("webpack-babel-multi-target-plugin");

const helperWhitelist = require("./utils/helper-whitelist");

const OUTPUT_PATH = resolve("dist");

const polyfills = [
  {
    from: resolve(
      `./node_modules/@webcomponents/webcomponentsjs/webcomponents-*.{js,map}`
    ),
    to: join(OUTPUT_PATH, "vendor"),
    flatten: true
  },
  {
    from: resolve(
      `./node_modules/@webcomponents/webcomponentsjs/bundles/*.{js,map}`
    ),
    to: join(OUTPUT_PATH, "vendor", "bundles"),
    flatten: true
  },
  {
    from: resolve(`./node_modules/whatwg-fetch/fetch.js`),
    to: join(OUTPUT_PATH, "vendor"),
    flatten: true
  }
];

const helpers = [
  {
    from: resolve("./vendor/babel-helpers.min.js"),
    to: join(OUTPUT_PATH, "vendor")
  },
  {
    from: resolve("./vendor/regenerator-runtime.min.js"),
    to: join(OUTPUT_PATH, "vendor")
  }
];

const commonConfig = merge([
  {
    entry: {
      "ims-user-list": "./ims-user-list.js",
      "ims-user-list-generator": "./ims-user-list-generator.js"
    },
    output: {
      path: OUTPUT_PATH,
      filename: "[name].js"
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            BabelMultiTargetPlugin.loader(),
            "uglify-template-string-loader"
          ]
        }
      ]
    },
    plugins: [
      // Babel configuration for multiple output bundles targeting different sets of browsers
      new BabelMultiTargetPlugin({
        babel: {
          plugins: [
            [
              require("@babel/plugin-external-helpers"),
              {
                whitelist: helperWhitelist
              }
            ],
            // Minify HTML and CSS in tagged template literals
            [
              require("babel-plugin-template-html-minifier"),
              {
                modules: {
                  "@polymer/polymer/lib/utils/html-tag.js": ["html"]
                },
                htmlMinifier: {
                  collapseWhitespace: true,
                  minifyCSS: true,
                  removeComments: true
                }
              }
            ]
          ],

          // @babel/preset-env options common for all bundles
          presetOptions: {
            // Don’t add polyfills, they are provided from webcomponents-loader.js
            useBuiltIns: false
          }
        },

        // Modules excluded from targeting into different bundles
        doNotTarget: [
          // Array of RegExp patterns
        ],

        // Modules that should not be transpiled
        exclude: [
          // Array of RegExp patterns
        ],

        // Fix for `nomodule` attribute to work correctly in Safari 10.1
        safari10NoModuleFix: "inline-data-base64",

        // Target browsers with and without ES modules support
        targets: {
          es6: {
            browsers: ["Chrome >= 61", "Firefox >= 60", "Edge >= 18"],
            tagAssetsWithKey: false, // don’t append a suffix to the file name
            esModule: true // marks the bundle used with <script type="module">
          },
          es5: {
            browsers: [
              "defaults" // > 0.5%, last 2 versions, Firefox ESR, not dead
            ],
            tagAssetsWithKey: true, // append a suffix to the file name
            noModule: true // marks the bundle included without `type="module"`
          }
        }
      })
    ]
  }
]);

const developmentConfig = merge([
  {
    watch: true,
    devtool: "cheap-module-source-map",
    plugins: [new CopyWebpackPlugin([...polyfills, ...helpers])]
  }
]);

const productionConfig = merge([
  {
    devtool: "nosources-source-map",
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          },
          sourceMap: false,
          parallel: true
        })
      ]
    },
    plugins: [
      new CleanWebpackPlugin({ verbose: true }),
      new CopyWebpackPlugin([...polyfills, ...helpers]),
      new CompressionPlugin({ test: /\.js(\.map)?$/i }),
      new BrotliPlugin({
        asset: "[path].br[query]",
        test: /\.js(\.map)?$/i,
        threshold: 20,
        minRatio: 0.8,
        mode: 1
      })
    ]
  }
]);

module.exports = mode => {
  let currentConfig =
    mode === "production" ? productionConfig : developmentConfig;
  return merge(commonConfig, currentConfig, { mode });
};
