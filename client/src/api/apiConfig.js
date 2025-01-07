const BASE_URL = "https://ezresume.onrender.com/api/v1";

const apiConfig = {
  feedback: {
    getAll: (page, limit) => `${BASE_URL}/feedback?page=${page}&limit=${limit}`,
    create: `${BASE_URL}/feedback/`,
    getAverage: `${BASE_URL}/feedback/average`,
  },
  users: {
    login: `${BASE_URL}/users/login`,
    register: `${BASE_URL}/users/register`,
    logout: `${BASE_URL}/users/logout`,
    count: `${BASE_URL}/users/count`,
  },
  templates: {
    getAll: `${BASE_URL}/templates/`,
    create: `${BASE_URL}/templates`,
    update: (templateId) => `${BASE_URL}/templates/${templateId}`,
    delete: (templateId) => `${BASE_URL}/templates/${templateId}`,
  },
  downloads: {
    count: `${BASE_URL}/downloads/count`,
    monthly: (month) => `${BASE_URL}/downloads/monthly/${month}`,
    track: `${BASE_URL}/downloads/track`,
  },
};

export default apiConfig;
