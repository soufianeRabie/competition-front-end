import {axiosClient} from "../../api/axios.js";
import {TokenName} from "@/library/index.jsx";
import axios from "axios";

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

    return await axiosClient.get('me' , )
  },
  updateUserProfile: async (data , id ) => {
    return await axiosClient.put(`/profiles/${id}` , data,)
  },
  getInit: async () => {
    return await axiosClient.get('/getInit')
  },
  addInv: async (data) => {
    return await axiosClient.post('/intervenants' , data)
  },
  getInv: async (data) => {
    return await axiosClient.get('/intervenants' , data)
  },
  getActions: async () => {
    return await axiosClient.get('/actions' )
  },
  getRegions: async () => {
    return await axiosClient.get('/regions' )
  },
  updateEntrepriseProfile : async (data) => {
    return await axiosClient.put('/entreprise/profile' , data)
  },
  DeleteInv : async (id)=>
  {
    return await axiosClient.delete('/intervenants/' + id)
  }


}
export default UserApi
