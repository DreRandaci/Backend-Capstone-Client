import React from 'react';
import { TabNavigator } from 'react-navigation';
import Watson from '../screens/Watson';
import Images from '../screens/Images';
import ClassifyUrls from '../screens/ClassifyUrls';
import { Icon, Badge } from 'react-native-elements';

export const Tabs = TabNavigator({
    Watson: {
        screen: Watson,
        navigationOptions: {
            tabBarLabel: 'Watson',
            tabBarIcon: ({ tintColor }) => <Icon name={'adjust'} size={35} color={tintColor} />
        },
    },
    Image: {
        screen: Images,
        navigationOptions: {
            tabBarLabel: 'Images',
            tabBarIcon: ({ tintColor }) => <Icon name="account-circle" size={35} color={tintColor} />
        }
    },
    URLs: {
        screen: ClassifyUrls,
        navigationOptions: {
            tabBarLabel: 'Classify URL',
            tabBarIcon: ({ tintColor }) => <Icon name="content-copy" size={30} color={tintColor} />
        }
    }
});