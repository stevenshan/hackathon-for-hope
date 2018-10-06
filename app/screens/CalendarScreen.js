import React from "react";

import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import EventCalendar from 'react-native-events-calendar'

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };
    state = {
        medicines:[]
    };
    componentWillMount() {
        this.fetchData();
    }

    fetchData = async () => {
        const response = await fetch('http://hackathon-for-hope.herokuapp.com/rebecca');
        const json = await response.json();
        console.log(json);
        this.setState({medicines: json});
   }

   tapped = () => {}
 

render () {
    let { width } = Dimensions.get('window')
    var events = [];
    this.state.medicines.forEach(function(med) {
        events.push({
            start: med.start,
            end: med.end,
            title: med.title,
            summary: med.summary
        });
    });
 return (
    <EventCalendar
      events={events}
      width={width}
      start={6}
      end={22}
      eventTapped={this.tapped}
      scrollToFirst={true}
      initDate={'2018-10-06'}
    />)

}}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  }
});
