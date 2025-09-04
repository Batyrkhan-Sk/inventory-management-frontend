import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import InventoryDetail from './pages/InventoryDetail';
import Login from './components/auth/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ItemsFillOutPage from './pages/ItemsFillOutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/inventory/:id" element={<InventoryDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Login />} />
        <Route path="/inventory/:id/items" element={<ItemsFillOutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
