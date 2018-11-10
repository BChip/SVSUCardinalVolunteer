import {
  FETCH_USERS, DELETE_USERS, UPDATE_USERS,
} from '../actions/types';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, userlist: action.payload };
    case UPDATE_USERS:
      return { ...state };
    case DELETE_USERS:
      return {
        ...state,
        userlist: state.userlist.filter(value => value.id !== action.payload),
      };
    default:
      return state;
  }
};

export default userReducer;
