import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {AppLayout} from '../constants';

class Carousel extends React.Component {
  render() {
    const {style, ...props} = this.props;

    return (
      <ScrollView
        style={{...styles.container, ...style}}
        contentContainerStyle={styles.innerContainer}
        horizontal
        decelerationRate={0}
        snapToAlignment={'center'}
        showsHorizontalScrollIndicator={false}
        {...props}>
        {props.children}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    marginHorizontal: AppLayout.baseMargin / 2,
    paddingRight: AppLayout.baseMargin,
  },
});

export default Carousel;
