import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
} from 'react-native';
import dayjs from 'dayjs';

import AppHeader from '../components/AppHeader';
import {DisplayBold, DisplayText} from '../components/AppText';
import Card from '../components/Card';
import CardTouchable from '../components/CardTouchable';
import Countdown from '../components/Countdown';
import Badge from '../components/Badge';
import Carousel from '../components/Carousel';

import {AppLayout, AppColors} from '../constants';
import {
  driverHelmetImage,
  constructorCarImage,
} from '../utils/imagesCollection';
import {APIContext} from '../context/apiContext';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      seasonRaces: [],
      constructorStandings: [],
      driverStandings: [],
    };

    this.navigationHandler = this.navigationHandler.bind(this);
  }

  static contextType = APIContext;

  async componentDidMount() {
    try {
      const data = this.context.data;

      console.log(this.context);

      /* Update state */
      this.setState({
        isLoadingComplete: true,
        seasonRaces: data.seasonRaces,
        constructorStandings: data.constructorStandings,
        driverStandings: data.driverStandings,
      });

      console.log(data.driverStandings);

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

  /* Drivers and constructors data */
  driverStandings = this.driverStandings;
  constructorStandings = this.constructorStandings;

  navigationHandler(routeName) {
    this.props.navigation.navigate(routeName);
  }

  onDriverPressHandler(driverData) {
    this.props.navigation.navigate('Driver', {driverData, header: true});
  }

  onConstructorPressHandler(constructorData) {
    this.props.navigation.navigate('Team', {constructorData, header: true});
  }

  onRacePressHandler(circuitData, raceName) {
    this.props.navigation.navigate('Race', {
      circuitData,
      raceName,
    });
  }

  renderCountdownTimer() {
    let endDate = null;
    let badgeData = null;
    let raceName = '';
    let circuitData = null;

    this.state.seasonRaces.some(race => {
      var raceDate = dayjs(`${race.date}T${race.time}`);
      if (raceDate.isAfter(dayjs())) {
        circuitData = race.Circuit;
        raceName = race.raceName;
        endDate = raceDate;
        badgeData = raceDate.format('DD.MM');
        console.log(endDate);

        return true;
      }
    });

    return (
      <TouchableOpacity
        onPress={this.onRacePressHandler.bind(this, circuitData, raceName)}
        style={{margin: AppLayout.baseMargin}}>
        <Card
          title={raceName}
          contentStyle={{flexDirection: 'row', alignItems: 'center'}}>
          <Countdown endDate={endDate} />
          <Badge
            wrapperStyle={{backgroundColor: AppColors.backgroundLight}}
            data={badgeData}
          />
        </Card>
      </TouchableOpacity>
    );
  }

  renderDrivers() {
    return this.state.driverStandings.map((driverData, index) => {
      /* Render first 5 items */
      if (index < 5) {
        return (
          <TouchableOpacity
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
            key={driverData.Driver.driverId}
            onPress={this.onDriverPressHandler.bind(this, driverData)}>
            <Card wrapperStyle={styles.carouselItem}>
              <View style={styles.driverHelmet}>
                <Image
                  style={{flex: 1, width: undefined, height: undefined}}
                  source={driverHelmetImage[driverData.Driver.driverId]}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.driverInfo}>
                <View style={{marginBottom: 15}}>
                  <DisplayBold style={styles.driverRank}>
                    {driverData.position}
                  </DisplayBold>
                </View>
                <View>
                  <DisplayBold style={{marginBottom: 2, fontSize: 12}}>
                    {driverData.Driver.givenName}
                  </DisplayBold>
                  <DisplayBold
                    style={{textTransform: 'uppercase', fontSize: 16}}>
                    {driverData.Driver.familyName}
                  </DisplayBold>
                  <DisplayText style={styles.points}>
                    {driverData.points} Points
                  </DisplayText>
                </View>
              </View>
            </Card>
          </TouchableOpacity>
        );
      }
    });
  }

  renderConstructors() {
    return this.state.constructorStandings.map((constructorData, index) => {
      /* Render first 5 items */
      if (index < 5) {
        return (
          <TouchableOpacity
            style={{
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              shadowOpacity: 0.34,
              shadowRadius: 6.27,

              elevation: 10,
            }}
            key={constructorData.Constructor.constructorId}
            onPress={this.onConstructorPressHandler.bind(
              this,
              constructorData,
            )}>
            <Card wrapperStyle={styles.carouselItem}>
              <View style={styles.carImage}>
                <Image
                  style={{width: 300, height: undefined, aspectRatio: 1}}
                  source={
                    constructorCarImage[
                      constructorData.Constructor.constructorId
                    ]
                  }
                  resizeMode="contain"
                />
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <DisplayBold style={{fontSize: 18, textTransform: 'uppercase'}}>
                  {constructorData.position} {constructorData.Constructor.name}
                </DisplayBold>
                <DisplayText style={styles.points}>
                  {constructorData.points} Points
                </DisplayText>
              </View>
            </Card>
          </TouchableOpacity>
        );
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <AppHeader screenTitle="Home" />

        <ScrollView style={{backgroundColor: AppColors.backgroundLight}}>
          {this.state.seasonRaces && this.renderCountdownTimer()}

          <Carousel
            snapToInterval={
              AppLayout.deviceWidth - (80 - AppLayout.baseMargin)
            }>
            {this.renderDrivers()}
          </Carousel>

          <View style={{margin: AppLayout.baseMargin}}>
            <CardTouchable
              style={{marginBottom: AppLayout.baseMargin}}
              iconName="md-calendar"
              iconSize={22}
              iconColor={AppColors.strongRed}
              routeName="Schedule"
              cardTitle="Schedule"
              cardDescription="Don't miss any event!"
              onPress={this.navigationHandler}
            />

            <CardTouchable
              iconName="md-trophy"
              iconSize={22}
              iconColor={AppColors.strongRed}
              routeName="Leaderboards"
              cardTitle="Standings"
              cardDescription="Check out current leaderboard status!"
              onPress={this.navigationHandler}
            />
          </View>

          <Carousel
            snapToInterval={
              AppLayout.deviceWidth - (80 - AppLayout.baseMargin)
            }>
            {this.renderConstructors()}
          </Carousel>

          <View style={{margin: AppLayout.baseMargin}}>
            <CardTouchable
              iconName="newspaper"
              iconSize={22}
              iconColor={AppColors.strongRed}
              routeName="News"
              cardTitle="News"
              cardDescription="Check out latest news!"
              onPress={this.navigationHandler}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  carouselItem: {
    width: AppLayout.deviceWidth - 80,
    marginHorizontal: AppLayout.baseMargin / 2,
    height: 120,
    backgroundColor: AppColors.backgroundMain,
  },
  driverHelmet: {
    position: 'absolute',
    height: 250,
    width: 250,
    overflow: 'hidden',
    top: -76,
    left: -90,
  },
  driverInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  driverRank: {
    fontSize: 26,
    marginTop: 10,
    marginRight: 14,
  },
  points: {
    marginTop: 8,
    fontSize: 12,
    textTransform: 'uppercase',
    color: AppColors.strongRed,
  },
  carImage: {
    position: 'absolute',
    height: 200,
    overflow: 'hidden',
    bottom: -20,
    left: -88,
  },
});

export default Home;
