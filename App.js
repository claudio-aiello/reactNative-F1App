import React from 'react';
import {StyleSheet, View, Animated} from 'react-native';
import AppContainer from './navigation/TabNavigatorMain';
import AppActivityIndicator from './components/AppActivityIndicator';
import {AppColors} from './constants';
import {APIContext} from './context/apiContext';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.addDataToContext = newData => {
      this.setState(state => ({
        data: [state.data, newData],
      }));
    };

    this.state = {
      data: [],
      isLoadingComplete: false,
      hideLoadingScreen: false,
      addDataToContext: this.addDataToContext,
    };
  }

  /* Hold API data */
  driverStandings = [];
  constructorStandings = [];
  seasonRaces = [];

  /* Animated values */
  fadeOut = new Animated.Value(1);
  fadeIn = new Animated.Value(0);

  async componentDidMount() {
    try {
      let response1 = await fetch(
        'https://ergast.com/api/f1/current/driverStandings.json',
      );
      let response2 = await fetch(
        'https://ergast.com/api/f1/current/constructorStandings.json',
      );
      let response3 = await fetch('https://ergast.com/api/f1/current.json');
      let response4 = await fetch(
        'https://ergast.com/api/f1/current/results.json?limit=1000',
      );
      let response5 = await fetch(
        'https://ergast.com/api/f1/current/qualifying.json?limit=1000',
      );

      response1 = await response1.json();
      response2 = await response2.json();
      response3 = await response3.json();
      response4 = await response4.json();
      response5 = await response5.json();

      let driverStandings =
        response1.MRData.StandingsTable.StandingsLists[0].DriverStandings;
      let constructorStandings =
        response2.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
      let seasonRaces = response3.MRData.RaceTable.Races;
      let raceResults = response4.MRData.RaceTable.Races;
      let qualifyingResults = response5.MRData.RaceTable.Races;

      this.setState({
        data: {
          driverStandings,
          constructorStandings,
          seasonRaces,
          raceResults,
          qualifyingResults,
        },
      });

      /* Update state */
      this.setState({isLoadingComplete: true});

      /* Start animation when Component is mounted */
      Animated.parallel([
        Animated.timing(this.fadeOut, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(this.fadeIn, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        this.setState({hideLoadingScreen: true});
      });
    } catch (error) {
      console.log(`Error occured: ${error}`);
    }
  }

  render() {
    return (
      <APIContext.Provider value={this.state}>
        <View style={styles.screen}>
          {!this.state.hideLoadingScreen && (
            <AppActivityIndicator fadeOut={this.fadeOut} />
          )}

          {this.state.isLoadingComplete && (
            <Animated.View style={{flex: 1, opacity: this.fadeIn}}>
              <AppContainer
                screenProps={{
                  driverStandings: this.driverStandings,
                  constructorStandings: this.constructorStandings,
                  seasonRaces: this.seasonRaces,
                }}
              />
            </Animated.View>
          )}
        </View>
      </APIContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.backgroundMain,
  },
});
