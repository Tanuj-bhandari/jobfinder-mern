import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import ProtectedRoute2 from './components/admin/ProtectedRoute2'
import AboutUs from './components/Other/AboutUs'
import SavedJobs from './components/SavedJobs'
import AdminLogin from './components/auth/AdminLogin'
import AdminDashboard from './components/owner/AdminDashboard'
import AdminSignup from './components/auth/AdminSignup'
import AddCodingQ from './components/owner/AddCodingQ'
import AddInterviewQ from './components/owner/AddInterviewQ'
import OwnerProtected from './components/admin/OwnerProtected'
const approuter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
   {
    path:'/login',
    element:<Login/>
  },
  {
    path:'/signup',
    element:<Signup/>
  },
  {
    path:'/aboutUs',
    element:<AboutUs/>
  },
  {
    path:'/savedjobs',
    element:<SavedJobs/>
  },

  //admin
  {
    path:'/admin',
    element:<AdminLogin/>
  },
  {
    path:'/adminSignup',
    element:<AdminSignup/>
  },
  {
    path:'/admin/dashboard',
    element:<OwnerProtected><AdminDashboard/></OwnerProtected>
  },
  {
    path:'/admin/codingQuestions',
    element:<OwnerProtected><AddCodingQ/></OwnerProtected>
  },
  {
    path:'/admin/interviewQuestions',
    element:<OwnerProtected><AddInterviewQ/></OwnerProtected>
  },



   {
    path:'/jobs',
    element:<ProtectedRoute2><Jobs/></ProtectedRoute2>
   },
   {
    path: "/description/:id",
    element: <ProtectedRoute2><JobDescription /></ProtectedRoute2>
  },
  {
    path:'/browse',
    element:<ProtectedRoute2><Browse/></ProtectedRoute2>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  // For admin
  {
    path:"/admin/companies",
    element:<ProtectedRoute><Companies/></ProtectedRoute>
  },
  {
    path:"/admin/companies/create",
    element:<ProtectedRoute><CompanyCreate/></ProtectedRoute>
  },
  {
    path:"/admin/companies/:id",
    element:<ProtectedRoute><CompanySetup/></ProtectedRoute>
  },
  {
    path:"/admin/jobs",
    element:<ProtectedRoute><AdminJobs/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/post",
    element:<ProtectedRoute><PostJob/></ProtectedRoute>
  },
  {
    path:"/admin/jobs/:id/applicants",
    element:<ProtectedRoute><Applicants/></ProtectedRoute>
  }
])

function App() {
  return (
   <div >
  <RouterProvider router = {approuter}/>
   </div>
  )
}

export default App
