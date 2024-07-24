import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import DataPage from './DataPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/data-page" element={<DataPage />} />
            </Routes>
        </Router>
    );
}

export default App;
