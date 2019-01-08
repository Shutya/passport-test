import axios from 'axios';

class HttpService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    };

    this.service = axios.create({
      baseURL: this.baseUrl,
      withCredentials: true
    });
    this.service.interceptors.response.use(
      responseSuccessInterceptor,
      responseFailureInterceptor
    );
  }

  request({method, url, data, headers}) {
    return this.service.request({
      method,
      url,
      responseType: 'json',
      data,
      headers: Object.assign({}, headers, this.headers)
    })
      .then(({data}) => data);
  }

  get(url, headers = {}) {
    return this.service.request({
      method: 'get',
      url,
      data: null,
      headers: Object.assign({}, headers, this.headers)
    })
      .then(({data}) => data);
  }

  post(url, data, headers = {}) {
    return this.request({
      method: 'post',
      url,
      data,
      headers
    });
  }

  put(url, data, headers = {}) {
    return this.request({
      method: 'put',
      url,
      data,
      headers
    });
  }

  delete(url, data, headers = {}) {
    return this.request(url, {
      method: 'delete',
      url,
      data,
      headers
    });
  }
}

const responseSuccessInterceptor = (response) => {
  return response;
};

const responseFailureInterceptor = (error) => {
  if (error.response && error.response.status === 401 && location.hash !== '') {
    window.location = '';
  }
  return Promise.reject(error.response);
};

const httpClient = new HttpService(process.env.API_URL);

export default httpClient;
