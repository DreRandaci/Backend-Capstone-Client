'use strict';
import React, { Component } from 'react';
import { material } from 'react-native-typography';
import { 
    StyleSheet, 
    View,
    Text,
    Linking,
    TouchableOpacity } from 'react-native'; 
import { Icon, List, ListItem } from 'react-native-elements';
import styles from '../styles/imagePrediction';

export default class ImagePrediction extends Component {

    render() {
        return (

            <View key={this.props.keyVal} style={styles.prediction}>

                <List>
                    <ListItem 
                        hideChevron={true}   
                        title={`Class: ${this.props.val.class}`} 
                    />
                    <ListItem 
                        hideChevron={true}   
                        title={`Confidence Score: ${Math.round(this.props.val.score*100)}%`} 
                    />
                    <ListItem 
                        hideChevron={true}   
                        title={`Type Hierarchy: ${this.props.val.type_hierarchy != null 
                            ? this.props.val.type_hierarchy 
                            : '/' + this.props.val.class}`} 
                    />
                </List>
                <View style={styles.linkContainer}>               
                    <Icon
                        iconStyle={styles.googleLink}
                        type='font-awesome'
                        name='google'
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.class}`)}
                    />
                    <Icon
                        iconStyle={styles.wikiLink}
                        type='font-awesome'
                        name='wikipedia-w'
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.class}&title=Special:Search&fulltext=1`)}
                    />
                </View>
                
            </View>
        );
    }    
};