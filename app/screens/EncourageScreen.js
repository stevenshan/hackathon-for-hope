import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';

Expo.Font.loadAsync({
  'Brandon_bld': require('../assets/fonts/Brandon_bld.ttf'),
  'Brandon_reg': require('../assets/fonts/Brandon_reg.ttf'),
});


export default class EncourageScreen extends React.Component {
  static navigationOptions = {
    title: 'I Wrov You Hooman',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View style={styles.background}>
        <Image source={require('../assets/images/dogfood.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Button 
        title="See your Badges!"
        onPress={() => {
          this.props.navigation.navigate('Badge')
        }}>
        </Button>
        <Text style={styles.text}> Thank you! Woof Woof </Text>
        <TouchableOpacity
          onPress={() => {
              this.props.navigation.navigate('Badge')
          }}>
              <Image source={require('../assets/images/yummy.png')}
              resizeMode= 'center'
              style={styles.Pet}
              />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "rgba(76,76,76,1)",
  },
  text: {
    fontFamily: 'Brandon_reg',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(181,234,208,1)',
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
  },
  Pet:{
    height:300,
    width:300,
  },
});