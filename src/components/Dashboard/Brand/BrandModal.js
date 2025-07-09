import React, { useEffect, useState } from 'react';

function BrandModal({ isOpen, onClose }) {
    const [show, setShow] = useState(false);
    const [brand, setBrand] = useState({
        name: '',
        description: '',
        image: null,
        category: ''
    });

    const categoryOptions = [
        { code: 'CA1', name: 'Electronics' },
        { code: 'CA2', name: 'Shoes' },
        { code: 'CA3', name: 'Fruits' }
    ];

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!isOpen && !show) return null;

    const handleChange = (e) => {
        const { name, type, value, files } = e.target;
        setBrand((prev) => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Brand:', brand);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div
                className={`bg-white p-6 rounded shadow-lg w-full max-w-lg transform transition-all duration-200 ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <h2 className="text-xl font-bold mb-4">Create Brand</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Brand Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Brand Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            required
                            value={brand.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            placeholder="e.g., Apple"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            name="category"
                            value={brand.category}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        >
                            <option value="">Select Category</option>
                            {categoryOptions.map((cat) => (
                                <option key={cat.code} value={cat.code}>
                                    {cat.name} ({cat.code})
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={brand.description}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            rows="3"
                            placeholder="Write a short description..."
                        />
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                                file:rounded file:border-0 file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-2 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default BrandModal;
