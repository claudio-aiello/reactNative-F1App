import React from 'react';
import {View, StyleSheet, Animated, TouchableOpacity} from 'react-native';

import Card from '../../components/Card';
import {DisplayBold, DisplayText} from '../../components/AppText';

import {AppLayout, AppColors} from '../../constants';
import {teamColors} from '../../constants/teamColors';
import {APIContext} from '../../context/apiContext';

class Drivers extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      driverStandings: [],
    };
  }

  /* Animated value for screen animation */
  screenAnimatedValue = new Animated.Value(0);

  static contextType = APIContext;

  async componentDidMount() {
    try {
      const data = this.context.data;

      /* Update state */
      this.setState({driverStandings: data.driverStandings});

      /* Start animation when Component is mounted */
      Animated.timing(this.screenAnimatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } catch (error) {
      console.log(`Error occured: ${error}`);
    }
  }

  /* Navigate to Driver screen */
  onDriverPressHandler(driverData) {
    this.props.navigation.navigate('Driver', {
      driverData,
      header: false,
    });
  }

  /* Render drivers list */
  renderDriversList() {
    return this.state.driverStandings.map((driver, index) => {
      console.log(driver.Constructors[0].constructorId);
      const highlightColor = teamColors[driver.Constructors[0].constructorId];
      const itemKey = driver.position;
      const marginBottom =
        this.state.driverStandings.length - 1 === index ? 0 : 14;

      return (
        <TouchableOpacity
          key={itemKey}
          onPress={this.onDriverPressHandler.bind(this, driver)}
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 5,
            },
            shadowOpacity: 0.34,
            shadowRadius: 6.27,

            elevation: 10,
          }}>
          <Card
            wrapperStyle={{borderRadius: 100, marginBottom}}
            contentStyle={styles.cardContent}>
            <View
              style={{
                ...styles.cardBackground,
                backgroundColor: highlightColor,
              }}></View>

            <View style={styles.standing}>
              <DisplayBold style={{fontSize: 26}}>
                {driver.position}
              </DisplayBold>
            </View>
            <View style={{flex: 1}}>
              <DisplayBold style={{marginLeft: 5}}>
                {driver.Driver.givenName}{' '}
                {driver.Driver.familyName.toUpperCase()}
              </DisplayBold>
              <DisplayText
                style={{
                  marginLeft: 5,
                  fontSize: 12,
                  fontWeight: 'bold',
                  marginTop: 6,
                  color: highlightColor,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,

                  elevation: 5,
                }}>
                {driver.Constructors[0].name}
              </DisplayText>
            </View>
            <View style={{marginLeft: 14}}>
              <DisplayBold
                style={{
                  fontSize: 18,
                  color: AppColors.strongRed,
                  marginRight: 10,
                }}>
                {driver.points}
              </DisplayBold>
            </View>
          </Card>
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        {this.state.driverStandings.length > 0 && (
          <Animated.ScrollView
            style={{
              flex: 1,
              opacity: this.screenAnimatedValue,
              backgroundColor: AppColors.backgroundLight,
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
            <View style={{flex: 1, margin: AppLayout.baseMargin}}>
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

export default Drivers;
