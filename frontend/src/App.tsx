import './App.css';
import {CartProvider} from './context/CartContext';
import BooksPage from './pages/BooksPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import PurchasePage from './pages/PurchasePage';
import CartPage from './pages/CartPage';
import AdminBooksPage from './pages/AdminBooksPage';

function App() {
    return (
        <>
            <CartProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<BooksPage/>}/>
                        <Route path="/books" element={<BooksPage/>}/>
                        <Route path="/purchase/:title/:bookID" element={<PurchasePage/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/adminbooks" element={<AdminBooksPage/>}/>
                    </Routes>
                </Router>
            </CartProvider>
        </>
    );
}

export default App;
