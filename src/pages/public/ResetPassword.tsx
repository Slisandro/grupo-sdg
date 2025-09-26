import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
    const navigate = useNavigate();

    const handleChangePassword = () =>
        navigate("/change-password");

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="w-screen h-screen items-center justify-evenly bg-cover bg-center flex flex-col" style={{ backgroundImage: "url('/Bg Auth.png')" }}>
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
                        Recuperar contraseña
                    </h2>
                    <p className="
                        font-raleway
                        font-medium
                        text-[18px]
                        leading-[27.56px]
                        tracking-[0.14px]
                        text-center
                        text-white
                        "
                    >
                        Escribe tu correo y te enviaremos los pasos
                        para que puedas restablecer tu contraseña.
                    </p>
                </div>

                <form className="space-y-4">
                    <label htmlFor="rfc" className="font-raleway font-medium text-[14px] leading-[26px] tracking-[0.14px] align-middle text-white">Correo electrónico</label>
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

                    {/* Botón */}
                    <button
                        type="button"
                        onClick={handleChangePassword}
                        className="w-full bg-[#FFFFFF] text-[#3F3F3F] font-semibold py-2 rounded-xl"
                    >
                        Continuar
                    </button>

                    <button
                        type="button"
                        onClick={handleBack}
                        className="w-full bg-transparent text-[#FFFFFF] font-semibold py-2 rounded-xl border-[#999999] border-1"
                    >
                        Volver
                    </button>
                </form>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    Grupo SDG © 2025
                </p>
            </div>

            <img
                src="/SDG logo 2.png"
                alt="SDG Logo"
                className="h-16 mb-2"
            />
        </div>
    );
}
