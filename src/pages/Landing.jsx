import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────
   ESTILOS GLOBALES
───────────────────────────────────────── */
const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --yellow: #f0c02f;
    --yellow-glow: rgba(240,192,47,0.25);
    --yellow-dim: rgba(240,192,47,0.10);
    --yellow-mid: rgba(240,192,47,0.35);
    --navy: #1a1a32;
    --navy-mid: #20203e;
    --navy-light: #2a2a4a;
    --navy-border: rgba(255,255,255,0.07);
    --text-primary: #ffffff;
    --text-secondary: rgba(255,255,255,0.60);
    --text-muted: rgba(255,255,255,0.35);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    --radius: 16px;
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: var(--font-body);
    background: var(--navy);
    color: var(--text-primary);
    overflow-x: hidden;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--navy-light); border-radius: 3px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes pulse-ring {
    0%   { transform: scale(1);   opacity: 0.6; }
    100% { transform: scale(1.6); opacity: 0; }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-12px) rotate(2deg); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  .anim-fade-up { animation: fadeUp 0.7s var(--transition) both; }
  .delay-1 { animation-delay: 0.1s; }
  .delay-2 { animation-delay: 0.2s; }
  .delay-3 { animation-delay: 0.3s; }
  .delay-4 { animation-delay: 0.45s; }
  .delay-5 { animation-delay: 0.6s; }
`;

/* ─────────────────────────────────────────
   DATOS
───────────────────────────────────────── */
const BENEFITS = [
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Gestión de Prospectos",
    desc: "Registra, organiza y da seguimiento a cada prospecto desde el primer contacto hasta su inscripción definitiva.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Reportes Estratégicos",
    desc: "Visualiza métricas clave por carrera y asesor. Toma decisiones basadas en datos, no en suposiciones.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Acceso Seguro por Roles",
    desc: "Directivos, coordinadores y asesores tienen acceso diferenciado. La información correcta para cada quien.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Seguimiento en Tiempo Real",
    desc: "Monitorea el ciclo completo: prospecto → contactado → confirmado → inscrito, sin perder ningún paso.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M18 20V10M12 20V4M6 20v-6" />
      </svg>
    ),
    title: "Indicadores de Conversión",
    desc: "Identifica cuellos de botella en el embudo de captación y optimiza la estrategia de cada asesor.",
  },
  {
    icon: (
      <svg
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        viewBox="0 0 24 24"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Configuración Institucional",
    desc: "Administra carreras, estados del proceso, notificaciones y permisos desde un panel centralizado.",
  },
];

const STEPS = [
  {
    num: "01",
    label: "Registro de Prospecto",
    sub: "El interesado llena el formulario público.",
  },
  {
    num: "02",
    label: "Asignación de Asesor",
    sub: "El sistema notifica y asigna automáticamente.",
  },
  {
    num: "03",
    label: "Seguimiento Activo",
    sub: "El asesor registra cada interacción.",
  },
  {
    num: "04",
    label: "Inscripción Confirmada",
    sub: "El prospecto se convierte en alumno UNID.",
  },
];

/* ─────────────────────────────────────────
   SECCIONES
───────────────────────────────────────── */
function Hero({ onLogin }) {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "0 2rem",
      }}
    >
      {/* Fondo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, #2a2a50 0%, var(--navy) 70%)",
        }}
      />
      {/* Grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
          linear-gradient(rgba(240,192,47,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(240,192,47,0.04) 1px, transparent 1px)
        `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Orbs decorativos */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "8%",
          width: 320,
          height: 320,
          background:
            "radial-gradient(circle, rgba(240,192,47,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(40px)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "10%",
          width: 240,
          height: 240,
          background:
            "radial-gradient(circle, rgba(240,192,47,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
          filter: "blur(30px)",
          animation: "float 10s ease-in-out infinite reverse",
        }}
      />

      {/* Contenido */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          maxWidth: 780,
        }}
      >
        {/* Logo institucional */}
        <div
          className="anim-fade-up delay-1"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            marginBottom: "2.5rem",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "linear-gradient(135deg, #f0c02f 0%, #d4a820 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 30px rgba(240,192,47,0.35)",
            }}
          >
            <svg
              width="28"
              height="28"
              fill="none"
              stroke="#1a1a32"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>
          <div style={{ textAlign: "left" }}>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 900,
                fontSize: "1.4rem",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              UNID <span style={{ color: "var(--yellow)" }}>CRM</span>
            </div>
            <div
              style={{
                fontSize: "0.62rem",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Sistema Universitario
            </div>
          </div>
        </div>

        {/* Badge */}
        <div
          className="anim-fade-up delay-2"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--yellow-dim)",
            border: "1px solid rgba(240,192,47,0.25)",
            borderRadius: 100,
            padding: "0.35rem 1rem",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "var(--yellow)",
              boxShadow: "0 0 8px var(--yellow)",
              display: "inline-block",
              animation: "pulse-ring 1.8s ease-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "var(--yellow)",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Sistema de Gestión Universitaria
          </span>
        </div>

        {/* Headline */}
        <h1
          className="anim-fade-up delay-3"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2.6rem, 6vw, 4.8rem)",
            lineHeight: 1.08,
            marginBottom: "1.5rem",
            color: "#fff",
          }}
        >
          Cada prospecto,
          <br />
          <span
            style={{
              background:
                "linear-gradient(135deg, #f0c02f 0%, #ffe066 50%, #d4a820 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animation: "shimmer 4s linear infinite",
            }}
          >
            una historia de éxito.
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="anim-fade-up delay-4"
          style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "var(--text-secondary)",
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 560,
            margin: "0 auto 3rem",
          }}
        >
          El CRM diseñado para que UNID gestione, acompañe e inscriba a sus
          prospectos con precisión institucional y visibilidad total.
        </p>

        {/* CTAs */}
        <div
          className="anim-fade-up delay-5"
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={onLogin}
            style={{
              background: "linear-gradient(135deg, #f0c02f 0%, #ffd040 100%)",
              color: "var(--navy)",
              border: "none",
              borderRadius: 12,
              padding: "0.9rem 2.4rem",
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "1rem",
              cursor: "pointer",
              transition: "all 0.25s",
              boxShadow: "0 4px 30px rgba(240,192,47,0.35)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow =
                "0 8px 40px rgba(240,192,47,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow =
                "0 4px 30px rgba(240,192,47,0.35)";
            }}
          >Acceder al CRM</button>

          <a
            href="#beneficios"
            style={{
              background: "transparent",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.18)",
              borderRadius: 12,
              padding: "0.9rem 2rem",
              fontFamily: "var(--font-body)",
              fontWeight: 500,
              fontSize: "1rem",
              cursor: "pointer",
              textDecoration: "none",
              transition: "all 0.25s",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
            }}
          >
            Ver beneficios
            <svg
              width="16"
              height="16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: "3rem",
            justifyContent: "center",
            marginTop: "4.5rem",
            paddingTop: "2.5rem",
            borderTop: "1px solid var(--navy-border)",
            flexWrap: "wrap",
            animation: "fadeUp 0.7s 0.75s both",
          }}
        >
          {[
            { val: "7", label: "Módulos Integrados" },
            { val: "100%", label: "Frontend Responsivo" },
            { val: "∞", label: "Prospectos a gestionar" },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 900,
                  fontSize: "2rem",
                  color: "var(--yellow)",
                  lineHeight: 1,
                }}
              >
                {stat.val}
              </div>
              <div
                style={{
                  fontSize: "0.78rem",
                  color: "var(--text-muted)",
                  marginTop: "0.3rem",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  const [hovered, setHovered] = useState(null);

  return (
    <section
      id="beneficios"
      style={{
        padding: "7rem 2rem",
        background: "var(--navy-mid)",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: 1,
          height: 80,
          background:
            "linear-gradient(to bottom, transparent, var(--yellow-mid))",
        }}
      />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.72rem",
              color: "var(--yellow)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            ¿Por qué UNID CRM?
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 700,
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              color: "#fff",
              lineHeight: 1.15,
              marginBottom: "1rem",
            }}
          >
            Todo lo que necesitas,
            <br />
            en un solo lugar.
          </h2>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1rem",
              maxWidth: 480,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Diseñado específicamente para el área de captación universitaria,
            sin complejidad innecesaria.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.2rem",
          }}
        >
          {BENEFITS.map((b, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background:
                  hovered === i
                    ? "linear-gradient(135deg, rgba(240,192,47,0.10) 0%, rgba(42,42,74,0.8) 100%)"
                    : "rgba(255,255,255,0.03)",
                border:
                  hovered === i
                    ? "1px solid rgba(240,192,47,0.30)"
                    : "1px solid var(--navy-border)",
                borderRadius: "var(--radius)",
                padding: "2rem",
                transition: "all 0.3s ease",
                cursor: "default",
                transform: hovered === i ? "translateY(-4px)" : "translateY(0)",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 12,
                  background:
                    hovered === i
                      ? "rgba(240,192,47,0.2)"
                      : "rgba(240,192,47,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--yellow)",
                  marginBottom: "1.2rem",
                  transition: "all 0.3s",
                }}
              >
                {b.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  color: "#fff",
                  marginBottom: "0.6rem",
                }}
              >
                {b.title}
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  fontSize: "0.88rem",
                  lineHeight: 1.7,
                }}
              >
                {b.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section
      style={{
        padding: "7rem 2rem",
        background: "var(--navy)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-10%",
          top: "50%",
          transform: "translateY(-50%)",
          width: 500,
          height: 500,
          background:
            "radial-gradient(circle, rgba(240,192,47,0.05) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "5rem",
            alignItems: "center",
          }}
        >
          {/* Texto */}
          <div>
            <div
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 600,
                fontSize: "0.72rem",
                color: "var(--yellow)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              El proceso completo
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                color: "#fff",
                lineHeight: 1.15,
                marginBottom: "1.2rem",
              }}
            >
              Del primer contacto
              <br />a la inscripción final.
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "0.95rem",
                lineHeight: 1.8,
                marginBottom: "2.5rem",
              }}
            >
              UNID CRM acompaña cada etapa del ciclo de vida del prospecto,
              asegurando que ninguna oportunidad se pierda y que cada asesor
              tenga visibilidad total de su cartera.
            </p>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "var(--yellow-dim)",
                border: "1px solid rgba(240,192,47,0.2)",
                borderRadius: 8,
                padding: "0.6rem 1rem",
                color: "var(--yellow)",
                fontSize: "0.82rem",
                fontWeight: 500,
              }}
            >
              <svg
                width="14"
                height="14"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              100% seguimiento garantizado
            </div>
          </div>

          {/* Pasos */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {STEPS.map((step, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: "1.2rem", position: "relative" }}
              >
                {i < STEPS.length - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "1.75rem",
                      top: "3.5rem",
                      width: 1,
                      height: "calc(100% - 0.5rem)",
                      background:
                        "linear-gradient(to bottom, rgba(240,192,47,0.4), rgba(240,192,47,0.05))",
                    }}
                  />
                )}
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    flexShrink: 0,
                    background:
                      "linear-gradient(135deg, rgba(240,192,47,0.15) 0%, rgba(240,192,47,0.05) 100%)",
                    border: "1px solid rgba(240,192,47,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-display)",
                    fontWeight: 900,
                    fontSize: "0.9rem",
                    color: "var(--yellow)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {step.num}
                </div>
                <div style={{ paddingBottom: "2rem" }}>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                      color: "#fff",
                      marginBottom: "0.3rem",
                      paddingTop: "0.9rem",
                    }}
                  >
                    {step.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.82rem",
                      color: "var(--text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AccessCTA({ onLogin }) {
  return (
    <section
      style={{
        padding: "6rem 2rem",
        background: "var(--navy-mid)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          height: 300,
          background:
            "radial-gradient(ellipse, rgba(240,192,47,0.12) 0%, transparent 70%)",
          filter: "blur(20px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            margin: "0 auto 2rem",
            background: "linear-gradient(135deg, #f0c02f 0%, #d4a820 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 40px rgba(240,192,47,0.4)",
          }}
        >
          <svg
            width="32"
            height="32"
            fill="none"
            stroke="#1a1a32"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            fontSize: "clamp(2rem, 4.5vw, 3.2rem)",
            color: "#fff",
            lineHeight: 1.1,
            marginBottom: "1.2rem",
          }}
        >
          ¿Listo para comenzar?
        </h2>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.05rem",
            lineHeight: 1.7,
            marginBottom: "3rem",
          }}
        >
          Accede al sistema con tus credenciales institucionales y empieza a
          gestionar prospectos con toda la precisión que UNID merece.
        </p>
        <button
          onClick={onLogin}
          style={{
            background: "linear-gradient(135deg, #f0c02f 0%, #ffd040 100%)",
            color: "var(--navy)",
            border: "none",
            borderRadius: 12,
            padding: "0.9rem 2.4rem",
            fontFamily: "var(--font-body)",
            fontWeight: 700,
            fontSize: "1rem",
            cursor: "pointer",
            transition: "all 0.25s",
            boxShadow: "0 4px 30px rgba(240,192,47,0.35)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 8px 40px rgba(240,192,47,0.5)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 4px 30px rgba(240,192,47,0.35)";
          }}
        >Acceder al CRM</button>
        <p
          style={{
            marginTop: "1.5rem",
            fontSize: "0.78rem",
            color: "var(--text-muted)",
          }}
        >
          Acceso exclusivo para personal UNID autorizado · Soporte institucional
          disponible
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer
      style={{
        background: "var(--navy)",
        padding: "2.5rem",
        borderTop: "1px solid var(--navy-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            background: "var(--yellow)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <svg
            width="15"
            height="15"
            fill="none"
            stroke="#1a1a32"
            strokeWidth="2.2"
            viewBox="0 0 24 24"
          >
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        </div>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "0.9rem",
            color: "#fff",
          }}
        >
          UNID <span style={{ color: "var(--yellow)" }}>CRM</span>
        </span>
      </div>
      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
        © {new Date().getFullYear()} Universidad UNID — Sistema de Gestión
        Universitaria · Módulo 8
      </div>
      <div style={{ display: "flex", gap: "1.5rem" }}>
        {["Privacidad", "Soporte", "Contacto"].map((l) => (
          <a
            key={l}
            href="#"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.color = "var(--yellow)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--text-muted)")}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────
   COMPONENTE PRINCIPAL
   - Sin CRMLayout
   - Sin Navbar
   - Export default directo
───────────────────────────────────────── */
function Landing() {
  useEffect(() => {
    const tag = document.createElement("style");
    tag.innerHTML = GLOBAL_STYLES;
    document.head.appendChild(tag);
    return () => document.head.removeChild(tag);
  }, []);

  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");

  return (
    <div>
       <Hero onLogin={handleLogin} />
      <Benefits />
      <HowItWorks />
      <AccessCTA onLogin={handleLogin} />
      <Footer />
    </div>
  );
}

export default Landing;
