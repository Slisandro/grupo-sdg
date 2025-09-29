import React, { useState } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";
import { Upload } from "lucide-react";

interface FileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    name: string;
    register?: UseFormRegisterReturn;
    error?: string;
    classNameLabel?: string;
    classNameContainer?: string;
}

const FileInput: React.FC<FileInputProps> = ({
    label,
    name,
    register,
    error,
    classNameLabel = "",
    classNameContainer = "",
    ...rest
}) => {
    const [fileName, setFileName] = useState<string>("");

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files[0].name);
        } else {
            setFileName("");
        }
    };

    return (
        <div className={classNameContainer}>
            <label
                htmlFor={name}
                className={`block text-xs mb-1 ${classNameLabel}`}
            >
                {label}
            </label>

            <label className="relative flex items-center w-full border rounded-md p-[4px] text-sm cursor-pointer
                bg-white hover:border-gray-400 border-[#E3EBF6] justify-between">

                <span className="flex items-center gap-2 px-3 py-1 rounded-[4px] bg-[#E1F5FE] text-[#04A9F5]">
                    <Upload size={14} color="#04A9F5" />
                    {fileName || "Subir archivo"}
                </span>

                <input
                    id={name}
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    {...register}
                    {...rest}
                />
            </label>

            {error && <p className="mt-1 text-xs text-sa-danger">{error}</p>}
        </div>
    );
};

export default FileInput;
