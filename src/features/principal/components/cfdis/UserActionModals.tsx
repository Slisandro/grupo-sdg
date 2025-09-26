

import React from 'react';
import Modal from '../../../../pages/ui/Modal';

interface UserActionModalsProps {
    type: 'activate' | 'deactivate' | 'delete';
    user: { id: string; nombre: string } | null;
    onClose: () => void;
    onConfirm: () => void;
}

const UserActionModals: React.FC<UserActionModalsProps> = ({ type, user, onClose, onConfirm }) => {
    if (!user) return null;

    const titles = {
        activate: "Activar usuario",
        deactivate: "Desactivar usuario",
        delete: "Eliminar usuario",
    };

    const messages = {
        activate: `¿Estás seguro que deseas activar el usuario con ID<${user.id}>? Este usuario podrá ser utilizado en próximos procesos.`,
        deactivate: `¿Estás seguro que deseas desactivar el usuario con ID<${user.id}>? Este usuario no podrá ser utilizado en próximos procesos.`,
        delete: `¿Estás seguro que deseas eliminar el usuario con ID<${user.id}>? Este usuario no podrá ser utilizado en próximos procesos. Esta acción es irreversible.`,
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={titles[type]} size="sm">
            <div className="p-6 space-y-4">
                <p className="text-sm text-sa-text-secondary">{messages[type]}</p>
            </div>
            <div className="px-6 py-3 bg-gray-50 flex justify-end space-x-3 border-t">
                <button onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md text-sm hover:bg-gray-300">Cancelar</button>
                <button onClick={onConfirm} className="bg-sa-secondary text-white px-4 py-2 rounded-md text-sm hover:bg-sa-primary">Aceptar</button>
            </div>
        </Modal>
    );
};

export default UserActionModals;

