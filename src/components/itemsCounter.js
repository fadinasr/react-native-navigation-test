import React from 'react';
import styled from 'styled-components/native';

export default function ItemsCounter(props) {
  const Container = styled.View`
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;

  const InputField = styled.Text`
    width: 250px;
    height: 50px;
    color: ${props => props.color};
  `;

  return (
    <Container>
      <InputField color='#000'>{props.data.length}</InputField>
    </Container>
  );
}
