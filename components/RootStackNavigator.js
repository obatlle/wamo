import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

import AuthenticationScreen from './AuthenticationScreen';
import Colors from '../constants/Colors';
import PostingScreen from './PostingScreen';
import MapScreen from './MapScreen';
import SearchScreen from './SearchScreen';
import SlidingScreen from './SlidingScreen';

const MainStack = StackNavigator(
  {
    MapScreen: {
      screen: MapScreen,
    },
    PostingScreen: {
      screen: PostingScreen,
    },
    SlidingScreen: {
      screen: SlidingScreen,
    },
    Authentication: {
      screen: AuthenticationScreen,
    },
    Search: {
      screen: SearchScreen,
    },
  },
  {
    initialRouteName: 'Authentication',
    cardStyle: {
      backgroundColor: Colors.almostWhite,
    },
    navigationOptions: () => ({
      headerBackTitle: 'Back',
      headerPressColorAndroid: Colors.white,
      headerStyle: {
        backgroundColor: Colors.orange,
        marginTop:-65
      },
      headerTintColor: Colors.white,
    }),
  }
);

export default StackNavigator(
  {
    Main: {
      screen: MainStack,
    },
  },
  {
    initialRouteName: 'Main',
    cardStyle: {
      backgroundColor: Colors.almostWhite,
    },
    headerMode: 'none',
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
      },
    }),
    navigationOptions: {
      gesturesEnabled: false,
    }
  }
);
