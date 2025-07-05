# Next.js Fake Store E-Commerce Demo

Bu proje, [Fake Store API](https://fakestoreapi.com/) kullanılarak geliştirilmiş örnek bir e-ticaret ürün listeleme uygulamasıdır.  
Next.js 13 (App Router) ve TypeScript ile yazılmış, Material UI (MUI) kullanılarak modern ve responsive bir arayüze sahiptir.  

Ürünler API'den sayfalama, kategori bazlı filtreleme, arama ve fiyat sıralaması özellikleriyle çekilip gösterilir.

---

## Özellikler

- Fake Store API'den ürün verilerini çekme  
- Sayfa başına 10 ürün gösterme (pagination)  
- Kategori filtreleme  
- Ürün başlığına göre arama  
- Fiyat artan/azalan sıralama  
- Mobil uyumlu filtre drawer  
- URL query parametreleri ile filtre ve sayfa durumunun yönetimi  
- Material UI ile şık ve duyarlı tasarım  
- **Dark/Light Mode desteği** — Kullanıcı tercihine göre arayüz karanlık veya aydınlık tema arasında geçiş yapabilir

---

## Teknolojiler

- Next.js 15 (App Router)  
- React 18+  
- TypeScript  
- Material UI (MUI)  
- Fake Store API  
- React Hooks (useState, useEffect)  

---

## Kurulum ve Çalıştırma

```bash
git clone https://github.com/cagatayguzay/fakestore-nextjs.git
cd fakestore-nextjs
npm install
npm run dev
npm run test          # Testleri çalıştırır
npm run test:coverage # Test kapsamı raporu oluşturur

------------------|---------|----------|---------|---------|------------------------------
File              | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------|---------|----------|---------|---------|------------------------------
All files         |   74.83 |     75.9 |   62.16 |   83.72 |                              
 app              |   74.24 |       76 |   56.66 |   85.18 |                              
  layout.tsx      |     100 |      100 |     100 |     100 |                              
  page.tsx        |   71.42 |    74.64 |   45.83 |   83.33 | 70,85-86,90-91,95-96,172-218 
 app/cart         |     100 |      100 |     100 |     100 |                              
  page.tsx        |     100 |      100 |     100 |     100 |                              
 app/product/[id] |   66.66 |    66.66 |   66.66 |   64.28 |                             
  page.tsx        |   66.66 |    66.66 |   66.66 |   64.28 | 36-44                       
------------------|---------|----------|---------|---------|------------------------------

Test Suites: 5 passed, 5 total  
Tests:       18 passed, 18 total  
Snapshots:   0 total  
Time:        3.536 s  
Ran all test suites.
