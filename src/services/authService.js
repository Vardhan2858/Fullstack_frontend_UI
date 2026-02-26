// Mock Authentication Service
// Replace with actual API calls when backend is ready

// Demo accounts (hardcoded)
const DEMO_ACCOUNTS = [
  {
    email: 'admin@organic.com',
    password: 'password123',
    id: 'demo-admin-001',
    name: 'Admin User',
    role: 'admin',
    image: 'https://i.pravatar.cc/150?img=12'
  },
  {
    email: 'farmer@organic.com',
    password: 'password123',
    id: 'demo-farmer-001',
    name: 'Farmer User',
    role: 'farmer',
    image: 'https://i.pravatar.cc/150?img=33'
  },
  {
    email: 'customer@organic.com',
    password: 'password123',
    id: 'demo-customer-001',
    name: 'Customer User',
    role: 'customer',
    image: 'https://i.pravatar.cc/150?img=45'
  }
];

// Helper function to get registered users from localStorage
const getRegisteredUsers = () => {
  const users = localStorage.getItem('registeredUsers');
  return users ? JSON.parse(users) : [];
};

// Helper function to save registered users to localStorage
const saveRegisteredUsers = (users) => {
  localStorage.setItem('registeredUsers', JSON.stringify(users));
};

export const authService = {
  login: async (email, password) => {
    // Mock validation
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    // Check if it's a demo account
    const demoAccount = DEMO_ACCOUNTS.find(
      account => account.email === email && account.password === password
    );

    if (demoAccount) {
      // Return demo user without password
      const { password: _, ...userWithoutPassword } = demoAccount;
      localStorage.setItem('authToken', 'demo-token-' + Date.now());
      return userWithoutPassword;
    }

    // Check if it's a registered user
    const registeredUsers = getRegisteredUsers();
    const registeredUser = registeredUsers.find(
      user => user.email === email && user.password === password
    );

    if (registeredUser) {
      // Return registered user without password
      const { password: _, ...userWithoutPassword } = registeredUser;
      localStorage.setItem('authToken', 'registered-token-' + Date.now());
      return userWithoutPassword;
    }

    // If not demo or registered, reject login
    throw new Error('Invalid email or password. Please register first or use a demo account.');
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

    // Check if email is already a demo account
    const isDemoAccount = DEMO_ACCOUNTS.some(account => account.email === email);
    if (isDemoAccount) {
      throw new Error('This email is reserved for demo accounts. Please use a different email.');
    }

    // Check if email is already registered
    const registeredUsers = getRegisteredUsers();
    const emailExists = registeredUsers.some(user => user.email === email);
    if (emailExists) {
      throw new Error('Email is already registered. Please login instead.');
    }

    // Create new user
    const newUser = {
      id: 'user-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      password, // In production, this should be hashed
      role: role || 'customer',
      image: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      registeredAt: new Date().toISOString()
    };

    // Save to registered users
    registeredUsers.push(newUser);
    saveRegisteredUsers(registeredUsers);

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('authToken', 'registered-token-' + Date.now());
    return userWithoutPassword;
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
