import React from "react";
// import { useNavigate } from "react-router-dom";
import FcdisForm from "../../../features/fcdis/components/FcdisForm";
import { useParams } from "react-router-dom";

interface UploadedFile {
    id: string;
    name: string;
    date: string;
}

interface FcdisFormProps {
    entity?: {
        proveedor?: string;
        empresa?: string;
        tipo_factura?: string;
        sucursal?: string;
        correo?: string;
        confirma_correo?: string;
        comentarios?: string;
        archivos?: UploadedFile[];
    };
}

const exampleEntity: FcdisFormProps["entity"] = {
    proveedor: "Proveedor Demo SA",
    empresa: "Empresa Ejemplo SRL",
    tipo_factura: "ingreso",
    sucursal: "monterrey_norte",
    correo: "demo@empresa.com",
    confirma_correo: "demo@empresa.com",
    comentarios: "Factura correspondiente al mes de mayo.",
    archivos: [
        {
            id: "1",
            name: "factura_mayo_2025.xml",
            date: "15/05/2025 14:01",
        },
        {
            id: "2",
            name: "factura_mayo_2025.pdf",
            date: "15/05/2025 14:02",
        },
    ],
};


const CfdisGestionPage: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // ← Obtiene el parámetro de la URL

    const isEditMode = Boolean(id);

    return (
        <div className="flex-1 gap-[10px] py-[10px] px-[6px]">
            <div className="flex justify-between items-center px-[25px]">
                <div className="flex flex-col">
                    <p className="font-raleway leading-[22px] font-[500] text-[14px] text-[#555555] gap-2 flex pb-4">
                        Principal
                        <span className="text-[#9FA2AA] font-[400] font-public">/</span>
                        <span className="text-[#F8C00C] font-[600]">Carga de CFDIs</span>
                    </p>
                </div>
            </div>

            <div className="bg-white rounded-card shadow border border-[#DBE0E5] rounded-[12px] px-[20px] py-[22px] gap-[28px]">
                <h4 className="font-inter font-[500] text-[18px] leading-[22px] text-[#1D2630] mb-[10px]">
                    {isEditMode ? "Detalle" : "Cargar archivos"}
                </h4>

                <p className="font-inter font-[400] text-[12px] leading-[20px] text-[#8996A4]">
                    {isEditMode ? "Información del registro." : "Completa el registro."}
                </p>

                <div className="mt-4">
                    <FcdisForm entity={exampleEntity} />
                </div>
            </div>
        </div>
    );
};

export default CfdisGestionPage;
