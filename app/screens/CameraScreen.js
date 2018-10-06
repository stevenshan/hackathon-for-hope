import React from 'react';
import { Platform } from 'react-native';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { Icon } from 'react-native-elements';
import EncourageScreen from './EncourageScreen';
import BadgeScreen from './BadgeScreen';
import { createStackNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';


class CameraScreen extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };
  
  static navigationOptions = {
    header: null,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  componentDidMount() {
    FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'photos').catch(e => {
      console.log(e, 'Directory exists');
    });
}

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved, base64:true});
    }
    };

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/image.jpg`,
    });
    fetch("https://automl.googleapis.com/v1beta1/projects/pennapps-2018-215815/locations/us-central1/models/ICN3028003079479263190:predict", {
      body:
      JSON.stringify(
        {
          "payload": {
            "image": {
              "imageBytes": photo.base64
            },
          }
        }),
      headers: {
        Authorization: "Bearer $(gcloud auth application-default print-access-token)",
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then(response => console.log("finally responded", response));
    this.setState({ newPhotos: true });
  }

  render() {
    //const automl = require('@google-cloud/automl');
    //const client = new automl.AutoMLClient();
    //const predCli = new automl.PredictionServiceClient();
    return (
          <Camera 
            ref = {ref => {this.camera = ref; }}
            style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  marginLeft: 10,
                  marginTop: 15,
                  flex: 0.1,
                  alignSelf: 'flex-start',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Icon
                  name='ios-reverse-camera'
                  type='ionicon'
                  color='#ffffff'
                  size={40}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  bottom: 0,
                  flex: 0.2,
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  marginLeft: 163
                }}
                onPress={() => {
                    this.takePicture();
                    this.props.navigation.navigate("Encourage");
                    console.log("navigated");
                }}>
                    <Icon 
                        style = {styles.takePhoto} 
                        name='ios-camera' 
                        type='ionicon' 
                        color='#ffffff'
                        size={75}
                    />
              </TouchableOpacity>
            </View>
          </Camera>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
  takePhoto: {
    marginLeft: 10
  },
});

const CameraStack = createStackNavigator({
  Camera: CameraScreen,
  Encourage: EncourageScreen,
  Badge: BadgeScreen,
});

CameraStack.navigationOptions = {
  tabBarLabel: 'Camera',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

export default CameraStack;
