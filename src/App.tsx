import {Navigate,Route,Routes} from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
export default function App(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<ProtectedRoute/>}><Route path="/dashboard" element={<Dashboard/>}/><Route path="/" element={<Navigate to="/dashboard" replace/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>}
