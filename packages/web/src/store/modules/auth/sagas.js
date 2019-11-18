import { takeLatest, all, call, put } from 'redux-saga/effects';

import api from '../../../services/api';
import history from '../../../services/history';
import errorHandler from '../../../util/errorHandler';

import { signSuccess, signFailure } from './actions';

export function* sign({ payload }) {
  try {
    const response = yield call(api.post, 'sessions', {
      email: payload.email,
      password: payload.password,
    });

    const { token, name } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signSuccess(token, name));

    history.push('/students');
  } catch (error) {
    yield put(signFailure());
    errorHandler(error);
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_REQUEST', sign),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
