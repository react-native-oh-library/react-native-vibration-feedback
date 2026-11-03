import {RNAbility} from '@rnoh/react-native-openharmony';
import { AbilityConstant, Want } from '@kit.AbilityKit';

export default class EntryAbility extends RNAbility {
  onCreate(want: Want) {
    super.onCreate(want)
  }

  getPagePath() {
    return 'pages/Index';
  }

  onNewWant(want: Want, _launchParam: AbilityConstant.LaunchParam): void {
  }
}