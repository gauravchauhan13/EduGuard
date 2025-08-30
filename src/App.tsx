import { useState } from "react";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";

interface User {
  email: string;
  role: string;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (email: string, password: string, role: string) => {
    // In a real app, this would validate credentials
    setUser({ email, role });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Dashboard 
      userRole={user.role} 
      userEmail={user.email} 
      onLogout={handleLogout} 
    />
  );
}