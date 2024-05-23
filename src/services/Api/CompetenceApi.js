import { axiosClient } from "../../api/axios.js";

const CompetenceApi = {
  addCompetence: async (data) => {
    return await axiosClient.post("/competences", data); // Endpoint for adding a competence
  },
  getCompetenceById: async (id) => {
    return await axiosClient.get(`/competences/${id}`); // Endpoint for getting a competence by ID
  },
  updateCompetence: async (id, data) => {
    return await axiosClient.put(`/competences/${id}`, data); // Endpoint for updating a competence
  },
  deleteCompetence: async (id) => {
    return await axiosClient.delete(`/competences/${id}`); // Endpoint for deleting a competence
  },
  getCompetences: async () => {
    return await axiosClient.get("/competences"); // Endpoint for getting all competences
  },
  getIntervenants: async () => {
    return await axiosClient.get("/intervenants"); // Endpoint for getting all intervenants
  },
};

export default CompetenceApi;
