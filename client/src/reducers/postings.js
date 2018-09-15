import {
  FETCH_POSTINGS,
} from '../actions/types';

const postingsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_POSTINGS:
      return { ...state, homePagePostings: action.payload };
    default:
      return state;
  }
};

export default postingsReducer;
