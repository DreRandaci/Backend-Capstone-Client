'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watson: []
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style = {styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
        />
        <View><Text style={styles.response}>{this.state.watson}</Text></View>
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
        <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style = {styles.capture}
        >
            <Text style={{fontSize: 14}}> SNAP </Text>
        </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const pic = await this.camera.takePictureAsync(options);
      
      this.setState({watson: pic.uri});

      const data = new FormData();
      data.append('name', 'testName'); 
      data.append('photo', {
        uri: pic.uri,
        type: `image/${pic.type}`, 
        name: 'testPhotoName'
      });
      
      fetch(`https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=&version=2016-05-20`, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;'
        },
        body: data
      }).then(res => {
        console.log(res.json())
      });

      console.log(pic);
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  },
  response: {
    flex: 0,
    flexDirection: 'column',
    backgroundColor: '#fff',
    fontSize: 20,
    alignSelf: 'center',
  }
});

AppRegistry.registerComponent('Watson', () => App);