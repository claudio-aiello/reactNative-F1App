import React from 'react';
import {View, StyleSheet} from 'react-native';
import dayjs from 'dayjs';
import {DisplayBold, DisplayText} from './AppText';
import {AppColors} from '../constants';

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      difference: 700636969,
      days: this.addZero(this.calcTime('days')),
      hours: this.addZero(this.calcTime('hours')),
      minutes: this.addZero(this.calcTime('minutes')),
    };
  }

  addZero(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }

  calcTime(unit, difference) {
    switch (unit) {
      case 'days':
        return Math.floor(difference / (1000 * 60 * 60 * 24));
      case 'hours':
        return Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
      case 'minutes':
        return Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      default:
        return null;
    }
  }

  componentDidMount() {
    let countdownTime = setInterval(() => {
      let endDate = this.props.endDate;
      let difference = endDate.diff(dayjs());
      if (difference > 0) {
        this.setState({
          difference,
          days: this.addZero(this.calcTime('days', difference)),
          hours: this.addZero(this.calcTime('hours', difference)),
          minutes: this.addZero(this.calcTime('minutes', difference)),
        });
      } else clearInterval(countdownTime);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.countdown}>
        <View style={styles.counter}>
          <DisplayBold style={styles.counterNumber}>
            {this.state.days}
          </DisplayBold>
          <DisplayText style={styles.counterLabel}>days</DisplayText>
        </View>
        <View style={styles.counter}>
          <DisplayBold style={styles.counterNumber}>
            {this.state.hours}
          </DisplayBold>
          <DisplayText style={styles.counterLabel}>hours</DisplayText>
        </View>
        <View style={styles.counter}>
          <DisplayBold style={styles.counterNumber}>
            {this.state.minutes}
          </DisplayBold>
          <DisplayText style={styles.counterLabel}>minutes</DisplayText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  countdown: {
    flex: 1,
    flexDirection: 'row',
  },
  counter: {
    alignItems: 'center',
    marginRight: 14,
  },
  counterNumber: {
    fontSize: 36,
    color: AppColors.strongRed,
  },
  counterLabel: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
});

export default Countdown;
