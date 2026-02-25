// Mock Product Service with data
import vegetablesImg from '../assets/images/categories/vegetables.jpg';
import fruitsImg from '../assets/images/categories/fruits.jpg';
import farmerImg from '../assets/images/categories/Farmer.jpg';
import tomatoImg from '../assets/images/products/tomato.jpg';
import carrotImg from '../assets/images/products/carrot.jpg';
import spinachImg from '../assets/images/products/spinach.jpg';
import pepperImg from '../assets/images/products/pepper.jpg';
import appleImg from '../assets/images/products/apple.jpg';
import bananaImg from '../assets/images/products/banana.jpg';
import berriesImg from '../assets/images/products/berries.jpg';
import orangesImg from '../assets/images/products/oranges.jpg';
import riceImg from '../assets/images/products/rice.jpg';
import wheatImg from '../assets/images/products/wheat.jpg';
import lentilsImg from '../assets/images/products/lentils.jpg';
import oliveImg from '../assets/images/products/olive.jpg';

export const mockProducts = [
  // Vegetables
  { id: 1, name: 'Organic Tomatoes', category: 'vegetables', price: 335, image: tomatoImg, description: 'Fresh organic tomatoes', stock: 50 },
  { id: 2, name: 'Carrots', category: 'vegetables', price: 209, image: carrotImg, description: 'Crunchy organic carrots', stock: 60 },
  { id: 3, name: 'Spinach Bundle', category: 'vegetables', price: 419, image: spinachImg, description: 'Fresh organic spinach', stock: 40 },
  { id: 4, name: 'Bell Peppers', category: 'vegetables', price: 503, image: pepperImg, description: 'Colorful organic peppers', stock: 35 },

  // Fruits
  { id: 5, name: 'Organic Apples', category: 'fruits', price: 419, image: appleImg, description: 'Sweet organic apples', stock: 80 },
  { id: 6, name: 'Bananas', category: 'fruits', price: 251, image: bananaImg, description: 'Fresh yellow bananas', stock: 100 },
  { id: 7, name: 'Organic Berries Mix', category: 'fruits', price: 671, image: berriesImg, description: 'Mixed organic berries', stock: 30 },
  { id: 8, name: 'Oranges', category: 'fruits', price: 293, image: orangesImg, description: 'Juicy organic oranges', stock: 70 },

  // Staples
  { id: 9, name: 'Organic Rice', category: 'staples', price: 587, image: riceImg, description: '1kg organic rice sack', stock: 120 },
  { id: 10, name: 'Whole Wheat Flour', category: 'staples', price: 461, image: wheatImg, description: '1kg organic flour', stock: 90 },
  { id: 11, name: 'Organic Lentils', category: 'staples', price: 419, image: lentilsImg, description: '500g organic lentils', stock: 60 },
  { id: 12, name: 'Olive Oil', category: 'staples', price: 1091, image: oliveImg, description: '500ml extra virgin olive oil', stock: 45 },
];

export const mockCategories = [
  { id: 1, name: 'Vegetables', slug: 'vegetables', image: vegetablesImg },
  { id: 2, name: 'Fruits', slug: 'fruits', image: fruitsImg },
  { id: 3, name: 'Staples', slug: 'staples', image: farmerImg },
];

export const mockUsers = [
  { id: 1, name: 'Admin User', email: 'admin@organic.com', role: 'admin', joinDate: '2025-01-01' },
  { id: 2, name: 'John Farmer', email: 'farmer@organic.com', role: 'farmer', joinDate: '2025-02-01' },
  { id: 3, name: 'Jane Customer', email: 'customer1@organic.com', role: 'customer', joinDate: '2025-02-15' },
];

export const mockOrders = [
  { id: 1, userId: 3, products: [{ id: 1, quantity: 2 }], total: 670, date: '2025-02-15', status: 'completed' },
  { id: 2, userId: 3, products: [{ id: 5, quantity: 1 }, { id: 6, quantity: 2 }], total: 921, date: '2025-02-18', status: 'pending' },
  { id: 3, userId: 3, products: [{ id: 9, quantity: 1 }], total: 587, date: '2025-02-20', status: 'completed' },
];

export const productService = {
  getAllProducts: async () => {
    return mockProducts;
  },

  getProductById: async (id) => {
    return mockProducts.find(p => p.id === parseInt(id));
  },

  getProductsByCategory: async (category) => {
    return mockProducts.filter(p => p.category === category);
  },

  getCategories: async () => {
    return mockCategories;
  },

  addProduct: async (product) => {
    const newProduct = {
      id: Math.max(...mockProducts.map(p => p.id), 0) + 1,
      ...product,
    };
    mockProducts.push(newProduct);
    return newProduct;
  },

  updateProduct: async (id, updates) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...updates };
      return mockProducts[index];
    }
    return null;
  },

  deleteProduct: async (id) => {
    const index = mockProducts.findIndex(p => p.id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
      return true;
    }
    return false;
  },

  getOrders: async (userId) => {
    if (userId) {
      return mockOrders.filter(o => o.userId === userId);
    }
    return mockOrders;
  },

  getUsers: async () => {
    return mockUsers;
  },
};
