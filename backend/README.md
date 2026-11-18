# Kampüs Etkinlikleri — Backend (Express + MongoDB)

Etkinlikleri JSON olarak veren REST API. Veriler MongoDB'de (Mongoose) kalıcı olarak saklanır; sunucu kapanıp açılınca kayıtlar kaybolmaz.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # Windows: copy .env.example .env
npm run seed           # veritabanına 6 örnek etkinlik ekler (önce eskileri siler)
npm run dev            # http://localhost:3000
```

## Ortam değişkenleri

| Değişken | Örnek | Açıklama |
|---|---|---|
| `PORT` | `3000` | Sunucunun dinlediği port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | Veritabanı adresi; sonunda veritabanı adı `/kampus` |

Gerçek adres (MongoDB Atlas, şifreli) sadece `.env` dosyasındadır; `.env` GitHub'a gönderilmez. `.env.example` yalnızca yer tutucu değer içerir.

## REST sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | `/health` | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | `/events` | Listeyi getir (`?category=Atölye` isteğe bağlı) | 200 | — | Sprint 8 (MongoDB) |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | Sprint 8 (MongoDB) |
| POST | `/events` | Yeni etkinlik | 201 | 400 | Sprint 8 (MongoDB) |
| PATCH | `/events/:id` | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | `/events/:id` | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

- Biçimi geçersiz id (`/events/yok`) ve olmayan id → **404** (500 değil).
- Schema kuralına uymayan POST (eksik `title`/`category`/`date`, listede olmayan kategori, 3 harften kısa başlık) → **400**.
- Beklenmeyen hata → **500** `"Server error"`; sunucu çalışmaya devam eder.

## Event şeması

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | zorunlu, trim, 3–100 karakter |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | String | zorunlu (`2026-12-01`) |
| `time` | String | varsayılan `""` |
| `location` | String | trim, varsayılan `""` |
| `description` | String | trim, en fazla 500 karakter |

`timestamps: true` ile her kayıtta `createdAt` ve `updatedAt` vardır.

## Klasör yapısı

```
backend/
  src/
    app.js                          Express uygulaması, middleware, hata yakalayıcı
    server.js                       Önce veritabanına bağlanır, sonra portu dinler
    seed.js                         npm run seed: siler + 6 etkinlik ekler
    config/database.js              MongoDB bağlantısı (MONGODB_URI)
    models/event-model.js           Event schema ve model
    data/seed-events.js             6 örnek etkinlik (id yok)
    routes/event-routes.js          Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıt döndürür
  requests/kampus-api.json          Postman collection (6 istek)
  .env.example
  .gitignore
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'e içe aktar (Import). Önce **2 Etkinlik listesi** isteğini gönder: ilk etkinliğin `_id` değeri `eventId` değişkenine kaydedilir ve **3 Tek etkinlik** isteği onu kullanır.

## Geliştirici

Raimberdi Aitmamatov — 2616501812
