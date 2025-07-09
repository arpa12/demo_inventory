import React, { useEffect, useState } from 'react';

function UnitModal({ isOpen, onClose }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShow(true);
        } else {
            const timeout = setTimeout(() => setShow(false), 200);
            return () => clearTimeout(timeout);
        }
    }, [isOpen]);

    if (!isOpen && !show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div
                className={`bg-white p-6 rounded shadow-lg w-full max-w-lg transform transition-all duration-200 ${
                    isOpen ? 'scale-100 opacity-100' : 'scale-90 opacity-0'
                }`}
            >
                <h2 className="text-xl font-bold mb-4">Create Unit</h2>
                <form className="space-y-4">
                    {/* Unit Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Unit Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., Kilogram"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                        />
                    </div>

                    {/* Short Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Short Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            required
                            placeholder="e.g., kg"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                        />
                    </div>

                    {/* Base Unit */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Base Unit (1 Ton = ?)
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                placeholder="e.g., 1000"
                                className="w-2/3 px-3 py-2 border border-gray-300 rounded-l shadow-sm focus:outline-none focus:ring"
                            />
                            <select
                                className="w-1/3 px-3 py-2 border border-gray-300 rounded-r shadow-sm focus:outline-none focus:ring"
                            >
                                <option value="kg">Kg</option>
                                <option value="g">Gram</option>
                                <option value="lb">Pound</option>
                                <option value="pcs">Piece</option>
                            </select>
                        </div>
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

export default UnitModal;
