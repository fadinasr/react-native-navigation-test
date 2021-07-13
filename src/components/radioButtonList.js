import React from 'react';
import styled from 'styled-components/native';

export default function RadioButtonList(props) {
  const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;
  const Button = styled.TouchableOpacity`
  `
  const Text = styled.Text`
  `

  // Basic Radio buttons to select one of the values
  return (
    <Container>
      <Text> Selected: {props.selected}</Text>
      <Button onPress={() => props.setSelected('Option one')}>
        <Text>Option one</Text>
      </Button>
      <Button onPress={() => props.setSelected('Option Two')}>
        <Text>Option Two</Text>
      </Button>
    </Container>
  );
}
