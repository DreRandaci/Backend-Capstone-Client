import React from 'react';
import { TabNavigator } from 'react-navigation';
import Watson from '../screens/Watson';
import Images from '../screens/Images';
import { Icon, Badge } from 'react-native-elements';

export const Tabs = TabNavigator({
    Watson: {
        screen: Watson,
        navigationOptions: {
            tabBarLabel: 'Watson',
            tabBarIcon: ({ tintColor }) => <Badge value={'W'} color={tintColor} />
        },
    },
    Image: {
        screen: Images,
        navigationOptions: {
            tabBarLabel: 'Images',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        }
    }
});