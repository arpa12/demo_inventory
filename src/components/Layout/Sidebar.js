import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const [openProductDropdown, setOpenProductDropdown] = useState(false);
    const [openPurchaseDropdown, setOpenPurchaseDropdown] = useState(false);
    const [openSaleDropdown, setopenSaleDropdown] = useState(false);
    const [openWarehouseDropdown, setopenWarehouseDropdown] = useState(false);
    const [openTransferDropdown, setopenTransferDropdown] = useState(false);

    return (
        <div className="w-64 bg-gray-900 text-white min-h-screen">
            <div className="p-6 text-2xl font-bold border-b border-gray-700">Dashboard</div>

            <nav className="flex flex-col gap-2 px-4 mt-4">
                {/* Products Dropdown */}
                <button
                    onClick={() => setOpenProductDropdown(!openProductDropdown)}
                    className={`w-full text-left px-4 py-2 rounded flex justify-between items-center transition-all duration-200 ${
                        location.pathname.startsWith('/products') || location.pathname === '/category' || location.pathname === '/unit' || location.pathname === '/brand'
                            ? 'bg-gray-700'
                            : 'hover:bg-gray-700'
                    }`}
                >
                    <span>Products</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${openProductDropdown ? 'rotate-90' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className={`ml-4 flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden ${
                    openProductDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <Link to="/products" className={`px-4 py-2 rounded text-sm ${location.pathname === '/products' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>All Products</Link>
                    <Link to="/category" className={`px-4 py-2 rounded text-sm ${location.pathname === '/category' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Category</Link>
                    <Link to="/unit" className={`px-4 py-2 rounded text-sm ${location.pathname === '/unit' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Unit</Link>
                    <Link to="/brand" className={`px-4 py-2 rounded text-sm ${location.pathname === '/brand' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Brand</Link>
                </div>

                {/* Purchase Dropdown */}
                <button
                    onClick={() => setOpenPurchaseDropdown(!openPurchaseDropdown)}
                    className={`w-full text-left px-4 py-2 rounded flex justify-between items-center transition-all duration-200 ${
                        location.pathname.startsWith('/purchase') ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                >
                    <span>Purchase</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${openPurchaseDropdown ? 'rotate-90' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className={`ml-4 flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden ${
                    openPurchaseDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <Link to="/purchase" className={`px-4 py-2 rounded text-sm ${location.pathname === '/purchase' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Add Purchase</Link>
                </div>

                {/* Sale Dropdown */}
                <button
                    onClick={() => setopenSaleDropdown(!openSaleDropdown)}
                    className={`w-full text-left px-4 py-2 rounded flex justify-between items-center transition-all duration-200 ${
                        location.pathname.startsWith('/sale') ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                >
                    <span>Sale</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${openSaleDropdown ? 'rotate-90' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className={`ml-4 flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden ${
                    openSaleDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <Link to="/sale" className={`px-4 py-2 rounded text-sm ${location.pathname === '/sale' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Add Sale</Link>
                </div>

                {/* Warehouse Dropdown */}
                <button
                    onClick={() => setopenWarehouseDropdown(!openWarehouseDropdown)}
                    className={`w-full text-left px-4 py-2 rounded flex justify-between items-center transition-all duration-200 ${
                        location.pathname.startsWith('/Warehouse') ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                >
                    {/*<span>Warehouse/ Branch</span>*/}
                    <Link to="/Warehouse" className={`px-4 py-2 rounded text-sm ${location.pathname === '/Warehouse' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Warehouse/ Branch</Link>
                    {/*<svg*/}
                    {/*    className={`w-4 h-4 transform transition-transform duration-200 ${openWarehouseDropdown ? 'rotate-90' : ''}`}*/}
                    {/*    fill="currentColor"*/}
                    {/*    viewBox="0 0 20 20"*/}
                    {/*>*/}
                    {/*    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />*/}
                    {/*</svg>*/}
                </button>

                {/*<div className={`ml-4 flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden ${*/}
                {/*    openWarehouseDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'*/}
                {/*}`}>*/}
                {/*    <Link to="/Warehouse" className={`px-4 py-2 rounded text-sm ${location.pathname === '/Warehouse' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Add Warehouse</Link>*/}
                {/*</div>*/}

                {/* Transfer Dropdown */}
                <button
                    onClick={() => setopenTransferDropdown(!openTransferDropdown)}
                    className={`w-full text-left px-4 py-2 rounded flex justify-between items-center transition-all duration-200 ${
                        location.pathname.startsWith('/stock-transfer') ? 'bg-gray-700' : 'hover:bg-gray-700'
                    }`}
                >
                    <span>Transfer</span>
                    <svg
                        className={`w-4 h-4 transform transition-transform duration-200 ${openTransferDropdown ? 'rotate-90' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                </button>

                <div className={`ml-4 flex flex-col gap-1 transition-all duration-200 ease-in-out overflow-hidden ${
                    openTransferDropdown ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>

                    <Link to="/stock-transfer" className={`px-4 py-2 rounded text-sm ${location.pathname === '/stock-transfer' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Stock Transfer</Link>
                    <Link to="/stock-transfer" className={`px-4 py-2 rounded text-sm ${location.pathname === '/stock-transfer' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}>Money Transfer Remaining</Link>
                </div>
            </nav>
        </div>
    );
}

export default Sidebar;
