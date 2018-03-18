'use strict';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Modal,
    TouchableHighlight,
    ScrollView } from 'react-native'; 
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import UserImage from '../components/UserImage';
import Prediction from '../components/Prediction';

export default class Watson extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentPic: '',
            predictionData: []
        };
    };        

    render() {

        let predictions = this.state.predictionData.map((val, key) =>
            <Prediction
                key={key} 
                keyVal={key} 
                val={val} />);

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
                        onPress={this.takePicture.bind(this, !this.state.modalVisible)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 15}}> Watson </Text>
                    </TouchableOpacity>
                </View>

                <Modal animationType="slide" transparent={false} visible={this.state.modalVisible} onRequestClose={() => { alert('Modal has been closed.');}}>

                    <View style={{marginTop: 22}}>

                        <UserImage source={this.state.currentPic}/>

                        <View>
                            <TouchableHighlight onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                                <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
                                    <Text style={{fontSize: 15}}>Close</Text>
                                </View>
                            </TouchableHighlight>
                        </View>

                        <ScrollView>
                            {predictions}   
                        </ScrollView>

                    </View>

                </Modal>

            </View>
        );
    };    

setModalVisible(visible) {
    this.predictions = [];
    this.setState({modalVisible: visible, currentPic: '', predictionData: []});
};

takePicture = async function(modalOpen) {
    
    if (this.camera) {
        const options = { quality: 0.3, base64: true };
        const pic = await this.camera.takePictureAsync(options);      
        
        this.setState({currentPic: pic.uri});        
      
        const data = new FormData();      
        data.append('file', {
            uri: pic.uri,
            type: `image/${pic.type}`, 
            name: `${pic.uri}`
        });
      
      fetch(`http://watson.drerandaci.com/api/prediction`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data;'
        },
        body: data
      }).then(res => res.json())
            .then(d => this.setState({predictionData: d, modalVisible: modalOpen}))
            .catch(err => console.log("error in watson prediction post:", err));
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
