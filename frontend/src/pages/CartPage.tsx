import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import { Button, Card } from 'react-bootstrap'; // Import Bootstrap components

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛒 Your Cart</h2>

      {/* Stack items vertically */}
      <div>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty!</p>
        ) : (
          cart.map((item: CartItem) => (
            <div key={item.bookId} className="mb-3">
              {' '}
              {/* Add margin between cards */}
              <Card className="shadow-lg">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </Card.Text>
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log('Removing item with bookId:', item.bookId); // Add a log here
                      removeFromCart(item.bookId);
                    }}
                  >
                    ❌ Remove
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))
        )}
      </div>

      <h3 className="mt-4 text-center">Total: 💰 ${totalPrice.toFixed(2)}</h3>

      <div className="text-center mt-3">
        <Button variant="success" size="lg">
          ✅ Checkout
        </Button>
        <Button
          variant="secondary"
          size="lg"
          className="ms-3"
          onClick={() => navigate('/books')}
        >
          📚 Continue Browsing
        </Button>
      </div>
    </div>
  );
}

export default CartPage;
