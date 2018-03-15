'use strict';
import React, { Component } from 'react';
import { 
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
            images: []
        };
    };

    // componentDidMount() {
    //     fetch('images.drerandaci.com').then(res => this.setState({images = res.json()}));
    // };

    viewImgDetail = (img) => {
        this.props.navigation.navigate('Details', { ...img });
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {this.state.images.map((img) => (
                        <UserImage imageUri={img.uri} />
                    ))}
                </ScrollView>
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white'
    }
});