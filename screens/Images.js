'use strict';
import React, { Component } from 'react';
import { material } from 'react-native-typography';
import {
    ActivityIndicator, 
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
import PredictionModal from '../components/PredictionModal';
import Prediction from '../components/Prediction';

export default class Images extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photos: [],
            predictionData: [],
            modalVisible: false,
            currentPic: '',
            animating: false
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

    render() {

        const predictions = [].concat(this.state.predictionData)
            .sort((a, b) => b.score > a.score)
                .map((val, key) => 
                    <Prediction
                        key={key} 
                        keyVal={key} 
                        val={val} />);

        return (
            <View style={styles.container}>
                <Text style={[material.title, styles.header]}>Select an image to send to Watson</Text>                            
                    <ScrollView>                        
                    {this.state.photos.map((pic, key) => {
                        return (
                            <TouchableOpacity 
                                onPress={() => this.classify(pic.node.image)} 
                                key={key}>
                                <Image
                                    key={key}
                                    style={styles.img}
                                    source={{ uri: pic.node.image.uri }}                                
                                />
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>

                <PredictionModal
                    modalVisible={this.state.modalVisible}
                    modalCtrl={this.setModalVisible.bind(this)}
                    currentPic={this.state.currentPic} 
                    predictions={predictions}
                />    
            
            {this.state.animating && 
                <View style={styles.loading}>
                    <Text style={{paddingBottom: 10, fontSize: 18}}>loading...</Text>
                    <ActivityIndicator 
                        size='large'
                        color='#000'/>
                </View>}

            </View>            
        );
    };
    
    classify = (pic) => {
        this.setState({animating: !this.state.animating});
        
        const data = new FormData();      
        data.append('file', {
            uri: pic.uri,
            type: `image/${pic.type}`, 
            name: `${pic.uri}`
        });
        
        Classify.getClassification(data)
            .then(res => res.json())
                .then(d => this.setState({
                    predictionData: d, 
                    modalVisible: !this.state.modalVisible,
                    currentPic: pic.uri}))
                .catch(err => console.log("error in watson prediction post:", err));
    };

    setModalVisible() {
        this.predictions = [];
        this.setState(prevState => ({
            modalVisible: !prevState.modalVisible, 
            currentPic: '', 
            predictionData: [],
            animating: !this.state.animating
        }));
    };

};
    

const styles = StyleSheet.create({
    container: {
        paddingTop: 35,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {        
        paddingBottom: 10,
    },
    img: {
        width: Dimensions.get('window').width,
        height: 300
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF88'
    }
});