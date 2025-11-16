# Backend Setup

## Requirements
- Node.js
- MongoDB

## Installation
1. قم بتعديل ملف `.env` وضع بيانات الاتصال بقاعدة البيانات:
   - `MONGO_URI=your_mongo_connection_string`
   - `JWT_SECRET=your_jwt_secret`
   - `PORT=5000`
2. تثبيت الحزم:
   ```bash
   npm install
   ```
3. تشغيل السيرفر:
   ```bash
   npx nodemon server.js
   ```

## الهيكلية
- `routes/` : جميع المسارات
- `controllers/` : جميع الكنترولرز
- `models/` : جميع الموديلات
- `middleware/` : جميع الوسائط
- `config/` : إعدادات الاتصال
- `utils/` : أدوات مساعدة

## اختبار
- افتح الرابط: `http://localhost:5000/api/test` للتأكد من عمل السيرفر.
