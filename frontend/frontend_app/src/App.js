import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DataPage from './DataPage';
import CheckoutPage from './CheckoutPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data-page" element={<DataPage />} />
                <Route path="/checkout-page" element={<CheckoutPage />} />
            </Routes>
        </Router>
    );
}

export default App;
