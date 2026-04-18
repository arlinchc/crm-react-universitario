import { useState } from "react";

const CARRERAS = [
  "Business Administration",
  "Public Accounting",
  "Law",
  "Systems Engineering",
  "Psychology",
  "Marketing",
  "Architecture",
  "Medicine",
];

function LeadFormModal({ isOpen, onClose }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    program_interest: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.full_name || !form.email) {
      setError("Nombre y correo son obligatorios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://crm-react-universitario.onrender.com/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          status: "Prospect",
          advisor: null,
        }),
      });

      if (!res.ok) throw new Error("Error del servidor");

      setSuccess(true);
      setForm({ full_name: "", email: "", phone: "", program_interest: "" });

    } catch (err) {
      setError("No se pudo enviar. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setError("");
    setForm({ full_name: "", email: "", phone: "", program_interest: "" });
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed", inset: 0, zIndex: 1000,
          background: "rgba(10,10,25,0.75)",
          backdropFilter: "blur(6px)",
          animation: "fadeIn 0.2s ease both",
        }}
      />

      {/* Modal */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 1001,
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1rem",
        animation: "fadeUp 0.3s ease both",
      }}>
        <div style={{
          background: "#20203e",
          border: "1px solid rgba(240,192,47,0.2)",
          borderRadius: 20,
          padding: "2.5rem",
          width: "100%", maxWidth: 480,
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 60px rgba(240,192,47,0.07)",
          position: "relative",
        }}>

          {/* Botón cerrar */}
          <button onClick={handleClose} style={{
            position: "absolute", top: "1.2rem", right: "1.2rem",
            background: "rgba(255,255,255,0.06)", border: "none",
            borderRadius: 8, width: 32, height: 32,
            color: "rgba(255,255,255,0.5)", cursor: "pointer",
            fontSize: "1.1rem", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
            onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
          >✕</button>

          {/* ── ESTADO ÉXITO ── */}
          {success ? (
            <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
              <div style={{
                width: 64, height: 64, borderRadius: "50%",
                background: "rgba(240,192,47,0.15)",
                border: "2px solid rgba(240,192,47,0.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 1.5rem", fontSize: "1.8rem",
              }}>✓</div>
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "1.5rem", color: "#fff", marginBottom: "0.75rem",
              }}>¡Registro exitoso!</h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.9rem", lineHeight: 1.6 }}>
                Nos pondremos en contacto contigo muy pronto.
              </p>
              <button onClick={handleClose} style={{
                marginTop: "2rem",
                background: "linear-gradient(135deg, #f0c02f, #ffd040)",
                color: "#1a1a32", border: "none", borderRadius: 10,
                padding: "0.75rem 2rem", fontWeight: 700,
                fontSize: "0.9rem", cursor: "pointer",
              }}>Cerrar</button>
            </div>

          ) : (
            /* ── FORMULARIO ── */
            <>
              {/* Header */}
              <div style={{ marginBottom: "2rem" }}>
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: "0.4rem",
                  background: "rgba(240,192,47,0.10)",
                  border: "1px solid rgba(240,192,47,0.2)",
                  borderRadius: 100, padding: "0.3rem 0.9rem",
                  marginBottom: "1rem",
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f0c02f", display: "inline-block" }} />
                  <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "#f0c02f", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                    Solicitud de información
                  </span>
                </div>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.6rem", fontWeight: 700,
                  color: "#fff", lineHeight: 1.2,
                }}>
                  ¡Comienza tu historia<br />
                  <span style={{ color: "#f0c02f" }}>de éxito hoy!</span>
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                {[
                  { name: "full_name",  label: "Nombre completo", type: "text",  placeholder: "Ej. María González" },
                  { name: "email",      label: "Correo electrónico", type: "email", placeholder: "tucorreo@email.com" },
                  { name: "phone",      label: "Teléfono", type: "tel",   placeholder: "55 1234 5678" },
                ].map((field) => (
                  <div key={field.name} style={{ marginBottom: "1.1rem" }}>
                    <label style={{
                      display: "block", fontSize: "0.78rem", fontWeight: 600,
                      color: "rgba(255,255,255,0.65)", marginBottom: "0.4rem",
                      letterSpacing: "0.04em",
                    }}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      style={{
                        width: "100%", padding: "0.75rem 1rem",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 10, color: "#fff",
                        fontSize: "0.9rem", outline: "none",
                        transition: "border-color 0.2s",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(240,192,47,0.5)"}
                      onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                    />
                  </div>
                ))}

                {/* Select carrera */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{
                    display: "block", fontSize: "0.78rem", fontWeight: 600,
                    color: "rgba(255,255,255,0.65)", marginBottom: "0.4rem",
                    letterSpacing: "0.04em",
                  }}>Carrera de interés</label>
                  <select
                    name="program_interest"
                    value={form.program_interest}
                    onChange={handleChange}
                    style={{
                      width: "100%", padding: "0.75rem 1rem",
                      background: "#2a2a4a",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 10, color: form.program_interest ? "#fff" : "rgba(255,255,255,0.35)",
                      fontSize: "0.9rem", outline: "none", cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                    onFocus={e => e.target.style.borderColor = "rgba(240,192,47,0.5)"}
                    onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
                  >
                    <option value="">Selecciona una carrera</option>
                    {CARRERAS.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                {/* Error */}
                {error && (
                  <div style={{
                    background: "rgba(255,80,80,0.1)", border: "1px solid rgba(255,80,80,0.3)",
                    borderRadius: 8, padding: "0.6rem 1rem",
                    color: "#ff8080", fontSize: "0.82rem", marginBottom: "1rem",
                  }}>{error}</div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    width: "100%",
                    background: loading ? "rgba(240,192,47,0.4)" : "linear-gradient(135deg, #f0c02f, #ffd040)",
                    color: "#1a1a32", border: "none", borderRadius: 10,
                    padding: "0.9rem", fontWeight: 700, fontSize: "1rem",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "all 0.25s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  {loading ? "Enviando..." : "Quiero más información →"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default LeadFormModal;