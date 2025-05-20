module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        browsers: ['last 2 versions', 'ie >= 11']
        // Or whatever browsers you need to support
      },
      useBuiltIns: 'usage',
      corejs: 3
    }]
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import']
};
