import React from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import AppHeader from '../components/AppHeader';
import {DisplayText} from '../components/AppText';
import Card from '../components/Card';

import {AppLayout, AppColors} from '../constants';
import {getArticles} from '../utils/news';

dayjs.extend(relativeTime);

class News extends React.Component {
  state = {
    articles: [],
    refreshing: false,
  };

  async componentDidMount() {
    getArticles().then(data => {
      this.setState({articles: data});
    });
  }

  goNewsDetail(item) {
    this.props.navigation.navigate('NewsDetail', {item});
  }

  renderArticle(item) {
    const title = item.title;
    const content = item.content;
    var date = item.publishedAt;

    return (
      <TouchableOpacity
        key={title}
        style={{
          marginBottom: AppLayout.baseMargin,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,

          elevation: 10,
        }}
        onPress={this.goNewsDetail.bind(this, item)}>
        <Card title={title}>
          <DisplayText style={styles.contentText}>
            {dayjs(date).fromNow()}
          </DisplayText>
          <DisplayText style={styles.contentText}>{content}</DisplayText>
        </Card>
      </TouchableOpacity>
    );
  }

  renderArticles() {
    return this.state.articles.map(article => {
      return this.renderArticle(article);
    });
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: AppColors.backgroundLight}}>
        <AppHeader screenTitle="F1 News" />
        <ScrollView>
          {this.state.articles.length > 0 && (
            <View
              style={{flex: 1, margin: AppLayout.baseMargin, marginBottom: 0}}>
              {this.renderArticles()}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentText: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default News;
