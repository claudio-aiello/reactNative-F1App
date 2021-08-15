import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Schedule from '../screens/Schedule';
import Race from '../screens/Race';

import {AppColors} from '../constants';

const Stack = createStackNavigator();

function ScheduleStack() {
  return (
    <Stack.Navigator
      initialRouteName="Schedule"
      cardStyle={{backgroundColor: AppColors.backgroundMain}}
      defaultNavigationOptions={{
        headerStyle: {backgroundColor: AppColors.backgroundRed},
      }}
      headerTintColor={AppColors.white}>
      <Stack.Screen
        name="Schedule"
        component={Schedule}
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

export default ScheduleStack;
