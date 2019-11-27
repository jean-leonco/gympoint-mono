import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  background: ${colors.background};
  margin-top: 44px;
  padding: 20px;
  flex: 1;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
  textAlignVertical: 'top',
})`
  width: 100%;
  height: 300px;
  background: #fff;
  color: ${colors.text};
  padding: 20px;
  margin-bottom: 20px;

  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;
