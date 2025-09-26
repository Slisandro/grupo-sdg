import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import React, { useMemo, useState } from 'react';

type EstatusPago = 'Pagado' | 'Programado' | 'Rechazado';

const StatusBadge: React.FC<{ estatus: EstatusPago }> = ({ estatus }) => {
    const styles = {
        'Pagado': 'bg-green-100 text-green-700',
        'Programado': 'bg-yellow-100 text-yellow-700',
        'Rechazado': 'bg-red-100 text-red-700'
    };
    return <span className={`px-3 py-1 text-xs font-semibold rounded-md ${styles[estatus]}`}>{estatus}</span>;
};

const mockUsuariosData = [
    { id: '1', factura: 'FAC-001', monto: 5000, fecha_programada: '2025/09/30', forma_pago: 'Transferencia', condiciones: 'Contado', referencia_pago: 'REF123', comprobante: 'https://example.com/comprobante1.pdf', estatus: 'Pagado' as EstatusPago, motivo: '' },
    { id: '2', factura: 'FAC-002', monto: 7500, fecha_programada: '2025/10/05', forma_pago: 'Cheque', condiciones: '30 días', referencia_pago: 'REF456', comprobante: null, estatus: 'Rechazado' as EstatusPago, motivo: 'Error en datos de pago' },
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
    { key: 'comprobante', label: 'Comprobante', sortable: false },
    { key: 'estatus', label: 'Estatus', sortable: true },
    { key: 'motivo', label: 'Motivos', sortable: false },
    { key: 'actions', label: '', sortable: false },
];

const ProgramacionPago: React.FC = () => {

    const [usuarios] = useState(mockUsuariosData);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{ key: UsuarioKey; direction: 'ascending' | 'descending' } | null>(null);

    // Filtrado seguro: convierte todos los valores a string solo si existen
    const filteredItems = useMemo(() => {
        if (!searchTerm) return usuarios;
        return usuarios.filter((item: Usuario) =>
            Object.values(item).some(value => value != null && String(value).toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [searchTerm, usuarios]);

    // Ordenamiento
    const sortedItems = useMemo(() => {
        let sortableItems = [...filteredItems];
        if (sortConfig) {
            sortableItems.sort((a, b) => {
                const aVal = a[sortConfig.key];
                const bVal = b[sortConfig.key];
                if (aVal == null) return 1;
                if (bVal == null) return -1;
                if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
                if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-sm text-sa-text-secondary">Principal / <span className="text-[#F8C00C]">Programación de pagos</span></p>
                    <h1 className="text-2xl font-bold text-[#0F172A]">Programación de pagos</h1>
                    <p className="text-lg text-[#999999]">Lista de programación de pagos</p>
                </div>
                {/* <button onClick={() => navigate('/gestion/usuarios/nuevo')} className="bg-sa-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sa-secondary">Cargar archivos</button> */}
            </div>

            {/* Tabla */}
            <div className="bg-white rounded-card shadow">
                <div className="p-6 flex justify-between items-center">
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
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.factura}</td>
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.monto}</td>
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.fecha_programada}</td>
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.forma_pago}</td>
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.condiciones}</td>
                                    <td className="p-3 text-[#1E1E1E] whitespace-nowrap">{user.referencia_pago}</td>
                                    <td className="p-3 whitespace-nowrap">
                                        {user.comprobante ? (
                                            <a href={user.comprobante} target="_blank" className="text-blue-600 underline">Descargar PDF</a>
                                        ) : (
                                            <span className="text-gray-400">Aún no disponible</span>
                                        )}
                                    </td>
                                    <td className="p-3 whitespace-nowrap"><StatusBadge estatus={user.estatus} /></td>
                                    <td className="p-3 text-center whitespace-nowrap">
                                        {user.estatus === 'Rechazado' ? (
                                            <button className="px-2 py-1 text-sm text-white bg-red-500 rounded-md hover:bg-red-600">Ver motivo</button>
                                        ) : (
                                            <span>-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="p-4 flex items-center justify-between border-t text-sm text-sa-text-secondary">
                    <span>Mostrando {((currentPage - 1) * itemsPerPage) + 1} a {Math.min(currentPage * itemsPerPage, sortedItems.length)} de {sortedItems.length} resultados</span>
                    <div className="flex items-center space-x-1">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button key={i + 1} onClick={() => setCurrentPage(i + 1)}
                                className={`px-3 py-1 rounded-md text-sm transition-colors ${currentPage === i + 1 ? 'bg-sa-primary text-white' : 'text-sa-text-secondary hover:bg-sa-sidebar-hover'}`}>
                                {i + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProgramacionPago;
