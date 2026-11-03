import { useParams } from "react-router-dom";
import EventDetail from "../components/events/EventDetail";
import { useEvents } from "../context/EventsContext";
import { findEventById } from "../utils/filter-events";
import NotFoundPage from "./NotFoundPage";

// Bulur: adresi oku, veriyi al, yoksa "bulunamadı"
function EventDetailPage() {
  const { id } = useParams();
  const { events } = useEvents();
  const event = findEventById(events, id ?? "");
  if (!event) return <NotFoundPage />;

  return (
    <>
      <h2 className="bolum-baslik">{event.title}</h2>
      <EventDetail event={event} />
    </>
  );
}

export default EventDetailPage;
