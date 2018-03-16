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

            <View key={this.props.keyVal} style={styles.prediction}>
            
                <TouchableOpacity>
                    <View>
                        <Text style={styles.predictionTxt}>Class: {this.props.val.class}</Text>
                        <Text style={styles.predictionTxt}>Confidence Score: {this.props.val.score}</Text>
                        <Text style={styles.predictionTxt}>Type Hierarchy: {this.props.val.type_hierarchy != null ? this.props.val.type_hierarchy : this.props.val.class}</Text>
                    </View>
                </TouchableOpacity>

                {/* <TouchableOpacity>
                    <Text>DELETE</Text>
                </TouchableOpacity> */}

            </View>
        );
    }
};

const styles = StyleSheet.create({
    prediction: {
        position: 'relative',
        padding: 20,
        paddingRight: 100,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed'
    },
    predictionTxt: {
        paddingLeft: 5,
        borderLeftWidth: 10,
        borderLeftColor: '#e91e63'
    },
    noteDelete: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000',
        padding: 10,
        top: 10,
        bottom: 10,
        right: 10
    },
    noteDeleteText: {
        color: 'white'
    }
});