import React, { useEffect, useState } from 'react';

function CategoryModal({ isOpen, onClose }) {
    const [show, setShow] = useState(false);

    // Animate modal in/out
    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 200); // match transition duration
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    // Don't render at all when hidden
    if (!isOpen && !show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div
                className={`bg-white p-6 rounded shadow-lg w-full max-w-lg transform transition-all duration-200 ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <h2 className="text-xl font-bold mb-4">Create Category</h2>
                <form className="space-y-4">
                    {/* Category Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Category Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            placeholder="e.g., Electronics"
                        />
                    </div>

                    {/* Category Code */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Category Code</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            placeholder="e.g., CA07"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            rows="3"
                            placeholder="Enter category description..."
                        ></textarea>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Image</label>
                        <input
                            type="file"
                            accept="image/*"
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

export default CategoryModal;
