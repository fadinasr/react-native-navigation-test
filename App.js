import React, {useEffect, useState} from 'react';
import {Navigation} from "react-native-navigation";
import styled from 'styled-components/native';
import useForceUpdate from "./src/components/useForceUpdate";
import ItemsCounter from "./src/components/itemsCounter";
import RandomColorCount from "./src/components/randomColorCount";
import SmokingNotebookStats from "./src/components/smokingStats";

export default function App() {
  const [data, setData] = useState(['test', 'test2', 'test3']);
  const forceUpdate = useForceUpdate();

  let openSheet = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'Sheet',
            passProps: {
              data,
              setData
            },
            options: {
              topBar: {
                title: {
                  text: 'Sheet',
                }
              },
            },
          },
        }],
      },
    });
  };

  const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;

  const Button = styled.TouchableOpacity`
    border-color: #faf;
    border-width: 1px;
    width: 200px;
    align-items: center;
  `;

  const ButtonText = styled.Text`
    color: #000;
  `;

  const DataContainer = styled.View`
    display: flex;
    margin-top: 50px;
  `;

  Navigation.events().registerModalDismissedListener(({ componentId, componentName, passProps }) => {
    forceUpdate();
  });

  return (
    <Container>
      <Button onPress={openSheet}>
        <ButtonText>Test</ButtonText>
      </Button>
      <DataContainer>
        {
          data.map(item => <ButtonText key={item}>{item}</ButtonText>)
        }
      </DataContainer>
      <SmokingNotebookStats data={data}/>
    </Container>
  );
}
