import type {RNPackageContext, RNPackage} from '@rnoh/react-native-openharmony/ts';
import { RNVibrationFeedbackPackage } from '@react-native-ohos/react-native-vibration-feedback/ts';

export function createRNPackages(ctx: RNPackageContext): RNPackage[] {
  return [
    new RNVibrationFeedbackPackage(ctx)
  ];
}