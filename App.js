import React from 'react';
import {Navigation} from "react-native-navigation";
import styled from 'styled-components/native';

export default function App() {

  let openSheet = () => {
    Navigation.showModal({
      stack: {
        children: [{
          component: {
            name: 'Sheet',
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
    
  `;

  const ButtonText = styled.Text`
    color: #000;
  `;

  return (
    <Container>
      <Button onPress={openSheet}>
        <ButtonText>Test</ButtonText>
      </Button>
    </Container>
  );
}
