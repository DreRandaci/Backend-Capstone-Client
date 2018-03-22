'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
     
const { width, height } = Dimensions.get('window');

export default class ImageDetails extends Component {
    render() {
        const latLng = {
            latitude: this.props.navigation.state.params.location.latitude,
            longitude: this.props.navigation.state.params.location.longitude
        };
        return(
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    zoomEnabled={true}
                    initialRegion={{
                        latitude: this.props.navigation.state.params.location.latitude,
                        longitude: this.props.navigation.state.params.location.longitude,
                        latitudeDelta: 0.8922,
                        longitudeDelta: 0.8922 * width / height,
                        }}
                    pitchEnabled={false}
                    rotateEnabled={false}
                >
                    <Marker coordinate={latLng} />
                </MapView>
            </View>
        );
    };
};    

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },      
    map: {
        width: width,
        height: height,
        ...StyleSheet.absoluteFillObject,
    },
});