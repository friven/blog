// http.js
import axios from 'axios'
// 创建 axios 实例
const service = axios.create({
 // 配置项
 baseURL: "/interest",
 // 请求 30s 超时
 timeout: 10000,
 headers: {
    get: {
     'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
     // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    },
    post: {
     'Content-Type': 'application/json;charset=utf-8'
     // 在开发中，一般还需要单点登录或者其他功能的通用请求头，可以一并配置进来
    }
 },
 // 在向服务器发送请求前，序列化请求数据
   transformRequest: [function (data) {
      data = JSON.stringify(data)
      return data
   }],
  // 在传递给 then/catch 前，修改响应数据
   transformResponse: [function (data) {
      if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
      }
      return data
   }]
})

export default service;