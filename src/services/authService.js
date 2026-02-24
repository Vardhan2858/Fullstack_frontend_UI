// Mock Authentication Service
// Replace with actual API calls when backend is ready

export const authService = {
  login: async (email, password) => {
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Determine user role based on email pattern (mock logic)
    let role = 'customer';
    if (email.includes('admin')) role = 'admin';
    if (email.includes('farmer')) role = 'farmer';

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name: email.split('@')[0],
      email,
      role,
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    return mockUser;
  },

  register: async (userData) => {
    const { name, email, password, confirmPassword, role } = userData;

    if (!name || !email || !password || !confirmPassword) {
      throw new Error('All fields are required');
    }

    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const mockUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role: role || 'customer',
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
    };

    localStorage.setItem('authToken', 'mock-token-' + Date.now());
    return mockUser;
  },

  logout: async () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};
