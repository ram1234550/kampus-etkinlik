import { useLocation } from "react-router-dom";

// Ekle / güncelle / sil sonrası gelen yeşil bilgi kutusu
function FlashMessage() {
  const location = useLocation();
  const message = (location.state as { message?: string } | null)?.message;
  if (!message) return null;
  return (
    <p className="mesaj mesaj-basari" role="status">
      {message}
    </p>
  );
}

export default FlashMessage;
