import Header from "../components/layout/Header";
import { useEvents } from "../context/EventContext";

function AboutPage() {
  const { events } = useEvents();
  const categories = [...new Set(events.map((e) => e.category))];

  return (
    <>
      <Header title="Hakkında" />
      <main>
        <section>
          <h2>Proje</h2>
          <p>
            Kampüs Etkinlikleri, SDÜ Web Teknolojileri dersi için React, TypeScript ve Vite ile
            geliştirilen bir etkinlik takip uygulamasıdır.
          </p>
          <h2>Özet</h2>
          <ul>
            <li>Toplam etkinlik: {events.length}</li>
            <li>Kategoriler: {categories.join(", ") || "—"}</li>
          </ul>
          <h2>Geliştirici</h2>
          <p>Raimberdi Aitmamatov · 2616501812</p>
        </section>
      </main>
    </>
  );
}

export default AboutPage;
