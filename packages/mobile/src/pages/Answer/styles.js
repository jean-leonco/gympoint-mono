import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  background: ${colors.background};
  margin-top: 44px;
  flex: 1;
`;

export const Content = styled.View`
  background: #fff;
  margin: 20px;

  border: 1px solid #ddd;
`;

export const RequestBox = styled.View`
  padding: 20px;
`;

export const RequestHeader = styled.View`
  margin-bottom: 16px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  color: ${colors.label};
  font-size: 14px;
  font-weight: bold;
`;

export const Time = styled.Text`
  color: ${colors.text};
  font-size: 14px;
`;

export const Text = styled.Text`
  color: ${colors.text};
  font-size: 14px;
  line-height: 26px;
`;
