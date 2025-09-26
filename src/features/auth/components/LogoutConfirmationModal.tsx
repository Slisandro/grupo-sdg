// src/features/auth/components/LogoutConfirmationModal.tsx
import React from 'react';

interface LogoutConfirmationModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const LogoutConfirmationModal: React.FC<LogoutConfirmationModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div>
            <div className="p-6 space-y-4">
                <h4 className="text-xl font-bold text-gray-800">¿Deseas cerrar tu sesión actual?</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                    Al hacerlo, se cerrará tu acceso a la plataforma y deberás iniciar sesión nuevamente para continuar.
                </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-300"
                >
                    Cancelar
                </button>
                <button
                    onClick={onConfirm}
                    className="bg-red-100 text-red-700 px-6 py-2 rounded-md text-sm font-medium hover:bg-red-200"
                >
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
};

export default LogoutConfirmationModal;