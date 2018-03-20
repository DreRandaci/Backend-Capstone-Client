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

                            <UserImage 
                                source={this.props.currentPic} 
                                predictions={this.props.predictions}/>

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
                        </View>
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
        borderRadius: 50, 
        marginLeft: 0, 
        marginRight: 0, 
        marginBottom: 10,
    },
});