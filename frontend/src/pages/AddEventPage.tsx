import { useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import EventForm from "../components/forms/EventForm";
import { useEvents } from "../context/EventContext";

function AddEventPage() {
  const { addEvent } = useEvents();
  const navigate = useNavigate();

  return (
    <>
      <Header title="Etkinlik Ekle" />
      <main>
        <p className="form-bilgi">Yıldızlı (*) alanlar zorunludur.</p>
        <EventForm
          submitText="Kaydet"
          onSubmit={(data) => {
            const created = addEvent(data);
            navigate(`/etkinlikler/${created.id}`, {
              state: { message: "Etkinlik eklendi." },
            });
          }}
        />
      </main>
    </>
  );
}

export default AddEventPage;
