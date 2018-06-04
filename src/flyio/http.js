//引入fly请求
const Fly = require("flyio/dist/npm/wx")
const fly = new Fly;

const qs = require('qs');



fly.config.timeout = 8000;
fly.config.baseURL = "https://www.tdaifu.cn:8443/taodoctor/rest/";

//添加请求拦截器
fly.interceptors.request.use(
  (request) => {
    if (request.method === 'POST') {
      request.body = qs.stringify(request.body)
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  })

//添加响应拦截器，响应拦截器会在then/catch处理之前执行
fly.interceptors.response.use(
  (response) => {
    //只将请求结果的data字段返回
    return response.data
  },
  (err) => {
    //发生网络错误后会走到这里
    return Promise.reject(err);
  }
)

export default fly;
