import axios from 'axios'
// For Prd
const api = axios.create({
  baseURL: 'https://tenda-app.my.id',
  timeout: 60000,
  withCredentials: true,
})


//For Dev
// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   timeout: 60000,
//   withCredentials: true,
// })

export default api