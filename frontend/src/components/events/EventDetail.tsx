import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onDelete: () => void;
}

function EventDetail({ event, onDelete }: EventDetailProps) {
  return (
    <article className="detay">
      <div>
        {event.image && (
          <figure>
            <img src={event.image} alt={`${event.title} afişi`} />
            <figcaption>{event.title} afişi</figcaption>
          </figure>
        )}
        <h2>Açıklama</h2>
        <p>{event.description}</p>
        <p className="butonlar">
          <Link className="buton" to="/etkinlikler">← Listeye dön</Link>
          <Link className="buton" to={`/etkinlikler/${event.id}/guncelle`}>Güncelle</Link>
          <button type="button" className="buton buton-sil" onClick={onDelete}>
            Sil
          </button>
        </p>
      </div>

      <div className="kunye-kutu">
        <h2>Etkinlik Künyesi</h2>
        <dl className="kunye">
          <dt>Tarih</dt>
          <dd>
            <time dateTime={`${event.date}T${event.time}`}>
              {formatDate(event.date)}, {event.time}
            </time>
          </dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>
      </div>
    </article>
  );
}

export default EventDetail;
