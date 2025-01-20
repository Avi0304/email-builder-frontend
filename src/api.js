import axios from "axios";

// Base URL of the backend
const API = axios.create({
  baseURL: "http://localhost:5000/api", // Update this if backend is deployed
});

export const getEmailLayout = () => API.get("/getEmailLayout");
// export const renderTemplate = (emailConfig) => API.post("/renderAndDownloadTemplate", emailConfig);
export const getEmailTemplates = () => API.get("/getAllTemplates");
export const getEmailTemplateById = (id) => API.get(`/getEmailTemplate/${id}`);
export const uploadEmailConfig = (emailConfig) => API.post("/uploadEmailConfig", emailConfig);
export const uploadImage = (formData) =>
  API.post("/uploadImage", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const renderAndDownloadTemplate = async (templateData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/renderAndDownloadTemplate", templateData, {
      responseType: "blob", // Expecting a file response
    });
    return response.data; // Blob content of the file
  } catch (error) {
    console.error("Error rendering and downloading template:", error);
    throw error;
  }
};


