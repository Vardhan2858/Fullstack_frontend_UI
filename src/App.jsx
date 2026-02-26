import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './store/AuthProvider';
import { CartProvider } from './store/CartProvider';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

// Public Pages
import Home from './pages/public/Home';
import Shop from './pages/public/Shop';
import ProductDetail from './pages/public/ProductDetail';
import CategoryPage from './pages/public/CategoryPage';
import Cart from './pages/public/Cart';
import About from './pages/public/About';
import Blog from './pages/public/Blog';

// Auth Pages
import AuthPage from './pages/auth/AuthPage';

// Admin Dashboards
import AdminDashboard from './pages/dashboards/admin/AdminDashboard';
import ManageUsers from './pages/dashboards/admin/ManageUsers';
import ManageProducts from './pages/dashboards/admin/ManageProducts';
import OrdersOverview from './pages/dashboards/admin/OrdersOverview';

// Farmer Dashboards
import FarmerDashboard from './pages/dashboards/farmer/FarmerDashboard';
import MyProducts from './pages/dashboards/farmer/MyProducts';
import AddProduct from './pages/dashboards/farmer/AddProduct';
import FarmerOrders from './pages/dashboards/farmer/FarmerOrders';

// Customer Dashboards
import CustomerDashboard from './pages/dashboards/customer/CustomerDashboard';
import MyOrders from './pages/dashboards/customer/MyOrders';
import Profile from './pages/dashboards/customer/Profile';

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />

            {/* Auth Routes */}
            <Route path="/login" element={<AuthPage />} />
            <Route path="/register" element={<AuthPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <ManageProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <OrdersOverview />
                </ProtectedRoute>
              }
            />

            {/* Farmer Routes */}
            <Route
              path="/farmer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/products"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <MyProducts />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/add-product"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <AddProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/farmer/orders"
              element={
                <ProtectedRoute allowedRoles={['farmer']}>
                  <FarmerOrders />
                </ProtectedRoute>
              }
            />

            {/* Customer Routes */}
            <Route
              path="/customer/dashboard"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <CustomerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/orders"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <MyOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer/profile"
              element={
                <ProtectedRoute allowedRoles={['customer']}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            {/* Catch All */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Footer />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
