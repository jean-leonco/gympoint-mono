import React from 'react';
import { Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Me from './pages/Me';
import Sign from './pages/Sign';
import Checkins from './pages/Checkins';

import AssistanceRequests from './pages/AssistanceRequests';
import Answer from './pages/Answer';
import NewRequest from './pages/NewRequest';

import colors from './styles/colors';

const Requests = createStackNavigator(
  {
    AssistanceRequests,
    Answer,
    NewRequest,
  },
  {
    navigationOptions: {
      tabBarLabel: (
        { tintColor } //eslint-disable-line
      ) => (
        <Text
          style={{
            fontSize: 14,
            color: tintColor,
            marginBottom: 15,
            textAlign: 'center',
          }}
        >
          Ask for Help
        </Text>
      ),
      tabBarIcon: (
        { tintColor } //eslint-disable-line
      ) => (
        <Icon
          style={{ marginTop: 15 }}
          name="live-help"
          size={20}
          color={tintColor}
        />
      ),
    },
    headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerLeftContainerStyle: {
        marginLeft: 10,
      },
      headerStyle: {
        height: 44,
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        alignSelf: 'center',
      },
    },
  }
);

const Main = createBottomTabNavigator(
  {
    Checkins,
    Requests,
  },
  {
    resetOnBlur: true,
    tabBarOptions: {
      keyboardHidesTabBar: true,
      activeTintColor: colors.main,
      inactiveTintColor: colors.nav,
      style: {
        height: 70,
        backgroundColor: '#fff',
        borderTopWidth: 0,
      },
    },
  }
);

const App = createAppContainer(
  createSwitchNavigator(
    {
      Me,
      Sign,
      Main,
    },
    {
      initialRouteName: 'Me',
    }
  )
);

export default App;
