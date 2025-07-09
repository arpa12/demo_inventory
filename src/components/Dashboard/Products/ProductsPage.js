import React, { useState } from 'react';
import { FaEllipsisV, FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const products = [
    {
        id: 1,
        name: 'Dabur Honey 500 mg',
        image: 'https://via.placeholder.com/40x40.png?text=🧴',
        stock: '20 pc',
        purchasePrice: 250,
        salePrice: 280,
        profit: 30,
        status: 'Active',
    },
    {
        id: 2,
        name: 'Dabur Honey 1000 mg',
        image: 'https://via.placeholder.com/40x40.png?text=🧴',
        stock: '02 pc',
        purchasePrice: 450,
        salePrice: 500,
        profit: 50,
        status: 'Low',
    },
    {
        id: 3,
        name: 'Dabur Honey 100 mg',
        image: 'https://via.placeholder.com/40x40.png?text=🧴',
        stock: '02 pc',
        purchasePrice: 50,
        salePrice: 100,
        profit: 50,
        status: 'Deleted',
    },
    {
        id: 4,
        name: 'Dabur Honey 200 mg',
        image: 'https://via.placeholder.com/40x40.png?text=🧴',
        stock: '05 pc',
        purchasePrice: 150,
        salePrice: 210,
        profit: 60,
        status: 'Archived',
    },
];

const statusStyles = {
    Active: 'bg-green-100 text-green-800',
    Low: 'bg-red-100 text-red-800',
    Deleted: 'bg-gray-700 text-white',
    Archived: 'bg-yellow-100 text-yellow-800',
};

function ProductPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Products</h1>
                <button
                    onClick={() => navigate('/products/create')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 text-center">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-5 py-3">SL</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Stock</th>
                        <th className="px-5 py-3">Purchase Price</th>
                        <th className="px-5 py-3">Sale Price</th>
                        <th className="px-5 py-3">Profit</th>
                        <th className="px-5 py-3">Status</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {products.map((product, index) => (
                        <tr
                            key={product.id}
                            className={`hover:bg-gray-50 ${
                                product.status === 'Deleted' ? 'opacity-50 pointer-events-none' : ''
                            }`}
                        >
                            <td className="px-5 py-3">{index + 1}</td>
                            <td className="px-5 py-3">
                                <div className="flex items-center justify-center gap-2">
                                    <img src={product.image} alt="img" className="w-8 h-8 rounded" />
                                    <span>{product.name}</span>
                                </div>
                            </td>
                            <td className="px-5 py-3">{product.stock}</td>
                            <td className="px-5 py-3">{product.purchasePrice} bdt</td>
                            <td className="px-5 py-3">{product.salePrice} bdt</td>
                            <td className="px-5 py-3">{product.profit} bdt</td>
                            <td className="px-5 py-3">
                  <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusStyles[product.status]}`}
                  >
                    {product.status}
                  </span>
                            </td>
                            <td className="px-5 py-3">
                                <button className="text-gray-500 hover:text-black">
                                    <FaEllipsisV />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProductPage;
