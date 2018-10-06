import React from 'react';

import { Text, ScrollView } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

export default class HenryScreen extends React.Component {
    static navigationOptions = {
        title: 'Henry',
    };

    render() {
        return (<Agenda
            
  items={
    {'2012-05-22': [{text: 'item 1 - any js object'}],
     '2012-05-23': [{text: 'item 2 - any js object'}],
     '2012-05-24': [],
     '2012-05-25': [{text: 'item 3 - any js object'},{text: 'any js object'}],
    }} />);
    }
}
