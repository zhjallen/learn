import superagent from 'superagent';
//import { withToken } from 'redux-auth';

const methods = [
  'get',
  'head',
  'post',
  'put',
  'del',
  'options',
  'patch'
];

class _Api {

  constructor(opts) {

    this.opts = opts || { headers: {} };

    if (!this.opts.baseURI)
      throw new Error('baseURI option is required');

    //withToken(token => dispatch => {
    //this.opts.headers.token = token;

    methods.forEach(method =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        let pathArray = path.split('/')
        let entid = window.EntId && _NOMES_VERNAME !== 'production' && _NOMES_VERNAME !== 'test-e' ? '/' + window.EntId : ''
        if (pathArray[1] === 'auth' || pathArray[1] === 'personal' || pathArray[1] === 'enterprise') {
          entid = ''
        }
        const request = superagent[method](this.opts.baseURI + entid + path);

        if (params) {
          request.query(params);
        }

        // this.opts.headers.token = "token";//window.localStorage.getItem('token');

        if (this.opts.headers) {
          request.set(this.opts.headers);
        }

        if (data) {
          request.send(data);
        }

        //request.end((err, { body } = {}) => err ? reject(body || err) : resolve(body));
        request.end((err, res) => err ? reject({ body: res ? res.body : null, status: res ? res.status:null, error: err }) : resolve({ body: res.body, status: res.status }));
      })
    );

    //});





  }

}

const Api = _Api;

export default Api;
