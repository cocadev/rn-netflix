import React, { Component } from 'react';
import {
  Dimensions,
  View,
  Image,
  FlatList,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { p } from '../../common/normalize';
import * as ICON from '../../components/Icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../store/common/actions';
import api from '../../api';
import _ from 'underscore';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const { width } = Dimensions.get('window');

class HomeScreen extends Component {
  elementList = [];

  constructor() {
    super();
    this.state = {
      visible: false,
      televisions: [],
    };
  }

  componentDidMount() {
    this.props.actions.loadAdvertises();
    api.getAllTV((err, res) => {
      res && this.setState({ televisions: res });
    });
  }

  // componentDidUpdate(prevProps, state) {
  //   if (prevProps.homeData !== this.props.homeData) {
  //     // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ firebase data is changed!')
  //     this.checkElements(6)
  //   }
  // }

  _renderItem = ({ item, index }) => (
    <Image key={index} source={{ uri: item }} style={{ width, height: 210 }} resizeMode="cover" />
  );

  addElement(element, id) {
    if (element == null) return;
    if (this.elementList.find(o => o.id == id)) return;
    this.elementList.push({ element, id, starTime: 0, total: 0 });
  }

  isInView(w, h, px, py) {
    if (px < 0 || py < 0 || w + px > screenWidth || h + py > screenHeight) return false;
    return true;
  }

  checkElements(scrollNumber) {
    // console.log(this.elementList.map(o => o.id))
    if (this.lock) return;
    this.lock = true;
    this.elementList.map(o => {
      o.element &&
        o.element.measure((fx, fy, width, height, px, py) => {
          if (this.isInView(width, height, px, py)) {
            if (o.starTime == 0) {
              o.starTime = new Date().getTime();
              console.log(o.id + '=> In');
            }
          } else {
            if (o.starTime != 0) {
              const current = new Date().getTime();
              const delta = current - o.starTime;
              console.log(o.id + '=> Out, Viewed time:', delta);
              this.onRequest(o.id, delta);
              o.starTime = 0;
              o.total = o.total + delta;
            }
          }
        });
    });
    this.lock = false;
  }

  onRequest(ad_id, time) {
    api.onRequestCounts(ad_id, time, new Date(), 1, (res, err) => {
      console.log('res +++', res);
    });
  }

  _renderItem2 = ({ item }, index) => (
    <View style={styles.item} key={index}>
      <Text style={styles.titleText}>{item.category_name}</Text>
      <FlatList
        horizontal
        data={item.ad_list}
        keyExtractor={(x, i) => String(i)}
        onScroll={() => this.checkElements(4)}
        renderItem={(x, k) => (
          <TouchableOpacity
            ref={e => this.addElement(e, x.item.ad_id)}
            onPress={() => this.props.navigation.navigate('Detail', { item: x.item })}
          >
            <Image style={styles.img} source={{ uri: x.item.image[0] }} key={k} />
            <View
              style={{
                position: 'absolute',
                right: 10,
                borderRadius: 20,
                padding: 3,
                backgroundColor: 'black',
                top: 2,
              }}
            >
              <Text style={{ color: '#fff' }}>{x.item.ad_id}</Text>
            </View>
          </TouchableOpacity>
        )}
        onViewableItemsChanged={this.onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 100,
        }}
      />
    </View>
  );

  myAdver(props) {
    return (
      <View ref={e => this.addElement(e, props.ad_id)} style={styles.advertise}>
        <Text style={styles.titleText}>{props.ad_category} Advertisement</Text>
        <Carousel
          data={props.image}
          renderItem={this._renderItem}
          sliderHeight={210}
          itemHeight={210}
          sliderWidth={width - 24}
          itemWidth={width}
          slideStyle={{ width }}
          inactiveSlideOpacity={1}
          inactiveSlideScale={1}
          autoplay
          loop
        />
        <Text style={styles.adverText}>{props.ad_description}</Text>
        <View style={styles.web}>
          <Text style={styles.redText} onPress={() => Linking.openURL(props.campaign_url)}>
            {'Visit US'}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <ICON.RoundADD />
            <ICON.Thumb />
          </View>
        </View>
      </View>
    );
  }

  render() {
    const { homeData } = this.props;
    return (
      <ScrollView onScroll={() => this.checkElements(1)} style={{ backgroundColor: '#0D0D0D' }}>
        {homeData && this.myAdver(homeData.current_ad)}
        <Text style={[styles.titleText, { marginLeft: 7, marginTop: 7 }]}>
          {'Choose TV Channels'}
        </Text>
        <ScrollView horizontal style={styles.tv}>
          {this.state.televisions.map((item, index) => (
            <View key={index}>
              <Image
                style={styles.ad1}
                source={{ uri: 'https://mobile.adsrecognition.com/' + item.logo }}
              />
              <Text style={styles.adText}>{item.radioname}</Text>
            </View>
          ))}
        </ScrollView>

        {homeData && (
          <FlatList
            onScroll={() => this.checkElements(2)}
            data={homeData.categories}
            keyExtractor={(item, i) => String(i)}
            renderItem={item => this._renderItem2(item, this.state)}
            ListFooterComponent={<View style={{ height: p(7) }} />}
          />
        )}

        {homeData && this.myAdver(homeData.main_sponsor)}
      </ScrollView>
    );
  }
}

export default connect(
  state => ({
    homeData: state.common.homeData,
  }),
  dispatch => ({
    actions: bindActionCreators({ ...actions }, dispatch),
  })
)(HomeScreen);

const styles = StyleSheet.create({
  slider: {
    margin: 4,
    marginBottom: 0,
    borderWidth: 1,
    borderColor: 'lightgrey',
    elevation: 2,
  },
  img: {
    width: p(120),
    height: p(180),
    borderRadius: 10,
    backgroundColor: 'lightgrey',
    marginHorizontal: 4,
  },
  item: {
    elevation: 2,
    marginLeft: 5,
    marginTop: 14,
  },
  titleText: {
    fontSize: 20,
    marginLeft: 2,
    fontWeight: '700',
    color: '#fff',
  },
  adText: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 3,
    color: '#fff',
    fontWeight: '700',
  },
  advertise: {
    padding: 4,
    borderColor: 'lightgrey',
    borderWidth: 1,
    margin: 7,
    elevation: 1,
  },
  web: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  adverText: {
    color: '#BBB',
    lineHeight: 18,
    marginTop: 9,
  },
  redText: {
    color: 'yellow',
    fontSize: 15,
    fontFamily: 'Rye-Regular',
  },
  tv: {
    flexDirection: 'row',
    marginLeft: 5,
  },
  ad1: {
    marginTop: 5,
    width: 120,
    height: 100,
    backgroundColor: 'lightgrey',
    marginHorizontal: 4,
  },
});
