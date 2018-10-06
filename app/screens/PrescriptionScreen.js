import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class MedicationScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text> Edit me Rebecca </Text>
      </ScrollView>
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
