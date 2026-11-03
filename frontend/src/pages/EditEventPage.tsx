import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventContext";
import { findEventById } from "../utils/filter-events";

function EditEventPage() {
  const { id = "" } = useParams();
  const { events, updateEvent } = useEvents();
  const navigate = useNavigate();
  const event = findEventById(events, id);

  return (
    <>
      <Header title="Etkinlik Güncelle" text={event?.title} />
      <main>
        {event ? (
          <>
            <p className="form-bilgi">Alanlar mevcut bilgilerle dolu gelir.</p>
            <EventForm
              initial={event}
              submitText="Güncelle"
              onSubmit={(data) => {
                updateEvent(event.id, data);
                navigate(`/etkinlikler/${event.id}`, {
                  state: { message: "Etkinlik güncellendi." },
                });
              }}
            />
          </>
        ) : (
          <>
            <p className="mesaj mesaj-hata">Güncellenecek etkinlik bulunamadı.</p>
            <Link className="buton" to="/etkinlikler">Etkinliklere git</Link>
          </>
        )}
      </main>
    </>
  );
}

export default EditEventPage;
