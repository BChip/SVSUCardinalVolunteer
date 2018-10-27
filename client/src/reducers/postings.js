import {
  FETCH_POSTINGS, DELETE_POSTINGS, CREATE_POSTINGS,
} from '../actions/types';

const postingsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTINGS:
      return { ...state, homePagePostings: action.payload };
    case CREATE_POSTINGS:
      return { ...state };
    case DELETE_POSTINGS:
      return { ...state, homePagePostings: state.homePagePostings.filter(value => value.id !== action.payload) };
    default:
      return state;
  }
};

export default postingsReducer;
