import { useEffect } from "react";
import Navigation from "./Navigation";

interface HeaderProps {
  title: string;
  text?: string;
}

function Header({ title, text }: HeaderProps) {
  // Sekme başlığı sayfa başlığıyla aynı olsun
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p className="alt-baslik">{text}</p>}
      <Navigation />
    </header>
  );
}

export default Header;
