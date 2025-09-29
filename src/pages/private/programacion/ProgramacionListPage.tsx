import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Modal from "../../../components/ui/Modal";
import SeeReasonModal from "../../../features/programacion/components/SeeReasonModal";

type EstatusPago = 'Pagado' | 'Programado' | 'Rechazado';

const StatusBadge: React.FC<{ estatus: EstatusPago }> = ({ estatus }) => {
    const styles = {
        'Pagado': 'bg-green-100 text-green-700',
        'Programado': 'bg-yellow-100 text-yellow-700',
        'Rechazado': 'bg-red-100 text-red-700'
    };
    return <span className={`block text-center w-30 px-3 py-1 text-[12px] font-[600] font-raleway rounded-md ${styles[estatus]}`}>{estatus}</span>;
};

const mockUsuariosData = [
    { id: '1', factura: 'FAC-001', monto: 5000, fecha_programada: '2025/09/30', forma_pago: 'Transferencia', condiciones: 'Contado', referencia_pago: 'REF123', comprobante: 'https://example.com/comprobante1.pdf', estatus: 'Pagado' as EstatusPago, motivo: '' },
    { id: '2', factura: 'FAC-002', monto: 7500, fecha_programada: '2025/10/05', forma_pago: 'Cheque', condiciones: '30 días', referencia_pago: 'REF456', comprobante: null, estatus: 'Rechazado' as EstatusPago },
    { id: '3', factura: 'FAC-003', monto: 12000, fecha_programada: '2025/10/10', forma_pago: 'Transferencia', condiciones: 'Contado', referencia_pago: 'REF789', comprobante: 'https://example.com/comprobante3.pdf', estatus: 'Programado' as EstatusPago, motivo: '' },
];

type Usuario = typeof mockUsuariosData[0];
type UsuarioKey = keyof Usuario;

const tableHeaders: { key: UsuarioKey | 'actions'; label: string; sortable: boolean }[] = [
    { key: 'factura', label: 'Factura', sortable: true },
    { key: 'monto', label: 'Monto', sortable: true },
    { key: 'fecha_programada', label: 'Fecha programada de pago', sortable: true },
    { key: 'forma_pago', label: 'Forma de pago', sortable: true },
    { key: 'condiciones', label: 'Condiciones', sortable: true },
    { key: 'referencia_pago', label: 'Referencia de pago', sortable: true },
    { key: 'comprobante', label: 'Comprobante', sortable: true },
    { key: 'estatus', label: 'Estatus', sortable: true },
    { key: 'motivo', label: 'Motivos', sortable: true },
];

const Programacion: React.FC = () => {

    const [isMotivoModalOpen, setMotivoModalOpen] = useState(false);

    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [usuarios] = useState(mockUsuariosData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{
        key: UsuarioKey;
        direction: "ascending" | "descending";
    } | null>(null);

    const filteredItems = useMemo(() => {
        if (!searchTerm) return usuarios;
        return usuarios.filter((item: Usuario) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, usuarios]);

    const sortedItems = useMemo(() => {
        let sortableItems = [...filteredItems];
        // if (sortConfig) {
        //     sortableItems.sort((a, b) => {
        //         if (a[sortConfig.key] < b[sortConfig.key])
        //             return sortConfig.direction === "ascending" ? -1 : 1;
        //         if (a[sortConfig.key] > b[sortConfig.key])
        //             return sortConfig.direction === "ascending" ? 1 : -1;
        //         return 0;
        //     });
        // }
        return sortableItems;
    }, [filteredItems, sortConfig]);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return sortedItems.slice(firstPageIndex, firstPageIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, sortedItems]);

    const requestSort = (key: UsuarioKey) => {
        let direction: "ascending" | "descending" = "ascending";
        if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key)
            return <ArrowUpDown className="inline h-4 w-4 ml-1 opacity-40" />;
        return sortConfig.direction === "ascending" ? (
            <ArrowUp className="inline h-4 w-4 ml-1" />
        ) : (
            <ArrowDown className="inline h-4 w-4 ml-1" />
        );
    };

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const onOpenMotivoModal = () => setMotivoModalOpen(true);

    const handleMotivoConfirm = () => {
        alert('Motivo actualizado (simulado).');
        setMotivoModalOpen(false);
    };

    const renderPageNumbers = () => {
        if (totalPages <= 1) return null;

        const pageNumbers: (number | string)[] = [];
        const maxVisible = 1;
        const start = Math.max(2, currentPage - maxVisible);
        const end = Math.min(totalPages - 1, currentPage + maxVisible);

        pageNumbers.push(1);

        if (start > 2) pageNumbers.push("...");

        for (let i = start; i <= end; i++) pageNumbers.push(i);

        if (end < totalPages - 1) pageNumbers.push("...");

        if (totalPages > 1) pageNumbers.push(totalPages);

        return (
            <div className="flex items-center gap-1">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E7EB] text-gray-500 
            ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    &lt;
                </button>

                {pageNumbers.map((page, idx) =>
                    page === "..." ? (
                        <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
                            ...
                        </span>
                    ) : (
                        <button
                            key={page}
                            onClick={() => paginate(Number(page))}
                            className={`w-8 h-8 flex items-center justify-center rounded-md border text-sm
                ${currentPage === page
                                    ? "border-gray-400 text-gray-900 bg-white"
                                    : "border-transparent text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {page}
                        </button>
                    )
                )}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`w-8 h-8 flex items-center justify-center rounded-md border border-[#E5E7EB] text-gray-500 
            ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
                >
                    &gt;
                </button>
            </div>
        );
    };

    useEffect(() => {
        if (!openDropdownId) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpenDropdownId(null);
            }
        };

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpenDropdownId(null);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEsc);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEsc);
        };
    }, [openDropdownId]);

    return (
        <>
            <div className="space-y-6 flex-1 px-6 py-2">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="font-raleway leading-[22px] font-[500] text-[14px] text-[#555555] gap-2 flex pb-4">
                            Principal
                            <span className="text-[#9FA2AA] font-[400] font-public">/</span>
                            <span className="text-[#F8C00C] font-[600]">Programación de pagos</span>
                        </p>
                        <h1 className="text-[22px] font-raleway font-[600] text-[#1E1E1E] leading-[32px]">
                            Programación de pagos
                        </h1>
                        <p className="text-[14px] font-raleway font-[400] text-[#999999] leading-[32px]">
                            Lista de programación de pagos
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-card shadow">
                    <div className="p-[20px] bg-white">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-2 text-sm text-[#353535] font-raleway">
                                <span className="text-[14px] font-[400]">Mostrar</span>
                                <select
                                    value={itemsPerPage}
                                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                    className="border border-[#CFD1D4] rounded-[8px] px-2 py-1"
                                >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <span className="text-[14px] font-[400]">resultados</span>
                            </div>
                            <div className="flex items-center text-sm">
                                <label
                                    htmlFor="search-usuarios"
                                    className="mr-2 font-raleway font-[400] text-[14px] text-[#353535]"
                                >
                                    Buscar:
                                </label>
                                <input
                                    id="search-usuarios"
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="border border-[#CFD1D4] rounded-[8px] px-[12px] py-[8px] w-[200px] text-[#35353599] font-raleway font-[400] text-[14px]"
                                    placeholder="Buscar"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    {tableHeaders.map((header) => (
                                        <th
                                            key={String(header.key)}
                                            className="p-3 font-semibold text-left whitespace-nowrap text-[#1E1E1E] font-raleway text-[14px] leading-[22px]"
                                        >
                                            {header.sortable ? (
                                                <button
                                                    className="flex items-center"
                                                    onClick={() => requestSort(header.key as UsuarioKey)}
                                                >
                                                    {header.label} {getSortIcon(String(header.key))}
                                                </button>
                                            ) : (
                                                header.label
                                            )}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y border border-[#F0F0F0] rounded-[4px]">
                                {currentItems.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 border-b border-[#EFEFEF]">
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.factura}
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            ${user.monto}.00
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.fecha_programada}
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.forma_pago}
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.condiciones}
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.referencia_pago}
                                        </td>
                                        <td className="p-3 text-[#1E1E1E] font-raleway font-[400] text-[14px] leading-[22px] whitespace-nowrap">
                                            {user.comprobante ? (
                                                <a
                                                    href={user.comprobante}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#519CFF] underline font-raleway font-[600]"
                                                >
                                                    Descargar PDF
                                                </a>
                                            ) : (
                                                <span className="text-[#838383] font-raleway font-[400]">Aún no disponible</span>
                                            )}
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            <StatusBadge estatus={user.estatus} />
                                        </td>
                                        <td className="p-3 whitespace-nowrap">
                                            {user.estatus === "Rechazado" && (
                                                <button
                                                    className="px-2 py-1 text-[#0B0B5F] text-sm border border-[#303E67] rounded-[6px] font-public text-[12px] font-[500] leading-[20px]"
                                                    onClick={onOpenMotivoModal}
                                                >
                                                    Ver motivo
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>

                    <div className="py-[24px] px-[20px] flex items-center justify-between text-sm font-raleway font-[500] text-[#353535] text-[14px] leading-[22px]">
                        <span>
                            Mostrando {(currentPage - 1) * itemsPerPage + 1} a{" "}
                            {Math.min(currentPage * itemsPerPage, sortedItems.length)} de{" "}
                            {sortedItems.length} resultados
                        </span>
                        <div className="flex items-center justify-center text-sm">
                            <div className="flex items-center">{renderPageNumbers()}</div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isMotivoModalOpen}
                onClose={() => setMotivoModalOpen(false)}
                title="Motivo de rechazo del complemento de pago"
                size="md"
                headerTextColor="text-[#353535]"
                classNameHeader="border-[transparent]"
            >
                <SeeReasonModal
                    onClose={() => setMotivoModalOpen(false)}
                    onConfirm={handleMotivoConfirm}
                />
            </Modal>
        </>
    );
};

export default Programacion;
