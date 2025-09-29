import { ArrowUpDown } from "lucide-react";
import React, { useEffect, useState } from "react";
import FileInput from "../../../components/ui/FileInput";
import Input from "../../../components/ui/Input";
import Modal from "../../../components/ui/Modal";
import Select from "../../../components/ui/Select";
import DeleteDocumentationModal from "./DeleteDocumentationModal";

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

const FcdisForm: React.FC<FcdisFormProps> = ({ entity }) => {
    const [formData, setFormData] = useState({
        proveedor: "",
        empresa: "",
        tipo_factura: "",
        sucursal: "",
        correo: "",
        confirma_correo: "",
        comentarios: "",
    });

    const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
    const [isChangePasswordModalOpen, setChangePasswordModalOpen] = useState(false);

    const tipoFacturaOptions = [
        { value: "ingreso", label: "Ingreso" },
        { value: "pago", label: "Pago (complemento pago)" },
    ];

    const sucursalOptions = [
        { value: "monterrey_norte", label: "Monterrey Norte" },
        { value: "cdmx_poniente", label: "CDMX Poniente" },
    ];

    // Prellenar datos cuando recibimos entity
    useEffect(() => {
        if (entity) {
            setFormData({
                proveedor: entity.proveedor ?? "",
                empresa: entity.empresa ?? "",
                tipo_factura: entity.tipo_factura ?? "",
                sucursal: entity.sucursal ?? "",
                correo: entity.correo ?? "",
                confirma_correo: entity.confirma_correo ?? "",
                comentarios: entity.comentarios ?? "",
            });
            setUploadedFiles(entity.archivos ?? []);
        }
    }, [entity]);

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const onOpenChangePasswordModal = () => setChangePasswordModalOpen(true);

    const handleChangePasswordConfirm = () => {
        alert("Documento eliminado (simulado).");
        setChangePasswordModalOpen(false);
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4">
                <Input
                    label="Proveedor"
                    name="proveedor"
                    placeholder="Ingrese proveedor"
                    value={formData.proveedor}
                    onChange={(e) => handleChange("proveedor", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-3"
                />

                <Input
                    label="Empresa"
                    name="empresa"
                    placeholder="Ingrese empresa"
                    value={formData.empresa}
                    onChange={(e) => handleChange("empresa", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-3"
                />

                <Select
                    label="Tipo de factura"
                    name="tipo_factura"
                    options={tipoFacturaOptions}
                    value={formData.tipo_factura}
                    onChange={(e) => handleChange("tipo_factura", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-3"
                />

                <Select
                    label="Sucursal"
                    name="sucursal"
                    options={sucursalOptions}
                    value={formData.sucursal}
                    onChange={(e) => handleChange("sucursal", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-3"
                />

                <Input
                    label="Correo"
                    name="correo"
                    placeholder="Ingrese correo"
                    value={formData.correo}
                    onChange={(e) => handleChange("correo", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-4"
                />

                <Input
                    label="Confirma correo electrónico"
                    name="confirma_correo"
                    placeholder="Ingrese correo nuevamente"
                    value={formData.confirma_correo}
                    onChange={(e) => handleChange("confirma_correo", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-4"
                />

                <Input
                    label="Comentarios (opcional)"
                    name="comentarios"
                    placeholder="Ingrese sus comentarios"
                    value={formData.comentarios}
                    onChange={(e) => handleChange("comentarios", e.target.value)}
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                    className="font-inter text-[14px] leading-[22px] text-[#1D2630]"
                    classNameContainer="col-span-4"
                />

                <FileInput
                    label="Subir archivo (XML, PDF)"
                    name="archivo"
                    classNameContainer="col-span-10"
                    classNameLabel="font-inter font-medium text-[14px] leading-[22px] text-[#1D2630]"
                />

                <button className="mt-auto bg-[#494949] col-span-2 text-white px-4 rounded-md h-[max-content] py-2 font-public font-medium text-[14px] leading-[22px] text-center ">
                    Subir
                </button>

                {uploadedFiles.length > 0 && (
                    <div className="col-span-12 mt-4">
                        <h3 className="font-inter font-medium text-[18px] leading-[100%] text-[#595959] mb-2">
                            Documentos añadidos
                        </h3>
                        <div className="overflow-x-auto border min-h-40 rounded-[4px] pl-[18px] border-[#F0F0F0]">
                            <table className="min-w-full divide-y divide-[#F0F0F0] border border-[#F0F0F0]">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 text-left font-raleway font-medium text-[14px] leading-[22px] text-[#1E1E1E]">
                                            Fecha y Hora
                                            <ArrowUpDown className="inline h-4 w-4 ml-1 opacity-40" />
                                        </th>
                                        <th className="px-4 py-2 text-left font-raleway font-medium text-[14px] leading-[22px] text-[#1E1E1E]">
                                            Archivo
                                            <ArrowUpDown className="inline h-4 w-4 ml-1 opacity-40" />
                                        </th>
                                        <th className="px-4 py-2 text-left font-raleway font-medium text-[14px] leading-[22px] text-[#1E1E1E]">
                                            Acciones
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {uploadedFiles.map((file) => (
                                        <tr key={file.id}>
                                            <td className="px-4 py-2 font-raleway font-light text-[14px] leading-[22px] text-[#1E1E1E] whitespace-nowrap">
                                                {file.date}
                                            </td>
                                            <td className="px-4 py-2 font-raleway font-light text-[14px] leading-[22px] text-[#1E1E1E]">
                                                {file.name}
                                            </td>
                                            <td className="px-4 py-2 flex justify-end gap-2">
                                                <button onClick={onOpenChangePasswordModal} className="w-[35px] h-[35px] bg-[#262E60] rounded-[12px] flex items-center justify-center">
                                                    <img src="/icons/refresh.png" className="w-[15px]" />
                                                </button>
                                                <button onClick={onOpenChangePasswordModal} className="w-[35px] h-[35px] border border-[#E7E8EA] rounded-[12px] flex items-center justify-center">
                                                    <img src="/icons/trash.png" className="w-[16px] h-[16px]" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                <button className="bg-[#F8C00C] w-[160px] col-span-12 text-white px-4 rounded-md h-[40px] py-2 font-public font-medium text-[14px] leading-[22px] text-center ml-auto">
                    Guardar
                </button>
            </div>

            <Modal
                isOpen={isChangePasswordModalOpen}
                onClose={() => setChangePasswordModalOpen(false)}
                title="Eliminar documentación"
                size="sm"
                headerTextColor="text-[#353535]"
                classNameHeader="border-[transparent]"
            >
                <DeleteDocumentationModal
                    onClose={() => setChangePasswordModalOpen(false)}
                    onConfirm={handleChangePasswordConfirm}
                />
            </Modal>
        </>
    );
};

export default FcdisForm;
