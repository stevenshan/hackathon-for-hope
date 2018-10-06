import React from 'react';
import { ScrollView, Text, View, StyleSheet, Image } from 'react-native';

Expo.Font.loadAsync({
  'Brandon_bld': require('../assets/fonts/Brandon_bld.ttf'),
  'Brandon_reg': require('../assets/fonts/Brandon_reg.ttf'),
});

export default class BadgeScreen extends React.Component {
  static navigationOptions = {
    title: 'Badges',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<ScrollView style={styles.background}>
        <Text style={styles.text}> New Badge Earned! </Text>
        <Image source={require('../assets/images/dogfood.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Image source={require('../assets/images/happydog.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Image source={require('../assets/images/happy.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Image source={require('../assets/images/dogpizza.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Image source={require('../assets/images/bear.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Brandon_reg',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(181,234,208,1)',
  },
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