import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("token", "fake-token");
        navigate("/dashboard");
    };

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/Bg Auth.png')" }}>
            <div
                className="w-full max-w-md p-8 rounded-2xl shadow-xl border border-white/10 backdrop-blur-md"
                style={{
                    background: "radial-gradient(100% 100% at 50.08% 0%, #37383C 0%, #141514 100%)",
                }}
            >
                <div className="flex flex-col items-center mb-6">
                    <div className="flex">
                        <img
                            src="/SDG logo.png"
                            alt="SDG Logo"
                            className="h-16 mb-2"
                        />
                        <img
                            src="/SDG logo 2.png"
                            alt="SDG Logo"
                            className="h-16 mb-2"
                        />
                    </div>
                    <h2 className="
                        font-raleway
                        font-bold
                        text-[23px]
                        leading-[27.56px]
                        tracking-[0.14px]
                        text-center
                        text-white
                        "
                    >
                        Accede al sistema
                    </h2>
                    <p className="
                        font-raleway
                        font-medium
                        text-[20px]
                        leading-[27.56px]
                        tracking-[0.14px]
                        text-center
                        text-white
                        "
                    >
                        Ingresa tus datos para continuar</p>
                </div>

                <form className="space-y-4">
                    <label htmlFor="rfc" className="font-raleway font-medium text-[14px] leading-[26px] tracking-[0.14px] align-middle text-white">RFC</label>
                    <div className="flex items-center bg-black/50 border border-gray-700 rounded-xl overflow-hidden">
                        <div className="flex items-center px-3">
                            <img
                                src="/icons/email.png"
                                alt="Email"
                                className="w-4 h-4 text-gray-400"
                            />
                        </div>

                        <div className="w-px h-6 bg-gray-600" />

                        <input
                            name="rfc"
                            type="text"
                            placeholder="Escribe aquí"
                            className="flex-1 px-3 py-2 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <label htmlFor="password" className="font-raleway font-medium text-[14px] leading-[26px] tracking-[0.14px] align-middle text-white">Contraseña</label>

                    <div className="flex items-center bg-black/50 border border-gray-700 rounded-xl overflow-hidden">
                        <div className="flex items-center px-3">
                            <img
                                src="/icons/password.png"
                                alt="Password"
                                className="w-4 h-4 text-gray-400"
                            />
                        </div>

                        <div className="w-px h-6 bg-gray-600" />

                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="••••••••"
                            className="flex-1 px-3 py-2 bg-black/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="px-3 text-gray-400 hover:text-gray-200 bg-transparent border-none outline-none rounded-none cursor-pointer"
                            style={{ background: 'transparent' }}
                        >
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>

                    </div>



                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 text-gray-300 cursor-pointer">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                />
                                <div className="w-10 h-5 bg-gray-600 rounded-full peer-checked:bg-blue-500 transition-colors" />
                                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
                            </div>
                            <span>Recordármela</span>
                        </label>
                        <Link to="/reset-password" className="text-[#6F6F6F] hover:underline">
                            ¿Olvidaste contraseña?
                        </Link>
                    </div>

                    {/* Botón */}
                    <button
                        type="button"
                        onClick={handleLogin}
                        className="w-full bg-[#FFFFFF] text-[#3F3F3F] font-semibold py-2 rounded-xl"
                    >
                        Entrar
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    Grupo SDG © 2025
                </p>
            </div>
        </div>
    );
}
