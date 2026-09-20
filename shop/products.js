// Static shop products shipped with the app.
// The shop reads its catalogue from Firestore (`products`), managed by the
// teacher from /teacher/shop. Entries listed here appear as a fallback when
// Firestore is unreachable or still empty; a Firestore document with the same
// id always wins.
//
// Shape of an entry:
// {
//   id: 'grade5-unit2-worksheets',   // lowercase, also the Storage folder name
//   title: 'Grade 5 · Unit 2 Worksheets',
//   titleAr: 'أوراق عمل · الصف الخامس الوحدة الثانية',
//   description: '12 printable worksheets with answer keys',
//   descriptionAr: '12 ورقة عمل قابلة للطباعة مع نماذج الإجابة',
//   emoji: '📄',
//   type: 'pdf',                     // pdf | lesson | bundle | link
//   price: 15,                       // in ILS
//   grades: [5],
//   published: true,
//   files: [{ name: 'unit2.pdf', path: 'products/<id>/unit2.pdf', size: 0 }],
//   static: true,
// }

export const STATIC_PRODUCTS = [];

export default STATIC_PRODUCTS;
