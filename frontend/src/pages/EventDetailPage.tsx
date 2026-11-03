import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import EventDetail from "../components/events/EventDetail";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import FlashMessage from "../components/ui/FlashMessage";
import { useEvents } from "../context/EventContext";
import { findEventById } from "../utils/filter-events";

function EventDetailPage() {
  const { id = "" } = useParams();
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const event = findEventById(events, id);

  if (!event) {
    return (
      <>
        <Header title="Etkinlik bulunamadı" />
        <main>
          <p className="mesaj mesaj-hata">Bu numarada bir etkinlik yok. Listeden bir etkinlik seçin.</p>
          <Link className="buton" to="/etkinlikler">← Listeye dön</Link>
        </main>
      </>
    );
  }

  function handleDelete() {
    if (!event) return;
    deleteEvent(event.id);
    navigate("/etkinlikler", { state: { message: `"${event.title}" silindi.` } });
  }

  return (
    <>
      <Header title={event.title} />
      <main>
        <FlashMessage />
        <EventDetail event={event} onDelete={() => setConfirmOpen(true)} />
      </main>
      {confirmOpen && (
        <ConfirmDialog
          message={`"${event.title}" etkinliği kalıcı olarak silinecek.`}
          onConfirm={handleDelete}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}

export default EventDetailPage;
