import React from 'react';
import { Text } from 'react-native';

export default class AchievementScreen extends React.Component {
  static navigationOptions = {
    title: 'Achievement',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View>
            <Text> achievements spelled right </Text>);
        </View>

  }
}
