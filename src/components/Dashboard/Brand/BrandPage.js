import React, { useState } from 'react';
import BrandModal from './BrandModal';
import { FaEdit, FaTimes, FaPlus } from 'react-icons/fa';

function BrandPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);

    const brands = [
        {
            name: 'brand Smartphones',
            description: 'brand Smartphones',
            image: 'https://via.placeholder.com/40x40.png?text=📷',
        },
        {
            name: 'brand Shoes',
            description: 'brand Shoes',
            image: 'https://via.placeholder.com/40x40.png?text=📷',
        },
        {
            name: 'brand Electronics',
            description: 'brand Electronics',
            image: 'https://via.placeholder.com/40x40.png?text=📷',
        },
        {
            name: 'Source',
            description: 'Source',
            image: 'https://via.placeholder.com/40x40.png?text=📷',
        },
        {
            name: 'Abcids',
            description: 'Abcids',
            image: 'https://via.placeholder.com/40x40.png?text=📷',
        },
    ];

    const filtered = brands.filter(brand =>
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        brand.description.toLowerCase().includes(search.toLowerCase())
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
                <h1 className="text-2xl font-bold text-gray-800">All Brands</h1>
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
                        <th className="px-5 py-3">Image</th>
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Description</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginated.map((brand, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-5 py-3">
                                <img src={brand.image} alt="brand" className="w-10 h-10 rounded mx-auto" />
                            </td>
                            <td className="px-5 py-3">{brand.name}</td>
                            <td className="px-5 py-3">{brand.description}</td>
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
            <BrandModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default BrandPage;
