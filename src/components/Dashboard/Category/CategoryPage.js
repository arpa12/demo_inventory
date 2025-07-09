import React, { useState } from 'react';
import CategoryModal from './CategoryModal';
import { FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

function CategoryPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const categories = [
        { code: 'CA6', name: 'Fruits' },
        { code: 'CA5', name: 'Shoes' },
        { code: 'CA4', name: 'T-Shirts' },
        { code: 'CA3', name: 'Jackets' },
        { code: 'CA2', name: 'Computers' },
        { code: 'CA1', name: 'Accessories' },
    ];

    const filtered = categories.filter(cat =>
        cat.name.toLowerCase().includes(search.toLowerCase()) ||
        cat.code.toLowerCase().includes(search.toLowerCase())
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
                <h1 className="text-2xl font-bold text-gray-800">All Categories</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                    <label className="text-sm text-gray-600">Show</label>
                    <select
                        value={perPage}
                        onChange={(e) => {
                            setPerPage(Number(e.target.value));
                            setCurrentPage(1);
                        }}
                        className="border rounded px-2 py-1 text-sm"
                    >
                        {[5, 10, 20].map(n => (
                            <option key={n} value={n}>{n}</option>
                        ))}
                    </select>
                </div>
                <input
                    type="text"
                    placeholder="Search categories..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="border rounded px-3 py-1 text-sm w-60"
                />
            </div>

            {/* Table */}
            <div className="bg-white shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-gray-700 text-center">
                    <thead className="bg-blue-100 text-gray-700 uppercase text-xs">
                    <tr>
                        <th className="px-5 py-3">SL</th>
                        <th className="px-5 py-3">Code</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginated.map((cat, index) => (
                        <tr key={cat.code} className="hover:bg-gray-50">
                            <td className="px-5 py-3">{(currentPage - 1) * perPage + index + 1}</td>
                            <td className="px-5 py-3">{cat.code}</td>
                            <td className="px-5 py-3">{cat.name}</td>
                            <td className="px-5 py-3">
                                <div className="flex justify-center gap-2">
                                    <button className="text-green-600 hover:text-white border border-green-500 hover:bg-green-600 p-2 rounded transition" title="Edit">
                                        <FaEdit />
                                    </button>
                                    <button className="text-red-600 hover:text-white border border-red-500 hover:bg-red-600 p-2 rounded transition" title="Delete">
                                        <FaTimes />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>

                {/* Pagination Footer */}
                <div className="flex justify-between items-center px-6 py-3 text-sm text-gray-500 bg-gray-50">
                    <div>
                        Showing {(currentPage - 1) * perPage + 1} to {(currentPage - 1) * perPage + paginated.length} of {total} entries
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => changePage('prev')}
                            disabled={currentPage === 1}
                            className="px-3 py-1 border rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <span className="px-2 font-semibold">{currentPage}</span>
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
            <CategoryModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default CategoryPage;
