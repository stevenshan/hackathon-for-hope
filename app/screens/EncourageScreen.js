import React from 'react';
import { Text, View, StyleSheet, Image, Button, TouchableOpacity} from 'react-native';

export default class EncourageScreen extends React.Component {
  static navigationOptions = {
    title: null,
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
    	<View style={styles.background}>
        <Image source={require('../assets/images/happydog.gif')}
        resizeMode= 'center'
        style={styles.gif}
        />
        <Button 
        title="See your Badges!"
        onPress={() => {
          this.props.navigation.navigate('Badge')
        }}>
        </Button>
        <Text> Thank you! Woof Woof </Text>
        <TouchableOpacity
          onPress={() => {
              this.props.navigation.navigate('Badge')
          }}>
              <Image source={require('../assets/images/dog.png')}
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
    alignSelf: 'center',
    height:200,
    width:200,
  },
});