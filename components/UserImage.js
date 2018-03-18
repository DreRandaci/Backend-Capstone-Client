'use strict';
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'; 


export default class UserImage extends Component {

    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <View>            
                <Card 
                    image={{uri: this.props.source}}
                    title='Results'>
                    <ScrollView>
                        {this.props.predictions}
                    </ScrollView>
                </Card>
            </View>
        );
    };
};
