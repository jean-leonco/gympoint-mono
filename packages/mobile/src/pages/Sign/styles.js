import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  background: #fff;
  padding: 0 25px;

  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image``;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  width: 100%;
  height: 46px;
  color: ${colors.text};
  padding: 0 20px;
  margin: 20px 0 15px 0;

  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;

  flex-direction: row;
  align-items: center;
`;
