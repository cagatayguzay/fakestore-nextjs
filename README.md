# Next.js Fake Store E-Commerce Demo

Bu proje, [Fake Store API](https://fakestoreapi.com/) kullanılarak geliştirilmiş örnek bir e-ticaret ürün listeleme uygulamasıdır.  
Next.js 15 (App Router) ve TypeScript ile yazılmış, Material UI (MUI) kullanılarak modern ve responsive bir arayüze sahiptir.

Ürünler API'den sayfalama, kategori bazlı filtreleme, arama ve fiyat sıralaması özellikleriyle çekilip gösterilir.  
Ayrıca her ürün için detay sayfası ve sepete ekleme özelliği bulunmaktadır.

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
- **Dark/Light Mode desteği** — Kullanıcı tercihine göre karanlık veya aydınlık tema  
- **Ürün Detay Sayfası** — `/product/[id]` şeklinde dinamik route ile her ürünün detay sayfası  
- **Sepete Ekleme Özelliği** — Kullanıcı ürünleri sepete ekleyebilir  
  - Sepet durumu `Context API` ile yönetilir  
  - `localStorage` ile tarayıcıda kalıcı olarak saklanır
- **Sepet Sayfası (/cart)** — Sepete eklenen ürünlerin listelendiği ve yönetildiği özel sayfa 
- **Atomic Design prensipleri** ile ölçeklenebilir component yapısı  
- **React Context API** ile global state yönetimi

---

## Teknolojiler

- Next.js 15 (App Router)  
- React 18+  
- TypeScript  
- Material UI (MUI)  
- Fake Store API  
- React Hooks (useState, useEffect, useContext)  
- React Context API  
- Atomic Design mimarisi  
- localStorage (persisted cart)

---

Global durum yönetimi için `React Context API` kullanılmıştır. Örneğin:
- Tema geçişi  
- Sepet yönetimi (add/remove)  
- Filtre ve arama durumları  

Sepet durumu tarayıcıda kalıcı hale getirilmek için `localStorage` ile senkronize edilmiştir.

---

## Sayfa Yapısı

- `/` — Anasayfa, ürün listeleme (pagination, filtreleme, arama, sıralama)
- `/product/[id]` — Ürün detay sayfası
- `/cart` — Sepet sayfası, sepete eklenen ürünlerin listelendiği ve yönetildiği sayfa

## Kurulum ve Çalıştırma

```bash
git clone https://github.com/cagatayguzay/fakestore-nextjs.git # Projeyi klonla
cd fakestore-nextjs                                             # Dizin içine gir
npm install                                                     # Bağımlılıkları yükle
npm run dev                                                     # Geliştirme sunucusunu başlat
npm run test                                                    # Testleri çalıştır
npm run test:coverage                                           # Test kapsamı raporu oluştur


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

