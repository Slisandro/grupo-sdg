import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import Modal from '../ui/Modal';
import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';
import LogoutConfirmationModal from '../../features/auth/components/LogoutConfirmationModal';

const DashboardLayout: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const navigate = useNavigate();

    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);
    const [isLogoutModalOpen, setLogoutModalOpen] = useState(false);

    const handleLogoutConfirm = () => {
        localStorage.removeItem('isAuthenticated'); // Simulación de logout
        setLogoutModalOpen(false);
        navigate('/login');
    };

    const handleChangePasswordConfirm = () => {
        alert('Contraseña actualizada (simulado).');
        setChangePasswordModalOpen(false);
    };

    return (
        <div className="relative min-h-screen bg-sa-background bg-white">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className={`flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                <Header
                    setSidebarOpen={setSidebarOpen}
                    onOpenChangePasswordModal={() => setChangePasswordModalOpen(true)}
                    onOpenLogoutModal={() => setLogoutModalOpen(true)}
                />
                <main>
                    <Outlet /> {/* Aquí se renderizarán las páginas del dashboard */}
                </main>
            </div>

            {/* Modales */}
            <Modal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setChangePasswordModalOpen(false)}
                title="Cambia tu contraseña"
                size="sm"
                headerBg='bg-[#147AC8]'
            >
                <ChangePasswordModal
                    onClose={() => setChangePasswordModalOpen(false)}
                    onConfirm={handleChangePasswordConfirm}
                />
            </Modal>

            <Modal
                isOpen={isLogoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                title="Confirmación de cierre de sesión"
                size="sm"
                headerBg='bg-[#E33131]'
            >
                <LogoutConfirmationModal
                    onClose={() => setLogoutModalOpen(false)}
                    onConfirm={handleLogoutConfirm}
                />
            </Modal>
        </div>
    );
};

export default DashboardLayout;