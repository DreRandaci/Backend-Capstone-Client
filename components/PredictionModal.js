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
            .sort((a, b) => b.age ? b.identity.score > a.identity.score : b.score > a.score
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
                        
                        <View>
                            <Button 
                                title='Back' 
                                raised 
                                color='black'
                                backgroundColor='#fff'
                                buttonStyle={styles.button}
                                onPress={this.modalCtrl} 
                                >
                            </Button>
                            {this.props.cameraRollView &&
                            <Button
                                title='Save'
                                raised 
                                color='black'
                                backgroundColor='#fff'
                                buttonStyle={styles.button}
                                onPress={this.saveToCameraRoll.bind(this)} 
                                >
                            </Button>}
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
    button: {
        borderRadius: 50, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 10,
    },
});