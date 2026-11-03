import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import AuthField from "../components/forms/AuthField";
import { useAuth } from "../context/AuthContext";
import { isEmail } from "../utils/validation";
import type { Errors } from "../utils/validation";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (!isEmail(email)) found.email = "Geçerli bir e-posta yazın.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setFormError("");
    if (Object.keys(found).length > 0) return;

    if (login(email, password)) {
      navigate("/", { state: { message: "Giriş yapıldı." } });
    } else {
      setFormError("E-posta veya şifre hatalı.");
    }
  }

  return (
    <>
      <Header title="Giriş Yap" />
      <main>
        <form className="form" noValidate onSubmit={handleSubmit}>
          {formError && <p className="mesaj mesaj-hata">{formError}</p>}
          <AuthField id="email" label="E-posta" type="email" autoComplete="email"
            value={email} error={errors.email} onChange={setEmail} />
          <AuthField id="password" label="Şifre" type="password" autoComplete="current-password"
            value={password} error={errors.password} onChange={setPassword} />
          <button type="submit">Giriş yap</button>
          <p className="form-bilgi">
            Deneme hesabı: demo@sdu.edu.tr / 123456
          </p>
          <p className="form-linkler">
            <Link to="/sifremi-unuttum">Şifremi unuttum</Link>
            <Link to="/kayit">Hesabın yok mu? Kayıt ol</Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default LoginPage;
