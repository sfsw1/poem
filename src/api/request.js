import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // api 的 base_url
  timeout: 10000, // 请求超时时间
})

// 可以在这里添加请求和响应拦截器
// ...

export default service