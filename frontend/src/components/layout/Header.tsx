import type { ReactNode } from "react";

interface HeaderProps {
  title: string;
  text?: string;
  children?: ReactNode; // menü başlığın içinde durur
}

function Header({ title, text, children }: HeaderProps) {
  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p className="alt-baslik">{text}</p>}
      {children}
    </header>
  );
}

export default Header;
