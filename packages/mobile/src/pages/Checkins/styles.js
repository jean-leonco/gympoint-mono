import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  padding: 20px;
  background: ${colors.background};
`;

export const CheckList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Checkin = styled.View`
  background: #fff;
  margin-top: 20px;
  padding: 16px 20px;

  border-radius: 4px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CheckinTitle = styled.Text`
  color: ${colors.label};
  font-size: 14px;
  font-weight: bold;
`;

export const CheckInDate = styled.Text`
  color: ${colors.text};
  font-size: 14px;
`;
