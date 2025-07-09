import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/Layout/DashboardLayout';
import ProductsPage from './components/Dashboard/Products/ProductsPage';
import ProductCreatePage from './components/Dashboard/Products/CreateProduct';
import CategoryPage from './components/Dashboard/Category/CategoryPage';
import UnitPage from './components/Dashboard/Unit/UnitPage';
import BrandPage from './components/Dashboard/Brand/BrandPage';
import  PurchasePage from './components/Dashboard/Purchase/PurchasePage';
import CreatePurchase from './components/Dashboard/Purchase/CreatePurchase';
import SalePage from './components/Dashboard/Sale/SalePage';
import CreateSale from './components/Dashboard/Sale/CreateSale';
import WarehousePage from './components/Dashboard/Warehouse/WareHousePage';
import StockTransfer from './components/Dashboard/Transfer/StockTransferPage';
import CreateStockTransfer from './components/Dashboard/Transfer/CreateStockTransfer';


function App() {
    return (
        <Router>
            <Routes>
                {/* Dashboard layout for inner routes */}
                <Route path="/" element={<DashboardLayout />}>
                    <Route index element={<Navigate to="/products" />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="category" element={<CategoryPage />} />
                    <Route path="unit" element={<UnitPage />} />
                    <Route path="brand" element={<BrandPage />} />
                    <Route path="/products/create" element={<ProductCreatePage />} />
                    <Route path="purchase" element={<PurchasePage />} />
                    <Route path="/purchase/create" element={<CreatePurchase />} />
                    <Route path="sale" element={<SalePage />} />
                    <Route path="/sale/create" element={<CreateSale />} />
                    <Route path="Warehouse" element={<WarehousePage />} />
                    <Route path="stock-transfer" element={<StockTransfer />} />
                    <Route path="stock-transfer/create" element={<CreateStockTransfer />} />
                </Route>



            </Routes>
        </Router>
    );
}

export default App;
