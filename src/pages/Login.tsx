import {useState,type FormEvent} from 'react'
import {Navigate,useLocation,useNavigate} from 'react-router-dom'
import {ArrowLeft,LockKeyhole,Mail,Sparkles} from 'lucide-react'
import {supabase,supabaseConfigured} from '../lib/supabase'
import {useAuth} from '../auth/AuthProvider'
export default function Login(){
 const {user}=useAuth(),navigate=useNavigate(),location=useLocation()
 const [mode,setMode]=useState<'login'|'signup'>('login'),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[busy,setBusy]=useState(false),[notice,setNotice]=useState(''),[error,setError]=useState('')
 if(user)return <Navigate to="/dashboard" replace/>
 const submit=async(e:FormEvent)=>{e.preventDefault();setError('');setNotice('')
  if(!supabase)return setError('إعدادات Supabase غير مكتملة. أضف متغيرات البيئة أولاً.')
  if(password.length<8)return setError('كلمة المرور يجب ألا تقل عن 8 أحرف.')
  setBusy(true)
  try{const result=mode==='login'?await supabase.auth.signInWithPassword({email:email.trim(),password}):await supabase.auth.signUp({email:email.trim(),password})
   if(result.error)throw result.error
   if(mode==='signup'&&!result.data.session)setNotice('تم إنشاء الحساب. تحقق من بريدك الإلكتروني لتأكيد التسجيل ثم سجّل الدخول.')
   else{const dest=(location.state as {from?:{pathname?:string}}|null)?.from?.pathname??'/dashboard';navigate(dest,{replace:true})}
  }catch(e){setError(e instanceof Error?e.message:'تعذر إكمال المصادقة.')}finally{setBusy(false)}
 }
 return <main className="auth-layout"><section className="auth-card"><div className="brand-mark"><Sparkles size={22}/></div><p className="eyebrow">NASSER SOCIAL AI · 0.5.0</p><h1>{mode==='login'?'مرحباً بعودتك':'أنشئ حسابك'}</h1><p className="muted">مساحة واحدة لصناعة المحتوى وتنظيمه وتحليله.</p>
 {!supabaseConfigured&&<div className="notice warning">أضف VITE_SUPABASE_URL وVITE_SUPABASE_PUBLISHABLE_KEY في إعدادات البيئة لتفعيل الدخول.</div>}
 <form onSubmit={submit} className="form-stack"><label>البريد الإلكتروني<div className="input-wrap"><Mail size={18}/><input type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@example.com"/></div></label><label>كلمة المرور<div className="input-wrap"><LockKeyhole size={18}/><input type="password" minLength={8} autoComplete={mode==='login'?'current-password':'new-password'} required value={password} onChange={e=>setPassword(e.target.value)} placeholder="8 أحرف على الأقل"/></div></label>
 {error&&<div className="notice error">{error}</div>}{notice&&<div className="notice success">{notice}</div>}<button className="button primary full" disabled={busy||!supabaseConfigured}>{busy?'جارٍ التنفيذ…':mode==='login'?'تسجيل الدخول':'إنشاء الحساب'} <ArrowLeft size={18}/></button></form>
 <button className="text-button" onClick={()=>{setMode(mode==='login'?'signup':'login');setError('');setNotice('')}}>{mode==='login'?'ليس لديك حساب؟ أنشئ حساباً':'لديك حساب بالفعل؟ سجّل الدخول'}</button></section>
 <aside className="auth-aside"><span className="glow-orb"/><span className="eyebrow">CONTENT · INSIGHT · GROWTH</span><h2>حوّل أفكارك<br/>إلى محتوى مؤثر.</h2><p>مساعد عربي لصياغة المنشورات، حفظ المسودات، ومتابعة أداء المحتوى.</p></aside></main>
}
