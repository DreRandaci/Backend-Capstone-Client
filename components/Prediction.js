'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,
    List,
    Linking } from 'react-native'; 

export default class Prediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal} style={styles.prediction}>
            
                    <View>
                        <Text style={styles.predictionTxt}>Class: {this.props.val.class}</Text>
                        <Text style={styles.predictionTxt}>Confidence Score: {this.props.val.score}</Text>
                        <Text style={styles.predictionTxt}>Type Hierarchy: {this.props.val.type_hierarchy != null ? this.props.val.type_hierarchy : this.props.val.class}</Text>
                    </View>
                    <View style={styles.linkContainer}>
                        <Text style={styles.link}
                            onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.class}`)}> Search Google
                        </Text>
                        <Text style={styles.link}
                            onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${this.props.val.class}`)}> Search Wikipedia
                        </Text>
                    </View>


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
    linkContainer: {
        flexDirection: 'row',
    },
    link: {
        color: 'blue',
    }
});