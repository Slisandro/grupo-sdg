import React, { useEffect, useRef, useState } from "react";
import NotificationsDropdown from "../../features/notifications/components/NotificationesDropdown";

interface HeaderProps {
    setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onOpenChangePasswordModal: () => void;
    onOpenLogoutModal: () => void;
}

const Header: React.FC<HeaderProps> = ({
    setSidebarOpen,
    onOpenChangePasswordModal,
    onOpenLogoutModal,
}) => {
    const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [isNotificationsOpen, setNotificationsOpen] = useState(false);

    const profileDropdownRef = useRef<HTMLDivElement>(null);
    const notificationsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                profileDropdownRef.current &&
                !profileDropdownRef.current.contains(event.target as Node)
            ) {
                setProfileDropdownOpen(false);
            }
            if (
                notificationsRef.current &&
                !notificationsRef.current.contains(event.target as Node)
            ) {
                setNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleProfileClick = (action: () => void) => {
        action();
        setProfileDropdownOpen(false);
    };

    return (
        <header className="sticky top-0 bg-black shadow-sm z-30">
            <div className="px-4">
                <div className="relative flex items-center h-16">
                    {/* Botón para abrir/cerrar sidebar */}
                    <button
                        type="button"
                        className="text-gray-500 focus:outline-none bg-[#818888] p-2 rounded-[8px]"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                    >
                        <span className="sr-only">Toggle Sidebar</span>
                        <img src="/icons/menu.png" alt="Menu" className="" />
                    </button>

                    <div className="ml-auto flex items-center space-x-4">
                        {/* Notificaciones */}
                        <div className="relative flex" ref={notificationsRef}>
                            <button
                                onClick={() => setNotificationsOpen((prev) => !prev)}
                                className="text-gray-400 hover:text-gray-600 relative"
                            >
                                <img src="/icons/notifications_bagde.png" alt="Notifications" className="w-[30px] h-[30px]" />
                            </button>
                            {isNotificationsOpen && <NotificationsDropdown />}
                        </div>

                        {/* Dropdown de usuario */}
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={() =>
                                    setProfileDropdownOpen(!isProfileDropdownOpen)
                                }
                                className="flex items-center focus:outline-none bg-[#262E60] rounded-full w-[45px] h-[45px] justify-center text-white font-semibold font-public text-[18px]"
                            >
                                JS
                            </button>

                            {isProfileDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg ring-1 ring-gray-200 ring-opacity-5 z-40">
                                    <div className="py-[16px] gap-[4px] flex flex-col">
                                        <button
                                            onClick={() =>
                                                handleProfileClick(onOpenChangePasswordModal)
                                            }
                                            className="w-full text-left flex items-center px-4 py-2 text-[14px] font-[500] text-[#3E4853] hover:bg-gray-100 font-public"
                                        >
                                            <img src="/icons/change-password.png" className="w-[18px] mr-3" /> 
                                            Cambiar contraseña
                                        </button>
                                        <button
                                            onClick={() => handleProfileClick(onOpenLogoutModal)}
                                            className="w-full text-left flex items-center px-4 py-2 text-[14px] font-[500] text-[#3E4853] hover:bg-gray-100 font-public"
                                        >
                                            <img src="/icons/logout.png" className="w-[18px] mr-3" /> 
                                            Cerrar sesión
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
