'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,    
    Linking } from 'react-native'; 
import { material } from 'react-native-typography';
import { List, ListItem, Icon } from 'react-native-elements';
import styles from '../styles/urlPrediction';

export default class UrlPrediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal} style={styles.prediction}>
            
                <List>
                {this.props.val.identity != null &&
                <View>
                    <ListItem 
                        hideChevron={true}   
                        title={`Identity: ${this.props.val.identity.name}`} 
                    />
                    <ListItem 
                        hideChevron={true}   
                        title={`Confidence: ${Math.round(this.props.val.identity.score*100)}%`} 
                    /></View>}
                    <ListItem 
                        hideChevron={true}   
                        title={`Minimum Age: ${this.props.val.age.min}`} 
                    />
                    <ListItem 
                        hideChevron={true}   
                        title={`Maximum Age: ${this.props.val.age.max}`} 
                    />
                    <ListItem 
                        hideChevron={true}   
                        title={`Gender: ${this.props.val.gender.gender}`} 
                    />
                    
                </List>
                {this.props.val.identity != null &&
                <View style={styles.linkContainer}>
                    <Icon
                        iconStyle={styles.googleLink}
                        type='font-awesome'
                        name='google'
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.identity.name}`)}
                    />
                    <Icon
                        iconStyle={styles.wikiLink}
                        type='font-awesome'
                        name='wikipedia-w'
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.identity.name}&title=Special:Search&fulltext=1`)}
                    />
                </View>}

            </View>
        );
    }
};