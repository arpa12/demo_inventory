import React, { useEffect, useState } from 'react';

function WarehouseModal({ isOpen, onClose }) {
    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        type: 'Branch',
        name: '',
        phone: '',
        email: '',
        address: '',
    });

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
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitted Warehouse:', form);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-xl">
                <h2 className="text-xl font-bold mb-4">Create Warehouse/Branch</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Type <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-6">
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Warehouse"
                                    checked={form.type === 'Warehouse'}
                                    onChange={handleChange}
                                />
                                Warehouse
                            </label>
                            <label className="flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="type"
                                    value="Branch"
                                    checked={form.type === 'Branch'}
                                    onChange={handleChange}
                                />
                                Branch
                            </label>
                        </div>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring"
                            placeholder="e.g., North DOHS Branch"
                        />
                    </div>

                    {/* Phone and Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                                placeholder="e.g., 01700000000"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                                placeholder="e.g., example@email.com"
                            />
                        </div>
                    </div>

                    {/* Address Field */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="address"
                            value={form.address}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm"
                            placeholder="e.g., Mirpur DOHS, Dhaka"
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

export default WarehouseModal;
