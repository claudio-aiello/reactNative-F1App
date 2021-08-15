import React from 'react';
import {View, StyleSheet, Image, Animated} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {DisplayBold, DisplayText} from '../components/AppText';
import Card from '../components/Card';
import AppActivityIndicator from '../components/AppActivityIndicator';
import AppHeader2 from '../components/AppHeader2';

import {AppLayout, AppColors} from '../constants';
import {
  constructorCarImage,
  constructorLogoImage,
} from '../utils/imagesCollection';
import {simulateServerResponse} from '../data/index';

class Team extends React.Component {
  state = {
    isAnimationOver: false,
    teamInfo: null,
    header: true,
  };

  /* Animated values */
  fadeOut = new Animated.Value(1);
  fadeIn = new Animated.Value(0);

  async componentDidMount() {
    const constructorData = this.props.route.params.constructorData;

    const header = this.props.route.params.header;

    this.setState({header});

    console.log(constructorData);

    /* Simulated server response */
    let response = await simulateServerResponse(
      'teams',
      constructorData.Constructor.constructorId,
    );

    this.setState({teamInfo: response});

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

  render() {
    const constructorData = this.props.route.params.constructorData;

    const header = this.state.header;

    return (
      <View style={styles.screen}>
        {!this.state.isAnimationOver && (
          <AppActivityIndicator fadeOut={this.fadeOut} />
        )}

        {header ? (
          <AppHeader2
            onPress={() => this.props.navigation.goBack()}
            screenTitle={constructorData.Constructor.name}
          />
        ) : null}

        {this.state.teamInfo && (
          <Animated.ScrollView style={{opacity: this.fadeIn}}>
            {/* PROFILE IMAGE */}
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                source={
                  constructorCarImage[constructorData.Constructor.constructorId]
                }
                resizeMode="contain"
                style={{
                  width: AppLayout.deviceWidth - 80,
                  height: AppLayout.deviceWidth / 2,
                }}
              />
            </View>
            {/* ----- */}

            <View style={styles.constructorInfoContainer}>
              {/* NAME */}
              <View style={styles.nameBox}>
                <Image
                  source={
                    constructorLogoImage[
                      constructorData.Constructor.constructorId
                    ]
                  }
                  resizeMode="contain"
                  style={{
                    width: AppLayout.deviceWidth / 3,
                    height: AppLayout.deviceWidth / 3,
                    zIndex: 0,
                  }}
                />
                <DisplayBold style={styles.nameTitle}>
                  {this.state.teamInfo.name}
                </DisplayBold>
              </View>
              {/* ----- */}

              {/* CHAMPIONSHIP STANDINGS */}
              <View style={styles.championshipsStandings}>
                <Card wrapperStyle={styles.championshipStat}>
                  <View style={{flex: 1}}>
                    <DisplayText style={{fontSize: 12, lineHeight: 16}}>
                      Championship Position
                    </DisplayText>
                  </View>
                  <View style={{flex: 1, justifyContent: 'flex-end'}}>
                    <DisplayBold
                      style={{fontSize: 36, color: AppColors.strongRed}}>
                      {constructorData.position}
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
                      {constructorData.points}
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
                        {this.state.teamInfo.championships}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Championships
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.teamInfo.firstEntry}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        First Entry
                      </DisplayText>
                    </View>
                  </View>
                  <View style={styles.additionalInfoRow}>
                    <View style={{flex: 1, marginRight: AppLayout.baseMargin}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.teamInfo.poles}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Pole Positions
                      </DisplayText>
                    </View>
                    <View style={{flex: 1}}>
                      <DisplayBold style={{marginBottom: 2, fontSize: 22}}>
                        {this.state.teamInfo.fastestLaps}
                      </DisplayBold>
                      <DisplayText
                        style={{fontSize: 12, color: AppColors.textCaption}}>
                        Fastest Laps
                      </DisplayText>
                    </View>
                  </View>
                </View>
                {/* -----*/}

                {/* Title */}
                <View style={{marginTop: AppLayout.baseMargin * 2}}>
                  <DisplayBold>Additional informations</DisplayBold>
                  <DisplayText style={styles.sectionTitleDesc}>
                    Other infromations about team
                  </DisplayText>
                </View>
                {/* -----*/}

                {/* Data */}
                <View style={{marginVertical: AppLayout.baseMargin * 1.5}}>
                  <View style={{marginBottom: 14}}>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.teamInfo.drivers[0]}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Driver
                    </DisplayText>
                  </View>
                  <View style={{marginBottom: 14}}>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.teamInfo.drivers[1]}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Driver
                    </DisplayText>
                  </View>
                  <View style={{marginBottom: 14}}>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.teamInfo.teamChief}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Team Boss
                    </DisplayText>
                  </View>
                  <View style={{marginBottom: 14}}>
                    <DisplayText style={{marginBottom: 2}}>
                      {this.state.teamInfo.base}
                    </DisplayText>
                    <DisplayText
                      style={{fontSize: 12, color: AppColors.textCaption}}>
                      Headquarters
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
  },
  constructorInfoContainer: {
    flex: 1,
    backgroundColor: AppColors.backgroundLight,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  nameBox: {
    marginTop: AppLayout.baseMargin,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTitle: {
    fontSize: 18,
    textTransform: 'uppercase',
    lineHeight: 22,
    paddingHorizontal: 30,
    textAlign: 'center',
  },
  championshipsStandings: {
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
    backgroundColor: AppColors.backgroundMain,
  },
  additionalInfo: {
    paddingHorizontal: AppLayout.basePadding,
    marginTop: AppLayout.baseMargin,
    flex: 1,
    backgroundColor: AppColors.backgroundMain,
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

export default Team;
