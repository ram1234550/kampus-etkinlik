// Bir etkinlik neye benzer? (tarif)
export type Category = "Seminer" | "Atölye" | "Söyleşi" | "Yarışma";

export interface CampusEvent {
  id: string;
  title: string;
  category: Category;
  date: string; // "2026-10-12"
  time: string; // "14:00"
  location: string;
  capacity: number;
  description: string;
  image?: string; // afiş isteğe bağlı
}
