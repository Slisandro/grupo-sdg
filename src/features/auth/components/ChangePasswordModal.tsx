// src/features/auth/components/ChangePasswordModal.tsx
import React from 'react';
import Input from '../../../components/ui/Input';

interface ChangePasswordModalProps {
    onClose: () => void;
    onConfirm: () => void;
}

const ChangePasswordModal: React.FC<ChangePasswordModalProps> = ({ onClose, onConfirm }) => {
    return (
        <div>
            <div className="p-6 space-y-5">
                <p className="text-sm text-gray-600">
                    Por tu seguridad, necesitas ingresar tu contraseña actual antes de crear una nueva.
                </p>
                <Input
                    label="Contraseña actual"
                    name="current_password"
                    type="password"
                    placeholder="Ingresa la contraseña que estás usando actualmente."
                />
                <Input
                    label="Nueva contraseña"
                    name="new_password"
                    type="password"
                    placeholder="Debe tener al menos 8 caracteres."
                />
                <Input
                    label="Confirmar nueva contraseña"
                    name="confirm_new_password"
                    type="password"
                    placeholder="Vuelve a escribir la nueva contraseña."
                />
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
                    className="bg-[#147AC833] text-[#147AC8] px-6 py-2 rounded-md text-sm font-medium hover:bg-[#147AC8] hover:bg-opacity-20"
                >
                    Actualizar contraseña
                </button>
            </div>
        </div>
    );
};

export default ChangePasswordModal;