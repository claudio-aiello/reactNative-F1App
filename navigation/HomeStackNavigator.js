import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import Driver from '../screens/Driver';
import Drivers from '../screens/Leaderboards/Drivers';
import Team from '../screens/Team';
import Race from '../screens/Race';

import {AppColors} from '../constants';

const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      cardStyle={{backgroundColor: AppColors.backgroundMain}}
      defaultNavigationOptions={{
        headerStyle: {backgroundColor: AppColors.backgroundRed},
      }}
      headerTintColor={AppColors.white}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Driver"
        component={Driver}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Drivers"
        component={Drivers}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Team"
        component={Team}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Race"
        component={Race}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
