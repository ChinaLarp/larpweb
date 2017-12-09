import { SET_CURRENT_USER,SET_USER_DRADTS } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  isAuthenticated: false,
  user: {},
  drafts:[]
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      };
      case SET_USER_DRADTS:
        return {
          ...state,
          drafts: action.drafts
        };
    default: return state;
  }
}
