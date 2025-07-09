import React, { useState } from 'react';
import { FaPlus, FaTimes, FaCog } from 'react-icons/fa';
import { RiMenuAddFill } from "react-icons/ri";

function CreateSale() {
    const [items, setItems] = useState([
        {
            item: '',
            qty: '',
            qtyUnit: 'pcs', // Add this
            batch: '',
            expDate: '',
            rate: '',
            discount: '',
            discountType: '%',
            vat: '',
            vatType: '%',
            showModal: false,
            isExpanded: false
        },

    ]);
    const [purchaseDate, setPurchaseDate] = useState(new Date());
    const [payments, setPayments] = useState([{ method: 'Cash', amount: 2000 }]);
    const [suppliers, setSuppliers] = useState(['']);
    const [showSupplierModal, setShowSupplierModal] = useState(false);

    const updateQtyUnit = (index, value) => {
        const updated = [...items];
        updated[index].qtyUnit = value;
        setItems(updated);
    };


    const openModal = (index) => {
        const updated = [...items];
        updated[index].showModal = true;
        setItems(updated);
    };

    const closeModal = (index) => {
        const updated = [...items];
        updated[index].showModal = false;
        setItems(updated);
    };

    const setDiscountVat = (index, discount, vat) => {
        const updated = [...items];
        updated[index].discount = discount;
        updated[index].vat = vat;
        updated[index].showModal = false;
        setItems(updated);
    };

    const updateDiscount = (index, value) => {
        const updated = [...items];
        updated[index].discount = value;
        setItems(updated);
    };

    const updateDiscountType = (index, value) => {
        const updated = [...items];
        updated[index].discountType = value;
        setItems(updated);
    };

    const updateVat = (index, value) => {
        const updated = [...items];
        updated[index].vat = value;
        setItems(updated);
    };

    const updateVatType = (index, value) => {
        const updated = [...items];
        updated[index].vatType = value;
        setItems(updated);
    };


    const addItem = () => {
        setItems([
            ...items,
            {
                item: '',
                qty: '',
                batch: '',
                expDate: '',
                rate: '',
                discount: '',
                vat: '',
                showModal: false,
                isExpanded: false,
            },
        ]);
    };

    const toggleItemExpanded = (index) => {
        const updated = [...items];
        const currentItem = updated[index];

        if (!currentItem.isExpanded) {
            // Add a new row after current
            const newItem = {
                item: '',
                qty: '',
                batch: '',
                expDate: '',
                rate: '',
                discount: '',
                vat: '',
                showModal: false,
                isExpanded: false,
            };
            updated[index].isExpanded = true;
            updated.splice(index + 1, 0, newItem);
        } else {
            // Remove the current row if expanded
            updated.splice(index, 1);
        }

        setItems(updated);
    };

    const removeItem = (index) => {
        const updated = [...items];
        updated.splice(index, 1);
        setItems(updated);
    };

    const addPayment = () => {
        setPayments([...payments, { method: '', amount: '' }]);
    };

    const removePayment = (index) => {
        const updated = [...payments];
        updated.splice(index, 1);
        setPayments(updated);
    };

    const formatDate = (date) => {
        if (!date) return '';
        const d = new Date(date);
        if (isNaN(d)) return '';
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    };

    const handleAddSupplier = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value.trim();
        const phone = form.phone.value.trim();
        const company = form.company.value.trim();
        const address = form.address.value.trim();
        if (name && phone && company && address) {
            setSuppliers([...suppliers, company]);
            setShowSupplierModal(false);
            form.reset();
        }
    };

    const updateItemField = (index, field, value) => {
        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const updatePaymentField = (index, field, value) => {
        const updated = [...payments];
        updated[index][field] = value;
        setPayments(updated);
    };

    const calculateTotal = (item) => {
        const qty = parseFloat(item.qty) || 0;
        const rate = parseFloat(item.rate) || 0;
        const discount = parseFloat(item.discount) || 0;
        const vat = parseFloat(item.vat) || 0;

        const subtotal = qty * rate;
        const discountAmount =
            item.discountType === 'BDT' ? discount : (subtotal * discount) / 100;
        const vatAmount =
            item.vatType === 'BDT'
                ? vat
                : ((subtotal - discountAmount) * vat) / 100;

        return subtotal - discountAmount + vatAmount;
    };

    const grandTotal = items.reduce((sum, item) => sum + calculateTotal(item), 0);
    const paidAmount = payments.reduce((sum, payment) => sum + (parseFloat(payment.amount) || 0), 0);
    const dueAmount = grandTotal - paidAmount;

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6">
            <div className="bg-white shadow rounded p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Sale Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Date Field */}
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            placeholder="dd/mm/yyyy"
                            value={formatDate(purchaseDate)}
                            onChange={(e) => {
                                const [day, month, year] = e.target.value.split('/');
                                const parsedDate = new Date(`${year}-${month}-${day}`);
                                if (!isNaN(parsedDate)) {
                                    setPurchaseDate(parsedDate);
                                }
                            }}
                        />
                    </div>

                    {/* Warehouse/Branch */}
                    <div>
                        <label className="text-sm font-medium block mb-1">
                            From <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full border rounded p-2">
                            <option>Select Warehouse/Branch </option>
                            <option>Dhaka Branch</option>
                            <option>Rajshahi Branch</option>
                            <option>Kumilla Branch</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-sm font-medium block mb-1">
                            To <span className="text-red-500">*</span>
                        </label>
                        <select className="w-full border rounded p-2">
                            <option>Select Warehouse/Branch </option>
                            <option>Dhaka Branch</option>
                            <option>Rajshahi Branch</option>
                            <option>Kumilla Branch</option>
                        </select>
                    </div>
                </div>

                {/* Comment Field */}
                <div className="mt-6">
                    <label htmlFor="w3review" className="block text-sm font-medium text-gray-700 mb-1">
                        Comment
                    </label>
                    <textarea
                        id="w3review"
                        name="w3review"
                        rows="4"
                        className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Write comments (if any)"
                    ></textarea>
                </div>
            </div>


            {/* Supplier Modal */}
            {showSupplierModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                        <h3 className="text-lg font-semibold mb-4">Add Supplier</h3>
                        <div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Name <span className="text-red-500">*</span></label>
                                <input
                                    id="supplier-name"
                                    type="text"
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Phone Number <span className="text-red-500">*</span></label>
                                <input
                                    id="supplier-phone"
                                    type="text"
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block text-sm mb-1">Address </label>
                                <textarea
                                    id="supplier-address"
                                    rows="2"
                                    className="w-full border rounded p-2"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                                <button
                                    type="button"
                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                    onClick={() => setShowSupplierModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="bg-blue-600 text-white px-4 py-1 rounded"
                                    onClick={() => {
                                        const name = document.getElementById('supplier-name').value.trim();
                                        const phone = document.getElementById('supplier-phone').value.trim();
                                        const company = document.getElementById('supplier-company').value.trim();
                                        const address = document.getElementById('supplier-address').value.trim();

                                        if (name && phone && company && address) {
                                            setSuppliers([...suppliers, company]);
                                            setShowSupplierModal(false);
                                            // Clear form
                                            document.getElementById('supplier-name').value = '';
                                            document.getElementById('supplier-phone').value = '';
                                            document.getElementById('supplier-company').value = '';
                                            document.getElementById('supplier-address').value = '';
                                        }
                                    }}
                                >
                                    Add Customer
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Item Table */}
            <div className="bg-white shadow rounded p-4">
                <h3 className="text-lg font-semibold mb-2">Item Information</h3>

                <div className="overflow-auto">
                    <table className="w-full text-sm border">
                        <thead className="bg-gray-100 text-gray-700 text-center">
                        <tr>
                            <th className="border p-1">Item</th>
                            <th className="border p-1">Batch No *</th>
                            <th className="border p-1">Quantity</th>
                            <th className="border p-1">Rate</th>
                            <th className="border p-1">Discount/VAT</th>
                            <th className="border p-1">Total</th>
                            <th className="border p-1">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map((item, index) => (
                            <tr key={index} className="text-center">
                                <td className="border p-1">
                                    <select
                                        className="w-[10rem] border rounded p-1"
                                        value={item.item}
                                        onChange={(e) => updateItemField(index, 'item', e.target.value)}
                                    >
                                        <option value="">Select</option>
                                        <option value="Item A">Item A</option>
                                        <option value="Item B">Item B</option>
                                    </select>
                                </td>
                                <td className="border p-1">
                                    <input
                                        type="text"
                                        className="w-[7rem] border rounded p-1"
                                        placeholder="Batch No"
                                        value={item.batch}
                                        onChange={(e) => updateItemField(index, 'batch', e.target.value)}
                                    />
                                </td>

                                <td className="border p-1">
                                    <div className="flex gap-2">
                                        <input
                                            type="number"
                                            className="w-3/5 border rounded p-1"
                                            placeholder="Qty"
                                            value={item.qty}
                                            onChange={(e) => updateItemField(index, 'qty', e.target.value)}
                                        />
                                        <select
                                            className="w-2/5 border rounded p-1"
                                            value={item.qtyUnit}
                                            onChange={(e) => updateQtyUnit(index, e.target.value)}
                                        >
                                            <option value="pcs">pcs</option>
                                            <option value="kg">kg</option>
                                            <option value="ltr">ltr</option>
                                        </select>
                                    </div>
                                </td>
                                <td className="border p-1">
                                    <input
                                        type="number"
                                        className="w-[6rem] border rounded p-1"
                                        placeholder="Rate"
                                        value={item.rate}
                                        onChange={(e) => updateItemField(index, 'rate', e.target.value)}
                                    />
                                </td>
                                <td className="border p-1 cursor-pointer text-black-600 underline" onClick={() => openModal(index)}>
                                    {item.discount || item.vat ? `${item.discount || 0}% / ${item.vat || 0}%` : <RiMenuAddFill className="inline-block" />}
                                </td>
                                <td className="border p-1 bg-gray-100">{calculateTotal(item).toFixed(2)}</td>
                                <td className="border p-1">
                                    <div className="flex gap-1 justify-center">
                                        <button
                                            onClick={() => toggleItemExpanded(index)}
                                            className={`px-2 py-2 text-white rounded ${item.isExpanded ? 'bg-red-600' : 'bg-green-600'}`}
                                            title={item.isExpanded ? 'Remove Row' : 'Add Row'}
                                        >
                                            {item.isExpanded ? <FaTimes /> : <FaPlus />}
                                        </button>
                                    </div>
                                </td>

                                {/* Modal */}
                                {item.showModal && (
                                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                                        <div className="bg-white p-6 rounded shadow-md w-96">
                                            <h4 className="text-lg font-semibold mb-4">Set Discount & VAT</h4>
                                            <div className="mb-3">
                                                <label className="block text-sm text-gray-700 mb-1">Discount</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="e.g., 10"
                                                        value={item.discount}
                                                        onChange={(e) => updateDiscount(index, e.target.value)}
                                                        className="w-3/5 border border-gray-300 rounded p-2 placeholder-gray-400"
                                                    />
                                                    <select
                                                        className="w-2/5 border border-gray-300 rounded p-2"
                                                        value={item.discountType}
                                                        onChange={(e) => updateDiscountType(index, e.target.value)}
                                                    >
                                                        <option value="%">%</option>
                                                        <option value="BDT">BDT</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="mb-3">
                                                <label className="block text-sm text-gray-700 mb-1">VAT</label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="number"
                                                        placeholder="e.g., 5"
                                                        value={item.vat}
                                                        onChange={(e) => updateVat(index, e.target.value)}
                                                        className="w-3/5 border border-gray-300 rounded p-2 placeholder-gray-400"
                                                    />
                                                    <select
                                                        className="w-2/5 border border-gray-300 rounded p-2"
                                                        value={item.vatType}
                                                        onChange={(e) => updateVatType(index, e.target.value)}
                                                    >
                                                        <option value="%">%</option>
                                                        <option value="BDT">BDT</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-2">
                                                <button
                                                    onClick={() => setDiscountVat(index, item.discount, item.vat)}
                                                    className="bg-blue-600 text-white px-4 py-1 rounded"
                                                >
                                                    Set
                                                </button>
                                                <button
                                                    onClick={() => closeModal(index)}
                                                    className="bg-gray-400 text-white px-4 py-1 rounded"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </tr>
                        ))}
                        <tr>
                            <td colSpan="8" className="bg-white p-2">
                                <div className="flex justify-end pr-[10px]">
                                    <div className="w-[240px] border border-gray-300 rounded text-sm">
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Total</span>
                                            <span className="w-1/2 text-center">{grandTotal.toFixed(2)} BDT</span>
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Purchase Discount</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Total Discount</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Total VAT</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Shipping</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Labour</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Other</span>
                                            <input
                                                type="number"
                                                className="border rounded p-1 w-1/2 text-center"
                                                defaultValue="0.00"
                                            />
                                        </div>
                                        <div className="flex px-4 py-2 border-b bg-gray-100 font-semibold">
                                            <span className="w-1/2 text-left">Grand Total</span>
                                            <span className="w-1/2 text-center">{grandTotal.toFixed(2)} BDT</span>
                                        </div>
                                        <div className="flex px-4 py-2 border-b">
                                            <span className="w-1/2 text-left">Paid Amount</span>
                                            <span className="w-1/2 text-center">{paidAmount.toFixed(2)} BDT</span>
                                        </div>
                                        <div className="flex px-4 py-2 bg-red-100 font-bold text-red-600">
                                            <span className="w-1/2 text-left">Due Amount</span>
                                            <span className="w-1/2 text-center">{dueAmount.toFixed(2)} BDT</span>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mt-4 items-start">
                    {/* Payment Methods */}
                    <div className="md:w-2/3 w-full border border-gray-200 p-3 rounded">
                        <h4 className="font-semibold mb-2">Payment Methods</h4>
                        {payments.map((row, index) => (
                            <div key={index} className="flex gap-2 mb-2">
                                <select
                                    className="w-2/5 border p-2 rounded"
                                    value={row.method}
                                    onChange={(e) => updatePaymentField(index, 'method', e.target.value)}
                                >
                                    <option>Cash</option>
                                    <option>DBBL</option>
                                    <option>Bkash</option>
                                </select>
                                <input
                                    type="number"
                                    className="w-2/5 border p-2 rounded"
                                    value={row.amount}
                                    placeholder="Amount"
                                    onChange={(e) => updatePaymentField(index, 'amount', e.target.value)}
                                />
                                <button
                                    onClick={() => removePayment(index)}
                                    className="bg-red-500 text-white px-3 rounded"
                                >
                                    <FaTimes />
                                </button>
                            </div>
                        ))}
                        <button onClick={addPayment} className="mt-2 bg-green-600 text-white px-4 py-1 rounded">
                            <FaPlus className="inline-block mr-1" /> Add New Payment Method
                        </button>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-between mt-6">
                <button
                    type="button"
                    className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-all"
                >
                    Save as Draft
                </button>
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
                    Save Product
                </button>
            </div>
        </div>
    );
}

export default CreateSale;