import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label: string;
    name: string;
    options: { value: string | number; label: string }[];
    error?: string;
    className?: string;
    classNameLabel?: string;
    classNameContainer?: string;
}

const Select: React.FC<SelectProps> = ({ label, name, options, error, className, classNameLabel, classNameContainer, ...rest }) => {
    return (
        <div className={classNameContainer}>
            {label && <label htmlFor={name} className={`block text-xs font-medium text-sa-text-secondary mb-1 ${classNameLabel}`}>{label}</label>}
            <select
                id={name}
                name={name}
                className={`w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md
                    focus:outline-none focus:ring-1 focus:ring-sa-secondary focus:border-sa-secondary
                    ${error ? 'border-sa-danger' : ''} ${className}`}
                {...rest}
            >
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-xs text-sa-danger">{error}</p>}
        </div>
    );
};

export default Select;