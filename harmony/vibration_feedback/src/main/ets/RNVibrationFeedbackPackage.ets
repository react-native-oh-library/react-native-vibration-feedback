import { RNOHPackage, TurboModulesFactory } from '@rnoh/react-native-openharmony';
import type { TurboModule, TurboModuleContext } from '@rnoh/react-native-openharmony/ts';
import { RNVibrationFeedbackModule } from './RNVibrationFeedbackModule';
import {TM} from "./generated/ts"

class RNVibrationFeedbackModulesFactory extends TurboModulesFactory {
  createTurboModule(name: string): TurboModule | null {
    if (this.hasTurboModule(name)) {
      return new RNVibrationFeedbackModule(this.ctx);
    }
    return null;
  }

  hasTurboModule(name: string): boolean {
    return name === TM.RNVibrationFeedback.NAME;
  }
}

export class RNVibrationFeedbackPackage extends RNOHPackage {
  createTurboModulesFactory(ctx: TurboModuleContext): TurboModulesFactory {
    return new RNVibrationFeedbackModulesFactory(ctx);
  }
}
