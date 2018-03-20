'use strict';
import React, { Component } from 'react';
import { material } from 'react-native-typography';
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
                        <Text style={material.title}>Class: {this.props.val.class}</Text>
                        <Text style={material.subheading}>Confidence Score: {this.props.val.score}</Text>
                        <Text style={material.caption}>Type Hierarchy: {this.props.val.type_hierarchy != null ? this.props.val.type_hierarchy : this.props.val.class}</Text>
                    </View>
                    <View style={styles.linkContainer}>
                        <Text 
                            style={styles.link}
                            onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.class}`)}>Search Google
                        </Text>
                        <Text 
                            style={styles.link}
                            onPress={() => Linking.openURL(`https://en.wikipedia.org/wiki/${this.props.val.class}`)}>Search Wikipedia
                        </Text>
                    </View>


            </View>
        );
    }
};

const styles = StyleSheet.create({
    prediction: {
        position: 'relative',
        padding: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#ededed',
        flex: 1,
    },
    linkContainer: {
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },
    link: {
        paddingTop: 15,
        color: 'blue',        
    }
});