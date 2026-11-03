import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import AddEventPage from "./pages/AddEventPage";
import EditEventPage from "./pages/EditEventPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

// 10 route
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/etkinlikler" element={<EventsPage />} />
        <Route path="/etkinlikler/:id" element={<EventDetailPage />} />
        <Route path="/etkinlik-ekle" element={<AddEventPage />} />
        <Route path="/etkinlikler/:id/guncelle" element={<EditEventPage />} />
        <Route path="/giris" element={<LoginPage />} />
        <Route path="/kayit" element={<RegisterPage />} />
        <Route path="/sifremi-unuttum" element={<ForgotPasswordPage />} />
        <Route path="/hakkinda" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
