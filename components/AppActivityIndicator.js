import React from 'react';
import {StyleSheet, ActivityIndicator, Animated} from 'react-native';
import {AppColors} from '../constants';

class AppActivityIndicator extends React.Component {
  fadeOut = this.props.fadeOut;

  render() {
    return (
      <Animated.View
        style={{
          ...styles.loadingScreen,
          opacity: this.fadeOut,
          transform: [
            {perspective: 1000},
            {
              scale: this.fadeOut.interpolate({
                inputRange: [0, 1],
                outputRange: [6, 1],
              }),
            },
          ],
          ...this.props.style,
        }}>
        <ActivityIndicator size="large" color={AppColors.white} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    backgroundColor: AppColors.backgroundMain,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
});

export default AppActivityIndicator;
