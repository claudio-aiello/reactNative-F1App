import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';

import Card from '../../components/Card';
import {DisplayBold, DisplayText} from '../../components/AppText';

import {AppLayout, AppColors} from '../../constants';
import {teamColors} from '../../constants/teamColors';
import {APIContext} from '../../context/apiContext';

class Constructors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoadingComplete: false,
      constructorStandings: [],
    };
  }

  static contextType = APIContext;

  async componentDidMount() {
    try {
      const data = this.context.data;

      /* Update state */
      this.setState({
        isLoadingComplete: true,
        constructorStandings: data.constructorStandings,
      });
    } catch (error) {
      console.log(`Error occured: ${error}`);
    }
  }

  onConstrucotrPressHandler(constructorData) {
    this.props.navigation.navigate('Team', {
      constructorData,
      header: false,
    });
  }

  /* Render constructors list */
  renderConstructorsList() {
    return this.state.constructorStandings.map((constructor, index) => {
      const highlightColor = teamColors[constructor.Constructor.constructorId];
      const itemKey = constructor.position;
      const marginBottom =
        this.state.constructorStandings.length - 1 === index ? 0 : 14;

      return (
        <TouchableOpacity
          key={itemKey}
          onPress={this.onConstrucotrPressHandler.bind(this, constructor)}
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
            wrapperStyle={{
              borderRadius: 100,
              marginBottom,
              backgroundColor: AppColors.backgroundMain,
            }}
            contentStyle={styles.cardContent}>
            <View
              style={{
                ...styles.cardBackground,
                backgroundColor: highlightColor,
              }}></View>

            <View style={styles.standing}>
              <DisplayBold style={{fontSize: 26}}>
                {constructor.position}
              </DisplayBold>
            </View>
            <View style={{flex: 1}}>
              <DisplayBold style={{marginLeft: 5}}>
                {constructor.Constructor.name.toUpperCase()}
              </DisplayBold>
              <DisplayText style={{fontSize: 12, marginTop: 6, marginLeft: 5}}>
                Wins {constructor.wins}
              </DisplayText>
            </View>
            <View style={{marginLeft: 14}}>
              <DisplayBold
                style={{
                  fontSize: 18,
                  color: AppColors.strongRed,
                  marginRight: 10,
                }}>
                {constructor.points}
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
        {this.state.constructorStandings.length > 0 && (
          <ScrollView style={styles.screen}>
            <View style={{flex: 1, margin: AppLayout.baseMargin}}>
              {this.renderConstructorsList()}
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
    height: 100,
    top: -50,
    left: -30,
    transform: [{rotate: '15deg'}],
  },
  screen: {
    backgroundColor: AppColors.backgroundLight,
  },
});

export default Constructors;
