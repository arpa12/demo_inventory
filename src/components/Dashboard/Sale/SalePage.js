import React from 'react';
import { FaEllipsisV, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const sales = [
    {
        id: 1,
        billNo: 'S-1001',
        challanNo: 'CH-789',
        saleDate: '2025-07-08',
        customer: 'ABC Traders',
        items: 5,
        amount: 3150,
    },
    {
        id: 2,
        billNo: 'S-1002',
        challanNo: 'CH-790',
        saleDate: '2025-07-07',
        customer: 'XYZ Store',
        items: 2,
        amount: 900,
    },
    {
        id: 3,
        billNo: 'S-1003',
        challanNo: 'CH-791',
        saleDate: '2025-07-06',
        customer: 'Honey Depot',
        items: 4,
        amount: 1200,
    },
];

function SalePage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Sales</h1>
                <button
                    onClick={() => navigate('/sale/create')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create Sale
                </button>
            </div>

            {/* Sales Table */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 text-center">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-5 py-3">SL</th>
                        <th className="px-5 py-3">Bill No</th>
                        <th className="px-5 py-3">Sale Date</th>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Items</th>
                        <th className="px-5 py-3">Amount (BDT)</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {sales.map((sale, index) => (
                        <tr key={sale.id} className="hover:bg-gray-50">
                            <td className="px-5 py-3">{index + 1}</td>
                            <td className="px-5 py-3">{sale.billNo}</td>
                            <td className="px-5 py-3">{sale.saleDate}</td>
                            <td className="px-5 py-3">{sale.customer}</td>
                            <td className="px-5 py-3">{sale.items}</td>
                            <td className="px-5 py-3">{sale.amount.toFixed(2)}</td>
                            <td className="px-5 py-3">
                                <div className="flex justify-center gap-2">
                                    <button className="text-blue-600 hover:text-blue-800" title="View Details">
                                        <FaEye />
                                    </button>
                                    <button
                                        className="text-gray-400 cursor-not-allowed"
                                        title="Edit Disabled"
                                    >
                                        <FaEllipsisV />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default SalePage;
