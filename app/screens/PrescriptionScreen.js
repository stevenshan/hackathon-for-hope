import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class MedicationScreen extends React.Component {
    static navigationOptions = {
        title: 'Prescriptions',
    };
    state = {
        medicines:[]
    };
    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch('http://hackathon-for-hope.herokuapp.com/steven');
        const json = await response.json();
        console.log(json);
        this.setState({medicines: json.medicine});
    }
    render() {
      return (
            <View style={styles.container}>
                <FlatList 
                    data={this.state.medicines}
                    keyExtractor={(x,i) => i.toString()}
                    renderItem={({ item }) =>
                        <View style={styles.pres}>
                            <Text style={styles.title}>{`${item.name}`} </Text>
                            <Text style={styles.info}>Dose: {`${item.dosage}`} </Text>
                            <Text style={styles.info}>Recommendation: {`${item.recommendation}`} </Text>
                        </View>
                    }
                 />
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
  title: {
    marginLeft: 5,
    fontSize: 30,
    color: 'white'
  },
  pres: {
    flex: 0.2,
    padding: 10,
    marginTop: 8,
    backgroundColor: 'rgba(76,76,76,1)'
  },
  info: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10
  }
});
