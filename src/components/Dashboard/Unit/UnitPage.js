import React, { useState } from 'react';
import UnitModal from './UnitModal';
import { FaEdit, FaTimes, FaChevronDown, FaPlus } from 'react-icons/fa';

function UnitPage() {
    const [modalOpen, setModalOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [perPage, setPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [exportOpen, setExportOpen] = useState(false);

    const units = [
        { name: 'Kilogram', short: 'kg', base: 'Weight' },
        { name: 'Gram', short: 'g', base: 'Weight' },
        { name: 'Piece', short: 'pc', base: 'Count' },
        { name: 'Meter', short: 'm', base: 'Length' },
        { name: 'Liter', short: 'L', base: 'Volume' },
    ];

    const filtered = units.filter(unit =>
        unit.name.toLowerCase().includes(search.toLowerCase()) ||
        unit.short.toLowerCase().includes(search.toLowerCase()) ||
        unit.base.toLowerCase().includes(search.toLowerCase())
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
                <h1 className="text-2xl font-bold text-gray-800">All Units</h1>
                <button
                    onClick={() => setModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                    <FaPlus /> Create
                </button>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap justify-between items-center gap-3">
                <div className="flex items-center gap-3">
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

                    <div className="relative">
                        <button
                            onClick={() => setExportOpen(!exportOpen)}
                            className="flex items-center gap-1 px-3 py-1 border rounded text-sm bg-white hover:bg-gray-50"
                        >
                            EXPORT <FaChevronDown className="text-xs" />
                        </button>
                        {exportOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-10">
                                <button onClick={() => console.log('PDF')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">PDF</button>
                                <button onClick={() => window.print()} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Print</button>
                                <button onClick={() => console.log('Excel')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Excel</button>
                                <button onClick={() => console.log('CSV')} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">CSV</button>
                            </div>
                        )}
                    </div>
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
                        <th className="px-5 py-3">Name</th>
                        <th className="px-5 py-3">Short</th>
                        <th className="px-5 py-3">Base Unit</th>
                        <th className="px-5 py-3">Action</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {paginated.map((unit, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-5 py-3">{unit.name}</td>
                            <td className="px-5 py-3">{unit.short}</td>
                            <td className="px-5 py-3">{unit.base}</td>
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
                        Showing {paginated.length > 0 ? (currentPage - 1) * perPage + 1 : 0} to {(currentPage - 1) * perPage + paginated.length} of {total} entries
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
            <UnitModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
        </div>
    );
}

export default UnitPage;
