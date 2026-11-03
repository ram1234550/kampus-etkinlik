import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/layout/Header";
import AuthField from "../components/forms/AuthField";
import { useAuth } from "../context/AuthContext";
import { isEmail } from "../utils/validation";

function ForgotPasswordPage() {
  const { emailExists } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(false);
    if (!isEmail(email)) {
      setError("Geçerli bir e-posta yazın.");
    } else if (!emailExists(email)) {
      setError("Bu e-posta ile kayıtlı hesap bulunamadı.");
    } else {
      setError("");
      setSent(true);
    }
  }

  return (
    <>
      <Header title="Şifremi Unuttum" />
      <main>
        <form className="form" noValidate onSubmit={handleSubmit}>
          {sent && (
            <p className="mesaj mesaj-basari" role="status">
              Şifre sıfırlama bağlantısı {email} adresine gönderildi (deneme).
            </p>
          )}
          <p className="form-bilgi">Kayıtlı e-posta adresinizi yazın.</p>
          <AuthField id="email" label="E-posta" type="email" autoComplete="email"
            value={email} error={error} onChange={setEmail} />
          <button type="submit">Bağlantı gönder</button>
          <p className="form-linkler">
            <Link to="/giris">← Girişe dön</Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default ForgotPasswordPage;
