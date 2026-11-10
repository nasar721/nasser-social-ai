import {createContext,useContext,useEffect,useMemo,useState} from 'react'
import type {Session,User} from '@supabase/supabase-js'
import {supabase} from '../lib/supabase'
type AuthValue={session:Session|null;user:User|null;loading:boolean}
const AuthContext=createContext<AuthValue>({session:null,user:null,loading:true})
export function AuthProvider({children}:{children:React.ReactNode}){
 const [session,setSession]=useState<Session|null>(null),[loading,setLoading]=useState(true)
 useEffect(()=>{if(!supabase){setLoading(false);return}let alive=true
  supabase.auth.getSession().then(({data,error})=>{if(!alive)return;if(error)console.error(error.message);setSession(data.session);setLoading(false)})
  const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,next)=>{setSession(next);setLoading(false)})
  return()=>{alive=false;subscription.unsubscribe()}
 },[])
 const value=useMemo(()=>({session,user:session?.user??null,loading}),[session,loading])
 return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export const useAuth=()=>useContext(AuthContext)
