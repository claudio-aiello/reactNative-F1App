import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import News from '../screens/News';
import NewsDetail from '../screens/NewsDetail';

const Stack = createStackNavigator();

function NewsStack() {
  return (
    <Stack.Navigator initialRouteName="News">
      <Stack.Screen
        name="News"
        component={News}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="NewsDetail"
        component={NewsDetail}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default NewsStack;
