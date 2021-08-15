import React from 'react';
import {View, StyleSheet, Animated, Text} from 'react-native';

import {DisplayBold} from '../../components/AppText';
import Card2 from '../../components/Card2';
import Badge from '../../components/Badge';

import {AppColors} from '../../constants';
import {teamColors} from '../../constants/teamColors';
import {APIContext} from '../../context/apiContext';

class Race extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      resultData: [],
      raceName: null,
      raceData: null,
    };
  }

  static contextType = APIContext;

  /* Animated value for screen animation */
  screenAnimatedValue = new Animated.Value(0);

  async componentDidMount() {
    const resultData = this.props.route.params.resultData;

    const raceName = this.props.route.params.raceName;

    const raceData = this.context.data[1];

    console.log(raceData);

    this.setState({resultData, raceData, raceName});

    /* Start animation when Component is mounted */
    Animated.timing(this.screenAnimatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  /* Render Race results list */
  renderDriversList() {
    return this.state.resultData.map(driver => {
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
            style={{flex: 0.8, marginRight: 30, alignContent: 'flex-start'}}>
            <Badge
              data={
                driver.status === 'Finished' ? driver.Time.time : driver.status
              }
            />
          </View>
          <View style={{flex: 0.3}}>
            <DisplayBold
              style={{
                fontSize: 18,
                color: AppColors.strongRed,
                marginRight: 10,
              }}>
              {driver.points}
            </DisplayBold>
          </View>
        </Card2>
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.resultData.length > 0 && (
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
                  <DisplayBold style={{flex: 1.7, paddingLeft: 14}}>
                    {'Driver'}
                  </DisplayBold>
                  <DisplayBold style={{flex: 0.8}}>{'Result'}</DisplayBold>
                  <DisplayBold
                    style={{flex: 0.7, textAlign: 'center', paddingLeft: 10}}>
                    {'Pts'}
                  </DisplayBold>
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

export default Race;
