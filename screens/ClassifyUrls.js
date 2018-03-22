'use strict';
import React, { Component } from 'react';
import { 
    ActivityIndicator,
    Text,
    View,
    StyleSheet } from 'react-native';
import { FormLabel, FormInput, Button, CheckBox } from 'react-native-elements'
import ClassifyUrl from '../actions/ClassifyGenericUrl';
import DetectFacesUrl from '../actions/DetectFacesUrl';
import PredictionModal from '../components/PredictionModal';
import ImagePrediction from '../components/ImagePrediction';
import UserImage from '../components/UserImage';

export default class ClassifyUrls extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            predictionData: [],
            currentPic: '',
            detectFaces: false,
            url: '',
            animating: false
        };
    };

    render() {
        return(
            <View style={styles.container}>                
                <FormLabel>URL (must contain a .jpg or .png extension)</FormLabel>
                <FormInput
                    onChangeText={(url) => this.setState({url})} 
                    inputStyle={{paddingLeft: 5}}
                    value={this.state.url} 
                />
                <View style={styles.buttonContainer}>
                    <CheckBox
                        onPress={this.toggleDetectFaces.bind(this)}
                        center
                        title='Detect Faces?'
                        iconType='material'
                        checkedIcon='check'
                        uncheckedIcon='add'
                        checkedColor='#065DD6'
                        checked={this.state.detectFaces}
                    />
                
                    <Button 
                        title='Classify' 
                        raised 
                        color='white'
                        backgroundColor='#065DD6'
                        buttonStyle={{marginTop: 10}}
                        onPress={this.classifyUrl.bind(this)} 
                        >
                    </Button>
                </View>

                <PredictionModal
                    cameraRollView={false}
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
    }

    toggleDetectFaces() {
        this.setState({detectFaces: !this.state.detectFaces})
    };

    setModalVisible() {
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible, 
            currentPic: '', 
            predictionData: [],
            animating: !this.state.animating
        }));
    };

    async classifyUrl() {
        this.setState({animating: !this.state.animating});
        if (this.state.url) {            
            
            let promise = 
                this.state.detectFaces 
                    ? await DetectFacesUrl.getFaceClassificationUrl(this.state.url) 
                    : await ClassifyUrl.getClassification(this.state.url);
        
            promise.json()
                    .then(d => this.setState({
                                predictionData: this.state.detectFaces ? d[0] : d[0].classes, 
                                modalVisible: !this.state.modalVisible, 
                                currentPic: this.state.url
                            }))
                        .catch(err => console.log("error in classify url:", err));
        } else {
            alert("URL is invalid. Make sure it ends in a .jpg or .png format");
        }
    };

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',        
        justifyContent: 'center',
    },
    buttonContainer: {
        padding: 20,
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
    }
});