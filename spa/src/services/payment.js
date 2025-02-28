import axios from './base';

export default {
  get (params) {
    return axios.get('/payment/', {params: params})
  },
  getTable (params) {
    return axios.get('/payment/table', {params: params})
  },
  post (data) {
    return axios.post('/payment/', data);
  },
  delete (id) {
    return axios.delete(`/payment/${id}`);
  }
}
