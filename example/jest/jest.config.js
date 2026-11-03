/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// RNOH JS 白盒测试配置
// 运行方式：npx jest -c jest/jest.config.js
// 覆盖方式：npx jest -c jest/jest.config.js --coverage
module.exports = {
  // rootDir 指向仓库根目录（example/jest/ 的上两级），使 collectCoverageFrom
  // 能覆盖根目录 src/ 下的库源码（jest 只对 rootDir 内的文件做覆盖率插桩）。
  rootDir: '../..',
  testEnvironment: 'node',
  testMatch: ['<rootDir>/example/jest/__test__/*-test.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  setupFiles: ['<rootDir>/example/jest/jest.setup.js'],
  globals: {
    __DEV__: true,
  },
  // 被测源码（仓库根目录 src/）import 的 react / react-native
  // 需要从 example/node_modules 解析。
  modulePaths: ['<rootDir>/example/node_modules'],
  // 根目录执行过 npm install 后，src/ 按 node 规则会就近命中根目录
  // node_modules 的 react@18（遮蔽 example 的 react@19）。这里显式固定到
  // example 实际使用的 react，保证与示例应用版本一致。
  moduleNameMapper: {
    '^react$': '<rootDir>/example/node_modules/react',
  },
  transform: {
    // index.js 等纯 JS 文件：babel-jest + preset-env（ESM -> CJS）+ preset-flow
    // babelrc/configFile 关闭，避免加载 example/babel.config.js（metro 预设）
    '^.+\\.jsx?$': [
      'babel-jest',
      {
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
          '@babel/preset-flow',
        ],
      },
    ],
    // src/*.ts 等 TS 文件：babel-jest + preset-typescript 剥离类型
    '^.+\\.tsx?$': [
      'babel-jest',
      {
        babelrc: false,
        configFile: false,
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
          '@babel/preset-typescript',
        ],
        plugins: ['@babel/plugin-transform-react-jsx'],
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!react-native|@react-native|react)'],
  collectCoverageFrom: [
    'src/**/*.ts',
    'src/**/*.tsx',
    '!src/**/*.d.ts',
  ],
  // 使用 v8 覆盖率收集器：babel(istanbul)方式在 Windows 上要求 cwd 与 rootDir
  // 一致（npm test 在 example 下运行），v8 不受影响且更快。
  coverageProvider: 'v8',
  coverageThreshold: {
    global: { branches: 60 },
  },
};
