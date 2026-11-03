import type { CampusEvent } from "../types/campus-event";

export type Errors = Record<string, string>;

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validateEvent(data: Omit<CampusEvent, "id">): Errors {
  const errors: Errors = {};
  if (data.title.trim().length < 3) errors.title = "Etkinlik adı en az 3 karakter olmalı.";
  if (!data.category) errors.category = "Bir kategori seçin.";
  if (!data.date) errors.date = "Tarih seçin.";
  if (!data.time) errors.time = "Saat seçin.";
  if (!data.location.trim()) errors.location = "Yer bilgisini yazın.";
  if (!Number.isInteger(data.capacity) || data.capacity < 1 || data.capacity > 1000)
    errors.capacity = "Kontenjan 1 ile 1000 arasında bir tam sayı olmalı.";
  if (data.description.trim().length < 10)
    errors.description = "Açıklama en az 10 karakter olmalı.";
  return errors;
}
