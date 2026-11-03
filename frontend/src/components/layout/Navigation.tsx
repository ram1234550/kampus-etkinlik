import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/etkinlikler", label: "Etkinlikler" },
  { to: "/etkinlik-ekle", label: "Ekle" },
  { to: "/hakkinda", label: "Hakkında" },
];

function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav>
      {/* NavLink aktif sayfaya aria-current="page" ekler */}
      {menuItems.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.to === "/"}>
          {item.label}
        </NavLink>
      ))}

      {user ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            logout();
            navigate("/");
          }}
        >
          Çıkış ({user.name})
        </a>
      ) : (
        <>
          <NavLink to="/giris">Giriş</NavLink>
          <NavLink to="/kayit">Kayıt</NavLink>
        </>
      )}
    </nav>
  );
}

export default Navigation;
