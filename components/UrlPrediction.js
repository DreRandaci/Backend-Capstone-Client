'use strict';
import React, { Component } from 'react';
import { material } from 'react-native-typography';
import { 
    StyleSheet, 
    View,
    Text,
    List,
    Linking } from 'react-native'; 

export default class UrlPrediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal} style={styles.prediction}>
            
                <View>
                    <Text 
                        style={material.subheading}>Identity - {this.props.val.identity.name}, confidence: {Math.round(this.props.val.identity.score*100)}%
                    </Text>
                    <Text 
                        style={material.subheading}>Age - min: {this.props.val.age.min}, max: {this.props.val.age.max}, confidence: {Math.round(this.props.val.age.score*100)}%
                    </Text>
                    <Text 
                        style={material.subheading}>Gender - {this.props.val.gender.gender}, confidence: {Math.round(this.props.val.gender.score*100)}%
                    </Text>
                    <Text 
                        style={material.caption}>Type Hierarchy: {this.props.val.identity.type_hierarchy != null ? this.props.val.identity.type_hierarchy : 'default'}
                    </Text>
                </View>
                <View style={styles.linkContainer}>
                    <Text 
                        style={styles.link}
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.identity}`)}>Search Google
                    </Text>
                    <Text 
                        style={styles.link}
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.identity}&title=Special:Search&fulltext=1`)}>Search Wikipedia
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