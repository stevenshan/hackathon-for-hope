import React from 'react';
import { Text, View } from 'react-native';

export default class InstructionScreen extends React.Component {
  static navigationOptions = {
    title: 'Instruction',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View>
            <Text> instructions </Text>);
      </View>
    )
  }
}
