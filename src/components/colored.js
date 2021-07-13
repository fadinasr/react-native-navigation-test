import React from 'react';
import styled from 'styled-components/native';
import RadioButtonList from "./radioButtonList";
import {Navigation} from "react-native-navigation";

export default function Colored(props) {
  const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;

  const InputField = styled.TextInput`
    width: 250px;
    height: 50px;
    background-color: ${props => props.color};
    color: #cacaca;
  `;

  return (
    <Container>
      <InputField color='#cacaca'/>
      <RadioButtonList selected={props.selected} setSelected={(item) => {
        // Use setSelected from parent to put the value in the form (sheet) state and go back once selected
        Navigation.pop(props.componentId);
        props.setSelected(item)
      }} />
    </Container>
  );
}
