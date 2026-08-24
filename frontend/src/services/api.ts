const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('admin_token');
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export const apiService = {
  // Public
  getProfileInfo: () => apiFetch('/profile-info'),
  getEvents: () => apiFetch('/events'),
  getServices: () => apiFetch('/services'),
  getPrograms: () => apiFetch('/programs'),
  getTeamMembers: () => apiFetch('/team'),
  getTestimonials: () => apiFetch('/testimonials'),
  getGallery: () => apiFetch('/gallery'),
  sendContactMessage: (data: any) => apiFetch('/contact', { method: 'POST', body: JSON.stringify(data) }),

  // Auth
  login: (credentials: { email: string; password: string }) =>
    apiFetch('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

  // File Upload
  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    const token = localStorage.getItem('admin_token');
    const response = await fetch(`${API_URL}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });
    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error || 'Upload file gagal');
    }
    return response.json();
  },

  // Admin Profile / Settings
  updateProfileInfo: (data: any) => apiFetch('/admin/profile-info', { method: 'PUT', body: JSON.stringify(data) }),

  // Admin Events
  createEvent: (data: any) => apiFetch('/admin/events', { method: 'POST', body: JSON.stringify(data) }),
  updateEvent: (id: number, data: any) => apiFetch(`/admin/events/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteEvent: (id: number) => apiFetch(`/admin/events/${id}`, { method: 'DELETE' }),

  // Admin Services
  createService: (data: any) => apiFetch('/admin/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: number, data: any) => apiFetch(`/admin/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: number) => apiFetch(`/admin/services/${id}`, { method: 'DELETE' }),

  // Admin Programs
  createProgram: (data: any) => apiFetch('/admin/programs', { method: 'POST', body: JSON.stringify(data) }),
  updateProgram: (id: number, data: any) => apiFetch(`/admin/programs/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProgram: (id: number) => apiFetch(`/admin/programs/${id}`, { method: 'DELETE' }),

  // Admin Team
  createTeamMember: (data: any) => apiFetch('/admin/team', { method: 'POST', body: JSON.stringify(data) }),
  updateTeamMember: (id: number, data: any) => apiFetch(`/admin/team/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTeamMember: (id: number) => apiFetch(`/admin/team/${id}`, { method: 'DELETE' }),

  // Admin Testimonials
  createTestimonial: (data: any) => apiFetch('/admin/testimonials', { method: 'POST', body: JSON.stringify(data) }),
  updateTestimonial: (id: number, data: any) => apiFetch(`/admin/testimonials/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteTestimonial: (id: number) => apiFetch(`/admin/testimonials/${id}`, { method: 'DELETE' }),

  // Admin Gallery
  createGalleryItem: (data: any) => apiFetch('/admin/gallery', { method: 'POST', body: JSON.stringify(data) }),
  deleteGalleryItem: (id: number) => apiFetch(`/admin/gallery/${id}`, { method: 'DELETE' }),

  // Admin Messages
  getMessages: () => apiFetch('/admin/messages'),
};
