import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Settings, 
  BarChart3, 
  FileText, 
  MessageSquare, 
  LogOut,
  Shield,
  Database
} from 'lucide-react';
import UserManagement from './UserManagement';

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const adminSections = [
    {
      id: 'users',
      title: 'Administrar Usuarios',
      description: 'Gestionar usuarios del sistema',
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'content',
      title: 'Gestión de Contenido',
      description: 'Blog, FAQ y contenido del sitio',
      icon: FileText,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'requests',
      title: 'Solicitudes',
      description: 'Ver solicitudes de servicios y consultas',
      icon: MessageSquare,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'analytics',
      title: 'Analíticas',
      description: 'Estadísticas y reportes',
      icon: BarChart3,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'settings',
      title: 'Configuración',
      description: 'Configuración del sistema',
      icon: Settings,
      color: 'from-gray-500 to-gray-600'
    },
    {
      id: 'database',
      title: 'Base de Datos',
      description: 'Gestión de la base de datos',
      icon: Database,
      color: 'from-indigo-500 to-indigo-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Shield className="w-8 h-8 text-[#0e368d]" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
                <p className="text-sm text-gray-500">MelxAgency</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Bienvenido, {user?.name}
          </h2>
          <p className="text-gray-600">
            Gestiona tu sitio web y usuarios desde este panel de control.
          </p>
        </div>

        {/* Admin Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border border-gray-200 overflow-hidden group"
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`}></div>
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${section.color} text-white group-hover:scale-105 transition-transform`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#0e368d] transition-colors">
                        {section.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">
                    {section.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Usuarios</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <Users className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Solicitudes</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <MessageSquare className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Posts Blog</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Sesión Activa</p>
                <p className="text-sm font-medium text-green-600">Online</p>
              </div>
              <Shield className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      {activeSection === 'users' && (
        <UserManagement onClose={() => setActiveSection(null)} />
      )}
    </div>
  );
}