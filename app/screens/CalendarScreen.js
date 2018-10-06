import React from "react";

import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";

export default class CalendarScreen extends React.Component {
  static navigationOptions = {
    title: "Calendar"
  };

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
