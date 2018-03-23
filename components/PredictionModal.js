'use strict';

import React, { Component } from 'react';
import { 
    View, 
    CameraRoll,
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Modal,
    TouchableHighlight,
    ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import UserImage from '../components/UserImage';
import Watson from '../screens/Watson';
import ImagePrediction from '../components/ImagePrediction';
import UrlPrediction from '../components/UrlPrediction';

export default class PredictionModal extends Component {        

    render() { 
        
        const predictions = [].concat(this.props.predictions)
            .sort((a, b) => a.score ? b.score > a.score : b.age.score > a.age.score
                ).map((val, key) => 
                    val.age ? <UrlPrediction
                                key={key} 
                                keyVal={key} 
                                val={val} />
                            : <ImagePrediction
                                key={key} 
                                keyVal={key} 
                                val={val} />
                );
        
        return(
            <View>
            
                <Modal 
                    animationType="slide" 
                    transparent={false} 
                    visible={this.props.modalVisible}>

                        <ScrollView style={styles.scrollViewContainer}>

                            <UserImage 
                                source={this.props.currentPic} 
                                predictions={predictions}/>

                        </ScrollView>
                        
                        <View style={styles.btnContainer}>
                            <TouchableOpacity                                
                                onPress={this.modalCtrl} 
                            >
                                <Text
                                    style={styles.button}
                                >Back</Text>
                            </TouchableOpacity>
                            {this.props.cameraRollView &&
                            <TouchableOpacity
                                onPress={this.saveToCameraRoll.bind(this)} 
                            >
                                <Text
                                    style={styles.button}                                    
                                >Save</Text>
                            </TouchableOpacity>
                        }
                        </View>
                </Modal> 

            </View>    
        );
    };

    modalCtrl = () => {
        this.props.modalCtrl();
    };

    saveToCameraRoll() {
        CameraRoll.saveToCameraRoll(this.props.currentPic, 'photo');
        this.props.modalCtrl();
    };
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginTop: 25,
        marginBottom: 25
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: 12,
    },
    button: {
        fontSize: 16
    },
});