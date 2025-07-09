import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 flex flex-col bg-gray-100 min-h-screen">
                <Topbar />
                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default DashboardLayout;
