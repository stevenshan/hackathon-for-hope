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
      //fetch('http://128.237.165.133:8000/patients/lang/manuel').then((response => dd
      const { navigate } = this.props.navigation;
      var f = `${FileSystem.documentDirectory}photos/image.jpg`;
      return (
          <View>
            <Image style={{width: 100, height: 100 }} source = {{uri: f}}  /> 
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                <View style={styles.container}>
                    <TouchableHighlight onPress = {() => { navigate('Camera') }}>
                        <View style={styles.button}>
                            <Text>Log Medication</Text>
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
