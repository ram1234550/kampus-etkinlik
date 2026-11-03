https://raimberdiaitmamatov-frontend.vercel.app

# Kampüs Etkinlikleri

Vize projesi (Sprint 6): Vite + React + TypeScript + React Router + Context (`frontend/` klasörü).

## Route'lar (10 adres, 10 sayfa)

| Adres | Sayfa |
|---|---|
| `/` | HomePage — yaklaşan 2 etkinlik |
| `/events` | EventsPage — arama ve kategori filtresi |
| `/events/:id` | EventDetailPage — etkinlik detayı |
| `/login` | LoginPage — giriş formu (doğrulama) |
| `/register` | RegisterPage — kayıt formu (doğrulama) |
| `/forgot-password` | ForgotPasswordPage — şifremi unuttum |
| `/admin` | AdminPage — yönetim tablosu, Düzenle / Sil (onaylı) |
| `/admin/new` | AddEventPage — yeni etkinlik |
| `/admin/:id/edit` | EditEventPage — etkinlik güncelle |
| `*` | NotFoundPage — sayfa bulunamadı |

## Context

`src/context/EventsContext.tsx`: etkinlik listesi ve `addEvent`, `updateEvent`, `deleteEvent` fonksiyonları. Sayfalar `useEvents()` ile bağlanır; yönetimde yapılan değişiklik Ana Sayfa ve Etkinlikler'de de görünür.

## Klasör yapısı

- `src/components/` — layout (Header, Navigation, Footer), events (EventCard, EventList, EventFilter, EventDetail), forms (EventForm)
- `src/context/` — EventsContext
- `src/pages/` — 10 sayfa
- `src/data/events.ts`, `src/types/campus-event.ts`
- `src/utils/` — filter-events, format-date, validate-event

## Geliştirici

Raimberdi Aitmamatov — 2616501812
