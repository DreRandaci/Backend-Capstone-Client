'use strict';
import React, { Component } from 'react';
import { material } from 'react-native-typography';
import { 
    StyleSheet, 
    View,
    Text,
    Linking,
    TouchableOpacity } from 'react-native'; 
import { Icon } from 'react-native-elements';

export default class ImagePrediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal} style={styles.prediction}>
            
                <View>
                    <Text style={material.subheading}>Class: {this.props.val.class}</Text>
                    <Text style={material.subheading}>Confidence Score: {Math.round(this.props.val.score*100)}%</Text>
                    <Text style={material.caption}>Type Hierarchy: {this.props.val.type_hierarchy != null ? this.props.val.type_hierarchy : this.props.val.class}</Text>
                </View>
                <View style={styles.linkContainer}>               
                    <Icon
                        type='font-awesome'
                        name='google'
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.class}`)}
                    />
                    <Icon
                        type='font-awesome'
                        name='wikipedia-w'
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.class}&title=Special:Search&fulltext=1`)}
                    />
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