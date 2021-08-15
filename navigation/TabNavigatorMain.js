import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeStack from './HomeStackNavigator';
import ScheduleStack from './ScheduleStackNavigator';
import LiderboardsStack from './LiderboardStackNavigator';
import NewsStack from './NewsStackNavigator';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppColors} from '../constants';

export default AppContainer = () => {
  const Tab = createBottomTabNavigator();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Schedule') {
              iconName = focused ? 'md-calendar' : 'md-calendar-outline';
            } else if (route.name === 'Leaderboards') {
              iconName = focused ? 'md-trophy' : 'md-trophy-outline';
            } else if (route.name === 'News') {
              iconName = focused ? 'newspaper' : 'newspaper-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#DE1C16',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: AppColors.backgroundMain,
            borderTopColor: AppColors.backgroundLight,
          },
        }}>
        <Tab.Screen name="Home" component={HomeStack} />
        <Tab.Screen name="Schedule" component={ScheduleStack} />
        <Tab.Screen name="Leaderboards" component={LiderboardsStack} />
        <Tab.Screen name="News" component={NewsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
