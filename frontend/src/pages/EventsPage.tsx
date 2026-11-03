import { useState } from "react";
import Header from "../components/layout/Header";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import FlashMessage from "../components/ui/FlashMessage";
import { useEvents } from "../context/EventContext";
import type { Category } from "../types/campus-event";
import { filterByCategory, searchEvents } from "../utils/filter-events";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <>
      <Header title="Tüm Etkinlikler" text="Kampüste düzenlenen tüm etkinlikler." />
      <main>
        <FlashMessage />
        <section>
          <EventFilter
            searchText={searchText}
            category={category}
            categories={categories}
            onSearchChange={setSearchText}
            onCategoryChange={setCategory}
          />
          {filtered.length > 0 && (
            <p className="sonuc">{filtered.length} etkinlik listeleniyor.</p>
          )}
          <EventList events={filtered} emptyText="Aramanıza uygun etkinlik bulunamadı." />
        </section>
      </main>
    </>
  );
}

export default EventsPage;
