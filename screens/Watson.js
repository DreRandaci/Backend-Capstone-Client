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
import { Button } from 'react-native-elements';
import UserImage from '../components/UserImage';
import PredictionModal from '../components/PredictionModal';
import Prediction from '../components/Prediction';
import Classify from '../actions/WatsonClassify';


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

        const predictions = [].concat(this.state.predictionData)
            .sort((a, b) => b.score > a.score)
                .map((val, key) => 
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
                    predictions={predictions}
                />

            </View>
        );
    };    

    setModalVisible() {
        this.predictions = [];
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible, 
            currentPic: '', 
            predictionData: []
        }));
    };

    takePicture = async function(modalOpen) {
        
        if (this.camera) {
            const options = { quality: 0.3, base64: true };
            const pic = await this.camera.takePictureAsync(options);      
            
            const data = new FormData();      
            data.append('file', {
                uri: pic.uri,
                type: `image/${pic.type}`, 
                name: `${pic.uri}`
            });
        
            Classify.getClassification(data)
                .then(res => res.json())
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
    }
});
