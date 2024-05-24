import { axiosClient } from "../../api/axios.js";

const IntervenantApi = {
  addIntervenant: async (data) => {
    return await axiosClient.post("/intervenants", data);
  },
  getIntervenantById: async (id) => {
    return await axiosClient.get(`/intervenants/${id}`);
  },
  updateIntervenant: async (id, data) => {
    return await axiosClient.put(`/intervenants/${id}`, data);
  },
  deleteIntervenant: async (id) => {
    return await axiosClient.delete(`/intervenants/${id}`);
  },
  getIntervenants: async () => {
    return await axiosClient.get("/intervenants");
  },
  getDomaines: async () => {
    return await axiosClient.get("/domaines");
  },
  PotentialIntervenants: async (data) => {
    return await axiosClient.post("/intervenant/affect", data);
  },
};

export default IntervenantApi;
