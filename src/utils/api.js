// 接口请求
import axios from 'axios'
import qs from 'qs'

let host = process.env.HOST_URL
if (window.location.hostname === 'localhost') {
  host = ''
} else {
  host = window.location.origin
}
// console.log('最终host', host)

export function fetch (opt) {
  // let authorization = ''
  // if (sessionStorage.getItem('token') !== '') {
  //   authorization = `${sessionStorage.token}`
  // }
  // if (opt.url.indexOf('login') > -1) {
  //   sessionStorage.setItem('token', '')
  //   authorization = ''
  // }
  let ContentType = 'application/x-www-form-urlencoded'
  if (opt.ContentType) {
    ContentType = 'application/json;charset=UTF-8'
  }
  let dataList = {
    method: opt.method,
    url: `${host}` + opt.url,
    headers: {
      'Content-Type': ContentType
      // 'Authorization': authorization
    }
  }
  if (['post', 'put'].includes(opt.method)) {
    opt.ContentType ? dataList.data = opt.data : dataList.data = qs.stringify(opt.data)
  } else {
    dataList.params = opt.data
    if (dataList.params) {
      dataList.params['token'] = authorization
    }
  }
  return new Promise((resolve, reject) => {
    axios(dataList)
      .then(res => {
        resolve(res.data)
      })
      .catch(error => {
        reject(error)
      })
  })
}

// 发送请求前处理数据
axios.interceptors.request.use(config => {
  return config
})

// 返回相应请求后处理数据
axios.interceptors.response.use(res => {
  // if (res.data.token) {
  //   sessionStorage.setItem('token', res.data.token)
  // }
  return res
}, error => {
  return Promise.reject(error)
})

export default {
  login (data) { return fetch({ method: 'post', url: '/api/account/login', data }) }, // 测试
}