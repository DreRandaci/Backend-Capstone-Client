'use strict';
import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  };
  render() {
    return (

      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image
            resizeMode="contain"
            style={styles.logo}/>
        </View>

        <View style={styles.formContainer}>
          <LoginForm/>
        </View>
      </View>
    )};
  }

  // define your styles
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#2c3e50'
    },
    loginContainer: {
      alignItems: 'center',
      flexGrow: 1,
      justifyContent: 'center'
    },
    logo: {
      position: 'absolute',
      width: 300,
      height: 100
    }
});