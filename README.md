# NASSER SOCIAL AI

منصة عربية لإدارة وصناعة المحتوى الرقمي — الإصدار **0.5.0**.

## التقنية
- React + TypeScript + Vite
- Supabase Auth + Postgres + RLS + Edge Functions
- Vercel SPA rewrites
- GitHub Actions (typecheck + production build)

## التشغيل المحلي
1. ثبّت Node.js 22 أو أحدث.
2. انسخ `.env.example` إلى `.env.local`.
3. أضف رابط مشروع Supabase ومفتاح Publishable فقط.
4. نفّذ `npm install` ثم `npm run dev`.

## متغيرات البيئة
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

لا تضع مفاتيح OpenAI أو Meta أو Supabase secret/service_role في واجهة المتصفح أو Git.

## الوظائف الحالية
- تسجيل الدخول وإنشاء الحساب عبر Supabase Auth.
- حماية مسارات لوحة التحكم وإعادة المستخدم إلى المسار المطلوب بعد الدخول.
- حفظ المسودات وعرضها وتعديلها وحذفها وفق سياسات RLS.
- استدعاء Edge Function باسم `content-assistant` لمهام تحسين النصوص والأفكار والاختصار والعناوين والتدقيق.
- واجهة عربية متجاوبة.

## إعدادات النشر
- Framework: Vite
- Build: `npm run build`
- Output: `dist`
- أضف متغيري البيئة أعلاه في إعدادات Vercel.

## تكامل Meta
لا يتم جمع كلمات المرور أو رموز الجلسات. ربط Meta يتطلب تطبيق Meta رسميًا ومراجعة الصلاحيات اللازمة، ولا يتم تفعيل النشر الآلي إلا وفق واجهات Meta الرسمية والصلاحيات المعتمدة.
