import Axios, { AxiosInstance } from 'axios';

const HttpClient = Axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

HttpClient.interceptors.request.use(
  (request) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[HTTP] ${request.method} ${request.url}`);
    }
    return request;
  },
  (error) => {
    //
  }
);

class HttpService {
  constructor(axiosInstance: AxiosInstance) {
    this.http = axiosInstance;
  }
  private readonly http: AxiosInstance;

  public get(url: string, params: any) {
    return HttpClient.get(url, { params });
  }

  public async post(url: string, data: any) {
    return HttpClient.post(url, data);
  }

  public async put(url: string, data: any) {
    return HttpClient.put(url, data);
  }

  public async delete(url: string, data: any) {
    return HttpClient.delete(url, data);
  }
}

const HttpServiceInstance = new HttpService(HttpClient);

export default HttpServiceInstance;
