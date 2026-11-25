import mongoose from "mongoose";
import { formatDate, parseDate } from "../utils/date.js";

// Kurallar schema'da: hatalı veri veritabanına girmez
const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 3, maxlength: 100 },
    category: {
      type: String,
      required: true,
      enum: ["Seminer", "Atölye", "Söyleşi", "Yarışma"],
    },
    capacity: { type: Number, min: 0, default: 0 },
    // API'de "15-10-2026", veritabanında Date (tarih olarak sıralanır ve karşılaştırılır)
    date: { type: Date, required: true, set: parseDate, get: formatDate },
    time: { type: String, default: "" },
    location: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, maxlength: 500, default: "" },
  },
  {
    timestamps: true, // createdAt ve updatedAt kendiliğinden
    toJSON: { getters: true }, // yanıtta date "GG-AA-YYYY" görünsün
    id: false, // getters açıkken fazladan "id" alanı eklenmesin
  },
);

// Model adı "Event" -> collection adı "events"
export const Event = mongoose.model("Event", eventSchema);
