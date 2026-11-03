interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  autoComplete?: string;
  onChange: (value: string) => void;
}

// Giriş, kayıt ve şifremi unuttum formlarındaki ortak alan
function AuthField({ id, label, type = "text", value, error, autoComplete, onChange }: AuthFieldProps) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        onChange={(e) => onChange(e.target.value)}
      />
      {error && <span className="hata">{error}</span>}
    </p>
  );
}

export default AuthField;
