import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';
import errorHandler from '../../../util/errorHandler';

import { signSuccess, signFailure } from './actions';
import { subscribeRequest } from '../websocket/actions';

export function* sign({ payload }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email: payload.email,
      password: payload.password,
    });

    const { token, name, id } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signSuccess(token, name, id));
    yield put(subscribeRequest());

    history.push('/students');
  } catch (error) {
    yield put(signFailure());
    errorHandler(error);
  }
}

export function* loadToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  const { id, name } = payload.user;

  if (token && id) {
    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signSuccess(token, name, id));
    yield put(subscribeRequest(id));
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', loadToken),
  takeLatest('@auth/SIGN_REQUEST', sign),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
