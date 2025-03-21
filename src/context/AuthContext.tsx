
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  provider?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user in localStorage
    const storedUser = localStorage.getItem("vision-ia-user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
        localStorage.removeItem("vision-ia-user");
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, you would call your API here
      // For demo purposes, we'll just simulate a successful login
      // with a fake user if the email contains "@" and password is at least 6 chars
      if (!email.includes("@") || password.length < 6) {
        throw new Error("Email ou mot de passe incorrect");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = {
        id: "user-" + Date.now(),
        email: email,
        name: email.split("@")[0],
        provider: "email"
      };
      
      setUser(newUser);
      localStorage.setItem("vision-ia-user", JSON.stringify(newUser));
      toast.success("Connexion réussie!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      // In a real app, you would call your API here
      // For demo purposes, we'll just simulate a successful registration
      if (!email.includes("@")) {
        throw new Error("Email invalide");
      }
      if (password.length < 6) {
        throw new Error("Le mot de passe doit contenir au moins 6 caractères");
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newUser = {
        id: "user-" + Date.now(),
        email: email,
        name: name,
        provider: "email"
      };
      
      setUser(newUser);
      localStorage.setItem("vision-ia-user", JSON.stringify(newUser));
      toast.success("Compte créé avec succès!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    try {
      setLoading(true);
      // Simulate Google OAuth authentication
      // In a real app, you would redirect to Google OAuth and handle the callback
      // For demo purposes, we'll just simulate a successful login with a fake Google user
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const googleUser = {
        id: "google-user-" + Date.now(),
        email: "user@gmail.com",
        name: "Utilisateur Google",
        avatar: "https://lh3.googleusercontent.com/a/default-user",
        provider: "google"
      };
      
      setUser(googleUser);
      localStorage.setItem("vision-ia-user", JSON.stringify(googleUser));
      toast.success("Connexion avec Google réussie!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Une erreur est survenue";
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("vision-ia-user");
    toast.info("Vous êtes déconnecté");
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
