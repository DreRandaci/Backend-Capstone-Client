import React from 'react';
import { TabNavigator } from 'react-navigation';
import Watson from '../screens/Watson';
import Image from '../screens/Image';
import { Icon, Badge } from 'react-native-elements';

export const Tabs = TabNavigator({
    Watson: {
        screen: Watson,
        navigationOptions: {
            tabBarLabel: 'Watson',
            tabBarIcon: ({ tintColor }) => <Badge name="badge" size={35} color={tintColor} />
        },
    },
    Image: {
        screen: Image,
        navigationOptions: {
            tabBarLabel: 'Images',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        }
    }
});