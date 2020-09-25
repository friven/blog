import axios from 'axios';

// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});
// 设置post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

instance.interceptors.request.use(    
  config => {       
      return config;    
  },    
  error => Promise.error(error))

  // 响应拦截器
instance.interceptors.response.use(    
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
  // 请求失败
  error => {
      const { response } = error;
      if (response) {
          // 请求已发出，但是不在2xx的范围 
          // errorHandle(response.status, response.data.message);
          return Promise.reject(response);
      } else {
          // 处理断网的情况
          // eg:请求超时或断网时，更新state的network状态
          // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
          // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
          // store.commit('changeNetwork', false);
      }
  });

  function noDataPost(url, data = {}, config = {}) {
    return instance
      .post(url, data, config)
      .then(response => {
        return response
      })
      .catch(error => {
        return error
      })
  }

export{
  noDataPost,
  instance
};
