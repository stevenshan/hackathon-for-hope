import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default class BadgeScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View style={styles.background}>
        <Image source={require('../assets/images/happydog2.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(76,76,76,1)",
  },
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  takePhoto: {
    marginLeft: 10
  },
  gif:{
    alignSelf: 'center',
  }
});