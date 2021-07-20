import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import ItemsCounter from "./itemsCounter";

export default function RandomColorCount(props) {
  const Container = styled.View`
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;

  const Colored = styled.View`
    width: 50px;
    height: 50px;
    background-color: ${props => props.color};
  `;

  const [color, setColor] = useState('#000');

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    setColor(getRandomColor());
  }, [props.data])

  return (
    <Container>
      <ItemsCounter data={props.data}/>
      <Colored color={color}/>
    </Container>
  );
}
