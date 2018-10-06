import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class MedicationScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };

  render() {
    return (
      <View style={styles.container}>
        <Text> Edit me Rebecca </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
