import { Link } from "react-router-dom";
import Header from "../components/layout/Header";

function NotFoundPage() {
  return (
    <>
      <Header title="Sayfa bulunamadı" />
      <main>
        <p className="mesaj mesaj-hata">Aradığınız sayfa yok (404).</p>
        <Link className="buton" to="/">Ana sayfaya dön</Link>
      </main>
    </>
  );
}

export default NotFoundPage;
