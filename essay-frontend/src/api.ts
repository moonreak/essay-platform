// src/api.ts
import axios from 'axios'

// 极简API实例（移除拦截器）
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // 确保与后端一致
  timeout: 5000 // 缩短超时时间
})

export const essayAPI = {
  submit: (content: string) => api.post('/essays', { content }),
  getHistory: () => api.get('/essays')
}
