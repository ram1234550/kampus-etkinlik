import "./App.css";
import { useEffect, useState } from "react";
import type { CampusEvent, Category } from "./types/campus-event";
import { events } from "./data/events";
import {
  filterByCategory,
  findEventById,
  searchEvents,
} from "./utils/filter-events";

// Router yok: hangi sayfanın açık olduğunu bir state tutar
type PageName = "home" | "events" | "detail" | "add" | "update";

const menuItems: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Ekle" },
];

// Kategorileri veriden üret, her biri bir kez
const categories = [...new Set(events.map((e) => e.category))];

// En yakın 2 etkinlik
const upcoming = [...events]
  .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
  .slice(0, 2);

// "2026-10-12" -> "12 Ekim 2026"
function formatDate(date: string): string {
  return new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  // Seçili etkinlik (detay sayfası için)
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Filtreli liste state değil; her çizimde hesaplanır
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  // Sayfaya göre başlık
  let title = "Kampüs Etkinlikleri";
  let subtitle = "";
  if (page === "home") subtitle = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") {
    title = "Tüm Etkinlikler";
    subtitle = "Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.";
  }
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  // Side-effect: sekme başlığı
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  // Aynı kart iki sayfada kullanılır
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p className="rozet">{event.category}</p>
        <p>Tarih: {formatDate(event.date)}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header>
        <h1>{title}</h1>
        {subtitle && <p className="alt-baslik">{subtitle}</p>}
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <div className="kartlar">{upcoming.map(renderCard)}</div>
            <p>
              <a
                className="buton"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  go("events");
                }}
              >
                Tüm etkinlikleri gör
              </a>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Örn. atölye, kariyer"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc" aria-live="polite">
              {filtered.length === 0
                ? "Aramanıza uygun etkinlik bulunamadı."
                : `${filtered.length} etkinlik listeleniyor.`}
            </p>

            <div className="kartlar">{filtered.map(renderCard)}</div>
          </section>
        )}

        {page === "detail" && !selected && (
          <>
            <p className="mesaj mesaj-hata">
              Etkinlik bulunamadı. Listeden bir etkinlik seçin.
            </p>
            <a
              className="buton"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              ← Listeye dön
            </a>
          </>
        )}

        {page === "detail" && selected && (
          <article className="detay">
            <div>
              {selected.image && (
                <figure>
                  <img src={selected.image} alt={`${selected.title} afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              )}
              <h2>Açıklama</h2>
              <p>{selected.description}</p>
              <p className="butonlar">
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  ← Listeye dön
                </a>
                <a
                  className="buton"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </div>

            <div className="kunye-kutu">
              <h2>Etkinlik Künyesi</h2>
              <dl className="kunye">
                <dt>Tarih</dt>
                <dd>
                  <time dateTime={`${selected.date}T${selected.time}`}>
                    {formatDate(selected.date)}, {selected.time}
                  </time>
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity} kişi</dd>
              </dl>
            </div>
          </article>
        )}

        {(page === "add" || page === "update") && (
          <>
            <p className="form-bilgi">
              Bu sprintte form sadece görünüm; kayıt yapılmaz.
            </p>
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <p>
                <label htmlFor="title">Etkinlik Adı</label>
                <input
                  id="title"
                  name="title"
                  maxLength={80}
                  placeholder="Örn. Kariyer Günleri 2026"
                />
              </p>
              <p>
                <label htmlFor="category">Kategori</label>
                <select id="category" name="category" defaultValue="">
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </p>
              <p>
                <label htmlFor="date">Tarih</label>
                <input type="date" id="date" name="date" />
              </p>
              <p>
                <label htmlFor="time">Saat</label>
                <input type="time" id="time" name="time" />
              </p>
              <p>
                <label htmlFor="location">Yer</label>
                <input
                  id="location"
                  name="location"
                  placeholder="Örn. A Blok Konferans Salonu"
                />
              </p>
              <p>
                <label htmlFor="capacity">Kontenjan</label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  min={1}
                  max={1000}
                />
              </p>
              <p>
                <label htmlFor="description">Açıklama</label>
                <textarea id="description" name="description" rows={5} />
              </p>
              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </>
        )}
      </main>

      <footer>
        <p>Raimberdi Aitmamatov · 2616501812 · 2026</p>
      </footer>
    </>
  );
}

export default App;
