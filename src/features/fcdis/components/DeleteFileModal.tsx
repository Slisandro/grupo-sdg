// src/features/auth/components/DeleteFile.tsx
import React from 'react';

interface DeleteFileProps {
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteFileModal: React.FC<DeleteFileProps> = ({ onClose, onConfirm }) => {
    return (
        <div>
            <div className="px-6 py-2">
                <p className="text-sm text-gray-600">
                    ¿Estás seguro que deseas eliminar archivo con ID? Este archivo no podrá ser utilizado en próximas procesos. Esta acción es irreversible.
                </p>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                <button
                    onClick={onConfirm}
                    className="bg-[#E64949] text-white px-6 py-2 rounded-md text-[13px] font-[600] font-public"
                >
                    Si, eliminar
                </button>
                <button
                    onClick={onClose}
                    className="bg-white border border-[#CFD1D4] text-[#474747] px-6 py-2 rounded-md text-[13px] font-[600] font-public"
                >
                    Cancelar
                </button>
            </div>
        </div>
    );
};

export default DeleteFileModal;