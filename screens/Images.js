'use strict';
import React, { Component } from 'react';
import { 
    Dimensions,
    CameraRoll,
    View, 
    StyleSheet,
    ScrollView,
    Text,
    Image,
    TouchableOpacity } from 'react-native'; 
import { List, ListItem } from 'react-native-elements';    
import UserImage from '../components/UserImage';
import Classify from '../actions/WatsonClassify';

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
            console.log('error in componentDidMount loading users camera roll:', err)
        });
    };

    // viewImgDetail = (img) => {
    //     this.props.navigation.navigate('Details', { ...img });
    // };

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Select an Image to Send to Watson</Text>
                <ScrollView>
                    {this.state.photos.map((pic, key) => {
                        return (
                            <TouchableOpacity onPress={() => this.classify(pic.node.image)} >
                                <Image
                                    key={key}
                                    style={styles.img}
                                    source={{ uri: pic.node.image.uri }}                                
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    };
};

classify = (pic) => {

    const data = new FormData();      
    data.append('file', {
        uri: pic.uri,
        type: `image/${pic.type}`, 
        name: `${pic.uri}`
    });

    Classify.getClassification(data)
                .then(res => res.json())
                .then(d => this.setState({predictionData: d, modalVisible: modalOpen}))
                .catch(err => console.log("error in watson prediction post:", err));
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