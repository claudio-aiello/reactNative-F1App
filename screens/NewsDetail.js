import Header from '../components/Header';
import Button from '../components/Button';
import Tag from '../components/Tag';
import TimeAgo from '../components/Time';
import {NewsImages} from '../utils/imagesCollection';
import React, {Fragment, useRef, useState} from 'react';
import {WebView} from 'react-native-webview';
import {
  Animated,
  I18nManager,
  ScrollView,
  Share,
  Modal,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import {AppColors} from '../constants';

const NewsDetail = props => {
  const {navigation, route} = props;
  const {item} = route.params;
  const [modal, setModal] = useState(false);
  const [heightHeader, setHeightHeader] = useState(45);
  const scrollY = useRef(new Animated.Value(0)).current;
  const {url, urlToImage, author, publishedAt, title, content} = item;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: url,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleModalClose = () => {
    setModal(false);
  };

  const handleModalOpen = () => {
    setModal(true);
  };

  //For header background color from transparent to header color
  const headerBackgroundColor = scrollY.interpolate({
    inputRange: [0, 140],
    outputRange: ['white', '#E5634D'],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //For header image opacity
  const headerImageOpacity = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader - 20],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
    useNativeDriver: true,
  });

  //artist profile image position from top
  const heightViewImg = scrollY.interpolate({
    inputRange: [0, 250 - heightHeader],
    outputRange: [250, heightHeader],
    // extrapolate: "clamp",
    useNativeDriver: true,
  });

  const renderContent = () => {
    return (
      <Fragment>
        <View style={styles.contentDescription}>
          <Text
            style={{
              fontSize: 16,
              lineHeight: 20,
              paddingTop: 10,
              paddingBottom: 20,
              color: 'white',
            }}
            numberOfLines={100}>
            {content}
          </Text>
        </View>

        <Button
          full
          style={{
            marginTop: 20,
            marginBottom: 20,
            width: '50%',
            alignSelf: 'center',
          }}
          onPress={handleModalOpen}>
          {'Read more'}
        </Button>
        <Modal animationType="slide" transparent={false} visible={modal}>
          <SafeAreaView
            style={{flex: 1, backgroundColor: 'red'}}
            edges={['right', 'top', 'left']}>
            <Header
              title={title}
              style={{}}
              renderLeft={() => {
                return (
                  <Animated.Image
                    resizeMode="contain"
                    style={[
                      styles.icon2,
                      {
                        transform: [
                          {
                            scaleX: I18nManager.isRTL ? -1 : 1,
                          },
                        ],
                        tintColor: headerBackgroundColor,
                      },
                    ]}
                    source={NewsImages.angleLeft}
                  />
                );
              }}
              renderRight={() => {
                return (
                  <Animated.Image
                    resizeMode="contain"
                    style={[
                      styles.icon2,
                      {
                        tintColor: headerBackgroundColor,
                      },
                    ]}
                    source={NewsImages.shareAltSolid}
                  />
                );
              }}
              onPressLeft={handleModalClose}
              onPressRight={onShare}
            />
            <WebView
              source={{uri: url}}
              style={{flex: 1}}
              onError={handleModalClose}
              startInLoadingState
              scalesPageToFit
            />
          </SafeAreaView>
        </Modal>
      </Fragment>
    );
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{flex: 1, backgroundColor: AppColors.backgroundLight}}
        forceInset={{top: 'always', bottom: 'always'}}>
        <Header title={title} />
        <ScrollView
          onContentSizeChange={() => {
            setHeightHeader(45);
          }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          overScrollMode={'never'}
          style={{zIndex: 10}}
          scrollEventThrottle={16}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: scrollY},
              },
            },
          ])}>
          <View style={{height: 230 - heightHeader}} />
          <View
            style={{
              marginBottom: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '600',
                marginBottom: 10,
                color: 'white',
              }}>
              {title}
            </Text>

            <View style={styles.lineSpace}>
              <View>
                <TouchableOpacity style={styles.rateLine}>
                  <Tag
                    rateSmall
                    style={{marginRight: 5, backgroundColor: 'red'}}>
                    {author}
                  </Tag>
                  <TimeAgo time={publishedAt} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {renderContent()}
        </ScrollView>
      </SafeAreaView>
      <Animated.View
        style={[
          styles.headerImageStyle,
          {
            opacity: headerImageOpacity,
            height: heightViewImg,
          },
        ]}>
        <FastImage source={{uri: urlToImage}} style={{flex: 1}} />
      </Animated.View>
      <Animated.View style={[styles.headerStyle, {position: 'absolute'}]}>
        <SafeAreaView
          style={{width: '100%'}}
          forceInset={{top: 'always', bottom: 'never'}}>
          <Header
            title=""
            renderLeft={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      transform: [
                        {
                          scaleX: I18nManager.isRTL ? -1 : 1,
                        },
                      ],
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={NewsImages.angleLeft}
                />
              );
            }}
            renderRight={() => {
              return (
                <Animated.Image
                  resizeMode="contain"
                  style={[
                    styles.icon,
                    {
                      tintColor: headerBackgroundColor,
                    },
                  ]}
                  source={NewsImages.shareAltSolid}
                />
              );
            }}
            onPressLeft={() => {
              navigation.goBack();
            }}
            onPressRight={onShare}
          />
        </SafeAreaView>
      </Animated.View>
    </View>
  );
};

export default NewsDetail;

const styles = StyleSheet.create({
  headerStyle: {
    height: 'auto',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
  },
  headerImageStyle: {
    height: 250,
    width: '100%',
    top: 0,
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 998,
    paddingBottom: 20,
  },
  lineSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateLine: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentDescription: {
    marginHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
    // paddingBottom: 20
  },
  viewIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    bottom: 0,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon2: {
    width: 20,
    height: 20,
  },
});
