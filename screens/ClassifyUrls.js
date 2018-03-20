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
import Prediction from '../components/Prediction';
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
                <FormLabel>URL (must contain a .jpg or .png)</FormLabel>
                <FormInput
                    onChangeText={(url) => this.setState({url})} 
                    inputStyle={{paddingLeft: 5}}
                    value={this.state.url} 
                />

                <View style={styles.buttonContainer}>
                <CheckBox
                    onPress={this.toggleDetectFaces.bind(this)}
                    center
                    title='Decect Faces?'
                    iconType='material'
                    checkedIcon='check'
                    uncheckedIcon='add'
                    checkedColor='gray'
                    checked={this.state.detectFaces}
                />
                </View>
                <Button 
                    title='Classify' 
                    raised 
                    color='white'
                    backgroundColor='#065DD6'
                    onPress={this.classifyUrl.bind(this)} 
                    >
                </Button>


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
    }

    toggleDetectFaces() {
        this.setState({checked: !this.state.detectFaces})
    };

    async classifyUrl() {
        if (this.state.url) {

            let promise;
            
            this.state.detectFaces ? promise = await DetectFacesUrl.getFaceClassification(this.state.url) : promise = await ClassifyUrl.getClassification(this.state.url);
        
            promise.json()
                    .then(d => this.setState({
                                predictionData: d, 
                                modalVisible: !this.state.modalVisible, 
                                currentPic: pic.uri}))
                        .catch(err => console.log("error in watson prediction post:", err));
            ClassifyUrl.getClassification().then
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
        padding: 8,
    }
});