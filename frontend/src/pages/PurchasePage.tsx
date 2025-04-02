import {useNavigate, useParams} from 'react-router-dom';
import WelcomeBand from '../components/WelcomeBand';
import {useCart} from '../context/CartContext';
import {CartItem} from '../types/CartItem';
import {Button, Card, Container} from 'react-bootstrap'; // Import Bootstrap components

function PurchasePage() {
    const navigate = useNavigate();
    const {title, bookId} = useParams();
    const price = decodeURIComponent(useParams().price || '9.95');
    const {addToCart} = useCart();

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || 'No Book Found',
            price: Number(price),
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <>
            <WelcomeBand/>
            <Container className="mt-5">
                <Card className="shadow-lg">
                    <Card.Body>
                        <Card.Title className="text-center mb-4">
                            Purchase: <strong>{title}</strong>
                        </Card.Title>
                        <Card.Text className="text-center">
                            <h4>Price: ${price}</h4>
                        </Card.Text>

                        <div className="d-flex justify-content-center">
                            <Button
                                variant="success"
                                size="lg"
                                className="mx-2"
                                onClick={handleAddToCart}
                            >
                                <i className="bi bi-cart-plus"></i> Add to Cart
                            </Button>
                            <Button
                                variant="secondary"
                                size="lg"
                                className="mx-2"
                                onClick={() => navigate('/books')}
                            >
                                <i className="bi bi-arrow-left-circle"></i> Go Back
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default PurchasePage;
