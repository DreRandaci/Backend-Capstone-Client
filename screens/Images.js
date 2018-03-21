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
// import { MapView } from 'react-native-maps';
import UserImage from '../components/UserImage';
import ClassifyGeneric from '../actions/ClassifyGeneric';
import PredictionModal from '../components/PredictionModal';
import ImagePrediction from '../components/ImagePrediction';

const { width, height } = Dimensions.get('window');

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
            first: 200,
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

        return (
            <View style={styles.container}>
                {/* <MapView /> */}
                <ScrollView contentContainerStyle={styles.scrollContainer}>                        
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
                            <TouchableOpacity
                            >
                            <Text style={[material.title, {alignSelf: 'center'}]}>Map</Text>
                        </TouchableOpacity>
                        </TouchableOpacity>                        
                    );
                })}
            </ScrollView>

            <PredictionModal
                modalVisible={this.state.modalVisible}
                modalCtrl={this.setModalVisible.bind(this)}
                currentPic={this.state.currentPic} 
                predictions={this.state.predictionData}
            />    
            
            {this.state.animating && 
                <View style={styles.loading}>
                    <Text style={{paddingBottom: 10, fontSize: 18}}>classifying...</Text>
                    <ActivityIndicator 
                        size='large'
                        color='#000'/>
                </View>}

            </View>            
        );
    };
    
    viewImgDetail = (img) => {
    	this.props.navigation.navigate('ImageDetails', { ...img });
    };

    classify = (pic) => {
        this.setState({animating: !this.state.animating});
        
        const data = new FormData();      
        data.append('file', {
            uri: pic.uri,
            type: `image/${pic.type}`, 
            name: `${pic.uri}`
        });
        
        ClassifyGeneric.getClassification(data)
            .then(res => res.json())
                .then(d => this.setState({
                    predictionData: d, 
                    modalVisible: !this.state.modalVisible,
                    currentPic: pic.uri}))
                .catch(err => console.log("error in watson prediction post:", err));
    };

    setModalVisible() {
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
        // flexDirection: 'column',
        // justifyContent: 'center',
        // alignItems: 'center'        
    },
    scrollContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
      },
    header: {        
        paddingBottom: 10,
    },
    img: {
        // width: Dimensions.get('window').width,
        // height: 300
        width: width / 2,
        height: width / 2
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