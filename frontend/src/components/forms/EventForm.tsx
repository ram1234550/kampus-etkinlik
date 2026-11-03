import { useState } from "react";
import type { CampusEvent, Category } from "../../types/campus-event";
import { validateEvent } from "../../utils/validation";
import type { Errors } from "../../utils/validation";

type EventData = Omit<CampusEvent, "id">;

interface EventFormProps {
  initial?: CampusEvent;
  submitText: string;
  onSubmit: (data: EventData) => void;
}

function EventForm({ initial, submitText, onSubmit }: EventFormProps) {
  // Güncellemede alanlar dolu gelir
  const [title, setTitle] = useState(initial?.title ?? "");
  const [category, setCategory] = useState<Category | "">(initial?.category ?? "");
  const [date, setDate] = useState(initial?.date ?? "");
  const [time, setTime] = useState(initial?.time ?? "");
  const [location, setLocation] = useState(initial?.location ?? "");
  const [capacity, setCapacity] = useState(initial ? String(initial.capacity) : "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data: EventData = {
      title: title.trim(),
      category: category as Category,
      date,
      time,
      location: location.trim(),
      capacity: Number(capacity),
      description: description.trim(),
      image: initial?.image,
    };
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      {hasErrors && (
        <p className="mesaj mesaj-hata">Formda hatalı alanlar var. Kırmızı alanları düzeltin.</p>
      )}
      <p>
        <label htmlFor="title">Etkinlik Adı *</label>
        <input
          id="title"
          value={title}
          maxLength={80}
          placeholder="Örn. Kariyer Günleri 2026"
          aria-invalid={errors.title ? true : undefined}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="hata">{errors.title}</span>}
      </p>
      <p>
        <label htmlFor="category">Kategori *</label>
        <select
          id="category"
          value={category}
          aria-invalid={errors.category ? true : undefined}
          onChange={(e) => setCategory(e.target.value as Category | "")}
        >
          <option value="">Seçiniz</option>
          <option value="Seminer">Seminer</option>
          <option value="Atölye">Atölye</option>
          <option value="Söyleşi">Söyleşi</option>
          <option value="Yarışma">Yarışma</option>
        </select>
        {errors.category && <span className="hata">{errors.category}</span>}
      </p>
      <p>
        <label htmlFor="date">Tarih *</label>
        <input
          type="date"
          id="date"
          value={date}
          aria-invalid={errors.date ? true : undefined}
          onChange={(e) => setDate(e.target.value)}
        />
        {errors.date && <span className="hata">{errors.date}</span>}
      </p>
      <p>
        <label htmlFor="time">Saat *</label>
        <input
          type="time"
          id="time"
          value={time}
          aria-invalid={errors.time ? true : undefined}
          onChange={(e) => setTime(e.target.value)}
        />
        {errors.time && <span className="hata">{errors.time}</span>}
      </p>
      <p>
        <label htmlFor="location">Yer *</label>
        <input
          id="location"
          value={location}
          placeholder="Örn. A Blok Konferans Salonu"
          aria-invalid={errors.location ? true : undefined}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errors.location && <span className="hata">{errors.location}</span>}
      </p>
      <p>
        <label htmlFor="capacity">Kontenjan *</label>
        <input
          type="number"
          id="capacity"
          min={1}
          max={1000}
          value={capacity}
          aria-invalid={errors.capacity ? true : undefined}
          onChange={(e) => setCapacity(e.target.value)}
        />
        {errors.capacity && <span className="hata">{errors.capacity}</span>}
      </p>
      <p>
        <label htmlFor="description">Açıklama *</label>
        <textarea
          id="description"
          rows={5}
          value={description}
          aria-invalid={errors.description ? true : undefined}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className="hata">{errors.description}</span>}
      </p>
      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;
