import {useCallback,useEffect,useState,type FormEvent} from 'react'
import {FilePlus2,LogOut,Sparkles,Trash2,WandSparkles,RefreshCw,Save,ChartNoAxesCombined} from 'lucide-react'
import {useAuth} from '../auth/AuthProvider'
import {supabase} from '../lib/supabase'
type Draft={id:string;title:string;body:string;status:string;updated_at:string}
const tasks=[{value:'improve',label:'تحسين النص'},{value:'ideas',label:'أفكار متنوعة'},{value:'shorten',label:'اختصار'},{value:'hooks',label:'عناوين جذابة'},{value:'proofread',label:'تدقيق لغوي'}]
export default function Dashboard(){
 const {user}=useAuth(),[drafts,setDrafts]=useState<Draft[]>([]),[selected,setSelected]=useState<string|null>(null),[title,setTitle]=useState('مسودة جديدة'),[body,setBody]=useState(''),[task,setTask]=useState('improve'),[aiResult,setAiResult]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState('')
 const loadDrafts=useCallback(async()=>{if(!supabase)return;const {data,error}=await supabase.from('content_drafts').select('id,title,body,status,updated_at').order('updated_at',{ascending:false});if(error){setMessage(error.message);return}setDrafts((data??[]) as Draft[])},[])
 useEffect(()=>{void loadDrafts()},[loadDrafts])
 const signOut=async()=>{if(supabase)await supabase.auth.signOut()}
 const newDraft=()=>{setSelected(null);setTitle('مسودة جديدة');setBody('');setAiResult('');setMessage('')}
 const chooseDraft=(d:Draft)=>{setSelected(d.id);setTitle(d.title);setBody(d.body);setAiResult('');setMessage('')}
 const saveDraft=async(e?:FormEvent)=>{e?.preventDefault();if(!supabase||!user)return;if(!body.trim())return setMessage('اكتب محتوى المسودة قبل الحفظ.')
  setBusy(true);setMessage('');const values={title:title.trim()||'مسودة جديدة',body:body.trim(),status:'draft',user_id:user.id,updated_at:new Date().toISOString()}
  const result=selected?await supabase.from('content_drafts').update(values).eq('id',selected).eq('user_id',user.id).select('id').single():await supabase.from('content_drafts').insert(values).select('id').single()
  setBusy(false);if(result.error)return setMessage(result.error.message);setSelected(result.data.id);setMessage('تم حفظ المسودة بنجاح.');await loadDrafts()
 }
 const deleteDraft=async()=>{if(!supabase||!user||!selected)return;if(!window.confirm('هل تريد حذف هذه المسودة؟'))return
  const {error}=await supabase.from('content_drafts').delete().eq('id',selected).eq('user_id',user.id);if(error)return setMessage(error.message);newDraft();setMessage('تم حذف المسودة.');await loadDrafts()
 }
 const generate=async()=>{if(!supabase||!body.trim())return setMessage('أدخل نصاً أولاً ليعمل المساعد.');setBusy(true);setMessage('');setAiResult('')
  const {data,error}=await supabase.functions.invoke('content-assistant',{body:{task,content:body,audience:'الجمهور العام',tone:'عربي واضح وجذاب'}});setBusy(false)
  if(error)return setMessage('تعذر الاتصال بمساعد المحتوى. تحقق من إعدادات الخدمة.');if(data?.error)return setMessage('تعذر تنفيذ الطلب: '+data.error);setAiResult(data?.result??'لم يصل نص من المساعد.')
 }
 return <main className="app-shell"><header className="topbar"><div className="brand"><span className="brand-mark small"><Sparkles size={17}/></span><span>NASSER <b>SOCIAL AI</b><small>منصة المحتوى الذكي</small></span></div><div className="top-actions"><span className="user-chip">{user?.email}</span><button className="icon-button" onClick={signOut} title="تسجيل الخروج"><LogOut size={18}/></button></div></header>
 <section className="welcome-row"><div><p className="eyebrow">WORKSPACE / OVERVIEW</p><h1>لوحة التحكم</h1><p className="muted">مساحة عملك لصناعة محتوى أوضح وأكثر تأثيراً.</p></div><div className="stat-card"><ChartNoAxesCombined/><div><strong>{drafts.length}</strong><span>المسودات المحفوظة</span></div></div></section>
 <section className="workspace"><aside className="draft-panel"><div className="panel-heading"><h2>مسوداتي</h2><button className="icon-button" onClick={()=>void loadDrafts()} title="تحديث"><RefreshCw size={17}/></button></div><button className="button secondary full" onClick={newDraft}><FilePlus2 size={17}/> مسودة جديدة</button><div className="draft-list">{drafts.map(d=><button key={d.id} className={'draft-item '+(selected===d.id?'active':'')} onClick={()=>chooseDraft(d)}><strong>{d.title}</strong><span>{new Date(d.updated_at).toLocaleDateString('ar')}</span><small>{d.body.slice(0,68)||'لا يوجد محتوى'}</small></button>)}{drafts.length===0&&<p className="empty">لا توجد مسودات بعد. ابدأ بكتابة فكرتك.</p>}</div></aside>
 <section className="editor-panel"><div className="panel-heading"><div><p className="eyebrow">CONTENT STUDIO</p><h2>محرر المحتوى</h2></div><span className="status-pill">مسودة</span></div><form onSubmit={saveDraft} className="form-stack"><label>عنوان المسودة<input className="plain-input" value={title} onChange={e=>setTitle(e.target.value)} maxLength={120}/></label><label>المحتوى<textarea className="content-area" value={body} onChange={e=>setBody(e.target.value)} rows={11} maxLength={6000} placeholder="اكتب فكرتك أو الصق المنشور هنا…"/></label><div className="editor-footer"><span>{body.length} / 6000</span><div className="inline-actions"><button type="button" className="button danger-ghost" onClick={deleteDraft} disabled={!selected}><Trash2 size={16}/> حذف</button><button className="button primary" disabled={busy}><Save size={16}/> حفظ المسودة</button></div></div></form>
 <div className="ai-box"><div className="ai-title"><WandSparkles/><div><h3>مساعد المحتوى الذكي</h3><p>تحسين وصياغة الأفكار باللغة العربية.</p></div></div><div className="ai-controls"><select value={task} onChange={e=>setTask(e.target.value)}>{tasks.map(t=><option value={t.value} key={t.value}>{t.label}</option>)}</select><button className="button secondary" onClick={generate} disabled={busy||!body.trim()}><Sparkles size={16}/>{busy?'جارٍ العمل…':'توليد المساعدة'}</button></div>{aiResult&&<div className="ai-result"><p>{aiResult}</p><button className="text-button" onClick={()=>setBody(aiResult)}>استخدام النتيجة في المحرر</button></div>}</div>{message&&<div className="notice info">{message}</div>}</section></section>
 <footer className="footer">NASSER SOCIAL AI <span>·</span> الإصدار 0.5.0 <span>·</span> تُحفظ بياناتك ضمن حسابك</footer></main>
}
