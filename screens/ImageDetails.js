'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions } from 'react-native';
import MapView  from 'react-native-maps';
     

export default class ImageDetails extends Component {

    render() {
        return(
            <View>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </View>
        );
    };
};    

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
});
