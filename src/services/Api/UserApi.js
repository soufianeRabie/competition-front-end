import {axiosClient} from "../../api/axios.js";

const UserApi = {
  login: async (email, password) => {
    return await axiosClient.post('/login', {email, password})
  },
  register: async (email, password) => {
    return await axiosClient.post('/register', {email, password})
  },
  logout: async () => {
    return await axiosClient.post('/logout')
  },
  getUser: async () => {
    return await axiosClient.get('/me')
  },
}
export default UserApi
