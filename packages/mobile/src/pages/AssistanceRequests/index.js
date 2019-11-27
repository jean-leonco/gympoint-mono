import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import Button from '../../components/Button';
import Empty from '../../components/Empty';

import {
  Container,
  Content,
  RequestList,
  Request,
  RequestHeader,
  RequestStatus,
  RequestTitle,
  CheckInDate,
  RequestContent,
} from './styles';

import logo from '../../assets/logo-side.png';
import colors from '../../styles/colors';

export default function AssistanceRequests({ navigation }) {
  const [requests, setRequests] = useState([]);
  const [id, setId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const loadRequests = useCallback(async () => {
    try {
      if (!id) return;

      if (!hasNextPage && nextPage !== 1) return;

      const response = await api.get(`students/${id}/assistance-requests`, {
        params: {
          page: nextPage,
        },
      });

      const { data, total } = response.data;

      const pages = Math.ceil(total / 20);

      const parsedData = data.map(a => ({
        ...a,
        parsedDate: formatDistance(parseISO(a.created_at), new Date()),
      }));

      setRequests(nextPage === 1 ? parsedData : [...requests, parsedData]);

      sethasNextPage(pages > 1);
      setNextPage(nextPage + 1);
    } catch (error) {
      errorHandler(error, 'Error loading assistance requests');
    }
  }, [id, requests, hasNextPage, nextPage]);

  useEffect(() => {
    async function loadId() {
      const studentId = await AsyncStorage.getItem('studentid');
      setId(studentId);
    }

    loadId();
  }, []);

  useEffect(() => {
    loadRequests();
  }, [id]); //eslint-disable-line

  async function handleEndReached() {
    setLoadingPage(true);
    await loadRequests();
    setLoadingPage(false);
  }

  async function handleRefresh() {
    setRefreshing(true);
    setNextPage(1);
    await loadRequests();
    setRefreshing(false);
  }

  return (
    <Container>
      <Content>
        <Button onPress={() => navigation.navigate('NewRequest')}>
          New assistance request
        </Button>
        <RequestList
          data={requests}
          keyExtractor={item => String(item.id)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListFooterComponent={
            loadingPage && <ActivityIndicator color="#999" size="small" />
          }
          ListEmptyComponent={<Empty>There is no assistance requests</Empty>}
          renderItem={({ item }) => (
            <Request
              onPress={() =>
                navigation.navigate('Answer', {
                  id: item.id,
                })
              }
            >
              <RequestHeader>
                <RequestStatus>
                  <Icon
                    name="check-circle"
                    color={item.answer_at ? colors.confirm : colors.nav}
                    size={16}
                  />
                  <RequestTitle answered={!!item.answer_at}>
                    {item.answer_at ? 'Answered' : 'Without answer'}
                  </RequestTitle>
                </RequestStatus>
                <CheckInDate>{item.parsedDate}</CheckInDate>
              </RequestHeader>
              <RequestContent>{item.question}</RequestContent>
            </Request>
          )}
        />
      </Content>
    </Container>
  );
}

AssistanceRequests.navigationOptions = () => ({
  headerTitle: () => <Image source={logo} />,
});

AssistanceRequests.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};
