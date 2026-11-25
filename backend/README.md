# Kampüs Etkinlikleri — Backend (Express + MongoDB, tam CRUD)

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
| GET | `/health` | Sunucu ayakta mı | 200 | — | çalışıyor |
| GET | `/events` | Listeyi getir; `?search=` (başlıkta arar, büyük/küçük harf fark etmez) ve `?category=` isteğe bağlı | 200 | — | çalışıyor |
| GET | `/events/upcoming` | Bugün ve sonrası, tarihe göre sıralı | 200 | — | çalışıyor |
| GET | `/events/:id` | Tek etkinlik (`:id` = MongoDB `_id`) | 200 | 404 | çalışıyor |
| POST | `/events` | Yeni etkinlik | 201 | 400 | çalışıyor |
| PATCH | `/events/:id` | Sadece gönderilen alanları güncelle; güncel kaydı döndürür | 200 | 400, 404 | çalışıyor |
| DELETE | `/events/:id` | Sil; yanıt gövdesi yok | 204 | 404 | çalışıyor |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı · 500 sunucu hatası

Bütün hatalar aynı biçimde döner:

```json
{ "error": { "message": "Event not found" } }
```

- Biçimi geçersiz id (`/events/yok`) ve olmayan id → **404** (500 değil).
- Schema kuralına uymayan POST (eksik `title`/`category`/`date`, listede olmayan kategori, 3 harften kısa başlık) → **400**.
- PATCH: boş body, değiştirilemeyen alan (`_id`, `createdAt`, `updatedAt`, `__v`), schema kuralına uymayan değer → **400**.
- Tarih her yerde **"GG-AA-YYYY"** (`"15-10-2026"`); başka biçim (`"2026-12-20"`) ya da olmayan gün (`"31-02-2026"`) → **400**. Veritabanında gerçek `Date` olarak saklanır, böylece tarihe göre doğru sıralanır.
- Beklenmeyen hata → **500** `"Server error"`; sunucu çalışmaya devam eder.

## Event şeması

| Alan | Tip | Kural |
|---|---|---|
| `title` | String | zorunlu, trim, 3–100 karakter |
| `category` | String | zorunlu, `Seminer` · `Atölye` · `Söyleşi` · `Yarışma` |
| `capacity` | Number | en az 0, varsayılan 0 |
| `date` | Date | zorunlu; API'de `"GG-AA-YYYY"` (`"01-12-2026"`) |
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
    seed.js                         npm run seed: siler + 6 etkinlik ekler (2'si geçmiş tarihli)
    utils/date.js                   "GG-AA-YYYY" <-> Date dönüşümü, bugünün başı
    config/database.js              MongoDB bağlantısı (MONGODB_URI)
    models/event-model.js           Event schema ve model
    data/seed-events.js             6 örnek etkinlik (id yok)
    routes/event-routes.js          Hangi adres hangi fonksiyona gider
    controllers/event-controller.js İsteği işler, yanıt döndürür
  requests/kampus-api.json          Postman collection (18 istek)
  requests/run-results.json         Postman Collection Runner sonucu
  .env.example
  .gitignore
  package.json
```

## Test

`requests/kampus-api.json` dosyasını Postman'e içe aktar ve **Run collection** ile 18 isteği sırayla çalıştır. id'leri elle girmek gerekmez: 02 listedeki ilk `_id`'yi, 05 yeni oluşan kaydın `_id`'sini kaydeder; PATCH ve DELETE bu yeni kayıtla çalışır, seed verisi bozulmaz.

Hocanın test collection'ı ile (backend açıkken):

```bash
newman run https://webdersi.vercel.app/test.json
```

Son çalıştırmanın sonucu: `requests/run-results.json`.

## Geliştirici

Raimberdi Aitmamatov — 2616501812
