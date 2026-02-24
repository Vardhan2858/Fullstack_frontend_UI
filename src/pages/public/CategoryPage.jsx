import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../../components/ui/ProductCard';
import { productService } from '../../services/productService';
import '../pages.css';

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await productService.getProductsByCategory(slug);
        setProducts(prods);

        const categories = await productService.getCategories();
        const category = categories.find(c => c.slug === slug);
        if (category) {
          setCategoryName(category.name);
        }
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, [slug]);

  return (
    <div className="page-container">
      <div className="container">
        <Link to="/shop" style={{ color: '#27ae60', marginBottom: '2rem', display: 'block' }}>
          ← Back to Shop
        </Link>

        <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>{categoryName}</h1>

        {products.length > 0 ? (
          <div className="products-grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="empty-message">
            <p>No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
