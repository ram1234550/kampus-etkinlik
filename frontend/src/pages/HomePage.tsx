import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import EventList from "../components/events/EventList";
import { useEvents } from "../context/EventContext";

function HomePage() {
  const { events } = useEvents();

  // Tarihi en yakın 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => `${a.date}T${a.time}`.localeCompare(`${b.date}T${b.time}`))
    .slice(0, 2);

  return (
    <>
      <Header
        title="Kampüs Etkinlikleri"
        text="Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
      />
      <main>
        <section>
          <h2>Yaklaşan 2 Etkinlik</h2>
          <EventList events={upcoming} />
          <p className="butonlar">
            <Link className="buton" to="/etkinlikler">Tüm etkinlikleri gör</Link>
            <Link className="buton" to="/etkinlik-ekle">Yeni etkinlik ekle</Link>
          </p>
          <p>Toplam {events.length} etkinlik var.</p>
        </section>
      </main>
    </>
  );
}

export default HomePage;
