import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {DisplayText, DisplayBold} from './AppText';
import Card from './Card';
import {AppLayout} from '../constants';

class CardTouchable extends React.Component {
  onPressHandler(routeName) {
    this.props.onPress(routeName);
  }

  render() {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
          ...this.props.style,
        }}
        onPress={this.onPressHandler.bind(this, this.props.routeName)}>
        <Card>
          <View style={styles.header}>
            <View>
              <Ionicons
                name={this.props.iconName}
                size={this.props.iconSize}
                color={this.props.iconColor}
              />
            </View>
            <View style={{marginLeft: AppLayout.baseMargin}}>
              <DisplayBold style={{textTransform: 'uppercase'}}>
                {this.props.cardTitle}
              </DisplayBold>
            </View>
          </View>
          <View
            style={{
              marginTop: AppLayout.baseMargin / 2,
              marginLeft: AppLayout.baseMargin + this.props.iconSize - 4,
            }}>
            <DisplayText style={{fontSize: 12}}>
              {this.props.cardDescription}
            </DisplayText>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CardTouchable;
