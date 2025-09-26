import React from 'react';
import { Link } from 'react-router-dom';
import { FileKey, FileText } from 'lucide-react';


type NotificationType = 'access_request' | 'case_alert' | 'billing_alert';

interface Notification {
    id: number;
    type: NotificationType;
    message: string;
    time: string;
}


const mockNotifications: Notification[] = [
    // { id: 1, type: 'access_request', message: 'Luis Ramírez ha solicitado acceso al archivo "Contrato confidencial.pdf"', time: '25 min' },
    // { id: 2, type: 'case_alert', message: 'Caso "Demanda vs Pérez" sin actividad en los últimos 7 días.', time: '25 min' },
    // { id: 3, type: 'case_alert', message: 'Falta cargar archivos en el caso "González vs Empresa X".', time: '25 min' },
    // { id: 4, type: 'case_alert', message: 'Audiencia programada en 2 días para el caso 0789-23.', time: '25 min' },
    // { id: 5, type: 'billing_alert', message: 'El presupuesto #4567 tiene un saldo pendiente de $1,200 con fecha límite el 30 de mayo.', time: '25 min' },
];


const notificationConfig: Record<NotificationType, { icon: React.ReactNode; colorClass: string }> = {
    access_request: { icon: <FileKey size={20} />, colorClass: 'bg-yellow-100 text-yellow-600' },
    case_alert: { icon: <FileText size={20} />, colorClass: 'bg-blue-100 text-blue-600' },
    billing_alert: { icon: <FileText size={20} />, colorClass: 'bg-blue-100 text-blue-600' },
};


const NotificationsDropdown: React.FC = () => {
    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-gray-200 ring-opacity-5 z-40">
            <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">Notificaciones</h3>
                    <span className="bg-sa-primary text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">2</span>
                </div>
            </div>

            {/* Lista de Notificaciones */}
            <div className="max-h-96 overflow-y-auto">
                {mockNotifications.length > 0 ? mockNotifications.map(notification => {
                    const config = notificationConfig[notification.type];
                    return (
                        <div key={notification.id} className="flex items-start gap-4 p-4 hover:bg-gray-50">
                            <div className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${config.colorClass}`}>
                                {config.icon}
                            </div>
                            <div className="flex-grow">
                                <p className="text-sm text-gray-700 leading-snug">{notification.message}</p>
                            </div>
                            <span className="text-xs text-gray-400 flex-shrink-0">{notification.time}</span>
                        </div>
                    );
                }) : (
                    <div className="p-4 text-center text-gray-500">
                        No hay notificaciones nuevas
                    </div>
                )}
            </div>

            <div className="p-2 border-t border-gray-200 text-center">
                <Link to="/gestion/notificaciones" className="text-sm font-semibold text-sa-primary hover:underline">
                    Ver Todas
                </Link>
            </div>
        </div>
    );
};

export default NotificationsDropdown;