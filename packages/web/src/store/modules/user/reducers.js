import produce from 'immer';

const INITIAL_STATE = {
  name: '',
  id: '',
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_SUCCESS': {
        draft.name = action.payload.name;
        draft.id = action.payload.id;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.name = '';
        draft.id = '';
        break;
      }
      default:
    }
  });
}
