import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import Watson from '../screens/Watson';
import Images from '../screens/Images';
import ImageDetails from '../screens/ImageDetails';
import ClassifyUrls from '../screens/ClassifyUrls';
import { Icon } from 'react-native-elements';


export const Details = StackNavigator({
    Images: {
        screen: Images,
        navigationOptions: ({ navigation }) => ({
            title: `Images`,
        }),
    },
    ImageDetails: {
        screen: ImageDetails,
        navigationOptions: ({ navigation }) => ({
            title: `Map`,
        }),
    }
});

export const Tabs = TabNavigator({    
    Watson: {
        screen: Watson,
        navigationOptions: {
            tabBarLabel: 'Watson',
            tabBarIcon: ({ tintColor }) => <Icon name='add-a-photo' size={35} color={tintColor} />                                    
        },
    },
    Image: {
        screen: Details,
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