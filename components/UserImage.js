'use strict';
import React, { Component } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native'; 


export default class UserImage extends Component {

    constructor(props) {
        super(props);
    };
    
    render() {
        return (            
            <Image style={styles.img} source={{uri: props.currentPic}}/>
        );
    };
};

const styles = StyleSheet.create({
    img: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width
    }
});