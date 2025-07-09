import React, { useState } from 'react';

function ProductCreatePage() {
    const [product, setProduct] = useState({
        name: '',
        code: '',
        brand: '',
        category: '',
        image: null,
        hasExpiry: false,
        hasImei: false,
        isArchived: false,
        details: '',
        unit: '',
        purchasePrice: '',
        salePrice: '',
        discount: 0,
        minSale: 1,
        stockAlert: 0,
    });

    const [isDraft, setIsDraft] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const result = { ...product, draft: isDraft };
        console.log('Submitted:', result);
        setIsDraft(false);
    };

    return (
        <div className="max-w-5xl mx-auto p-6 space-y-6 mt-6">
            <h1 className="text-3xl font-semibold text-gray-800">Create Product</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Card 1: Product Basic Info */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                    <h3 className="text-3xl font-semibold text-gray-800">Product Information</h3>
                    <br/>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input name="name" required onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Code / SKU</label>
                            <input name="code" onChange={handleChange} placeholder="Auto-generated if empty" className="w-full border px-3 py-2 rounded" />
                        </div>
                    </div>

                    {/* Brand & Category */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Brand</label>
                            <select name="brand" onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                <option value="">Select Brand</option>
                                <option value="apple">Apple</option>
                                <option value="samsung">Samsung</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Category</label>
                            <select name="category" onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="grocery">Grocery</option>
                            </select>
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Image</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded file:mr-3 file:py-2 file:px-4 file:border-0 file:rounded file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>

                    {/* Checkboxes */}
                    <div className="flex flex-wrap items-center gap-6">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="hasExpiry" onChange={handleChange} />
                            <span className="text-sm">Has Manufacturing/Expiry Date</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="hasImei" onChange={handleChange} />
                            <span className="text-sm">Has Unique Code / IMEI</span>
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="checkbox" name="isArchived" onChange={handleChange} />
                            <span className="text-sm">Is Archived</span>
                        </label>
                    </div>

                    {/* Details */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Product Details</label>
                        <textarea
                            name="details"
                            onChange={handleChange}
                            rows={3}
                            className="w-full border px-3 py-2 rounded"
                            placeholder="Write something..."
                        ></textarea>
                    </div>
                </div>

                {/* Card 2: Pricing & Stock Info */}
                <div className="bg-white p-6 rounded-lg shadow space-y-4">
                    <h3 className="text-3xl font-semibold text-gray-800">Pricing & Stock Info</h3>
                    <br/>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Unit</label>
                            <select name="unit" onChange={handleChange} className="w-full border px-3 py-2 rounded">
                                <option value="">Select Unit</option>
                                <option value="kg">Kilogram</option>
                                <option value="pc">Piece</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Purchase Price</label>
                            <input type="number" name="purchasePrice" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Sale Price</label>
                            <input type="number" name="salePrice" onChange={handleChange} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Discount (%)</label>
                            <input type="number" name="discount" onChange={handleChange} value={product.discount} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Minimum Sale</label>
                            <input type="number" name="minSale" onChange={handleChange} value={product.minSale} className="w-full border px-3 py-2 rounded" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock Alert</label>
                            <input type="number" name="stockAlert" onChange={handleChange} value={product.stockAlert} className="w-full border px-3 py-2 rounded" />
                        </div>
                    </div>

                </div>

                {/* Submit Buttons */}
                <div className="flex justify-between mt-6">
                    <button
                        type="button"
                        onClick={() => {
                            setIsDraft(true);
                        }}
                        className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition-all"
                    >
                        Save as Draft
                    </button>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all">
                        Save Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductCreatePage;
