import React, { useState } from 'react';

function Topbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex justify-end items-center bg-white px-6 py-4 shadow relative">
            <div className="relative">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-10 h-10 rounded-full bg-gray-300 focus:outline-none"
                >
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        alt="User"
                        className="w-full h-full rounded-full object-cover"
                    />
                </button>

                {open && (
                    <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded z-50">
                        <div className="px-4 py-2 text-sm border-b">👤 John Doe</div>
                        <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Profile</div>
                        <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Settings</div>
                        <div className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer">Logout</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Topbar;
