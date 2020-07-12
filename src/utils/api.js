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
  let ContentType = 'application/x-www-form-urlencoded'
  if (opt.ContentType) {
    ContentType = 'application/json;charset=UTF-8'
  }
  let dataList = {
    method: opt.method,
    url: `${host}` + opt.url,
    headers: {
      'Content-Type': ContentType
    }
  }
  if (['post', 'put'].includes(opt.method)) {
    opt.ContentType ? dataList.data = opt.data : dataList.data = qs.stringify(opt.data)
  } else {
    dataList.params = opt.data
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
  return res
}, error => {
  return Promise.reject(error)
})

export default {
  bannerList (data) { return fetch({ method: 'get', url: '/api/wxapp.index/banner', data }) }, // banner
  tabList (data) { return fetch({ method: 'get', url: '/api/wxapp.index/taball', data }) }, // tag列表
  recommendList (data) { return fetch({ method: 'get', url: '/api/wxapp.archives/recommend', data }) }, // 推荐文章/产品
  list (data) { return fetch({ method: 'get', url: '/api/wxapp.archives/index', data }) }, // 文章/产品列表
  productDetail (data) { return fetch({ method: 'get', url: '/api/wxapp.archives/detail', data }) }, // 文章/产品详情
  contactUs (data) { return fetch({ method: 'get', url: '/api/wxapp.index/page', data }) }, // 品牌故事/联系我们
  getcontact (data) { return fetch({ method: 'get', url: '/api/wxapp.index/getcontact', data }) } // 联系我们
}
