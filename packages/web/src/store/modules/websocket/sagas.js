import { takeLatest, all, select } from 'redux-saga/effects';

import ws from '../../../services/websocket';

export function closeUserChannel() {
  ws.close();
}

export function* connectToSocket() {
  const token = yield select(state => state.auth.token);

  ws.withApiToken(token).connect();
}

export default all([
  takeLatest('@ws/SUBSCRIBE_REQUEST', connectToSocket),
  takeLatest('@auth/SIGN_OUT', closeUserChannel),
]);
