'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    List,
    TouchableOpacity } from 'react-native'; 

export default class Prediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal}>
            
                <TouchableOpacity>
                    <View>
                        <Text>Class: {this.props.val.class}</Text>
                        <Text>Confidence Score: {this.props.val.score}</Text>
                        <Text>Type Hierarchy: {this.props.val.type_hierarchy}</Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity>
                    <Text>DELETE</Text>
                </TouchableOpacity> */}

            </View>

        );
    }
};