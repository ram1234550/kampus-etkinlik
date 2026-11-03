import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import AuthField from "../components/forms/AuthField";
import { useAuth } from "../context/AuthContext";
import { isEmail } from "../utils/validation";
import type { Errors } from "../utils/validation";

function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found: Errors = {};
    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!isEmail(email)) found.email = "Geçerli bir e-posta yazın.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    if (Object.keys(found).length === 0) {
      const ok = register({ name: name.trim(), email: email.trim(), password });
      if (!ok) found.email = "Bu e-posta ile zaten kayıt var.";
    }
    setErrors(found);
    if (Object.keys(found).length === 0) {
      navigate("/", { state: { message: "Kayıt tamamlandı." } });
    }
  }

  return (
    <>
      <Header title="Kayıt Ol" />
      <main>
        <form className="form" noValidate onSubmit={handleSubmit}>
          <AuthField id="name" label="Ad Soyad" autoComplete="name"
            value={name} error={errors.name} onChange={setName} />
          <AuthField id="email" label="E-posta" type="email" autoComplete="email"
            value={email} error={errors.email} onChange={setEmail} />
          <AuthField id="password" label="Şifre" type="password" autoComplete="new-password"
            value={password} error={errors.password} onChange={setPassword} />
          <AuthField id="password2" label="Şifre (tekrar)" type="password" autoComplete="new-password"
            value={password2} error={errors.password2} onChange={setPassword2} />
          <button type="submit">Kayıt ol</button>
          <p className="form-linkler">
            <Link to="/giris">Zaten hesabın var mı? Giriş yap</Link>
          </p>
        </form>
      </main>
    </>
  );
}

export default RegisterPage;
