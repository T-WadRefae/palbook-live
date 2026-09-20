# 🛍️ shop — متجر PalBook

كل ما يخصّ المتجر موجود في هذا المجلد وحده. لا يوجد شيء من المتجر داخل `src/`
باستثناء سطور التوجيه (routes) في `src/App.jsx` وروابط القائمة.

## الملفات

| الملف | ماذا يفعل |
|---|---|
| `constants.js` | الثوابت: أنواع المواد، حالات الطلب، صيغة السعر والتاريخ، معرّف الاستحقاق |
| `api.js` | كل الاتصال بـ Firebase: المواد، الطلبات، الاستحقاقات، رفع الملفات وتنزيلها |
| `products.js` | مواد ثابتة تظهر إن تعذّر الوصول إلى Firestore (فارغة افتراضياً) |
| `components/ProductCard.jsx` | بطاقة المادة في صفحة المتجر |
| `pages/ShopPage.jsx` | `/shop` — عرض المواد مع البحث والتصفية بالصف |
| `pages/ProductPage.jsx` | `/shop/<id>` — تفاصيل المادة وزر الشراء |
| `pages/CheckoutPage.jsx` | `/shop/<id>/checkout` — بيانات الدفع عبر iBuraq ونموذج الطلب |
| `pages/MyLibraryPage.jsx` | `/library` — مكتبة المشتري وطلباته |
| `pages/teacher/ManageProductsPage.jsx` | `/teacher/shop` — إضافة المواد ورفع ملفاتها وبيانات الدفع |
| `pages/teacher/ShopOrdersPage.jsx` | `/teacher/orders` — مراجعة التحويلات وتأكيدها أو رفضها |

## كيف يعمل

1. المشتري يحوّل المبلغ عبر iBuraq ويُدخل رقم العملية، فيُنشأ طلب بحالة `pending`.
2. المعلمة **T. Wad Refae** تؤكّد الدفع من لوحة التحكم.
3. التأكيد يكتب وثيقة `entitlements/<uid>_<productId>` في Firestore.
4. قواعد Firebase Storage لا تسمح بقراءة ملف المادة إلا بوجود تلك الوثيقة،
   فلا ينفع الرابط المنسوخ من لم يدفع.

## ملاحظات للتعديل

- الاستيراد من داخل المجلد نسبي (`../api`)، ومن خارجه بالاختصارات المعرّفة في
  `vite.config.js` (`@components`, `@contexts`, `@utils`, `@shop`).
- عند إضافة ملفات جديدة هنا، لا حاجة لأي إعداد: `tailwind.config.js` يفحص
  `./shop/**/*.{js,jsx}` أصلاً.
- ملفات المواد المدفوعة تُرفع إلى Firebase Storage تحت `products/<id>/`،
  **ولا تُوضع أبداً** في مستودع `palbook-lessons` لأنه عام على GitHub Pages.
- قواعد الأمان في `firestore.rules` و`storage.rules` في جذر المستودع.

---

صُمّم للمعلمة **T. Wad Refae** 🇵🇸
