'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View
} from 'react-native';
import { Tabs } from './config/router';

export default class App extends Component {
  
    render() {
      return (
        <View style={styles.container}>
          <Tabs />        
        </View>
      );
    };
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    }  
});

// Disables yellowbox warnings
console.disableYellowBox = true;

AppRegistry.registerComponent('Watson', () => App);