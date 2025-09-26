

import { ArrowDown, ArrowUp, ArrowUpDown, MoreVertical } from 'lucide-react';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type EstatusType = 'Activo' | 'Inactivo';
const StatusBadge: React.FC<{ estatus: EstatusType }> = ({ estatus }) => {
    const styles = { 'Activo': 'bg-sa-success-bg text-sa-success', 'Inactivo': 'bg-sa-warning-bg text-sa-warning' };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-md ${styles[estatus]}`}>{estatus}</span>;
};

const mockUsuariosData = [
    {
        id: '1',
        empresa: 'Acme MX',
        proveedor: 'Acme MX',
        tipo_factura: 'Ingreso',
        fecha_alta: '2008/11/28',
        sucursal: 'Monterrey Norte',
        correo: 'acmemx@example.com',
    },
    {
        id: '2',
        empresa: 'Acme MX',
        proveedor: 'Acme MX',
        tipo_factura: 'Pago (complemento pago)',
        fecha_alta: '2008/11/28',
        sucursal: 'CDMX Poniente',
        correo: 'acmemx@example.com',
    }
];

type Usuario = typeof mockUsuariosData[0];
type UsuarioKey = keyof Usuario;

const tableHeaders: { key: UsuarioKey | 'actions'; label: string; sortable: boolean }[] = [
    { key: 'empresa', label: 'Empresa', sortable: true },
    { key: 'proveedor', label: 'Proveedor', sortable: true },
    { key: 'tipo_factura', label: 'Tipo de factura', sortable: true },
    { key: 'fecha_alta', label: 'Fecha alta', sortable: true },
    { key: 'sucursal', label: 'Sucursal', sortable: true },
    { key: 'correo', label: 'Correo', sortable: true },
    { key: 'actions', label: '', sortable: false }
];


const CFDIS: React.FC = () => {
    const navigate = useNavigate();
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
    const [modalState, setModalState] = useState<{ type: 'activate' | 'deactivate' | 'delete' | null; user: Usuario | null }>({ type: null, user: null });
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [usuarios, setUsuarios] = useState(mockUsuariosData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: UsuarioKey; direction: 'ascending' | 'descending' } | null>(null);

    const filteredItems = useMemo(() => {
        if (!searchTerm) return usuarios;
        return usuarios.filter((item: Usuario) =>
            Object.values(item).some(value => String(value).toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, usuarios]);

    const sortedItems = useMemo(() => {
        let sortableItems = [...filteredItems];
        if (sortConfig) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'ascending' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    }, [filteredItems, sortConfig]);

    const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
    const currentItems = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * itemsPerPage;
        return sortedItems.slice(firstPageIndex, firstPageIndex + itemsPerPage);
    }, [currentPage, itemsPerPage, sortedItems]);

    const requestSort = (key: UsuarioKey) => {
        let direction: 'ascending' | 'descending' = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (key: string) => {
        if (!sortConfig || sortConfig.key !== key) return <ArrowUpDown className="inline h-4 w-4 ml-1 opacity-40" />;
        return sortConfig.direction === 'ascending' ? <ArrowUp className="inline h-4 w-4 ml-1" /> : <ArrowDown className="inline h-4 w-4 ml-1" />;
    };

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => paginate(i)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors 
                    ${currentPage === i
                            ? 'bg-sa-primary text-white'
                            : 'text-sa-text-secondary hover:bg-sa-sidebar-hover'
                        }`}
                >
                    {i}
                </button>
            );
        }
        return pageNumbers;
    };


    const handleDropdownToggle = (id: string) => setOpenDropdownId(prev => (prev === id ? null : id));

    const handleAction = (type: 'activate' | 'deactivate' | 'delete', user: Usuario) => {
        setModalState({ type, user });
        setOpenDropdownId(null);
    };

    const closeModal = () => setModalState({ type: null, user: null });

    const handleConfirmAction = () => {
        if (!modalState.user || !modalState.type) return;

        if (modalState.type === 'delete') {
            setUsuarios(prevUsers => prevUsers.filter(u => u.id !== modalState.user!.id));
        } else {
            const newStatus = modalState.type === 'activate' ? 'Activo' : 'Inactivo';
            setUsuarios(prevUsers =>
                prevUsers.map(u => u.id === modalState.user!.id ? { ...u, estatus: newStatus } : u)
            );
        }
        closeModal();
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setOpenDropdownId(null);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-sa-text-secondary">Principal / &nbsp;
                        <span className="text-[#F8C00C]">
                            Carga de CFDIs
                        </span>
                    </p>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Carga de CFDIS</h1>
                    <p className="text-lg text-[#999999]">Lista de usuarios</p>
                </div>
                <button onClick={() => navigate('/gestion/usuarios/nuevo')} className="bg-sa-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sa-secondary">Cargar archivos</button>
            </div>

            <div className="bg-white rounded-card shadow">
                <div className="p-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2 text-sm text-sa-text-secondary">
                            <span>Mostrar</span>
                            <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="border border-sa-border rounded-md px-2 py-1">
                                <option value={10}>10</option><option value={25}>25</option><option value={50}>50</option>
                            </select>
                            <span>resultados</span>
                        </div>
                        <div className="flex items-center text-sm">
                            <label htmlFor="search-usuarios" className="mr-2 text-sa-text-secondary">Buscar:</label>
                            <input id="search-usuarios" type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border border-sa-border rounded-md px-3 py-1 w-48" />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-sa-text-secondary">
                            <tr>
                                {tableHeaders.map(header => (
                                    <th key={String(header.key)} className="p-3 font-semibold text-left whitespace-nowrap">
                                        {header.sortable ? (
                                            <button className="flex items-center" onClick={() => requestSort(header.key as UsuarioKey)}>
                                                {header.label} {getSortIcon(String(header.key))}
                                            </button>
                                        ) : header.label}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-sa-border">
                            {currentItems.map(user => (
                                <tr key={user.id} className="hover:bg-gray-50">
                                    <td className="p-3 text-[#1E1E1E]">{user.empresa}</td>
                                    <td className="p-3 text-[#1E1E1E]">{user.proveedor}</td>
                                    <td className="p-3 text-[#1E1E1E]">{user.tipo_factura}</td>
                                    <td className="p-3 text-[#1E1E1E]">{user.fecha_alta}</td>
                                    <td className="p-3 text-[#1E1E1E]">{user.sucursal}</td>
                                    <td className="p-3 text-[#1E1E1E]">{user.correo}</td>
                                    <td className="p-3 text-center">
                                        <div className="relative inline-block" ref={openDropdownId === user.id ? dropdownRef : null}>
                                            <button onClick={() => handleDropdownToggle(user.id)} className="p-1 rounded-full hover:bg-gray-200"><MoreVertical className="text-gray-500" /></button>
                                            {openDropdownId === user.id && (
                                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-gray-200 ring-opacity-5 z-10">
                                                    <div className="py-1">
                                                        <button onClick={() => navigate(`/gestion/usuarios/${user.id}`)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Ver detalles</button>
                                                        <button onClick={() => navigate(`/gestion/usuarios/${user.id}`)} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Eliminar ítem</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 flex items-center justify-between border-t text-sm text-sa-text-secondary">
                    <span>Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, sortedItems.length)} de {sortedItems.length} resultados</span>
                    <div className="p-4 flex items-center justify-center text-sm text-sa-text-secondary">
                        <div className="flex items-center">
                            {renderPageNumbers()}
                        </div>
                    </div>

                </div>
            </div>
            {/* {modalState.type && <UserActionModals type={modalState.type} user={modalState.user} onClose={closeModal} onConfirm={handleConfirmAction} />} */}
        </div>
    );
};

export default CFDIS;