import axios from 'axios';
import qs from 'qs';
//二次封装
const pending = {}
const CancelToken = axios.CancelToken
const removePending = (key, isRequest = false) => {
    if (pending[key] && isRequest) {
        pending[key]('取消重复请求')
    }
    delete pending[key]
}
const getRequestIdentify = (config, isReuest = false) => {
  let url = config.url
  if (isReuest) {
    url = config.baseURL + config.url.substring(1, config.url.length)
  }
  return config.method === 'get' ? encodeURIComponent(url + JSON.stringify(config.params)) : encodeURIComponent(config.url + JSON.stringify(config.data))
};
axios.defaults.timeout = '100000';
axios.defaults.withCredentials = true;
// 请求拦截器
axios.interceptors.request.use(config => {
    // 拦截重复请求(即当前正在进行的相同请求)
    let requestData = getRequestIdentify(config, true)
    removePending(requestData, true)

    config.cancelToken = new CancelToken((c) => {
        pending[requestData] = c
    })

    return config
  }, error => {
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    // 把已经完成的请求从 pending 中移除
    let requestData = getRequestIdentify(response.config);
    removePending(requestData);
    if (response.status === 200){
        let res = response.data;
        if(res.headInfo.respCode==='0004'){
            if(res.body===null){
                alert(res.head.respMsg)
            }else{
                window.location.href=res.body;
            }
        }else{
            Promise.resolve(res);
        }
    }
    return response.data
  }, error => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
            error.message = '错误请求'
            break
        case 401:
            error.message = '未授权，请重新登录'
            break
        case 403:
            error.message = '拒绝访问'
            break
        case 404:
            error.message = '请求错误,未找到该资源'
            break
        case 405:
            error.message = '请求方法未允许'
            break
        case 408:
            error.message = '请求超时'
          break
        case 500:
            error.message = '服务器端出错'
          break
        case 501:
            error.message = '网络未实现'
            break
        case 502:
            error.message = '网络错误'
            break
        case 503:
            error.message = '服务不可用'
            break
        case 504:
            error.message = '网络超时'
            break
        case 505:
            error.message = 'http版本不支持该请求'
          break
        default:
            error.message = `连接错误${error.response.status}`
      }
    }
    return Promise.reject(error)
});

const Axios =(opts)=>{
    const defaults = {
        method: 'GET',
        maxContentLength: 2000000,
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    const timeRandom = parseInt(new Date().getTime() / 1000);
    opts = Object.assign({}, defaults, opts);
    if (opts.method.toUpperCase() === 'GET') {
        opts.params = Object.assign(opts.params || {}, {timeRandom: timeRandom})
    } else {
        opts.data = Object.assign(opts.data || {}, {timeRandom: timeRandom})
    }

    const options ={
        url:opts.url,
        method:opts.type||'POST',
        headers:opts.headers,
        params: opts.params ,
        data: qs.stringify(opts.data)
    }
    return new Promise((resolve, reject) => {
        axios(options).then(response => {
            resolve(response)
        }).catch(error => {
            reject(error)
        })
    })
}
export default Axios;

