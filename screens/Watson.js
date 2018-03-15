'use strict';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text } from 'react-native'; 
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';

export default class Watson extends Component {
        
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                ref={ref => {
                this.camera = ref;
                }}
                style = {styles.preview}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                permissionDialogTitle={'Permission to use camera'}
                permissionDialogMessage={'We need your permission to use your camera phone'}
                />
                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                    <TouchableOpacity
                        onPress={this.takePicture.bind(this)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 15}}> Watson </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };    

takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const pic = await this.camera.takePictureAsync(options);      
      
    //   this.setState({watson: pic.uri});

    //   const data = new FormData();
    //   data.append('name', 'testName'); 
    //   data.append('photo', {
    //     uri: pic.uri,
    //     type: `image/${pic.type}`, 
    //     name: `${pic.name}`
    //   });
      
      // fetch(`https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=57a2800e51432df69ca26797c1853f320591b787&version=2016-05-20`, {
      //   method: 'post',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'multipart/form-data;'
      //   },
      //   body: data
      // }).then(res => {
      //   console.log('watson response:', res.json())
      //   fetch('http://127.0.0.1:5000/api/user', {
      //     method: 'get',
      //     headers: {
      //       'Accept': 'application/json'
      //     }
      //   }
      //   ).then(res => console.log("**API call**", res)).catch(err => console.log("**ERROR**:", err))
      // });

      console.log(pic);
    }
  };
};


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
