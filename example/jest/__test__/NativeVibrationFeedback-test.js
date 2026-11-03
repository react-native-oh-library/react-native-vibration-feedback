/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// src/NativeVibrationFeedback.ts（RNVibrationFeedback TurboModule spec）白盒单元测试

jest.mock(
    'react-native',
    () => ({
        TurboModuleRegistry: { getEnforcing: jest.fn() },
    }),
    { virtual: true },
);

function loadSpec(nativeModule) {
    jest.resetModules();
    const rn = require('react-native');
    rn.TurboModuleRegistry.getEnforcing.mockReturnValue(nativeModule);
    const spec = require('../../../src/NativeVibrationFeedback').default;
    return { spec, TurboModuleRegistry: rn.TurboModuleRegistry };
}

describe('src/NativeVibrationFeedback（RNVibrationFeedback TurboModule spec）', () => {
    it('通过 TurboModuleRegistry.getEnforcing 获取名为 RNVibrationFeedback 的模块', () => {
        const nativeModule = { vibrateWith: jest.fn() };
        const { spec, TurboModuleRegistry } = loadSpec(nativeModule);
        expect(TurboModuleRegistry.getEnforcing).toHaveBeenCalledWith(
            'RNVibrationFeedback',
        );
        expect(spec).toBe(nativeModule);
    });

    it('默认导出注册表返回的原生模块（包含 Spec 声明的全部方法）', () => {
        const nativeModule = {
            vibrateWith: jest.fn(),
        };
        const { spec } = loadSpec(nativeModule);
        expect(spec).toBe(nativeModule);
        ['vibrateWith'].forEach((method) => {
            expect(typeof spec[method]).toBe('function');
        });
    });

    it('在原生模块不可用时默认导出为 undefined（由上层处理）', () => {
        const { spec } = loadSpec(undefined);
        expect(spec).toBeUndefined();
    });
});
