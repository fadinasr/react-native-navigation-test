import React, {useState} from 'react';
import styled from 'styled-components/native';
import Parent from "./parent";
import {Navigation} from "react-native-navigation";
import useForceUpdate from "./useForceUpdate";

const newValue = () => Object.create(null);

export default function Sheet(props) {
  const forceUpdate = useForceUpdate();

  const Container = styled.View`
    flex: 1;
    background-color: #fff;
    align-items: center;
    justify-content: center;
  `;

  const Text = styled.Text`
   font-size: 16px;
   color: ${props => props.selected ? '#000' : '#A9ACB4'};
   fontFamily: Averta-Regular;
   width: 92%;
`;

  const Button = styled.TouchableOpacity`
    margin-top: 4.5%;
    background-color: #fff;
    border-width: 1px;
    width: 100px;
    height: 34px;
  `;

  // The parent selected value which will be used in form submission
  const [selected, setSelected] = useState('');

  const [fieldsColors, setFieldsColors] = useState({
    text: false,
  });

  // text is a required field to mock the functionality of required fields validation
  const requiredFields = ['text'];

  // Form Validator
  let validateFields = (body) => {
    let temp = fieldsColors;

    for (let field of requiredFields) {
      temp[field] = !body[field] || body[field] === '';
      setFieldsColors(temp);
    }

    return !Object.values(temp).reduce((res, item) => {
      return res || item;
    });
  };

  // Submit Form Mockup
  let handlePress = async () => {
    if (validateFields({text: selected})) {
      await Navigation.dismissAllModals();
    } else {
      // Should rerender
      forceUpdate();
    }
  }

  return (
    <Container>
      <Parent done={selected} heading='Test' onPress={async () => {
        // Pushing the Colored (Child Component into navigation to use radio button list)
        await Navigation.push(props.componentId, {
          component: {
            name: 'Colored',
            passProps: {
              selected: selected,
              setSelected: setSelected,
            },
            options: {
              topBar: {
                backButton: {
                  showTitle: false,
                  color: 'black',
                },
                title: {
                  text: 'Colored Child with List',
                },
              },
            },
          },
        });
      }} isRed={fieldsColors['text']}>
        <Text selected={selected}>
          {
            // This text field shows the selected value
            !selected || selected === '' ? 'Not filled' : selected
          }
        </Text>
      </Parent>
      <Button onPress={handlePress}>
        <Text>
          Validate
        </Text>
      </Button>
    </Container>
  );
}
