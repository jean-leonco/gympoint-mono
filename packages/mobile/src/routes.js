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
    defaultNavigationOptions: {
      headerTransparent: true,
      headerLeftContainerStyle: {
        marginLeft: 10,
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
