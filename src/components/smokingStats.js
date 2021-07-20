import {Animated, Dimensions, TouchableOpacity, View} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import React, {PureComponent} from 'react';
import styled from 'styled-components/native';
import BarChart from './barChart';

const Container = styled.View`
  width: 100%;
  height: 350px;
`;
const SubContainer = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`;
const SegmentButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
`;
const ButtonContainer = styled.View`
  justify-content: center;
  width: 100%;
  align-items: center;
`;
const ViewMoreButton = styled.TouchableOpacity`
  width: 30%;
  border-radius: 25px;
  background-color: #1C45E6;
  border-width: 1px;
  border-color: #1C45E6;
  height: 34px;
  margin-top: 5%;
  margin-bottom: 5%;
`;
const ViewMoreButtonText = styled.Text`
  color: #fff;
  text-align: center;
  margin: auto;
  font-weight: 700;
  font-size: 14px;
`;
const StatsTextContainer = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;
const StatsTextColmn = styled.View`
  display: flex;
  flex-direction: column;
  flex-basis: 30%;
`;
const StatsTextHeading = styled.Text`
  text-align: center;
  color: #1C45E6;
  font-weight: 600;
  margin-top: 10%
  margin-bottom: 5%
`;
const StatsText = styled.Text`
  text-align: center;
  font-weight: 600;
`;
const SubHeadingContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 3%;
  margin-top: 3%;
  margin-left: 2%;
  align-items: center;
`;
const SubHeading = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #242A40;
`;
const Icon = styled.Image`
  resize-mode: contain;
  margin-right: 1%;
  margin-left: 1%;
  height: 22px;
  width: 22px;
`;

class SmokingNotebookStats extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initialLayout: {width: Dimensions.get('window').width, height: Dimensions.get('window').height},
      initialValueHalfCircle: 0,
      translateX: new Animated.Value(0),
      timePerDegree: 3000,
      index: 0,
      animationState: 0,
      xTabOne: 0,
      xTabTwo: 1,
      translateX: new Animated.Value(0),
      translateXTabOne: new Animated.Value(0),
      translateXTabTwo: new Animated.Value(Dimensions.get('window').width),
      userLogs: undefined,
      userLogsMoment: undefined,
      routes: [
        {key: 'smoking', title: 'Smoking'},
        {key: 'craving', title: 'Craving'},
      ],
      smokingDaysData: [],
      cravingDaysData: [],
      width: Dimensions.get('window').width,
    };
  }

  handleSlide = (type) => {
    let {translateX, animationActive, translateXTabOne, translateXTabTwo, width} = this.state;
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
    if (animationActive === 0) {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    } else {
      Animated.parallel([
        Animated.spring(translateXTabOne, {
          toValue: -width,
          duration: 100,
          useNativeDriver: true,
        }).start(),
        Animated.spring(translateXTabTwo, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }).start(),
      ]);
    }
  };

  // Receive data from API
  // We have an array in the bar chart that has the week days starting by today
  // We have to filter the log data to return data for a week starting today
  // We have to count the records in the data to the corresponding day of week
  getDaysStartingTodaySmoking = async () => {
    let tempDaysData = [];
    for (let i = 0; i < 7; i++) {
      let temp = {
        label: `Day ${i}`,
        logs: 2,
      };
      tempDaysData.push(temp);
    }

    tempDaysData.reverse();

    this.setState({
      smokingDaysData: tempDaysData,
    });
  };

  getDaysStartingTodayCraving = async () => {
    let tempDaysData = [];
    for (let i = 0; i < 7; i++) {
      let temp = {
        label: `Day ${i}`,
        logs: 2,
      };
      tempDaysData.push(temp);
    }

    tempDaysData.reverse();

    this.setState({
      cravingDaysData: tempDaysData,
    });
  };

  getSmokingCravingData = async () => {

    let data = this.props.data;

    let tempSmoking = this.state.smokingDaysData;
    let tempCraving = this.state.cravingDaysData;

    for (let item of data) {
      for (let obj of tempSmoking) {
        if (obj.label === 'Day 6') { // Just to test
          obj.logs += 1;
        }
      }
    }

    for (let item of data) {
      for (let obj of tempCraving) {
        if (obj.label === 'Day 1') { // Just to test
          obj.logs += 1;
        }
      }
    }

    this.setState({smokingDaysData: tempSmoking, cravingDaysData: tempCraving});
  };

  async componentDidMount() {
    await this.getDaysStartingTodayCraving();
    await this.getDaysStartingTodaySmoking();
    await this.getSmokingCravingData();
    this.forceUpdate();
  }

  async componentWillReceiveProps(nextProps) {
    // You don't have to do this check first, but it can help prevent an unneeded render
    if (nextProps.refreshing !== this.props.refreshing) {
      await this.getDaysStartingTodayCraving();
      await this.getDaysStartingTodaySmoking();
      await this.getSmokingCravingData();
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.Logs !== this.props.Logs) {
      await this.getDaysStartingTodayCraving();
      await this.getDaysStartingTodaySmoking();
      await this.getSmokingCravingData();
    }
  }


  genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

  SmokingRoute = () => {
    let key = this.genRanHex(12);
    return (
      <SubContainer>
        {this.state.smokingDaysData &&
        <BarChart id={key} data={this.state.smokingDaysData}/>}
        {
          this.state.smokingDaysData && <StatsText>{this.state.smokingDaysData.length}</StatsText>
        }
        <StatsTextContainer>
          <StatsTextColmn>
            <StatsTextHeading>Weekly Total</StatsTextHeading>
            <StatsText>34 Cigarettes</StatsText>
          </StatsTextColmn>
          <StatsTextColmn>
            <StatsTextHeading>Top Trigger</StatsTextHeading>
            <StatsText>Eating</StatsText>
          </StatsTextColmn>
          <StatsTextColmn>
            <StatsTextHeading>Avg Intensity</StatsTextHeading>
            <StatsText>Medium</StatsText>
          </StatsTextColmn>
        </StatsTextContainer>
      </SubContainer>
    );
  };

  CravingRoute = () => {
    let key = this.genRanHex(12);
    return (
      <SubContainer>
        {this.state.cravingDaysData &&
        <BarChart id={key} data={this.state.cravingDaysData} refreshing={this.props.refreshing}/>}
        <StatsTextContainer>
          <StatsTextColmn>
            <StatsTextHeading>Top Trigger</StatsTextHeading>
            <StatsText>Eating</StatsText>
          </StatsTextColmn>
        </StatsTextContainer>
      </SubContainer>
    );
  };

  renderScene = SceneMap({
    'smoking': this.SmokingRoute,
    'craving': this.CravingRoute,
  });

  renderTabBar = (props) => {
    let {translateX, xTabOne, xTabTwo} = this.state;
    return (
      <View style={{
        marginTop: 10,
        marginBottom: 10,
      }}>
        <View
          style={{
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              height: 34,
              position: 'relative',
              backgroundColor: '#E6E6E6',
              borderRadius: 25,
            }}
          >
            <Animated.View
              style={{
                position: 'absolute',
                width: '50%',
                height: '100%',
                top: 0,
                left: 0,
                backgroundColor: '#1C45E6',
                borderRadius: 25,
                borderColor: '#E6E6E6',
                borderWidth: 1,
                transform: [
                  {
                    translateX,
                  },
                ],
              }}
            />
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 25,
                borderColor: '#E6E6E6',
                // borderColor: '#1C45E6',
                backgroundColor: 'transparent',
              }}
              onLayout={e => this.setState({xTabOne: e.nativeEvent.layout.x})}
              onPress={() => {
                this.handleSlide(xTabOne);
                this.setState({index: 0, animationActive: 0});
              }}
            >
              <SegmentButtonText>Smoking</SegmentButtonText>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderRadius: 25,
              }}
              onLayout={e => this.setState({tabTwo: e.nativeEvent.layout.x})}
              onPress={() => {
                this.handleSlide(xTabTwo);
                this.setState({index: 1, animationActive: 1});
              }}
            >
              <SegmentButtonText>Craving</SegmentButtonText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  render() {
    let {index, xTabTwo, xTabOne, routes, initialLayout} = this.state;

    return (
      <Container>
        <TabView
          navigationState={{index, routes}}
          renderScene={this.renderScene}
          renderTabBar={this.renderTabBar}
          onIndexChange={() => this.setState({index: index === 0 ? xTabTwo : xTabOne})}
          initialLayout={{
            width: 350,
            height: 300
          }}
          onSwipeStart={() => this.handleSlide(index === 0 ? xTabTwo : xTabOne)}
          onSwipeEnd={() => this.handleSlide(index === 0 ? xTabOne : xTabTwo)}
        />
      </Container>
    );
  };
}

export default SmokingNotebookStats;
