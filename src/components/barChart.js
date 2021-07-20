import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {Animated, Easing} from 'react-native';
import useForceUpdate from "./useForceUpdate";

const Container = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 150px;
`;
const Column = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const Row = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 1px;
`;

const Seperator = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  background: #cacaca;
  height: 0.5px;
  margin-left: 10px;
`;
const DayTitle = styled.Text`
  margin-left: 16px;
  width: 35px;
  font-size: 16px;
  font-weight: 400;
  text-align: center;
`;

const BarChart = (props: Props) => {
  const [animationState] = useState({});
  const forceUpdate = useForceUpdate();
  const [data, setData] = useState(props.data);

  props.data.forEach((item) => {
    animationState[item.label] = new Animated.Value(0);
  });

  let handleAnimation = () => {
    Animated.parallel(props.data.map(item => {
      let label = item.label;
      return Animated.timing(animationState[label],
        {
          toValue: item.logs * 10,
          duration: 2000,
          useNativeDriver: false,
          easing: Easing.linear,
        });
    })).start();
  };

  // This will launch if parent data changed
  useEffect(() => {
    // setData(props.data);
    //   forceUpdate();
    handleAnimation();
  }, [props.data]);


  return (
    <Container key={props.id}>
      <Row>
        {
          props.data.map((item, index) => {
            // let h = animationState[item.label]; // Animated Height
            let height = item.logs * 10; // Fixed Height
            let formattedLabel = item.label;
            return (
              <Column key={index}>
                <Row>
                  <Animated.View style={[
                    {
                      backgroundColor: '#1C45E6',
                      borderTopLeftRadius: 5,
                      borderTopRightRadius: 5,
                      marginLeft: 22, width: 20,
                      height: height,
                    },
                  ]}/>
                </Row>
                <Seperator/>
                <Row>
                  <DayTitle>{formattedLabel}</DayTitle>
                </Row>
              </Column>
            );
          })
        }
      </Row>
    </Container>
  );
};

export default BarChart;
