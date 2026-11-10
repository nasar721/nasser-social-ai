# NASSER SOCIAL AI

منصة عربية لإدارة وتحليل المحتوى الرقمي. الإصدار المبدئي 0.4.4.

## الحالة
هذا المستودع مخصص لواجهة React + TypeScript + Vite مع Supabase. يجب رفع ملفات المصدر كاملة قبل ربطه بـ Vercel؛ لا تعتبر هذه الصفحة وحدها تطبيقًا قابلًا للنشر.

## الأمان
- لا تضع مفاتيح OpenAI أو Meta أو Supabase service_role في المستودع.
- لا تشارك كلمات مرور Facebook أو رموز الجلسات.
- يعتمد تكامل Meta على الصلاحيات الرسمية فقط، ولا يدعم النشر الآلي العام للملفات الشخصية.

## إعدادات البناء
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Frontend variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`

راجع وثائق Supabase وVercel الرسمية قبل النشر.