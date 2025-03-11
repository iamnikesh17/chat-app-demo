import React from 'react'
import { Routes ,Route, Navigate} from 'react-router-dom'
import { RegisterPage } from '../pages/RegisterPage'
import { useAuthStore } from '../store/useAuthStore'
import {LoginPage} from "../pages/LoginPage";
import { ProfilePage } from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingPage';
import { HomePage } from '../pages/HomePage';
const AllRoutes = () => {
  const {authUser}=useAuthStore();
  return (
    <div>
        <Routes>
            <Route path="/" element={<HomePage/>}></Route>
            <Route path='/register' element={!authUser?<RegisterPage/>:<Navigate to="/"/>}></Route>
            <Route path="/login" element={!authUser?<LoginPage/>:<Navigate to="/" />}></Route>
            <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}></Route>
            <Route path="/settings" element={<SettingsPage/>}></Route>
        </Routes>
    </div>
  )
}

export default AllRoutes