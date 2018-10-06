import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class MedicationScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };
  state = {
      medicines:[]
  }

  componentDidMount() {
    fetch('http://hackthishelpkids-matt.appspot.com/medicine')
      .then((response) => { console.log(response.body); this.setState({ medicines: response.body})})
  }
  render() {
    productList = [];
    console.log(this.state.medicines)
    this.state.medicines.map(function(object,i) {
       console.log(object);
       productList.push(
           <View>
       <Text>Name: {object['name']}</Text>
       <Text>Instruction: {object['instruction']}</Text>
       <Text>Dosage: {object['dosage']}</Text>
           </View>
       );
    });
 
    return (
     <View style={styles.container}>
        <Text>{productList} </Text>
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
