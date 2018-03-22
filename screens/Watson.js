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
import { Button, Icon } from 'react-native-elements';
import { material } from 'react-native-typography';
import UserImage from '../components/UserImage';
import PredictionModal from '../components/PredictionModal';
import ImagePrediction from '../components/ImagePrediction';
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
            faces: false,
            frontCamera: false
        };
    };        

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.topTouchablesContainer}>
                    <TouchableOpacity onPress={this.detectFaces.bind(this)}>
                        <Text style={[material.subheading, {color: this.state.faces ? '#065DD6':'#000', marginTop:4}]}>
                            Faces {this.state.faces ? 'On' : 'Off'}
                        </Text>                    
                    </TouchableOpacity>
                    
                    <Text style={[material.title, {paddingRight: 35}]}>Watson</Text>

                    <TouchableOpacity onPress={this.changeCamera.bind(this)}>
                        <Text style={{color: this.state.frontCamera ? '#065DD6':'#F5E215'}}>
                            <Icon name="cached" size={30} color='black'/> 
                        </Text>
                    </TouchableOpacity>
                </View>

                <RNCamera
                    ref={ref => {
                    this.camera = ref;
                    }}
                    style = {styles.preview}
                    type={this.state.frontCamera ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.auto}
                    permissionDialogTitle={'Permission to use camera'}
                    permissionDialogMessage={'We need your permission to use your camera phone'}
                />

                <View>

                    <TouchableOpacity
                        onPress={this.takePicture.bind(this, !this.state.modalVisible)}
                        style = {styles.capture}
                    >
                        <Icon name='album' size={50}/>
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
                    <Text style={{paddingBottom: 10, fontSize: 18}}>classifying...</Text>
                    <ActivityIndicator 
                        size='large'
                        color='#000'/>
                </View>}    

            </View>
        );
    };    

    changeCamera() {
        this.setState({frontCamera: !this.state.frontCamera});
    };

    detectFaces() {
        this.setState({faces: !this.state.faces});
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
            const options = { quality: 0.4, forceUpOrientation: true };
            const pic = await this.camera.takePictureAsync(options);      
            
            const data = new FormData();      
            data.append('file', {
                uri: pic.uri,
                type: `image/${pic.type}`, 
                name: `${pic.uri}`
            });            

            let promise = this.state.faces 
                ? await DetectFaces.getFaceClassification(data) 
                : await ClassifyGeneric.getClassification(data);

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
    topTouchablesContainer: {
        marginTop: 30,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        flexDirection: 'row',
        flex: 0,
        justifyContent: 'space-between'
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
        borderColor: 'black',
        padding: 5,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 10        
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
});
