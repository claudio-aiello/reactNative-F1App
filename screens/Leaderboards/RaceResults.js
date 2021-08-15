import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import dayjs from 'dayjs';

import Card from '../../components/Card';
import {DisplayBold, DisplayText} from '../../components/AppText';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AppLayout, AppColors} from '../../constants';
import {teamColors} from '../../constants/teamColors';
import {APIContext} from '../../context/apiContext';

class RaceResults extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nextRaces: [],
      nextQualifyings: [],
      races: [],
      seasonRaces: [],
      raceResults: [],
      qualifyingResults: [],
    };
  }

  static contextType = APIContext;

  async componentDidMount() {
    try {
      let response1 = await fetch(
        'https://ergast.com/api/f1/current/results.json?limit=1000',
      );

      let response2 = await fetch(
        'https://ergast.com/api/f1/current/qualifying.json?limit=1000',
      );

      const data = this.context.data;

      console.log(data.qualifyingResults);

      /* Update state */
      this.setState({
        seasonRaces: data.seasonRaces,
        qualifyingResults: data.qualifyingResults,
        raceResults: data.raceResults,
      });

      let chunkedData = [];
      let singleChunk = [];
      let scheduledRaces = [];

      /* Manipulate data source */
      this.state.raceResults.forEach((race, index) => {
        if (singleChunk.length < 2) singleChunk.push(race);
        else {
          chunkedData.push(singleChunk);
          singleChunk = [];
          singleChunk.push(race);

          if (this.state.seasonRaces.length - 1 === index)
            chunkedData.push(singleChunk);
        }

        /* Check if there is next scheduled races */
        if (dayjs(race.date).isBefore(dayjs())) scheduledRaces.push(race);
      });

      this.setState({
        races: chunkedData,
        nextRaces: scheduledRaces.reverse(),
      });

      let chunkedData2 = [];
      let singleChunk2 = [];
      let scheduledRaces2 = [];

      /* Manipulate data source */
      this.state.qualifyingResults.forEach((race, index) => {
        if (singleChunk2.length < 2) singleChunk2.push(race);
        else {
          chunkedData2.push(singleChunk2);
          singleChunk2 = [];
          singleChunk2.push(race);

          if (this.state.seasonRaces.length - 1 === index)
            chunkedData2.push(singleChunk);
        }

        /* Check if there is next scheduled races */
        if (dayjs(race.date).isBefore(dayjs())) scheduledRaces2.push(race);
      });

      this.setState({
        nextQualifyings: scheduledRaces2,
      });
    } catch (error) {
      console.log(`Error occured: ${error}`);
    }
  }

  /* Navigate to RaceResults screen */
  onRacePressHandler(resultData, qualifyingData, raceName) {
    const addDataToContext = this.context.addDataToContext;

    this.props.navigation.navigate('RaceResult', {
      screen: 'Race',
      params: {resultData, raceName},
    });

    addDataToContext(qualifyingData);
  }

  /* Render races list */
  renderRacesList() {
    return this.state.nextRaces.map((race, index) => {
      const circuitData = race.Circuit;
      const resultData = race.Results;
      const raceName = race.raceName;
      const eventStartDay = dayjs(race.date).subtract(2, 'days').format('DD');
      const eventEndDay = dayjs(race.date).format('DD');
      const eventMonth = dayjs(race.date).format('MMM').toUpperCase();
      const highlightColor =
        index < 1 ? AppColors.strongRed : AppColors.lightGrayBlue;
      const itemKey = race.raceName;
      const marginBottom = this.state.nextRaces.length - 1 === index ? 0 : 14;
      const qualifyingResults = this.state.nextQualifyings;

      function findQualifyingDataByRaceName(qualifyingData, racename) {
        return qualifyingData.find(race => {
          return race.raceName === racename;
        });
      }
      const qualifyingData = findQualifyingDataByRaceName(
        qualifyingResults,
        raceName,
      );

      return (
        <TouchableOpacity
          key={itemKey}
          onPress={this.onRacePressHandler.bind(
            this,
            resultData,
            qualifyingData,
            raceName,
          )}
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
              <DisplayBold style={{fontSize: 12}}>
                {`${eventStartDay} - ${eventEndDay} ${eventMonth}`}
              </DisplayBold>
            </View>
            <View style={{flex: 1}}>
              <DisplayBold style={{marginLeft: 5}}>
                {raceName.toUpperCase()}
              </DisplayBold>
              <DisplayText style={{fontSize: 12, marginTop: 6, marginLeft: 5}}>
                {
                  <Ionicons
                    name={'remove-sharp'}
                    size={18}
                    color={teamColors[resultData[0].Constructor.constructorId]}
                  />
                }{' '}
                {resultData[0].Driver.code}{' '}
                {
                  <Ionicons
                    name={'reorder-two-sharp'}
                    size={16}
                    color={teamColors[resultData[1].Constructor.constructorId]}
                  />
                }{' '}
                {resultData[1].Driver.code}{' '}
                {
                  <Ionicons
                    name={'reorder-three-sharp'}
                    size={16}
                    color={teamColors[resultData[2].Constructor.constructorId]}
                  />
                }{' '}
                {resultData[2].Driver.code}
              </DisplayText>
            </View>
            <View style={{marginLeft: 14}}>
              <DisplayBold
                style={{
                  fontSize: 18,
                  color: AppColors.strongRed,
                  marginRight: 10,
                }}>
                {
                  <Ionicons
                    name={'chevron-forward-outline'}
                    size={22}
                    color={'white'}
                  />
                }
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
        {this.state.nextRaces.length > 0 && (
          <ScrollView
            style={{
              flex: 1,
              opacity: this.screenAnimatedValue,
              backgroundColor: AppColors.backgroundLight,
            }}>
            <View style={{flex: 1, margin: AppLayout.baseMargin}}>
              {this.renderRacesList()}
            </View>
          </ScrollView>
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
    height: 130,
    top: -50,
    left: -30,
    transform: [{rotate: '15deg'}],
  },
});

export default RaceResults;
