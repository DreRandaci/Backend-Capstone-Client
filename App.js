'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Tabs } from './config/router';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  };

  // componentWillMount() {

  //   fetch('http://127.0.0.1:5000/api/user', {
  //   // fetch('http://localhost:5000/api/user', {
  //     method: 'GET',
  //     body: null
  //   })
  //     .then(response => response.json())
  //     .then(data => console.log(data));
  // }


    render() {
      return (
        <View style={styles.container}>
          <Tabs />        
        </View>
      );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  }  
});

AppRegistry.registerComponent('Watson', () => App);