'use strict';
import React, { Component } from 'react';
import { 
    StyleSheet, 
    View,
    Text,    
    Linking } from 'react-native'; 
import { material } from 'react-native-typography';
import { List, ListItem, } from 'react-native-elements';

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
                    {/* <Text 
                        style={material.subheading}>Age - min: {this.props.val.age.min}, max: {this.props.val.age.max}, confidence: {Math.round(this.props.val.age.score*100)}%
                    </Text> */}
                    {/* <Text 
                        style={material.subheading}>Gender - {this.props.val.gender.gender}, confidence: {Math.round(this.props.val.gender.score*100)}%
                    </Text> */}
                    {/* {this.props.val.identity != null &&
                        <Text 
                            style={material.caption}>Type Hierarchy: {this.props.val.identity.type_hierarchy != null ? this.props.val.identity.type_hierarchy : 'default'}
                        </Text>} */}
                </List>
                {this.props.val.identity != null &&
                <View style={styles.linkContainer}>
                    <Text 
                        style={styles.link}
                        onPress={() => Linking.openURL(`https://www.google.com/search?q=${this.props.val.identity}`)}>Search Google
                    </Text>
                    <Text 
                        style={styles.link}
                        onPress={() => Linking.openURL(`https://en.m.wikipedia.org/w/index.php?search=${this.props.val.identity}&title=Special:Search&fulltext=1`)}>Search Wikipedia
                    </Text>
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
        justifyContent: 'space-between'
    },
    link: {
        paddingTop: 15,
        color: 'blue',        
    }
});