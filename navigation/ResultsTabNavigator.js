import React from 'react';
import {View, TouchableOpacity} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {DisplayText} from '../components/AppText';
import {AppColors} from '../constants';

import Race from '../screens/RaceResults/Race';
import Qualifying1 from '../screens/RaceResults/Qualifying1';
import Qualifying2 from '../screens/RaceResults/Qualifying2';
import Qualifying3 from '../screens/RaceResults/Qualifying3';

function MyTabBar({state, descriptors, navigation, position}) {
  return (
    <View>
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

const Tab = createMaterialTopTabNavigator();

function ResultsStack({route}) {
  const raceName = route.params.raceName;
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName="Race">
      <Tab.Screen
        name="Q1"
        component={Qualifying1}
        options={{headerShown: false}}
        initialParams={{raceName: raceName}}
      />
      <Tab.Screen
        name="Q2"
        component={Qualifying2}
        options={{headerShown: false}}
        initialParams={{raceName: raceName}}
      />
      <Tab.Screen
        name="Q3"
        component={Qualifying3}
        options={{headerShown: false}}
        initialParams={{raceName: raceName}}
      />
      <Tab.Screen
        name="Race"
        component={Race}
        options={{headerShown: false}}
        initialParams={{raceName}}
      />
    </Tab.Navigator>
  );
}

export default ResultsStack;
