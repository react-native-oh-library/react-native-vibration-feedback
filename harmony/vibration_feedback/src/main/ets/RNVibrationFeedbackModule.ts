/**
 * Apache-2.0 license
 *
 * Copyright (C) 2026 Huawei Device Co., Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { TurboModule } from '@rnoh/react-native-openharmony/ts';
import { vibrator } from '@kit.SensorServiceKit';
import { BusinessError } from '@kit.BasicServicesKit';
import {TM} from './generated/ts'

const VIBRATION_PRESET_MAP: Map<number, vibrator.HapticFeedback> = new Map([
  [1519, vibrator.HapticFeedback.EFFECT_SOFT],
  [1520, vibrator.HapticFeedback.EFFECT_HARD],
  [1521, vibrator.HapticFeedback.EFFECT_NOTICE_FAILURE],
]);

export class RNVibrationFeedbackModule extends TurboModule implements TM.RNVibrationFeedback.Spec {
  public static readonly NAME = 'RNVibrationFeedback';
  vibrateWith(id: number): void {
    const effectId = VIBRATION_PRESET_MAP.get(id);
    const finalEffectId = effectId || vibrator.HapticFeedback.EFFECT_SOFT;
    this.vibrateWithPresetInternal(finalEffectId);
  }

  private vibrateWithPresetInternal(effectId: string): void {
    try {
      const isSupported = vibrator.isSupportEffectSync(effectId);
      if (isSupported) {
        this.startPresetVibration(effectId);
      }
      else{
        console.error(`effectId is not Support`);
      }
    } catch (error) {
      let e: BusinessError = error as BusinessError;
      console.error(`[RNVibrationFeedback] isSupportEffectSync error: ${e.code}, ${e.message}`);
    }
  }

  private startPresetVibration(effectId: string): void {
    try {
      vibrator.startVibration({
        type: 'preset',
        effectId: effectId,
        count: 1,
      }, {
        usage: 'touch'
      }, (error: BusinessError) => {
        if (error) {
          console.error(`[RNVibrationFeedback] Preset vibration failed: ${error.code}, ${error.message}`);
        }
      });
    } catch (error) {
      let e: BusinessError = error as BusinessError;
      console.error(`[RNVibrationFeedback] startPresetVibration error: ${e.code}, ${e.message}`);
    }
  }

  isSupportEffect(effectId: string): boolean {
    try {
      return vibrator.isSupportEffectSync(effectId);
    } catch (error) {
      let e: BusinessError = error as BusinessError;
      console.error(`[RNVibrationFeedback] isSupportEffect error: ${e.code}, ${e.message}`);
      return false;
    }
  }
}
