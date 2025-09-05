import { useState, useEffect, createContext, useContext } from 'react';
import { supabase } from '../supabaseClient';

interface User {
  id: string;
  username: string;
  name: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Verificar sesión al cargar
  useEffect(() => {
    const checkSession = () => {
      const sessionData = localStorage.getItem('melx_session');
      if (sessionData) {
        try {
          const session = JSON.parse(sessionData);
          const now = new Date().getTime();
          
          // Verificar si la sesión no ha expirado (24 horas)
          if (session.expires > now) {
            setUser(session.user);
          } else {
            localStorage.removeItem('melx_session');
          }
        } catch (error) {
          localStorage.removeItem('melx_session');
        }
      }
      setLoading(false);
    };

    checkSession();
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Buscar usuario por username
      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('username', username)
        .limit(1);

      if (error) {
        console.error('Error al buscar usuario:', error);
        return false;
      }

      if (!users || users.length === 0) {
        console.error('Usuario no encontrado');
        return false;
      }

      const user = users[0];
      
      // Verificar contraseña (desencriptar y comparar)
      let storedPassword: string;
      try {
        storedPassword = atob(user.password);
      } catch (error) {
        console.error('Error al desencriptar contraseña');
        return false;
      }

      if (password !== storedPassword) {
        console.error('Contraseña incorrecta');
        return false;
      }

      // Crear sesión
      const sessionUser: User = {
        id: user.id,
        username: user.username,
        name: user.name,
        role: user.role
      };

      const sessionData = {
        user: sessionUser,
        expires: new Date().getTime() + (24 * 60 * 60 * 1000), // 24 horas
        loginTime: new Date().getTime()
      };

      localStorage.setItem('melx_session', JSON.stringify(sessionData));
      setUser(sessionUser);
      
      return true;
    } catch (error) {
      console.error('Error en login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('melx_session');
    setUser(null);
  };

  return { user, login, logout, loading };
};

export { AuthContext };
export type { User, AuthContextType };