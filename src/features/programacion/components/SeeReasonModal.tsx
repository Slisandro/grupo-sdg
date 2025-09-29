// src/features/auth/components/DeleteFile.tsx
import React from 'react';

interface DeleteFileProps {
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteFileModal: React.FC<DeleteFileProps> = ({ onClose }) => {
    return (
        <div>
            <div className="px-6 py-2">
                <div className="grid grid-cols-3 gap-4">
                    <span className="col-span-1 font-public text-[15px] font-[400] text-[#7D7D7D] leading-[22px]">Fecha:</span>
                    <span className="col-span-2 font-public text-[15px] font-[400] text-[#2C2C2C] leading-[22px]">12/08/2023</span>
                    <span className="col-span-1 font-public text-[15px] font-[400] text-[#7D7D7D] leading-[22px]">Argumentación:</span>
                    <span className="col-span-2 font-public text-[15px] font-[400] text-[#2C2C2C] leading-[22px]">El UUID ingresado en el campo de CFDI Relacionado no existe o no corresponde con la factura original. Por favor, verifique el dato y vuelva a enviar el complemento de pago</span>
                </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t flex justify-end space-x-3">
                <button
                    onClick={onClose}
                    className="bg-white border border-[#CFD1D4] text-[#474747] px-6 py-2 rounded-md text-[13px] font-[600] font-public"
                >
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default DeleteFileModal;