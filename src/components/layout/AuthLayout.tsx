import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/Bg Auth.png')" }}>
            <Outlet />
        </div>
    );
};

export default AuthLayout;