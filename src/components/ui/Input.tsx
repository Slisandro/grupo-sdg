import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register?: UseFormRegisterReturn;
    error?: string;
}

const Input: React.FC<InputProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    register,
    error,
    className = "",
    ...rest
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };

    const inputType = type === "password" && isPasswordVisible ? "text" : type;

    return (
        <div>
            <label
                htmlFor={name}
                className="block text-xs font-medium text-[#9499a4] mb-1"
            >
                {label}
            </label>
            {/* ---  Contenedor relativo para posicionar el icono --- */}
            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={inputType}
                    placeholder={placeholder}
                    className={`w-full px-3 py-2.5 text-sm border rounded-md
                        focus:outline-none focus:ring-1 text-[#9499a4]
                        disabled:cursor-not-allowed
                        ${error ? "border-sa-danger" : "border-[#E3EBF6]"}
                        ${rest.disabled && !className.includes("bg-")
                            ? "bg-gray-100"
                            : "bg-white"
                        }
                        ${type === "password" ? "pr-10" : ""} 
                        ${className}`}
                    {...register}
                    {...rest}
                />
                {/* ---  Botón para mostrar/ocultar contraseña --- */}
                {type === "password" && (
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        title={
                            isPasswordVisible ? "Ocultar contraseña" : "Mostrar contraseña"
                        }
                    >
                        {isPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
            {error && <p className="mt-1 text-xs text-sa-danger">{error}</p>}
        </div>
    );
};

export default Input;
