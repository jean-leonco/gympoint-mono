import React, { useState, useEffect, useCallback } from 'react';
import { Text, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { formatDistance, parseISO } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api';
import errorHandler from '../../util/errorHandler';

import Header from '../../components/Header';
import Button from '../../components/Button';
import Empty from '../../components/Empty';

import {
  Container,
  Content,
  CheckList,
  Checkin,
  CheckinTitle,
  CheckInDate,
} from './styles';

export default function Checkins() {
  const [checkins, setCheckins] = useState([]);
  const [id, setId] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loadingPage, setLoadingPage] = useState(false);
  const [hasNextPage, sethasNextPage] = useState(true);
  const [nextPage, setNextPage] = useState(1);

  const loadCheckins = useCallback(async () => {
    try {
      if (!id) return;

      if (!hasNextPage && nextPage !== 1) return;

      const response = await api.get(`students/${id}/checkins`, {
        params: {
          page: nextPage,
        },
      });

      const { data, total } = response.data;

      const pages = Math.ceil(total / 20);

      const parsedData = data.map(c => ({
        ...c,
        parsedDate: formatDistance(parseISO(c.created_at), new Date()),
      }));

      setCheckins(nextPage === 1 ? parsedData : [...checkins, parsedData]);

      sethasNextPage(pages > 1);
      setNextPage(nextPage + 1);
    } catch (error) {
      errorHandler(error, 'Error loading check-ins');
    }
  }, [id, checkins, hasNextPage, nextPage]);

  useEffect(() => {
    async function loadId() {
      const studentId = await AsyncStorage.getItem('studentid');
      setId(studentId);
    }

    loadId();
  }, []);

  useEffect(() => {
    loadCheckins();
  }, [id]); //eslint-disable-line

  async function handleNewCheckIn() {
    try {
      if (!id) return;

      await api.post(`students/${id}/checkins`);
      loadCheckins();
    } catch (error) {
      errorHandler(error, 'Error on check-in creation');
    }
  }

  async function handleEndReached() {
    setLoadingPage(true);
    await loadCheckins();
    setLoadingPage(false);
  }

  async function handleRefresh() {
    setRefreshing(true);
    setNextPage(1);
    await loadCheckins();
    setRefreshing(false);
  }

  return (
    <Container>
      <Header />
      <Content>
        <Button onPress={handleNewCheckIn}>New Check-in</Button>
        <CheckList
          data={checkins}
          keyExtractor={item => String(item.id)}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.2}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          ListFooterComponent={
            loadingPage && <ActivityIndicator color="#999" size="small" />
          }
          ListEmptyComponent={<Empty>There is no check-ins</Empty>}
          renderItem={({ item }) => (
            <Checkin>
              <CheckinTitle>Check-in #{item.id}</CheckinTitle>
              <CheckInDate>{item.parsedDate}</CheckInDate>
            </Checkin>
          )}
        />
      </Content>
    </Container>
  );
}

Checkins.navigationOptions = {
  tabBarLabel: (
    { tintColor } //eslint-disable-line
  ) => (
    <Text
      style={{
        fontSize: 14,
        color: tintColor,
        marginBottom: 15,
        textAlign: 'center',
      }}
    >
      Check-ins
    </Text>
  ),
  tabBarIcon: (
    { tintColor } //eslint-disable-line
  ) => (
    <Icon
      style={{ marginTop: 15 }}
      name="edit-location"
      size={20}
      color={tintColor}
    />
  ),
};
