import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import ChangePasswordModal from '../../features/auth/components/ChangePasswordModal';
import LogoutConfirmationModal from '../../features/auth/components/LogoutConfirmationModal';
import Modal from '../ui/Modal';
import CFDIS from './CFDIS';

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
        <div className="relative min-h-screen w-screen h-screen flex bg-gray-100">
            {/* Sidebar fijo a la izquierda */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Contenedor principal (ocupa el resto del ancho) */}
            <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'}`}>
                {/* Header fijo arriba */}
                <Header
                    setSidebarOpen={setSidebarOpen}
                    onOpenChangePasswordModal={() => setChangePasswordModalOpen(true)}
                    onOpenLogoutModal={() => setLogoutModalOpen(true)}
                />

                {/* Contenido principal */}
                <main className="flex-1 overflow-y-auto bg-white p-6 transition-all duration-300">
                    <div className="max-w-6xl mx-auto w-full">
                        <CFDIS />
                    </div>
                </main>
            </div>

            {/* Modales */}
            <Modal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setChangePasswordModalOpen(false)}
                title="Cambia tu contraseña"
                size="sm"
                headerBg="bg-[#147AC8]"
                headerTextColor="text-white"
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
                headerBg="bg-[#E33131]"
                headerTextColor="text-white"
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
