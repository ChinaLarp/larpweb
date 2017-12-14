import axios from 'axios';
import { FETCH_PRODUCTS } from './types';

export function setProducts(products) {
  return {
    type: FETCH_PRODUCTS,
    products
  };
}



export function fetchproducts() {
  var Url = "https://chinabackend.bestlarp.com/api/app?type__in=game";
  return dispatch => {
    return axios.get(Url).then(res => {
      dispatch(setProducts(res.data));
    });
  }
}
