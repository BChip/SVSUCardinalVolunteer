import {
  FETCH_USERS, DELETE_USERS, UPDATE_USERS, FETCH_SINGLE_USER,
} from '../actions/types';

const initialstate = {};

const userReducer = (state = initialstate, action) => {
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
    case FETCH_SINGLE_USER:
      return { ...state, singleuser: action.payload };
    default:
      return state;
  }
};

export default userReducer;
