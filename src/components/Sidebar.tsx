import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import CFDISSelectedIcon from "../../public/icons/sidebar/CFDIS selected.png";
import CFDISIcon from "../../public/icons/sidebar/CFDIS.png";
import PPSelectedIcon from "../../public/icons/sidebar/PP selected.png";
import PPIcon from "../../public/icons/sidebar/PP.png";

const sidebarItems = [
    {
        name: "Carga de CFDIS",
        href: "/dashboard",
        icon: CFDISIcon,
        selectedIcon: CFDISSelectedIcon,
    },
    {
        name: "Programación de pago >",
        href: "/payment-scheduling",
        icon: PPIcon,
        selectedIcon: PPSelectedIcon,
    },
];

interface SidebarProps {
    sidebarOpen: boolean;
    setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const handleLinkClick = () => {
        if (window.innerWidth < 768) setSidebarOpen(false);
    };

    return (
        <>
            <div
                onClick={() => setSidebarOpen(false)}
                className={`fixed inset-0 z-30 bg-black/30 transition-opacity duration-300 md:hidden ${sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                aria-hidden="true"
            />

            <aside
                className={`fixed inset-y-0 left-0 z-40 w-64 bg-black flex flex-col transform transition-transform duration-300 ease-in-out ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-4 flex justify-center">
                    <Link to="/dashboard" onClick={handleLinkClick} className="flex items-center space-x-2">
                        <img src={"/SDG logo.png"} alt="Saucedo Abogados" className="h-[70px] w-auto" />
                        <img src={"/SDG logo 2.png"} alt="Saucedo Abogados" className="h-[70px] w-auto" />
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-2 space-y-1 overflow-y-auto">
                    {sidebarItems.map((item) => {
                        return (
                            <NavLink
                                key={item.name}
                                to={item.href!}
                                onClick={handleLinkClick}
                                className={({ isActive }) =>
                                    `flex items-center p-2 rounded-md text-sm font-medium transition-colors ${isActive
                                        ? "text-[#F8C00C]"
                                        : "text-white"
                                    }`
                                }
                            >
                                <img
                                    src={location.pathname === item.href ? item.selectedIcon : item.icon}
                                    alt={item.name}
                                    className="mr-3 w-6 h-6"
                                />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
