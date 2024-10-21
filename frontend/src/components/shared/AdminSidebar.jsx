import React from 'react'
import { Link } from 'react-router-dom'

const AdminSidebar = () => {
  return (
    <div className="bg-gray-500 text-white w-52 p-6">
    <h1 className="text-lg font-semibold mb-6">ADMIN PORTAL</h1>
    <ul className="space-y-4">
      <li>
        <Link to="/admin/dashboard" className="text-gray-300 hover:text-white transition-colors">
          Overview
        </Link>
      </li>
      <li>
        <Link to="/admin/interviewQuestions" className="text-gray-300 hover:text-white transition-colors">
          Interview Questions
        </Link>
      </li>
      <li>
        <Link to="/admin/codingQuestions" className="text-gray-300 hover:text-white transition-colors">
        Coding Questions
        </Link>
      </li>
      <li>
        <Link to="/pages" className="text-gray-300 hover:text-white transition-colors">
          MNC
        </Link>
      </li>
      <li>
        <Link to="/external" className="text-gray-300 hover:text-white transition-colors">
          More
        </Link>
      </li>
    </ul>
  </div>
  )
}

export default AdminSidebar