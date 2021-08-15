import React from 'react';
import {View, StyleSheet, Dimensions, Image, Animated} from 'react-native';
import dayjs from 'dayjs';

import {DisplayBold, DisplayText} from '../components/AppText';
import Card from '../components/Card';
import Carousel from '../components/Carousel';
import AppActivityIndicator from '../components/AppActivityIndicator';
import AppHeader2 from '../components/AppHeader2';

import {AppLayout, AppColors} from '../constants';
import {trackLayoutImage} from '../utils/imagesCollection';
import {simulateServerResponse} from '../data/index';

const {width} = Dimensions.get('window');

class Race extends React.Component {
  state = {
    isAnimationOver: false,
    raceInfo: null,
  };

  fadeOut = new Animated.Value(1);
  fadeIn = new Animated.Value(0);

  async componentDidMount() {
    const circuitData = this.props.route.params.circuitData;

    const raceName = this.props.route.params.raceName;

    console.log(circuitData);

    let response1 = await fetch(
      'https://ergast.com/api/f1/current/last/results.json',
    );

    response1 = await response1.json();

    let raceResults = response1.MRData.RaceTable.Races[0].Results[1];

    console.log(raceResults);

    if (raceName == 'Austrian Grand Prix') {
      const austriaId = 'red_bull_ring_2';

      let response = await simulateServerResponse('races', austriaId);
      this.setState({raceInfo: response});
    } else {
      let response = await simulateServerResponse(
        'races',
        circuitData.circuitId,
      );
      this.setState({raceInfo: response});
    }

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
      this.setState({isAnimationOver: true});
    });
  }

  renderEventSchedule() {
    return this.state.raceInfo.schedule.map(event => {
      dateISO = event.date.split('.').reverse().join('-');
      const eventDate = dayjs(`${dateISO}T${event.time}`);

      return (
        <Card key={event.eventName} wrapperStyle={styles.carouselItem}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 20, alignItems: 'center'}}>
              <DisplayBold style={styles.scheduleInfo}>
                {eventDate.format('DD')}
              </DisplayBold>
              <DisplayText style={styles.scheduleDesc}>
                {eventDate.format('MMMM')}
              </DisplayText>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <View style={{marginRight: 10, alignItems: 'center'}}>
                <DisplayBold style={styles.scheduleInfo}>
                  {eventDate.format('HH')}
                </DisplayBold>
                <DisplayText style={styles.scheduleDesc}>Hours</DisplayText>
              </View>
              <View style={{alignItems: 'center'}}>
                <DisplayBold style={styles.scheduleInfo}>
                  {eventDate.format('mm')}
                </DisplayBold>
                <DisplayText style={styles.scheduleDesc}>Minutes</DisplayText>
              </View>
            </View>
          </View>
          <View style={{marginTop: 14}}>
            <DisplayBold style={{textTransform: 'uppercase'}}>
              {event.eventName}
            </DisplayBold>
          </View>
        </Card>
      );
    });
  }

  render() {
    const circuitData = this.props.route.params.circuitData;

    const raceName = this.props.route.params.raceName;
    return (
      <View style={styles.screen}>
        {!this.state.isAnimationOver && (
          <AppActivityIndicator fadeOut={this.fadeOut} />
        )}

        <AppHeader2
          onPress={() => this.props.navigation.goBack()}
          screenTitle={raceName}
        />

        {this.state.raceInfo && (
          <Animated.ScrollView style={{flex: 1, opacity: this.fadeIn}}>
            <View style={{marginHorizontal: AppLayout.baseMargin}}>
              <Image
                source={trackLayoutImage[circuitData.circuitId]}
                resizeMode="contain"
                style={{height: 280, flex: 1, width: null, zIndex: 0}}
              />
            </View>

            <View style={styles.raceInfo}>
              <View style={styles.raceInfoSection}>
                <View style={{marginBottom: 6}}>
                  <DisplayBold>Race event schedule</DisplayBold>
                  <DisplayText style={styles.sectionTitleDesc}>
                    Scheduled race weekend events
                  </DisplayText>
                </View>
              </View>

              <Carousel
                style={{marginTop: AppLayout.baseMargin}}
                snapToInterval={width - (80 - AppLayout.baseMargin)}>
                {this.renderEventSchedule()}
              </Carousel>

              <View style={styles.raceInfoSection}>
                <View style={{marginBottom: 6}}>
                  <DisplayBold>{circuitData.circuitName}</DisplayBold>
                  <DisplayText style={styles.sectionTitleDesc}>
                    Important circuit informations
                  </DisplayText>
                </View>
                <View style={styles.circuitInfoContent}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 14,
                    }}>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.raceInfo.firstGradPrix}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        First Grand Prix
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.raceInfo.numberOfLaps}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Number of laps
                      </DisplayText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 14,
                    }}>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.raceInfo.circuitLength}{' '}
                        <DisplayText>km</DisplayText>
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Circuit Length
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.raceInfo.raceDistance}{' '}
                        <DisplayText>km</DisplayText>
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Race Distance
                      </DisplayText>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginBottom: 14,
                    }}>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.raceInfo.fastestLap.time}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Fastest Lap
                      </DisplayText>
                    </View>
                  </View>

                  <View style={{marginTop: 20, marginBottom: 14}}>
                    <DisplayBold>About Circuit</DisplayBold>
                    <DisplayText style={styles.sectionTitleDesc}>
                      How the circuit feels like
                    </DisplayText>
                  </View>
                  <View style={{marginBottom: 14}}>
                    <View>
                      <DisplayText style={{fontSize: 12, lineHeight: 16}}>
                        {this.state.raceInfo.circuitInfo}
                      </DisplayText>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Animated.ScrollView>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: AppColors.backgroundMain,
  },
  raceInfoSection: {
    marginTop: 30,
    marginHorizontal: AppLayout.baseMargin,
  },
  sectionTitleDesc: {
    marginTop: 4,
    fontSize: 12,
    color: AppColors.textCaption,
  },
  carouselItem: {
    width: width - 80,
    marginHorizontal: AppLayout.baseMargin / 2,
    backgroundColor: AppColors.backgroundMain,
  },
  raceInfo: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  scheduleInfo: {
    fontSize: 36,
    color: AppColors.strongRed,
  },
  scheduleDesc: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  circuitInfoContent: {
    marginTop: 14,
    marginBottom: 14,
  },
});

export default Race;
