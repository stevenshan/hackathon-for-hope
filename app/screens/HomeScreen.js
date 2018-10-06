import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { FileSystem } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
      var f = `${FileSystem.documentDirectory}photos/image.jpg`;
      return (<Image style={{width: 100, height: 100 }} source = {{uri: f}}  /> 
          
          
          );
  }

}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
