export default {
  cjs: {
    type: 'babel',
    minify: true,
    lazy: true,
  },
  esm: {
    type: 'babel',
  },
  umd: {
    name: 'SzfeUI',
    sourcemap: true,
  },
  extractCSS: true,
  extraExternals: [
    'react',
    'react-dom',
    /^szfe-tools/,
    'hoist-non-react-statics',
    'react-router-dom',
    'react-transition-group',
    /^@babel\/runtime/,
  ],
  extraBabelPlugins: [
    'react-node-key/babel',
    [
      'babel-plugin-import',
      {
        libraryName: 'szfe-tools',
        camel2DashComponentName: false,
      },
    ],
  ],
  runtimeHelpers: true,
}
