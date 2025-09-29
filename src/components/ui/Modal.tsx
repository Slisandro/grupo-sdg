import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title: string;
    size?: 'sm' | 'md' | 'lg';
    headerBg?: string; 
    headerTextColor?: string;
    classNameHeader?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    title,
    size = 'md',
    headerBg = 'bg-sa-primary', 
    headerTextColor = 'text-white',
    classNameHeader = '',
}) => {
    if (!isOpen) return null;

    const sizeClasses = {
        sm: 'max-w-md',
        md: 'max-w-xl',
        lg: 'max-w-3xl',
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center p-4"
            onClick={onClose}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-full flex flex-col ${sizeClasses[size]}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div
                    className={`flex justify-between items-center p-4 border-b ${headerBg} ${headerTextColor} ${classNameHeader} rounded-t-lg`}
                >
                    <h3 className="text-lg font-semibold">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20">
                        <X size={20} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};

export default Modal;
