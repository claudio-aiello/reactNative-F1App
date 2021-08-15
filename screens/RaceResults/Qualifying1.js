import React from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';

import {DisplayBold} from '../../components/AppText';
import Card2 from '../../components/Card2';
import Badge from '../../components/Badge';

import {AppColors} from '../../constants';
import {teamColors} from '../../constants/teamColors';
import {APIContext} from '../../context/apiContext';

class Qualifying1 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resultData: [],
      qualifyingData: [],
    };
  }

  static contextType = APIContext;

  /* Animated value for screen animation */
  screenAnimatedValue = new Animated.Value(0);

  async componentDidMount() {
    const qualifyingData = this.context.data[1].QualifyingResults;

    this.setState({qualifyingData});

    /* Start animation when Component is mounted */
    Animated.timing(this.screenAnimatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  /* Render Q1 results list */
  renderDriversList() {
    return this.state.qualifyingData.map(driver => {
      const highlightColor = teamColors[0];
      const itemKey = driver.position;

      return (
        <Card2 key={itemKey} contentStyle={styles.cardContent}>
          <View
            style={{
              ...styles.cardBackground,
              backgroundColor: highlightColor,
            }}></View>

          <View style={styles.standing}>
            <DisplayBold style={{fontSize: 18}}>{driver.position}</DisplayBold>
          </View>
          <View style={{flex: 1}}>
            <DisplayBold>
              {
                <Text
                  color={teamColors[driver.Constructor.constructorId]}
                  style={{
                    color: teamColors[driver.Constructor.constructorId],
                    fontSize: 18,
                    fontWeight: 'bold',
                  }}>
                  |
                </Text>
              }{' '}
              {driver.Driver.code}
            </DisplayBold>
          </View>
          <View
            style={{flex: 0.5, marginRight: 15, alignContent: 'flex-start'}}>
            {driver.Q1 === '' ? (
              <Badge textStyle={{color: 'grey'}} data={'DNF'} />
            ) : (
              <Badge data={driver.Q1} />
            )}
          </View>
        </Card2>
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.qualifyingData.length > 0 && (
          <Animated.ScrollView
            style={{
              flex: 1,
              opacity: this.screenAnimatedValue,
              backgroundColor: AppColors.cardBackground,
              transform: [
                {perspective: 1000},
                {
                  translateY: this.screenAnimatedValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0],
                  }),
                },
              ],
            }}>
            <View style={{flex: 1}}>
              <Card2>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <DisplayBold style={{flex: 0.4, paddingLeft: 5}}>
                    {'Pos'}
                  </DisplayBold>
                  <DisplayBold style={{flex: 1.7}}>{'Driver'}</DisplayBold>
                  <DisplayBold style={{flex: 0.9}}>{'Fastest lap'}</DisplayBold>
                </View>
              </Card2>
              {this.renderDriversList()}
            </View>
          </Animated.ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  standing: {
    width: 40,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardBackground: {
    position: 'absolute',
    width: 78,
    height: 100,
    top: -50,
    left: -30,
    transform: [{rotate: '15deg'}],
  },
});

export default Qualifying1;
