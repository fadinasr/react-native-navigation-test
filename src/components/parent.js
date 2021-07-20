import React from 'react';
import styled from 'styled-components/native';

export default function Parent(props) {
  const Container = styled.View`
    background-color: #fff;
    align-items: center;
    justify-content: center;
    height: 350px;
  `;
  const ChildrenContainer = styled.View`
    display: flex;
    flex-direction: column;
  `
  const Heading = styled.Text`
    padding-top: 2px;
    padding-bottom: 5px;
    font-weight: 400;
    font-size: 18px;
  `
  const TickIcon = styled.Text`
    width: 10%;
    margin-top: 5%;
    margin-right: 2%;
    height: 25px;
  `;
  const ActionButton = styled.TouchableOpacity`
  margin-top: 4.5%;
  width: 50px;
  background-color: #fff;
  border-color: ${props => props.isRed ? '#f00' : '#000'};
  border-width: 1px;
  height: 34px;
`;

  const ActionButtonText = styled.Text`
  color: ${props => props.isRed ? '#f00' : '#cacaca'};
  text-align: center;
  margin: auto;
  font-weight: 600;
  font-size: 16px;
`;

  return (
    <Container>
      <ChildrenContainer>
        <Heading>{props.heading}</Heading>
        {props.children}
      </ChildrenContainer>
      {
        // This button disappears when a value is selected from the radio button list
        !props.done ? <ActionButton onPress={props.onPress} isRed={props.isRed}>
          <ActionButtonText isRed={props.isRed}>Add</ActionButtonText>
        </ActionButton> : <TickIcon>
          Selected
        </TickIcon>
      }

    </Container>
  );
}
