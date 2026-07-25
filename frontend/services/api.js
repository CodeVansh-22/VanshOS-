import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 4000,
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('vanshos_admin_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Global Errors (401 Unauthorized, 403 Forbidden, 500)
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== 'undefined') {
        const refreshToken = localStorage.getItem('vanshos_refresh_token');
        if (refreshToken && !error.config._retry) {
          error.config._retry = true;
          try {
            const res = await axios.post(`${API_BASE_URL}/auth/refresh`, {}, {
              headers: { Authorization: `Bearer ${refreshToken}` },
            });
            if (res.data && res.data.data && res.data.data.token) {
              const newToken = res.data.data.token;
              localStorage.setItem('vanshos_admin_token', newToken);
              error.config.headers.Authorization = `Bearer ${newToken}`;
              return apiClient(error.config);
            }
          } catch (refreshErr) {
            localStorage.removeItem('vanshos_admin_token');
            localStorage.removeItem('vanshos_refresh_token');
          }
        } else {
          localStorage.removeItem('vanshos_admin_token');
          localStorage.removeItem('vanshos_refresh_token');
        }
      }
    }
    return Promise.reject(error);
  }
);

// Authentication Service
export const authService = {
  login: async (credentials) => {
    try {
      const res = await apiClient.post('/auth/login', credentials);
      if (res.data && res.data.data) {
        if (typeof window !== 'undefined') {
          if (res.data.data.token) localStorage.setItem('vanshos_admin_token', res.data.data.token);
          if (res.data.data.refreshToken) localStorage.setItem('vanshos_refresh_token', res.data.data.refreshToken);
        }
      }
      return res.data;
    } catch (err) {
      throw err.response?.data || { success: false, message: 'Authentication failed' };
    }
  },

  logout: async () => {
    try {
      await apiClient.post('/auth/logout');
    } catch {
      // Ignore logout API errors
    } finally {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('vanshos_admin_token');
        localStorage.removeItem('vanshos_refresh_token');
      }
    }
  },

  getMe: async () => {
    const res = await apiClient.get('/auth/me');
    return res.data;
  },
};

// Projects Service
export const projectsService = {
  getAll: async (params = {}) => {
    try {
      const res = await apiClient.get('/projects', { params });
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },
  getById: async (id) => {
    try {
      const res = await apiClient.get(`/projects/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Project not found' };
    }
  },
  create: async (data) => {
    try {
      const res = await apiClient.post('/projects', data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/projects/${id}`, data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/projects/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
};

// Skills Service
export const skillsService = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/skills');
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },
  create: async (data) => {
    try {
      const res = await apiClient.post('/skills', data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/skills/${id}`, data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/skills/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
};

// Experience Service
export const experienceService = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/experience');
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },
  create: async (data) => {
    try {
      const res = await apiClient.post('/experience', data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/experience/${id}`, data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/experience/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
};

// Achievements Service
export const achievementsService = {
  getAll: async () => {
    try {
      const res = await apiClient.get('/achievements');
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },
  create: async (data) => {
    try {
      const res = await apiClient.post('/achievements', data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  update: async (id, data) => {
    try {
      const res = await apiClient.put(`/achievements/${id}`, data);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  upload: async (formData) => {
    try {
      const res = await apiClient.post('/achievements/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Upload failed.' };
    }
  },
  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/achievements/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
};

// Messages & Contact Service
export const messagesService = {
  send: async (messageData) => {
    try {
      const res = await apiClient.post('/contact', messageData);
      return res.data;
    } catch (err) {
      throw err.response?.data || { success: false, message: 'Failed to transmit message' };
    }
  },
  getAll: async () => {
    try {
      const res = await apiClient.get('/messages');
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },
  updateStatus: async (id, status) => {
    try {
      const res = await apiClient.patch(`/messages/${id}/status`, { status });
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
  delete: async (id) => {
    try {
      const res = await apiClient.delete(`/messages/${id}`);
      return res.data;
    } catch (err) {
      return err.response?.data || { success: false, message: 'Unauthorized. Please login.' };
    }
  },
};

// Resume Service
export const resumeService = {
  getInfo: async () => {
    try {
      const res = await apiClient.get('/resume');
      return res.data;
    } catch {
      return { success: true, data: { downloads: 142, fileName: 'Vansh_Sunil_Chauhan_Resume_2026.pdf' } };
    }
  },
  getStats: async () => {
    try {
      const res = await apiClient.get('/resume/stats');
      return res.data;
    } catch {
      return { success: true, data: { downloads: 142 } };
    }
  },
  upload: async (formData) => {
    const res = await apiClient.post('/resume/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  download: () => {
    if (typeof window !== 'undefined') {
      window.open(`${API_BASE_URL}/resume/download`, '_blank');
    }
  },
  view: () => {
    if (typeof window !== 'undefined') {
      window.open(`${API_BASE_URL}/resume/view`, '_blank');
    }
  },
};

// Analytics Service
export const analyticsService = {
  logVisitor: async (telemetry = {}) => {
    try {
      const res = await apiClient.post('/analytics/visitor', telemetry);
      return res.data;
    } catch {
      return { success: true };
    }
  },
  getOverview: async () => {
    try {
      const res = await apiClient.get('/analytics/dashboard');
      return res.data;
    } catch {
      return {
        success: true,
        data: {
          totalVisitors: 12480,
          uniqueVisitors: 8920,
          topCountry: 'India (Mumbai)',
          topBrowser: 'Chrome',
          topDevice: 'Desktop',
          dailyVisits: 412,
          monthlyVisits: 12480,
        },
      };
    }
  },
};

// Settings Service
export const settingsService = {
  get: async () => {
    try {
      const res = await apiClient.get('/settings');
      return res.data;
    } catch {
      return { success: true, data: {} };
    }
  },
  update: async (data) => {
    const res = await apiClient.put('/settings', data);
    return res.data;
  },
};

export default apiClient;
