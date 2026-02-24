import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { useCart } from '../../store/CartProvider';
import './Header.css';

export default function Header() {
  const { user, isLoggedIn, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!isLoggedIn) return null;
    switch (user?.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'farmer':
        return '/farmer/dashboard';
      case 'customer':
        return '/customer/dashboard';
      default:
        return '/';
    }
  };

  const cartCount = getCartCount();
  const dashboardLink = getDashboardLink();

  return (
    <header className="header">
      <div className="header-container">
        <div className="nav-brand">
          <Link to="/" className="logo">
            🌾 OrganicSiri
          </Link>
        </div>

        <nav className="nav-main">
          <Link to="/">Home</Link>
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/blog">Blog</Link>
        </nav>

        <div className="nav-right">
          {isLoggedIn && dashboardLink && (
            <Link to={dashboardLink} className="nav-link">
              {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Panel
            </Link>
          )}

          <Link to="/cart" className="cart-link">
            🛒 Cart {cartCount > 0 && `(${cartCount})`}
          </Link>

          {isLoggedIn ? (
            <div className="user-menu">
              <span className="user-name">{user?.name}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">Login</Link>
              <Link to="/register" className="register-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
