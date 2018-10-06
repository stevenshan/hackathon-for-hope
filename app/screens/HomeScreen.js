import React from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import { Icon } from 'react-native-elements';

Expo.Font.loadAsync({
  'Brandon_bld': require('../assets/fonts/Brandon_bld.ttf'),
  'Brandon_reg': require('../assets/fonts/Brandon_reg.ttf'),
});

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.background}> 
          <Text style={styles.header}> Feed Matt </Text>
          <Text style={styles.text}> Your next medicine to take is: </Text>
          <Text style={styles.text}> Augmentin </Text>
          <Text style={styles.text}> in 0 minutes </Text>
        </View>
          <Text style={styles.text}> Click me to feed me! </Text>
          <TouchableOpacity
              onPress={() => {
                  this.props.navigation.navigate('CameraStack')
              }}>
                  <Image source={require('../assets/images/cutedog.png')}
                  resizeMode= 'center'
                  style={styles.Pet}
                  />
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Image: {
    alignSelf: 'center',
    width: 100, height: 100,
  },
  Pet:{
    alignSelf: 'center',

  },
  header: {
    fontFamily: 'Brandon_bld',
    marginTop: 10,
    fontSize: 30,
    textAlign: 'center',
    color: 'rgba(248,235,158,1)',
  },
  text: {
    fontFamily: 'Brandon_reg',
    fontSize: 20,
    textAlign: 'center',
    color: 'rgba(181,234,208,1)',
  },
  containerTop: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
  },
  containerBottom: {
    position: 'absolute',
    bottom: 125,
    alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    paddingBottom: 2,
    fontFamily: 'roboto'
  },
  background: {
    backgroundColor: "rgba(76,76,76,1)",
  },
  backgroundImage: {
    flex: 1,
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  button: {
    backgroundColor: "rgba(92, 99,216, 1)",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 5,
    alignSelf: 'center'
  },
  swipe: {
    textAlign: 'center',
    fontSize: 25,
    color: 'white',
    marginTop: 25,
    fontFamily: 'roboto',
    alignSelf: 'center'
  }
});
