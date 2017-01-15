import Api from './api';

// export const baseURI = 'http://localhost:9001/api';
export const baseURI = 'http://192.168.0.11';

const api = new Api({
  baseURI: baseURI,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'token': window.localStorage.getItem('token') ? window.localStorage.getItem('token') : ''
  }
})

export default api

