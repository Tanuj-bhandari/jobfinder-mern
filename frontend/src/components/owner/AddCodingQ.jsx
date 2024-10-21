import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import AdminNavbar from '../shared/AdminNavbar';
import AdminSidebar from '../shared/AdminSidebar';
import axios from 'axios';
import { toast } from 'sonner';
import { OWNER_API_END_POINT } from '@/utils/constant';

const AddCodingQ = () => {
  const [pdfs, setPdfs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPdf, setNewPdf] = useState({ title: '', description: '', questions: '', file: null });

  const handleDelete = (id) => {
    setPdfs(pdfs.filter(pdf => pdf.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPdf({ ...newPdf, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewPdf({ ...newPdf, file: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', newPdf.title);
    formData.append('description', newPdf.description);
    formData.append('questions', newPdf.questions); 
    formData.append('file', newPdf.file);

    try {
      const response = await axios.post(`${OWNER_API_END_POINT}/uploadFile`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },withCredentials:true,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setPdfs([...pdfs, { id: Date.now(), ...newPdf }]);
        setNewPdf({ title: '', description: '', questions: '', file: null });
        setShowForm(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      toast.error('Failed to upload the PDF.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <AdminNavbar />
        <div className="p-10">
          <h1 className="text-3xl font-bold mb-6">Add Coding Questions</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {pdfs.map(pdf => (
              <div key={pdf.id} className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-bold">{pdf.title}</h2>
                <p className="text-gray-600">{pdf.description}</p>
                <button onClick={() => handleDelete(pdf.id)} className="text-red-600 hover:text-red-800">Delete</button>
              </div>
            ))}
            <div 
              className="bg-white shadow-lg rounded-lg p-6 flex items-center justify-center cursor-pointer" 
              onClick={() => setShowForm(true)}
            >
              <FaPlus className="text-4xl text-gray-500" />
            </div>
          </div>

          {showForm && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <form 
                onSubmit={handleSubmit} 
                className="bg-white rounded-lg p-8 shadow-md w-1/3"
              >
                <h2 className="text-2xl mb-4">Add New PDF</h2>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Title" 
                  value={newPdf.title} 
                  onChange={handleChange} 
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  required
                />
                <textarea 
                  name="description" 
                  placeholder="Description" 
                  value={newPdf.description} 
                  onChange={handleChange} 
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  required
                />
                <input 
                  type="text" 
                  name="questions" 
                  placeholder="Question" 
                  value={newPdf.questions} 
                  onChange={handleChange} 
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  required
                />
                <input 
                  type="file" 
                  onChange={handleFileChange} 
                  className="mb-4"
                  required
                />
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Upload</button>
                <button 
                  type="button" 
                  onClick={() => setShowForm(false)} 
                  className="ml-4 bg-gray-300 text-black px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCodingQ;
