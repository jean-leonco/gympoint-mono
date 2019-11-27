import styled from 'styled-components/native';

import colors from '../../styles/colors';

export const Container = styled.SafeAreaView`
  margin-top: 44px;
  flex: 1;
`;

export const Content = styled.View`
  background: ${colors.background};
  padding: 20px;
  flex: 1;
`;

export const RequestList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Request = styled.TouchableOpacity`
  background: #fff;
  margin-top: 20px;
  padding: 20px;

  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const RequestHeader = styled.View`
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const RequestStatus = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const RequestTitle = styled.Text`
  color: ${props => (props.answered ? colors.confirm : colors.nav)};
  font-size: 14px;
  font-weight: bold;
  margin-left: 8px;
`;

export const CheckInDate = styled.Text`
  color: ${colors.text};
  font-size: 14px;
`;

export const RequestContent = styled.Text`
  color: ${colors.text};
  font-size: 14px;
  line-height: 26px;
`;
