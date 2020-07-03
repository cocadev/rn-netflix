import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from './screens/Home';
import SearchScreen from './screens/Search';
import FavScreen from './screens/Fav';
import ChannelScreen from './screens/Channel';
import MoreScreen from './screens/More';
import { colors } from './common/colors';
import * as ICON from './components/Icons';
import AccountScreen from './screens/More/Account';
import SettingsScreen from './screens/More/Settings';
import HelpScreen from './screens/More/Help';
import BonusScreen from './screens/More/Bonus';
import DetailScreen from './screens/Home/Detail';
import DemoScreen from './screens/More/Demo';

const navigationOptions = () => ({ header: null });

const HomeStack = createStackNavigator(
  {
    Home1: {
      screen: HomeScreen,
      navigationOptions,
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'Home1',
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Home',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return (
          <ICON.Home color={tintColor}/>
        );
      },
    }),
  },
);

const SearchStack = createStackNavigator(
  {
    Search1: {
      screen: SearchScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'Search1',
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Search',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return (
          <ICON.Search color={tintColor}/>
        );
      },
    }),
  },
);

const FavStack = createStackNavigator(
  {
    Fav1: {
      screen: FavScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'Fav1',
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Fav',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return (
          <ICON.Coming color={tintColor}/>
        );
      },
    }),
  },
);

const ChannelStack = createStackNavigator(
  {
    Channel1: {
      screen: ChannelScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'Channel1',
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'Channel',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return (
          <ICON.Download color={tintColor}/>
        );
      },
    }),
  },
);

const MoreStack = createStackNavigator(
  {
    More1: {
      screen: MoreScreen,
      navigationOptions,
    },
    Account: {
      screen: AccountScreen,
      navigationOptions,
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions,
    },
    Help: {
      screen: HelpScreen,
      navigationOptions,
    },
    Bonus: {
      screen: BonusScreen,
      navigationOptions,
    },
    Demo: {
      screen: DemoScreen,
      navigationOptions,
    },
  },
  {
    initialRouteName: 'More1',
    navigationOptions: ({navigation, screenProps}) => ({
      tabBarLabel: 'More',
      tabBarIcon: ({focused, horizontal, tintColor}) => {
        return (
          <ICON.More color={tintColor}/>
        );
      },
    }),
  },
);

const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    Search: {
      screen: SearchStack,
    },
    Fav: {
      screen: FavStack,
    },
    Channel: {
      screen: ChannelStack,
    },
    More: {
      screen: MoreStack,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: colors.WHITE,
      inactiveTintColor: '#585858',
      style: {
        padding: 2,
        backgroundColor: colors.DARK
      },
    },
  },
);

export const Routers = createAppContainer(
  createSwitchNavigator({
    App: AppStack,
  })
);