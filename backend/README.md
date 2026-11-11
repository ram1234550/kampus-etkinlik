# Kampüs Etkinlikleri — Backend (Express REST API)

Etkinlikleri JSON olarak veren sunucu. Veri şimdilik bellekte (`src/data/events.js`).

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run dev            # http://localhost:3000
```

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port (`.env` dosyasından okunur) |

`.env` GitHub'a gönderilmez; `.env.example` hangi değişkenlerin gerektiğini gösterir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 7 |
| GET | `/events/:id` | Tek etkinlik | 200 | 404 | Sprint 7 |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 7 |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

POST için `title`, `category` ve `date` zorunludur.

## Klasör yapısı

```
backend/
  src/
    app.js                         Express uygulaması, middleware, route'lar
    server.js                      .env'i okur, portu dinler
    routes/event-routes.js         Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıt döndürür
    data/events.js                 Bellek içi 6 etkinlik
  requests/kampus-api.json         Postman collection (6 istek)
  .env.example
  .gitignore
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'e içe aktar (Import) ve 6 isteği sırayla gönder.

## Geliştirici

Raimberdi Aitmamatov — 2616501812
