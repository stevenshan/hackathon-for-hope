import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Camera, Permissions, FileSystem } from 'expo';
import { Icon } from 'react-native-elements';

export default class CameraScreen extends React.Component {
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
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
    };

  onPictureSaved = async photo => {
    await FileSystem.moveAsync({
      from: photo.uri,
      to: `${FileSystem.documentDirectory}photos/image.jpg`,
    });
    this.setState({ newPhotos: true });
  }

  render() {
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
                  flex: 0.2,
                  alignSelf: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                    this.takePicture();

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
});
