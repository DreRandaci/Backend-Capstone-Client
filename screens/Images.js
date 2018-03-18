'use strict';
import React, { Component } from 'react';
import { 
    Dimensions,
    CameraRoll,
    View, 
    StyleSheet,
    ScrollView,
    Text,
    Image } from 'react-native'; 
import { List, ListItem } from 'react-native-elements';    
import UserImage from '../components/UserImage';

export default class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: []
        };
    };

    componentDidMount = () => {
        CameraRoll.getPhotos({
            first: 20,
            assetType: 'Photos',
        })
        .then(r => {
            this.setState({ photos: r.edges });
        })
        .catch((err) => {
            //Error Loading Images
        });
    };

    viewImgDetail = (img) => {
        this.props.navigation.navigate('Details', { ...img });
    };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Select an Image to Send to Watson</Text>
                <ScrollView>
                    {this.state.photos.map((p, i) => {
                        return (
                            <Image
                                key={i}
                                style={styles.img}
                                source={{ uri: p.node.image.uri }}
                            />
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        fontSize: 16,
        paddingBottom: 10,
    },
    img: {
        width: Dimensions.get('window').width,
        // height: Dimensions.get('window').height
        height: 300
    }
});