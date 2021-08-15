import React, {useState} from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import ResultsStack from './ResultsTabNavigator';

import Driver from '../screens/Driver';
import Team from '../screens/Team';
import Drivers from '../screens/Leaderboards/Drivers';
import Constructors from '../screens/Leaderboards/Constructors';
import RaceResults from '../screens/Leaderboards/RaceResults';

import AppHeader from '../components/AppHeader';
import {DisplayText} from '../components/AppText';

import {AppColors} from '../constants';

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View>
      <AppHeader screenTitle="Leaderboards" />
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);

          return (
            <TouchableOpacity
              activeOpacity={1}
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                backgroundColor: AppColors.backgroundMain,
                height: 50,
              }}>
              <DisplayText
                style={{fontSize: 12, textAlign: 'center', paddingTop: 20}}>
                {label}
              </DisplayText>
              {isFocused && (
                <View
                  style={{
                    width: '100%',
                    height: 6,
                    backgroundColor: AppColors.backgroundRed,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                  }}></View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const DriversStack = createStackNavigator();

function DriversStackNavigator() {
  return (
    <DriversStack.Navigator initialRouteName="Drivers">
      <DriversStack.Screen
        name="Driver"
        component={Driver}
        options={{headerShown: false}}
      />
      <DriversStack.Screen
        name="Drivers"
        component={Drivers}
        options={{headerShown: false}}
      />
    </DriversStack.Navigator>
  );
}

const ConstructorStack = createStackNavigator();

function ConstructorsStackNavigator() {
  return (
    <ConstructorStack.Navigator initialRouteName="Constructors">
      <ConstructorStack.Screen
        name="Constructors"
        component={Constructors}
        options={{headerShown: false}}
      />
      <ConstructorStack.Screen
        name="Team"
        component={Team}
        options={{headerShown: false}}
      />
    </ConstructorStack.Navigator>
  );
}

const RaceResultStack = createStackNavigator();

function RaceResultStackNavigator() {
  return (
    <RaceResultStack.Navigator initialRouteName="RaceResults">
      <RaceResultStack.Screen
        name="RaceResults"
        component={RaceResults}
        options={{headerShown: false}}
      />
      <RaceResultStack.Screen
        name="RaceResult"
        component={ResultsStack}
        options={{headerShown: false}}
      />
    </RaceResultStack.Navigator>
  );
}

const Tab = createMaterialTopTabNavigator();

function LiderboardsStack() {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Liderboards">
      <Tab.Screen name="Drivers" component={DriversStackNavigator} />
      <Tab.Screen name="Constructors" component={ConstructorsStackNavigator} />
      <Tab.Screen name="Race results" component={RaceResultStackNavigator} />
    </Tab.Navigator>
  );
}

export default LiderboardsStack;
