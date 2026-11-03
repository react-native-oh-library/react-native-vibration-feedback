import React from "react";
import { View, Button} from "react-native";
import {TestCase, Tester, TestSuite} from "@rnoh/testerino"
import RNVibrationFeedback from 'react-native-vibration-feedback';

const App = (props) => {

  return (
    <Tester style={{flex: 1 , marginTop: 30}}>
      <TestSuite name='vibration-feedback'>
          <View style={{ margin: 50, flexDirection: "column", justifyContent: "space-between" }}>
            <View>
              <TestCase itShould={"Peek"}>
                <Button
                title="Peek"
                onPress={() => RNVibrationFeedback.vibrateWith(1519)}
                />
              </TestCase>
              <TestCase itShould={"Pop"}>
                <Button
                title="Pop"
                onPress={() => RNVibrationFeedback.vibrateWith(1520)}
                />
              </TestCase>
              <TestCase itShould={"Nope"}>
                <Button
                title="Nope"
                onPress={() => RNVibrationFeedback.vibrateWith(1521)}
                />
              </TestCase>
            </View>
          </View>
      </TestSuite>  
    </Tester>
  );
};
export default App;