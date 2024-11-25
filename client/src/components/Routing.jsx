import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Layout from '../layout/Layout'
import RegisterPage from '../pages/RegisterPage'
import LoginPage from '../pages/LoginPage'
import MarkAttendance from '../pages/MarkAttendance'
import ViewAttendance from '../pages/ViewAttendance'
import EditProfile from '../pages/EditProfile'
import UserDashboard from '../pages/UserDashboard'
import AdminDashboard from '../pages/AdminDashboard'
import ContactPage from '../pages/ContactPage'
const Routing = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Layout/>}>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/mark-attendance" element={<MarkAttendance />} />
        <Route path="/view-attendance" element={<ViewAttendance />} />
        <Route path="/edit-profile" element={<EditProfile />} />
       
        </Route>
      </Routes>
    </div>
  )
}

export default Routing
