import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Alert,
} from 'react-native';
import { FileSystem } from 'expo';

import { MonoText } from '../components/StyledText';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  render() {
      const { navigate } = this.props.navigation;
      var f = `${FileSystem.documentDirectory}photos/image.jpg`;
      return (

          <View>
          
          <Image style={{width: 100, height: 100 }} source = {{uri: f}}  /> 
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <View style={styles.container}>
                <TouchableHighlight onPress = {() => { console.log("asd"); navigate('Medication') }}>
                    <View style={styles.button}>
                    <Text>Next Medication</Text>
                    </View>
                </TouchableHighlight>
            </View>

        </ScrollView>
          </View>
          
          
          );
  }

}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  },
});
