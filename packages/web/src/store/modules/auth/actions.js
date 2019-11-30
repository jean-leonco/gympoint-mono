export function signRequest(email, password) {
  return {
    type: '@auth/SIGN_REQUEST',
    payload: {
      email,
      password,
    },
  };
}

export function signSuccess(token, name, id) {
  return {
    type: '@auth/SIGN_SUCCESS',
    payload: {
      token,
      name,
      id,
    },
  };
}

export function logOut() {
  return {
    type: '@auth/SIGN_OUT',
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
