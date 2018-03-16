'use strict';
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions, View } from 'react-native'; 


export default class UserImage extends Component {

    constructor(props) {
        super(props);
    };
    
    render() {
        return (
            <View>            
                <Image style={styles.img} source={{uri: this.props.source}}/>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    }
});