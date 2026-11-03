import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { CampusEvent } from "../types/campus-event";
import { events as initialEvents } from "../data/events";

// Context'in dışarıya verdiği şeyler
interface EventContextValue {
  events: CampusEvent[];
  addEvent: (data: Omit<CampusEvent, "id">) => CampusEvent;
  updateEvent: (id: string, data: Omit<CampusEvent, "id">) => void;
  deleteEvent: (id: string) => void;
}

const EventContext = createContext<EventContextValue | null>(null);

const STORAGE_KEY = "kampus-etkinlikleri";

// Sayfa yenilenince değişiklikler kaybolmasın
function loadEvents(): CampusEvent[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CampusEvent[];
  } catch {
    // okunamazsa başlangıç verisi kullanılır
  }
  return initialEvents;
}

export function EventProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<CampusEvent[]>(loadEvents);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch {
      // kaydedilemezse sadece bellekte kalır
    }
  }, [events]);

  function addEvent(data: Omit<CampusEvent, "id">) {
    const newEvent: CampusEvent = { ...data, id: `event-${Date.now()}` };
    setEvents((prev) => [...prev, newEvent]);
    return newEvent;
  }

  function updateEvent(id: string, data: Omit<CampusEvent, "id">) {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...data, id } : e)));
  }

  function deleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
}

// Sayfalar bu hook ile context'e bağlanır
// eslint-disable-next-line react-refresh/only-export-components
export function useEvents() {
  const context = useContext(EventContext);
  if (!context) throw new Error("useEvents, EventProvider içinde kullanılmalı");
  return context;
}
