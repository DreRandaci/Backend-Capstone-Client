'use strict';
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Text } from 'react-native-elements'; 
import { material } from 'react-native-typography';

export default class UserImage extends Component {

    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <View>            
                <Card 
                    image={{uri: this.props.source}}
                    title='Results'
                >
                    <ScrollView>
                        {this.props.predictions}
                    </ScrollView>
                </Card>
            </View>
        );
    };
};
