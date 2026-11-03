import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextValue {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: User) => boolean;
  logout: () => void;
  emailExists: (email: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

// Deneme hesabı (gerçek backend yok)
const demoUser: User = {
  name: "Demo Öğrenci",
  email: "demo@sdu.edu.tr",
  password: "123456",
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([demoUser]);
  const [user, setUser] = useState<User | null>(null);

  function login(email: string, password: string) {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (found) setUser(found);
    return Boolean(found);
  }

  function register(newUser: User) {
    if (emailExists(newUser.email)) return false;
    setUsers((prev) => [...prev, newUser]);
    setUser(newUser);
    return true;
  }

  function logout() {
    setUser(null);
  }

  function emailExists(email: string) {
    return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, emailExists }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth, AuthProvider içinde kullanılmalı");
  return context;
}
