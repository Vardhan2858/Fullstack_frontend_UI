import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { authService } from '../../services/authService';
import './AuthForm.css';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await authService.login(formData.email, formData.password);
      login(user);

      // Redirect based on role
      const dashboardRoutes = {
        admin: '/admin/dashboard',
        farmer: '/farmer/dashboard',
        customer: '/customer/dashboard',
      };

      navigate(dashboardRoutes[user.role] || '/');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Login to OrganicSiri</h2>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          required
          disabled={loading}
        />
      </div>

      <div className="info-box">
        <p><strong>Demo Accounts:</strong></p>
        <p>👤 Admin: admin@organic.com / password123</p>
        <p>🌾 Farmer: farmer@organic.com / password123</p>
        <p>🛒 Customer: customer@organic.com / password123</p>
      </div>

      <button type="submit" disabled={loading} className="submit-btn">
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
