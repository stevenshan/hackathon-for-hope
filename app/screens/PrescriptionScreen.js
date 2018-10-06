import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class MedicationScreen extends React.Component {
  static navigationOptions = {
    title: 'Prescription',
  };
  state = {
      medicines:[],
      formatted:[]
  };
  productList =[];
componentDidMount() {
     fetch('http://hackthishelpkids-matt.appspot.com/medicine', {
        method: 'GET'
    })
      .then((response) => response.json())
     .then((responseJson) => { this.setState({ medicines: responseJson})
         console.log(responseJson);
       this.state.medicines.map(function(object,i) {
       productList.push(
           <View>
       <Text>Name: {object['name']}</Text>
       <Text>Instruction: {object['instruction']}</Text>
       <Text>Dosage: {object['dosage']}</Text>
           </View>
       );
        });
      })
 
}


 render() {
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
