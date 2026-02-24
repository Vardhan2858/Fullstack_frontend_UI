import { useCart } from '../../store/CartProvider';
import './CartItem.css';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>

      <div className="item-details">
        <h3>{item.name}</h3>
        <p className="item-category">{item.category}</p>
        <p className="item-price">${item.price.toFixed(2)}</p>
      </div>

      <div className="item-quantity">
        <label>Qty:</label>
        <select value={item.quantity} onChange={handleQuantityChange}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(q => (
            <option key={q} value={q}>{q}</option>
          ))}
        </select>
      </div>

      <div className="item-total">
        <p>${(item.price * item.quantity).toFixed(2)}</p>
      </div>

      <button onClick={handleRemove} className="remove-btn">
        ✕ Remove
      </button>
    </div>
  );
}
