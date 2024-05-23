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
  },
  DeleteAction : async (id)=>
  {
    return await axiosClient.delete('/actions/' + id)
  },
  addExercice : async (data) => {
    return await axiosClient.post('/actions' , data)
  },
  ValidateAction : async (id)=> {
    return await axiosClient.put('/actions/validate/' + id );
  },
  Catalogue : async ()=> {
    return await axiosClient.get('/catalogue/download')
  },
  CreateProfile : async (data)=> {
    return await axiosClient.post('/profiles' , data)
  },
  UpdateUserRole : async (role , id)=> {
    return await axiosClient.post('/users/role/' + id  , {role })
  },
  ResetPassword : async (email)=>
  {
    return await axiosClient.post('/password/email' , {email})
  }

}
export default UserApi
