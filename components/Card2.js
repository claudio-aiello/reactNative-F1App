import React from 'react';
import {View, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {DisplayBold} from './AppText';
import {AppColors} from '../constants';

class Card2 extends React.Component {
  renderCardHeader(title) {
    return (
      <View style={styles.cardHeader}>
        <DisplayBold style={{lineHeight: 18, textTransform: 'uppercase'}}>
          {title}
        </DisplayBold>
      </View>
    );
  }

  renderCardWithGradient() {
    const {title, gradientColors} = this.props;

    return (
      <LinearGradient
        style={{...styles.card, ...this.props.wrapperStyle}}
        colors={gradientColors}>
        {this.renderCardHeader(title)}
        <View style={{...styles.content, ...this.props.contentStyle}}>
          {this.props.children}
        </View>
      </LinearGradient>
    );
  }

  renderCard() {
    const {title} = this.props;

    return (
      <View style={{...styles.card, ...this.props.wrapperStyle}}>
        {title ? this.renderCardHeader(title) : null}
        <View style={{...styles.content, ...this.props.contentStyle}}>
          {this.props.children}
        </View>
      </View>
    );
  }

  render() {
    const {gradientColors} = this.props;

    return gradientColors ? this.renderCardWithGradient() : this.renderCard();
  }
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    padding: 8,
    backgroundColor: AppColors.cardBackground,
    overflow: 'hidden',
    borderWidth: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
});

export default Card2;
