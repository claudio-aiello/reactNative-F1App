import React from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';

import {DisplayBold, DisplayText} from '../components/AppText';
import Card from '../components/Card';
import AppActivityIndicator from '../components/AppActivityIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppHeader2 from '../components/AppHeader2';

import {AppLayout, AppColors} from '../constants';

import {driverProfileImage} from '../utils/imagesCollection';
import {driverNumberImage} from '../utils/imagesCollection';
import {simulateServerResponse} from '../data/index';

class Driver extends React.Component {
  state = {
    isAnimationOver: false,
    driverInfo: null,
    header: true,
  };

  /* Animated values */
  fadeOut = new Animated.Value(1);
  fadeIn = new Animated.Value(0);

  async componentDidMount() {
    const driverData = this.props.route.params.driverData;

    const header = this.props.route.params.header;

    console.log(header);

    this.setState({header});

    let response1 = await fetch(
      `https://ergast.com/api/f1/drivers/${driverData.Driver.driverId}.json`,
    );

    response1 = await response1.json();

    let data = response1;

    console.log(data.MRData);

    /* Simulated server response */
    let response = await simulateServerResponse(
      'drivers',
      driverData.Driver.driverId,
    );

    this.setState({driverInfo: response});

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
      this.setState({isAnimationOver: true});
    });
  }

  navigationHandler(routeName) {
    this.props.navigation.navigate('Home');
  }

  render() {
    const driverData = this.props.route.params.driverData;

    const header = this.state.header;

    return (
      <View style={styles.screen}>
        {!this.state.isAnimationOver && (
          <AppActivityIndicator fadeOut={this.fadeOut} />
        )}

        {header ? (
          <AppHeader2
            onPress={() => this.props.navigation.goBack()}
            screenTitle={driverData.Driver.familyName}
          />
        ) : null}

        {this.state.driverInfo && (
          <Animated.ScrollView style={{opacity: this.fadeIn}}>
            {/* PROFILE IMAGE */}

            {!header && (
              <View
                style={{
                  width: 52,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 100,
                }}>
                <Ionicons.Button
                  backgroundColor="transparent"
                  name={'arrow-back-outline'}
                  size={32}
                  color={'white'}
                  onPress={() => this.props.navigation.goBack()}
                />
              </View>
            )}
            <Image
              source={driverProfileImage[driverData.Driver.driverId]}
              resizeMode="contain"
              style={{
                width: AppLayout.deviceWidth,
                height: AppLayout.deviceWidth,
                zIndex: 0,
              }}
            />

            {/* ----- */}

            <View style={styles.driverInfoContainer}>
              {/* NUMBER AND NAME */}
              <View style={styles.nameBox}>
                {
                  <Image
                    source={driverNumberImage[driverData.Driver.driverId]}
                    resizeMode="contain"
                    style={{
                      width: AppLayout.deviceWidth / 4,
                      height: AppLayout.deviceWidth / 4,
                      zIndex: 0,
                    }}
                  />
                }

                <DisplayBold style={{fontSize: 18, textTransform: 'uppercase'}}>
                  {this.state.driverInfo.firstName}{' '}
                  {this.state.driverInfo.lastName}
                </DisplayBold>
              </View>
              {/* -----*/}

              {/* CHAMPIONSHIP STANDINGS */}
              <View style={styles.championshipStandings}>
                <Card wrapperStyle={styles.championshipStat}>
                  <View style={{flex: 1}}>
                    <DisplayText style={{fontSize: 12, lineHeight: 16}}>
                      Championship Position
                    </DisplayText>
                  </View>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <DisplayBold
                      style={{fontSize: 36, color: AppColors.strongRed}}>
                      {driverData.position}
                    </DisplayBold>
                  </View>
                </Card>
                <Card wrapperStyle={styles.championshipStat}>
                  <View style={{flex: 1}}>
                    <DisplayText style={{fontSize: 12, lineHeight: 16}}>
                      Championship Points
                    </DisplayText>
                  </View>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <DisplayBold
                      style={{fontSize: 36, color: AppColors.strongRed}}>
                      {driverData.points}
                    </DisplayBold>
                  </View>
                </Card>
              </View>
              {/* ----- */}

              {/* ADDITIONAL INFORMATIONS */}
              <View style={styles.additionalInfo}>
                {/* Title */}
                <View style={{marginTop: AppLayout.baseMargin * 2}}>
                  <DisplayBold>Statistic</DisplayBold>
                  <DisplayText style={styles.sectionTitleDesc}>
                    Some interesting facts
                  </DisplayText>
                </View>
                {/* -----*/}

                {/* Data */}
                <View style={{marginTop: AppLayout.baseMargin * 1.5}}>
                  <View style={styles.additionalInfoRow}>
                    <View style={{flex: 1, marginRight: AppLayout.baseMargin}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.driverInfo.championships}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Championships
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.driverInfo.podiums}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Total Podiums
                      </DisplayText>
                    </View>
                  </View>
                  <View style={styles.additionalInfoRow}>
                    <View style={{flex: 1, marginRight: AppLayout.baseMargin}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.driverInfo.grandPrix}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Total Grand Prix
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.driverInfo.points}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Total Points
                      </DisplayText>
                    </View>
                  </View>
                </View>
                {/* ----- */}

                {/* Title */}
                <View style={{marginTop: AppLayout.baseMargin * 2}}>
                  <DisplayBold>Additional informations</DisplayBold>
                  <DisplayText style={styles.sectionTitleDesc}>
                    Other infromations about driver
                  </DisplayText>
                </View>
                {/* -----*/}

                {/* Data */}
                <View style={{marginVertical: AppLayout.baseMargin * 1.5}}>
                  <View style={{marginBottom: 14}}>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.driverInfo.birthPlace}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Place of Birth
                    </DisplayText>
                  </View>
                  <View>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.driverInfo.birthDate}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Date of Birth
                    </DisplayText>
                  </View>
                </View>
                {/* ----- */}
              </View>
              {/* ----- */}
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
    position: 'relative',
  },
  driverInfoContainer: {
    flex: 1,
    backgroundColor: AppColors.backgroundMain,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    marginTop: -40,
  },
  nameBox: {
    marginTop: AppLayout.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  championshipStandings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: AppLayout.baseMargin * 2,
    marginHorizontal: AppLayout.baseMargin,
  },
  championshipStat: {
    width:
      AppLayout.deviceWidth / 2 -
      AppLayout.baseMargin -
      AppLayout.baseMargin / 2,
    maxWidth:
      AppLayout.deviceWidth / 2 -
      AppLayout.baseMargin -
      AppLayout.baseMargin / 2,
    height: 120,
    backgroundColor: AppColors.backgroundLight,
  },
  additionalInfo: {
    paddingHorizontal: AppLayout.basePadding,
    marginTop: AppLayout.baseMargin,
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  additionalInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: AppLayout.baseMargin,
  },
  sectionTitleDesc: {
    marginTop: 4,
    fontSize: 12,
    color: AppColors.textCaption,
  },
});

export default Driver;
