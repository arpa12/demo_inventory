import React, { useState } from 'react';
import WarehouseModal from './WareHouseModal';
import { FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

function WarehousePage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [warehouses, setWarehouses] = useState([
        {
            type: 'Branch',
            name: 'Banani Branch',
            phone: '01711112222',
            email: 'banani@example.com',
            address: 'House 12, Road 4, Banani, Dhaka'
        },
        {
            type: 'Warehouse',
            name: 'Main Warehouse',
            phone: '01888889999',
            email: 'warehouse@company.com',
            address: 'Sector 7, Uttara, Dhaka'
        },
        {
            type: 'Branch',
            name: 'Chittagong Branch',
            phone: '01655556666',
            email: 'ctg@company.com',
            address: 'GEC Circle, Chittagong'
        }
    ]);


    const handleAddWarehouse = (newWarehouse) => {
        setWarehouses(prev => [...prev, newWarehouse]);
        setModalOpen(false);
    };

    const filtered = warehouses.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        (item.address?.toLowerCase().includes(search.toLowerCase()))
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / perPage);
    const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

    const changePage = (dir) => {
        setCurrentPage((prev) => {
            if (dir === 'next' && prev < totalPages) return prev + 1;
            if (dir === 'prev' && prev > 1) return prev - 1;
            return prev;
        });
    };

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Warehouses/Branches</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-2">
                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border px-2 py-1 rounded text-sm"
                    >
                        {[5, 10, 20].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                    <button className="px-3 py-1 text-sm border rounded bg-white hover:bg-gray-50">
                        EXPORT
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-1 text-sm w-48"
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 text-center">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-5 py-3">Type</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Phone</th>
                        <th className="px-5 py-3">Email</th>
                        <th className="px-5 py-3">Address</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginated.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-5 py-3">{item.type}</td>
                            <td className="px-5 py-3">{item.name}</td>
                            <td className="px-5 py-3">{item.phone}</td>
                            <td className="px-5 py-3">{item.email}</td>
                            <td className="px-5 py-3">{item.address}</td>
                            <td className="px-5 py-3">
                                <div className="flex justify-center gap-2">
                                    <button className="text-green-600 hover:text-white border border-green-500 hover:bg-green-600 p-2 rounded transition">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-white border border-red-500 hover:bg-red-600 p-2 rounded transition">
                                        <FaTimes />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Footer */}
                <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-500 bg-gray-50">
                    <div>
                        Showing {paginated.length > 0 ? ((currentPage - 1) * perPage + 1) : 0} to {(currentPage - 1) * perPage + paginated.length} of {total} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => changePage('prev')}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="font-semibold">{currentPage}</span>
                        <button
                            onClick={() => changePage('next')}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {modalOpen && (
                <WarehouseModal
                    isOpen={modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSave={handleAddWarehouse}
                />
            )}
        </div>
    );
}

export default WarehousePage;
