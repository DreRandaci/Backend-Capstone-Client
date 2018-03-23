'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,    
    Linking } from 'react-native'; 
import { material } from 'react-native-typography';
import { List, ListItem, Icon } from 'react-native-elements';

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
                    <ListItem 
                        hideChevron={true}   
                        title={`Confidence: ${Math.round(this.props.val.gender.score*100)}%`} 
                    />
                </List>
                {this.props.val.identity != null &&
                <View style={styles.linkContainer}>
                    <Icon
                        iconStyle={styles.googleLink}
                        type='font-awesome'
                        name='google'
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.identity}`)}
                    />
                    <Icon
                        iconStyle={styles.wikiLink}
                        type='font-awesome'
                        name='wikipedia-w'
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.identity}&title=Special:Search&fulltext=1`)}
                    />
                </View>}

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
        justifyContent: 'flex-start',
        paddingTop: 25,
        paddingBottom: 5,
    },
    wikiLink: {
        color: 'black', 
        paddingLeft: 15,               
    },
    googleLink: {
        color: '#d62d20',
        paddingLeft: 22,       
    }
});