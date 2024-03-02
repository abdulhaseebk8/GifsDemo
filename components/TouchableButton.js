import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styled from 'styled-components/native';

const StyledTouchableButton = styled(TouchableOpacity)`
  width: 60%;
  height: ${({buttonSize}) => (buttonSize === 'big' ? '50px' : '40px')};
  background-color: ${({color}) => color || 'blue'};
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px; /* Added marginBottom for gap between buttons */
`;

const StyledButtonText = styled(Text)`
  color: white; /* You can adjust the text color */
  font-size: 15px; /* You can adjust the font size */
`;

const TouchableButton = ({color, onPress, title, buttonSize}) => {
  return (
    <StyledTouchableButton
      color={color}
      onPress={onPress}
      buttonSize={buttonSize}>
      <StyledButtonText>{title}</StyledButtonText>
    </StyledTouchableButton>
  );
};

export default TouchableButton;
