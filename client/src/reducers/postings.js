import {
  FETCH_POSTINGS, DELETE_POSTINGS, CREATE_POSTINGS, FETCH_FAILURE_POSTING, FETCH_SINGLE_POSTING, UPDATE_POSTING, UPDATE_RSVP,
} from '../actions/types';

const postingsReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_FAILURE_POSTING:
      return { ...state, homePagePostings: action.payload };
    case FETCH_POSTINGS:
      return { ...state, homePagePostings: action.payload };
    case CREATE_POSTINGS:
      return { ...state };
    case DELETE_POSTINGS:
      return {
        ...state,
        homePagePostings: state.homePagePostings.filter(value => value.id !== action.payload),
      };
    case FETCH_SINGLE_POSTING:
      return { ...state, singlePosting: action.payload };

    case UPDATE_POSTING:
      return { ...state, singlePosting: action.payload, successPosting: action.success };
    case UPDATE_RSVP:
      return { ...state, rsvpdata: action.payload, rsvpcondition: action.success };
    default:
      return state;
  }
};

export default postingsReducer;
