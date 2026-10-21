import "./App.css";
import { useEffect, useState } from "react";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { events } from "./data/events";
import { filterByCategory, findEventById, searchEvents } from "./utils/filter-events";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const categories = [...new Set(events.map((e) => e.category))];

const upcoming = [...events]
  .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
  .slice(0, 2);

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

  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  let title = "Kampüs Etkinlikleri";
  let text = "";
  if (page === "home") text = "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.";
  if (page === "events") {
    title = "Tüm Etkinlikler";
    text = "Ekim ve Kasım aylarında kampüste düzenlenen etkinlikler.";
  }
  if (page === "detail") title = selected ? selected.title : "Etkinlik bulunamadı";
  if (page === "add") title = "Etkinlik Ekle";
  if (page === "update") title = "Etkinlik Güncelle";

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <>
      <Header title={title} text={text}>
        <Navigation current={page} onNavigate={go} />
      </Header>

      <main>
        {page === "home" && (
          <section>
            <h2>Yaklaşan 2 Etkinlik</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
            <p>
              <a className="buton" href="#" onClick={(e) => { e.preventDefault(); go("events"); }}>
                Tüm etkinlikleri gör
              </a>
            </p>
          </section>
        )}

        {page === "events" && (
          <section>
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filtered.length > 0 && <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>}
            <EventList
              events={filtered}
              onShowDetail={(id) => go("detail", id)}
              emptyText="Aramanıza uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && selected && (
          <EventDetail event={selected} onBack={() => go("events")} onEdit={(id) => go("update", id)} />
        )}

        {(page === "add" || page === "update") && <EventForm onSubmit={() => window.scrollTo(0, 0)} />}
      </main>

      <Footer />
    </>
  );
}

export default App;
