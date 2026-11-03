import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

const categories: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

// Form kaydetmeyi bilmez; veriyi sayfaya verir
function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  // Tek handleChange bütün alanlara yeter: name'e bakar
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) onSubmit(data);
  }

  return (
    <form className="form" noValidate onSubmit={handleSubmit}>
      <p>
        <label htmlFor="title">Etkinlik Adı</label>
        <input id="title" name="title" value={data.title} onChange={handleChange}
          placeholder="Örn. Kariyer Günleri 2026"
          aria-invalid={errors.title ? true : undefined} />
        <span className="hata-metni">{errors.title}</span>
      </p>
      <p>
        <label htmlFor="category">Kategori</label>
        <select id="category" name="category" value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined}>
          <option value="">Seçiniz</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="hata-metni">{errors.category}</span>
      </p>
      <p>
        <label htmlFor="date">Tarih</label>
        <input type="date" id="date" name="date" value={data.date} onChange={handleChange}
          aria-invalid={errors.date ? true : undefined} />
        <span className="hata-metni">{errors.date}</span>
      </p>
      <p>
        <label htmlFor="time">Saat</label>
        <input type="time" id="time" name="time" value={data.time} onChange={handleChange}
          aria-invalid={errors.time ? true : undefined} />
        <span className="hata-metni">{errors.time}</span>
      </p>
      <p>
        <label htmlFor="location">Yer</label>
        <input id="location" name="location" value={data.location} onChange={handleChange}
          placeholder="Örn. A Blok Konferans Salonu"
          aria-invalid={errors.location ? true : undefined} />
        <span className="hata-metni">{errors.location}</span>
      </p>
      <p>
        <label htmlFor="capacity">Kontenjan</label>
        <input type="number" id="capacity" name="capacity" value={data.capacity}
          onChange={handleChange} aria-invalid={errors.capacity ? true : undefined} />
        <span className="hata-metni">{errors.capacity}</span>
      </p>
      <p>
        <label htmlFor="description">Açıklama</label>
        <textarea id="description" name="description" rows={5} value={data.description}
          onChange={handleChange} aria-invalid={errors.description ? true : undefined} />
        <span className="hata-metni">{errors.description}</span>
      </p>
      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;
