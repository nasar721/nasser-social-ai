import {Navigate,Outlet,useLocation} from 'react-router-dom'
import {useAuth} from './AuthProvider'
export default function ProtectedRoute(){const {user,loading}=useAuth(),location=useLocation()
 if(loading)return <div className="screen-center"><span className="loader"/> جارٍ التحقق من الجلسة…</div>
 return user?<Outlet/>:<Navigate to="/login" replace state={{from:location}}/>}
