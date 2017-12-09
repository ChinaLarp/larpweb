import { FETCH_PRODUCTS } from '../actions/types';
import isEmpty from 'lodash/isEmpty';

const initialState = {
  fetching: false,
  fetched: false,
  products: []
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
    case FETCH_PRODUCTS:
      return {
        fetching: false,
        fetched: true,
        products: action.products
      };
    default: return state;
  }
}
