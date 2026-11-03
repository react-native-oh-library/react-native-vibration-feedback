/**
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// index.js（@react-native-ohos/react-native-vibration-feedback JS 层入口）白盒单元测试

jest.mock(
    'react-native',
    () => ({
        TurboModuleRegistry: { getEnforcing: jest.fn() },
    }),
    { virtual: true },
);

function loadVibrationFeedback(nativeModule) {
    jest.resetModules();
    const rn = require('react-native');
    rn.TurboModuleRegistry.getEnforcing.mockReturnValue(nativeModule);
    const RNVibrationFeedback = require('../../../index').default;
    return { RNVibrationFeedback, rn, nativeModule };
}

describe('@react-native-ohos/react-native-vibration-feedback index.js', () => {
    it('默认导出即 RNVibrationFeedback 原生模块（转接 src/NativeVibrationFeedback）', () => {
        const nativeModule = { vibrateWith: jest.fn() };
        const { RNVibrationFeedback, rn } = loadVibrationFeedback(nativeModule);
        expect(rn.TurboModuleRegistry.getEnforcing).toHaveBeenCalledWith(
            'RNVibrationFeedback',
        );
        expect(RNVibrationFeedback).toBe(nativeModule);
    });

    it('vibrateWith 将指定 id 透传给原生模块（1519/1520/1521）', () => {
        const nativeModule = { vibrateWith: jest.fn() };
        const { RNVibrationFeedback } = loadVibrationFeedback(nativeModule);
        [1519, 1520, 1521].forEach((id) => {
            RNVibrationFeedback.vibrateWith(id);
        });
        [1519, 1520, 1521].forEach((id, index) => {
            expect(nativeModule.vibrateWith).toHaveBeenNthCalledWith(index + 1, id);
        });
    });

    it('vibrateWith 返回值为 void（undefined）', () => {
        const nativeModule = { vibrateWith: jest.fn() };
        const { RNVibrationFeedback } = loadVibrationFeedback(nativeModule);
        expect(RNVibrationFeedback.vibrateWith(1521)).toBeUndefined();
    });

    it('在原生模块不可用时默认导出为 undefined（由上层处理）', () => {
        const { RNVibrationFeedback } = loadVibrationFeedback(undefined);
        expect(RNVibrationFeedback).toBeUndefined();
    });
});
