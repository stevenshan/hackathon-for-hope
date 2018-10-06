import React from "react";

import { View, Text, Dimensions, ScrollView, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import EventCalendar from 'react-native-events-calendar'

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: 'Calendar',
  };
//  events = [] 
//  test.map(function(med, i) {
//    events.push({
//        start:
//    })
/*  test = [{"_id":"5bb84c4bd7a44d2469844938","name":"Liquid Augmentin","instruction":"Swallow after meal","recommendation":"Squirt to side of cheeks so children don’t find it bitter","dosage":"5 mL","times":"8,20","days":"0,1,2,3,4,5,6"},{"_id":"5bb84c67d7a44d2469844939","name":"Liquid Prednisolone","instruction":"Swallow","recommendation":"Cherry-flavored","dosage":"5 mL","times":"8,15,22","days":"0,1,2,3,4,5,6"},{"_id":"5bb84c6cd7a44d246984493a","name":"Clarithromicin","instruction":"Swallow","recommendation":"Hide in peanut butter","dosage":"250 mg","times":"8,20","days":"0,1,2,3,4,5,6"},{"_id":"5bb84c72d7a44d246984493b","name":"Cetirizine","instruction":"Swallow","recommendation":"Crush","dosage":"5 mg","times":"10","days":"0,1,3,5"},{"_id":"5bb84c7cd7a44d246984493c","name":"Ibuprofen","instruction":"Chewable Tablet","recommendation":"Hide in sandwhich","dosage":"100 mg","times":"7,12,17,22","days":"0,1,2,3,4,5,6"},{"_id":"5bb84c80d7a44d246984493d","name":"Amoxicillin","instruction":"Swallow","recommendation":"Hide in peanut butter","dosage":"250 mg","times":"8,15,22","days":"0,1,2,3,4,5,6"}]
  render() {
    return (
      <Agenda
        items={{
          "2018-10-05": [{ text: "take lsd" }],
          "2018-10-06": [{ text: "take adderall" }],
          "2018-10-07": [],
          "2018-10-08": [{ text: "take xanax" }, { text: "put cocaine up my ass" }]
        }}
        renderItem={(item, firstItemInDay) => {
          return (
              <View style={[styles.item]}><Text>{item.text}</Text></View>
          );
        }}
        renderEmptyDate={() => {
          return <View />;
        }}
        rowHasChanged={(r1, r2) => {
          return r1.text !== r2.text;
        }}
      />
    );
  }
  */


render () {
let { width } = Dimensions.get('window')
 const events = [
    { start: '2018-10-06 08:00:00', end: '2018-10-06 09:00:00', title: 'Liquid Augmentin', summary: 'Swallow after meal' },
    { start: '2018-10-06 20:00:00', end: '2018-10-06 21:00:00', title: 'Liquid Augmetin', summary: 'Swallow after meal' },
    { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 01:20:00', end: '2017-09-08 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 04:10:00', end: '2017-09-08 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 00:45:00', end: '2017-09-08 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-08 11:30:00', end: '2017-09-08 12:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 01:30:00', end: '2017-09-09 02:00:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 03:10:00', end: '2017-09-09 03:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
    { start: '2017-09-09 00:10:00', end: '2017-09-09 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' }
]
var _this = this


 return (
    <EventCalendar
      events={events}
      width={width}
      scrollToFirst={true}
      initDate={'2018-10-06'}
    />)
}
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
