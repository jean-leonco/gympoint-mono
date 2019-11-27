import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.View`
  margin-top: 100px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: ${colors.text};
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;
