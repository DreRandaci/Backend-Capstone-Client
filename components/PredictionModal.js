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

export default class Watson extends Component { 
    constructor(props) {
        super(props);
        this.state = {

        }
    };

    render() {
        return(
            <Modal 
                animationType="slide" 
                transparent={false} 
                visible={this.state.modalVisible} 
                onRequestClose={() => { alert('Modal has been closed.');}}>

                    <ScrollView style={styles.scrollViewContainer}>

                        <UserImage source={this.state.currentPic} predictions={predictions}/>

                        <View>
                            <Button 
                                title='Watson' 
                                raised 
                                backgroundColor='#03A9F4'
                                buttonStyle={styles.button}
                                onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
                            </Button>
                        </View>

                    </ScrollView>

            </Modal>      
        );
    };
}