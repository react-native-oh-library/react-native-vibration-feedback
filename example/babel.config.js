module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
  ],
  // 覆盖 Flow 插件配置以支持 component 语法
  overrides: [
    {
      test: /node_modules[/\\]react-native-harmony[/\\].*\.js$/,
      plugins: [
        ['@babel/plugin-syntax-flow', { all: true }],
      ],
    },
  ],
};