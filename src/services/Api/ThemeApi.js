import { axiosClient } from "../../api/axios.js";

const ThemeApi = {
  addTheme: async (data) => {
    return await axiosClient.post("/themes", data); // Endpoint for adding a theme
  },
  getThemeById: async (id) => {
    return await axiosClient.get(`/themes/${id}`); // Endpoint for getting a theme by ID
  },
  updateTheme: async (id, data) => {
    return await axiosClient.put(`/themes/${id}`, data); // Endpoint for updating a theme
  },
  deleteTheme: async (id) => {
    return await axiosClient.delete(`/themes/${id}`); // Endpoint for deleting a theme
  },
  getThemes: async () => {
    return await axiosClient.get("/themes"); // Endpoint for getting all themes
  },
  getDomaines: async () => {
    return await axiosClient.get("/domaines"); // Endpoint for getting all domaines
  },
};

export default ThemeApi;
