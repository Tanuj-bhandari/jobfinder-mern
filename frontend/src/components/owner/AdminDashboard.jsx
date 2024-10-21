import React from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../shared/AdminNavbar';
import AdminSidebar from '../shared/AdminSidebar';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    <AdminSidebar/>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AdminNavbar/>
        <div className="p-10">
          <h1 className="text-3xl font-bold mb-6">Overview</h1>
          <p className="text-lg text-gray-700 mb-8">Welcome, developer!</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Card for Total Sales */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold">Total Student</h2>
              <p className="text-2xl text-green-600">$12,628</p>
              <p className="text-gray-600">+20%</p>
            </div>

            {/* Card for Expenses */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold">Job Posted</h2>
              <p className="text-2xl text-red-600">$2,250</p>
              <p className="text-gray-600">+5%</p>
            </div>

            {/* Card for Projects */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold">Total Recuiters</h2>
              <p className="text-2xl text-blue-600">23</p>
              <p className="text-gray-600">Open</p>
            </div>

            {/* Card for Invoices */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h2 className="text-xl font-bold">Invoices</h2>
              <p className="text-2xl text-yellow-600">6</p>
              <p className="text-gray-600">New</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
