import React from 'react';
import { FaEllipsisV, FaPlus, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const transfers = [
    {
        id: 1,
        transferNo: 'TR-1001',
        challanNo: 'CH-789',
        transferDate: '2025-07-08',
        from: 'Main Warehouse',
        to: 'Branch A',
        items: 5,
        amount: 3150,
    },
    {
        id: 2,
        transferNo: 'TR-1002',
        challanNo: 'CH-790',
        transferDate: '2025-07-07',
        from: 'Main Warehouse',
        to: 'Branch B',
        items: 3,
        amount: 1800,
    },
    {
        id: 3,
        transferNo: 'TR-1003',
        challanNo: 'CH-791',
        transferDate: '2025-07-06',
        from: 'Main Warehouse',
        to: 'Branch C',
        items: 4,
        amount: 2400,
    },
];

function StockTransferPage() {
    const navigate = useNavigate();

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Stock Transfers</h1>
                <button
                    onClick={() => navigate('/stock-transfer/create')}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create Transfer
                </button>
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 text-center">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-5 py-3">SL</th>
                        <th className="px-5 py-3">Transfer No</th>
                        <th className="px-5 py-3">Date</th>
                        <th className="px-5 py-3">From</th>
                        <th className="px-5 py-3">To</th>
                        <th className="px-5 py-3">Items</th>
                        <th className="px-5 py-3">Amount (BDT)</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {transfers.map((transfer, index) => (
                        <tr key={transfer.id} className="hover:bg-gray-50">
                            <td className="px-5 py-3">{index + 1}</td>
                            <td className="px-5 py-3">{transfer.transferNo}</td>
                            <td className="px-5 py-3">{transfer.transferDate}</td>
                            <td className="px-5 py-3">{transfer.from}</td>
                            <td className="px-5 py-3">{transfer.to}</td>
                            <td className="px-5 py-3">{transfer.items}</td>
                            <td className="px-5 py-3">{transfer.amount.toFixed(2)}</td>
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

export default StockTransferPage;
