import { axiosClient } from "../../api/axios.js";

const CertificationApi = {
  // getInit: async () => {
  //   return await axiosClient.get("/certifications/init");
  // },
  addCertification: async (data) => {
    return await axiosClient.post("/certifications", data);
  },
  getCertificationById: async (id) => {
    return await axiosClient.get(`/certifications/${id}`);
  },
  updateCertification: async (id, data) => {
    return await axiosClient.put(`/certifications/${id}`, data);
  },
  deleteCertification: async (id) => {
    return await axiosClient.delete(`/certifications/${id}`);
  },
  getCertifications: async () => {
    return await axiosClient.get("/certifications");
  },
  getDomaines: async () => {
    return await axiosClient.get("/domaines");
  },
  getCertifications: async () => {
    return await axiosClient.get("/certifications");
  },
};

export default CertificationApi;
