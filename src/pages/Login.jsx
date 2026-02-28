import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logoUnid from "../assets/UNID_BLANCO.png";
import fondoCRM from "../assets/FONDO_CRM.png";

function Login() {

    const [rol, setRol] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [recordarme, setRecordarme] = useState(false);
    const [mostrarContrasena, setMostrarContrasena] = useState(false);
    const [errores, setErrores] = useState({});
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const validarFormulario = () => {
        const nuevosErrores = {};

        if (!rol) {
            nuevosErrores.rol = "Debes seleccionar un rol";
        }

        if (!correo) {
            nuevosErrores.correo = "El correo es obligatorio";
        } else if (!correo.includes("@") || !correo.includes(".")) {
            nuevosErrores.correo = "Ingresa un correo válido";
        }

        if (!contrasena) {
            nuevosErrores.contrasena = "La contraseña es obligatoria";
        } else if (contrasena.length < 6) {
            nuevosErrores.contrasena = "Mínimo 6 caracteres";
        }

        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validarFormulario()) {
            setCargando(true);

            setTimeout(() => {
                setCargando(false);
                navigate("/dashboard");
            }, 1500);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <img
                src={fondoCRM}
                alt="Campus Universitario"
                className="fixed inset-0 w-full h-full object-cover"
            />
            
            <div className="fixed inset-0 bg-[#1a1a32]/80"></div>

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-start items-center w-full max-w-6xl gap-8 lg:gap-16 lg:pt-16">
                
                <div className="hidden lg:flex flex-1 flex-col items-start text-white">
                    <img
                        src={logoUnid}
                        alt="Logo UNID"
                        className="w-64 h-auto -ml-2"
                    />

                    <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
                        CRM Universitario
                    </h1>

                    <div className="w-24 h-1 bg-[#f0c02f] mb-6"></div>

                    <p className="text-2xl lg:text-3xl text-gray-300 mb-6">
                        Universidad UNID
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-12 h-0.5 bg-[#f0c02f]"></div>
                        <span className="uppercase tracking-widest text-base lg:text-lg text-[#f0c02f] font-semibold">
                            Formando con valores
                        </span>
                    </div>
                </div>

                <div className="w-full max-w-md">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8">
                        
                        <div className="lg:hidden flex justify-center mb-6">
                            <img
                                src={logoUnid}
                                alt="Logo UNID"
                                className="w-40 h-auto"
                            />
                        </div>

                        <div className="mb-8 text-center lg:text-left">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                Iniciar sesión
                            </h2>
                            <p className="text-gray-500">
                                Acceso institucional al CRM
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rol
                                </label>
                                <select
                                    value={rol}
                                    onChange={(e) => setRol(e.target.value)}
                                    className={`w-full px-4 py-3 rounded-lg border ${
                                        errores.rol ? "border-red-500" : "border-gray-300"
                                    } focus:ring-2 focus:ring-[#1a1a32] focus:border-transparent outline-none transition-all duration-200 bg-white`}
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="asesor">Asesor</option>
                                </select>
                                {errores.rol && (
                                    <p className="mt-1 text-sm text-red-500">{errores.rol}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo institucional
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="email"
                                        value={correo}
                                        onChange={(e) => setCorreo(e.target.value)}
                                        placeholder="usuario@red.unid.mx"
                                        className={`w-full pl-12 pr-4 py-3 rounded-lg border ${
                                            errores.correo ? "border-red-500" : "border-gray-300"
                                        } focus:ring-2 focus:ring-[#1a1a32] focus:border-transparent outline-none transition-all duration-200`}
                                    />
                                </div>
                                {errores.correo && (
                                    <p className="mt-1 text-sm text-red-500">{errores.correo}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contraseña
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                    <input
                                        type={mostrarContrasena ? "text" : "password"}
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        placeholder="Ingresa tu contraseña"
                                        className={`w-full pl-12 pr-12 py-3 rounded-lg border ${
                                            errores.contrasena ? "border-red-500" : "border-gray-300"
                                        } focus:ring-2 focus:ring-[#1a1a32] focus:border-transparent outline-none transition-all duration-200`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setMostrarContrasena(!mostrarContrasena)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                    >
                                        {mostrarContrasena ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                                <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                {errores.contrasena && (
                                    <p className="mt-1 text-sm text-red-500">{errores.contrasena}</p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={recordarme}
                                        onChange={(e) => setRecordarme(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 accent-[#1a1a32] focus:ring-[#1a1a32]"
                                    />
                                    <span className="text-sm text-gray-600">Recordarme</span>
                                </label>
                                <a
                                    href="#"
                                    className="text-sm text-[#f0c02f] hover:text-[#d4a82a] transition-colors font-medium"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={cargando}
                                className="w-full py-3 bg-[#1a1a32] text-white font-semibold rounded-lg hover:bg-[#2d2d4a] focus:ring-4 focus:ring-[#1a1a32]/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                            >
                                {cargando ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Ingresando...
                                    </span>
                                ) : (
                                    "Ingresar"
                                )}
                            </button>
                        </form>

                        <p className="mt-6 text-center text-xs text-gray-400">
                            © 2025 Universidad UNID. Todos los derechos reservados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;