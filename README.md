https://raimberdiaitmamatov-frontend.vercel.app

# Kampüs Etkinlikleri

Vize projesi: Vite + React + TypeScript + React Router (`frontend/` klasörü).

## Özellikler

- 10 route (React Router)
- Context: `EventContext` (etkinlik ekle / güncelle / sil) ve `AuthContext` (giriş, kayıt, çıkış)
- Silmeden önce onay penceresi; değişiklikler tüm sayfalarda görünür
- Arama ve kategori filtresi
- Form doğrulama: etkinlik formu, giriş, kayıt, şifremi unuttum
- Mobil uyumlu tasarım

## Sayfalar (route'lar)

- `/` — Ana sayfa, yaklaşan 2 etkinlik
- `/etkinlikler` — Tüm etkinlikler, arama ve filtre
- `/etkinlikler/:id` — Etkinlik detayı, güncelle ve sil
- `/etkinlik-ekle` — Yeni etkinlik formu
- `/etkinlikler/:id/guncelle` — Güncelleme formu (alanlar dolu gelir)
- `/giris` — Giriş (deneme: demo@sdu.edu.tr / 123456)
- `/kayit` — Kayıt
- `/sifremi-unuttum` — Şifremi unuttum
- `/hakkinda` — Hakkında
- `*` — 404 sayfası

## Klasör yapısı

- `src/components/` — layout, events, forms, ui bileşenleri
- `src/context/` — EventContext, AuthContext
- `src/pages/` — 10 sayfa bileşeni
- `src/data/`, `src/types/`, `src/utils/` — veri, tipler, yardımcı fonksiyonlar

## Geliştirici

Raimberdi Aitmamatov — 2616501812