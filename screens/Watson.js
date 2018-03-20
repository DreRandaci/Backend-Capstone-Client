'use strict';
import {
    ActivityIndicator, 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Modal,
    TouchableHighlight,
    ScrollView } from 'react-native'; 
import React, { Component } from 'react';
import { RNCamera } from 'react-native-camera';
import { Button } from 'react-native-elements';
import UserImage from '../components/UserImage';
import PredictionModal from '../components/PredictionModal';
import Prediction from '../components/Prediction';
import ClassifyGeneric from '../actions/ClassifyGeneric';
import DetectFaces from '../actions/DetectFaces';


export default class Watson extends Component {    

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            currentPic: '',
            predictionData: [],
            animating: false,
            faces: false
        };
    };        

    render() {

        // const predictions = [].concat(this.state.predictionData)
        //     .sort((a, b) => b.score > a.score)
        //         .map((val, key) => 
        //             <Prediction
        //                 key={key} 
        //                 keyVal={key} 
        //                 val={val} />);

        return (
            <View style={styles.container}>
                
                <TouchableOpacity onPress={this.detectFaces.bind(this)}>
                    <Text style={[styles.faces, {color: this.state.faces ? '#065DD6':'#F5E215'}]}>
                        Detect Faces {this.state.faces ? 'On' : 'Off'}
                    </Text>
                </TouchableOpacity>

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

                <View>

                    <TouchableOpacity
                        onPress={this.takePicture.bind(this, !this.state.modalVisible)}
                        style = {styles.capture}
                    >
                        <Text style={{fontSize: 15}}> Watson </Text>
                    </TouchableOpacity>

                </View>                

                <PredictionModal
                    modalVisible={this.state.modalVisible}
                    modalCtrl={this.setModalVisible.bind(this)}
                    currentPic={this.state.currentPic} 
                    predictions={this.state.predictionData}
                />

                {this.state.animating && 
                <View style={styles.loading}>
                    <Text style={{paddingBottom: 10, fontSize: 18}}>loading...</Text>
                    <ActivityIndicator 
                        size='large'
                        color='#000'/>
                </View>}    

            </View>
        );
    };    

    detectFaces() {
        this.setState({faces: !this.state.faces})
    };

    setModalVisible() {
        this.predictions = [];
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible, 
            currentPic: '', 
            predictionData: [],
            animating: !this.state.animating
        }));
    };

    takePicture = async function(modalOpen) {
        this.setState({animating: !this.state.animating});

        if (this.camera) {
            const options = { quality: 0.3, base64: true };
            const pic = await this.camera.takePictureAsync(options);      
            
            const data = new FormData();      
            data.append('file', {
                uri: pic.uri,
                type: `image/${pic.type}`, 
                name: `${pic.uri}`
            });
        
            let promise;

            this.state.faces ? promise = await DetectFaces.getFaceClassification(data) : promise = await ClassifyGeneric.getClassification(data);

            promise.json()
                    .then(d => this.setState({
                            predictionData: d, 
                            modalVisible: !this.state.modalVisible, 
                            currentPic: pic.uri}))
                    .catch(err => console.log("error in watson prediction post:", err));
        }
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',                
      },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        // borderRadius: 5,
        // padding: 15,
        // paddingHorizontal: 20,
        // alignSelf: 'center',
        // margin: 20
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',

    },
    response: {
        flex: 0,
        flexDirection: 'column',
        backgroundColor: '#fff',
        fontSize: 20,
        alignSelf: 'center',
    },
    button: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0,
    },
    scrollViewContainer: {
        marginTop: 25,
        marginBottom: 25
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
      },
    faces: {
        color: 'white', 
        marginTop: 30, 
        marginLeft: 15,
    }
});
