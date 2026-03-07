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
    const [cargando, setCargando] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Solo verificamos que no estén vacíos
        if (!rol || !correo || !contrasena) {
            alert("Completa todos los campos");
            return;
        }

        setCargando(true);

        setTimeout(() => {
            setCargando(false);

            // 🔐 Simulación de autenticación
            localStorage.setItem("auth", "true");
            localStorage.setItem("rol", rol);

            navigate("/dashboard");
        }, 1000);
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
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                >
                                    <option value="">Selecciona un rol</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="asesor">Asesor</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Correo institucional
                                </label>
                                <input
                                    type="email"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    placeholder="usuario@red.unid.mx"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Contraseña
                                </label>
                                <input
                                    type={mostrarContrasena ? "text" : "password"}
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    placeholder="Ingresa tu contraseña"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={cargando}
                                className="w-full py-3 bg-[#1a1a32] text-white font-semibold rounded-lg hover:bg-[#2d2d4a] transition-all duration-200"
                            >
                                {cargando ? "Ingresando..." : "Ingresar"}
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