'use strict';

import React, { Component } from 'react';
import { 
    View, 
    StyleSheet, 
    TouchableOpacity, 
    Text,
    Modal,
    TouchableHighlight,
    ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import UserImage from '../components/UserImage';
import Watson from '../screens/Watson';

export default class PredictionModal extends Component {    

    modalCtrl = () => {
        this.props.modalCtrl();
    };

    render() {        
        return(
            <View>
            
                <Modal 
                    animationType="slide" 
                    transparent={false} 
                    visible={this.props.modalVisible} 
                    onRequestClose={() => { alert('Modal has been closed.');}}>

                        <ScrollView style={styles.scrollViewContainer}>

                            <UserImage source={this.props.currentPic} predictions={this.props.predictions}/>

                            <View>
                                <Button 
                                    title='Watson' 
                                    raised 
                                    backgroundColor='#03A9F4'
                                    buttonStyle={styles.button}
                                    onPress={this.modalCtrl} 
                                    >
                                </Button>
                            </View>

                        </ScrollView>

                </Modal> 

            </View>    
        );
    };
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        marginTop: 25,
        marginBottom: 25
    },
    button: {
        borderRadius: 0, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 0,
    },
});