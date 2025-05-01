"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import Cookies from "js-cookie";

// Fixed credentials
const VALID_EMAIL = "admin@example.com";
const VALID_PASSWORD = "password123";

type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  // Check for authentication on initial load
  useEffect(() => {
    const checkAuth = async () => {
      setIsLoading(true);
      const authStatus = Cookies.get("isAuthenticated");

      if (authStatus === "true") {
        setIsAuthenticated(true);
        if (pathname === "/login") {
          await router.push("/todo");
        }
      } else if (pathname !== "/login") {
        await router.push("/login");
      }

      // Short delay to ensure transitions are smooth
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    checkAuth();
  }, [router, pathname]);

  const login = (email: string, password: string) => {
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      setIsLoading(true);
      setIsAuthenticated(true);

      // Set cookie that will be used by middleware
      Cookies.set("isAuthenticated", "true", { expires: 1 }); // 1 day expiry
      localStorage.setItem("isAuthenticated", "true"); // Backup for client side

      router.push("/todo");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoading(true);
    setIsAuthenticated(false);
    Cookies.remove("isAuthenticated");
    localStorage.removeItem("isAuthenticated");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
