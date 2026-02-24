import { Link } from 'react-router-dom';
import { useCart } from '../../store/CartProvider';
import CartItem from '../../components/ui/CartItem';
import '../pages.css';

export default function Cart() {
  const { cart, getCartTotal, clearCart } = useCart();

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Thank you for your order! Total: $' + getCartTotal().toFixed(2));
    clearCart();
  };

  return (
    <div className="page-container">
      <div className="container">
        <h1 style={{ color: '#2c3e50', marginBottom: '2rem' }}>Shopping Cart</h1>

        {cart.length > 0 ? (
          <div className="cart-container">
            <div className="cart-items">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${getCartTotal().toFixed(2)}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span>$5.00</span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
              </div>

              <div className="summary-row total">
                <span>Total</span>
                <span>${(getCartTotal() + 5 + getCartTotal() * 0.1).toFixed(2)}</span>
              </div>

              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>

              <Link to="/shop" className="checkout-btn" style={{ background: '#95a5a6', marginTop: '0.5rem', textAlign: 'center', textDecoration: 'none', display: 'block' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="empty-message">
            <p>Your cart is empty</p>
            <Link to="/shop" className="cta-button">Start Shopping</Link>
          </div>
        )}
      </div>
    </div>
  );
}
