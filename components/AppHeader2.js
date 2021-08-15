import React from 'react';
import {View, StyleSheet, Image, StatusBar} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DisplayText} from './AppText';
import {AppColors, AppLayout} from '../constants';

const STATUS_BAR_HEIGHT = StatusBar.currentHeight;

class AppHeader2 extends React.Component {
  onPressHandler(routeName) {
    this.props.onPress(routeName);
  }

  render() {
    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <View style={styles.headerInfo}>
            <Ionicons
              name={'arrow-back'}
              size={32}
              color={'white'}
              style={{marginRight: 10}}
              {...this.props}
            />
            <DisplayText>{this.props.screenTitle}</DisplayText>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: 96 + STATUS_BAR_HEIGHT,
    flexDirection: 'row',
    backgroundColor: AppColors.backgroundRed,
    paddingTop: 40,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: AppLayout.baseMargin,
    paddingTop: STATUS_BAR_HEIGHT,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  appLogo: {
    width: 62,
    marginRight: 10,
  },
});

export default AppHeader2;
