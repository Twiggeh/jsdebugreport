import { join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ReactRefreshTypescript from 'react-refresh-typescript';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import { readFileSync } from 'fs';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const root = join(__dirname, '../');
const src = join(root, 'src');
const dist = join(root, 'dist');
const app = join(src, 'index');
const srcRegex = /\/src\//;
const keys = join(root, 'keys');

export default {
	entry: { app },
	output: {
		path: dist,
		publicPath: '/',
		filename: 'public/js/[name].bundle.js',
		crossOriginLoading: 'anonymous',
	},
	devtool: 'cheap-module-source-map',
	devServer: {
		devMiddleware: {
			writeToDisk: true,
		},
		allowedHosts: ['0.0.0.0'],
		https: {
			cert: readFileSync(join(keys, 'server.crt')),
			key: readFileSync(join(keys, 'server.key')),
		},
		hot: true,
		historyApiFallback: true,
		compress: true,
	},
	mode: 'development',
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				include: [srcRegex],
				exclude: [/\/node_modules\//, /\/cypress\//, /\/server\//],
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@emotion/babel-preset-css-prop'],
							compact: false,
							cacheDirectory: true,
							cacheCompression: false,
							sourceMaps: true,
							inputSourceMap: true,
						},
					},
					{
						loader: 'ts-loader',
						options: {
							getCustomTransformers: () => ({
								before: [ReactRefreshTypescript()],
							}),
							transpileOnly: true,
							compilerOptions: {
								sourceMap: true,
								module: 'esnext',
								target: 'esnext',
								lib: ['esnext', 'dom', 'dom.iterable'],
								allowSyntheticDefaultImports: true,
								jsx: 'react-jsxdev',
								allowJs: false,
								baseUrl: './',
								esModuleInterop: false,
								resolveJsonModule: true,
								moduleResolution: 'node',
								downlevelIteration: true,
								jsxImportSource: '@emotion/react',
								types: ['node', '@emotion/react/types/css-prop'],
								skipLibCheck: true,
								forceConsistentCasingInFileNames: true,
								strict: true,
								strictNullChecks: true,
								noEmit: false,
								typeRoots: ['@types'],
								removeComments: true,
								useDefineForClassFields: true,
								alwaysStrict: true,
								isolatedModules: true,
								noUncheckedIndexedAccess: true,
							},
						},
					},
				],
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				generator: {
					filename: 'public/css/[name][ext]',
				},
			},
			{
				test: /\.(jpg|png|jpeg|webp)$/i,
				type: 'asset',
				generator: {
					filename: 'public/images/[name][ext]',
				},
			},
			{
				test: /\.svg$/i,
				type: 'asset',
				use: [
					'babel-loader',
					{
						loader: 'react-svg-loader',
						options: {
							svgo: {
								plugins: [{ removeDimensions: true, removeViewBox: false }],
								floatPrecision: 2,
							},
						},
					},
				],
			},
		],
	},
	resolve: {
		modules: ['src', 'node_modules'],
		extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '...'],
	},
	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
		},
	},
	plugins: [
		new ReactRefreshWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: join(src, 'index.html'),
			filename: 'index.html',
			chunksSortMode: 'manual',
			chunks: ['app'],
		}),
		new CleanWebpackPlugin(),
		new CopyWebpackPlugin({
			patterns: [
				{ from: join(src, 'static/icons'), to: join(dist, 'public/icons') },
				{ from: join(src, 'manifest.json'), to: dist },
			],
		}),
		new InjectManifest({
			swSrc: join(src, 'src-sw'),
			swDest: 'sw.js',
			maximumFileSizeToCacheInBytes: 5 * 1000 * 1024,
		}),
	],
};
