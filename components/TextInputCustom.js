import React from 'react';
import styled from 'styled-components/native';

const StyledTextInput = styled.TextInput`
  width: 90%;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 4px;
  color:white;
`;

const TextInputCustom = ({placeholder, onChangeText, multiline}) => {
  return (
    <StyledTextInput
      placeholder={placeholder}
      onChangeText={onChangeText}
      multiline={multiline}
      numberOfLines={multiline ? 4 : 1}
      maxLength={200}
    />
  );
};

export default TextInputCustom;
