"use client";

import { useState, useRef } from "react";

function sanitize(value: string, maxLen = 2000): string {
  return value.replace(/<[^>]*>/g, "").replace(/[^\p{L}\p{N}\s.,!?@'"\-_()+:/\n]/gu, "").trim().slice(0, maxLen);
}
function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

type Status = "idle" | "sending" | "success" | "error";

const msgs: Record<string, {
  sectionTag: string; heading: string; sub: string; timezone: string;
  namePlaceholder: string; emailPlaceholder: string; messagePlaceholder: string;
  submit: string; sending: string; successMsg: string; errorMsg: string;
  whatsappCta: string; nameLabel: string; emailLabel: string; messageLabel: string;
  nameError: string; emailError: string; messageError: string; orLabel: string;
}> = {
  es: {
    sectionTag: "Contacto", heading: "Tienes un proyecto?", sub: "Cuentame de tu negocio. Una llamada de 15 minutos alcanza para ver si puedo ayudarte.",
    timezone: "Bolivia UTC-4", namePlaceholder: "Tu nombre", emailPlaceholder: "Tu correo",
    messagePlaceholder: "Cuentame de tu proyecto...", submit: "Enviar", sending: "Enviando...",
    successMsg: "Mensaje enviado. Te respondo pronto.", errorMsg: "Algo fallo. Escribeme por WhatsApp.",
    whatsappCta: "WhatsApp +591 77258517", nameLabel: "Nombre", emailLabel: "Email", messageLabel: "Mensaje",
    nameError: "Nombre requerido (min. 2 caracteres)", emailError: "Correo invalido", messageError: "Mensaje muy corto (min. 10 caracteres)",
    orLabel: "O directamente",
  },
  en: {
    sectionTag: "Contact", heading: "Got a project?", sub: "Tell me about your business. A 15-minute call is enough to understand what you need.",
    timezone: "Bolivia UTC-4", namePlaceholder: "Your name", emailPlaceholder: "Your email",
    messagePlaceholder: "Tell me about your project...", submit: "Send", sending: "Sending...",
    successMsg: "Message sent. I'll get back to you soon.", errorMsg: "Something failed. Write me on WhatsApp.",
    whatsappCta: "WhatsApp +591 77258517", nameLabel: "Name", emailLabel: "Email", messageLabel: "Message",
    nameError: "Name required (min. 2 chars)", emailError: "Invalid email", messageError: "Message too short (min. 10 chars)",
    orLabel: "Or directly",
  },
};

const inputBase: React.CSSProperties = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(12,11,9,0.2)",
  color: "var(--ink)",
  padding: "0.75rem 0",
  fontSize: "0.97rem",
  fontFamily: "var(--font-text)",
  outline: "none",
  transition: "border-color 0.2s",
};
const labelBase: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "0.6rem",
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "rgba(12,11,9,0.4)",
  marginBottom: "0.25rem",
};

export default function ContactSection({ locale }: { locale: string }) {
  const t = msgs[locale] ?? msgs.es;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const waUrl = `https://wa.me/59177258517?text=${encodeURIComponent(locale === "es" ? "Hola Yamil, me gustaria hablar sobre un proyecto." : "Hi Yamil, I'd like to talk about a project.")}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honey) return;
    const safeName = sanitize(name, 100);
    const safeEmail = sanitize(email, 200);
    const safeMessage = sanitize(message, 2000);
    const errors: Record<string, string> = {};
    if (!safeName || safeName.length < 2) errors.name = t.nameError;
    if (!validateEmail(safeEmail)) errors.email = t.emailError;
    if (!safeMessage || safeMessage.length < 10) errors.message = t.messageError;
    if (Object.keys(errors).length > 0) { setFieldErrors(errors); return; }
    setFieldErrors({});
    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/elyamilalarcon.111@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `[Portfolio Web] Nuevo mensaje de ${safeName}`,
          _template: "table",
          _captcha: "false",
          Nombre: safeName,
          Email: safeEmail,
          Mensaje: safeMessage,
        }),
      });
      if (res.ok) { setStatus("success"); setName(""); setEmail(""); setMessage(""); }
      else throw new Error("Failed");
    } catch { setStatus("error"); }
  };

  return (
    <section
      id="contacto"
      className="grain grain-paper"
      style={{
        position: "relative",
        overflow: "hidden",
        background: "var(--paper)",
        color: "var(--fg-dark)",
        borderTop: "1px solid rgba(12,11,9,0.12)",
      }}
    >
      {/* Ghost text de fondo */}
      <span className="ghost-text ghost-text-dark" style={{ top: "-2rem", right: "-3rem" }}>
        TALK
      </span>

      {/* Linea arquitectonica sutil */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          width: "1px",
          height: "100%",
          background: "rgba(12,11,9,0.04)",
          pointerEvents: "none",
        }}
      />

      <div className="section-pad" style={{ position: "relative", zIndex: 1, maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}>
        <span className="kicker" style={{ color: "var(--ink)" }}>{t.sectionTag}</span>
        <div style={{ width: "clamp(3rem, 8vw, 7rem)", height: 2, background: "var(--ink)", opacity: 0.35, marginBottom: "1.5rem" }} />

        {/* Heading grande */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 8vw, 7rem)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: "1.5rem",
        }}>
          {t.heading}
        </h2>

        <p style={{ fontFamily: "var(--font-text)", fontSize: "1.05rem", color: "#4d453b", lineHeight: 1.7, maxWidth: "52ch", marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
          {t.sub}
        </p>

        {/* Dos columnas: form izq, contacto directo der */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "clamp(3rem, 7vw, 7rem)", alignItems: "flex-start" }}>

          {/* Formulario — editorial con lineas limpias */}
          <div
            style={{
              background: "rgba(255, 255, 255, 0.45)",
              border: "1px solid rgba(12, 11, 9, 0.1)",
              padding: "clamp(1.5rem, 3.5vw, 2.75rem)",
              boxShadow: "0 10px 30px rgba(12, 11, 9, 0.04)",
            }}
          >
            <form
              onSubmit={handleSubmit}
              noValidate
              aria-label={locale === "es" ? "Formulario de contacto" : "Contact form"}
            >
              <div aria-hidden="true" style={{ display: "none" }}>
                <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={e => setHoney(e.target.value)} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "2.25rem" }}>
                <div>
                  <label htmlFor="cf-name" style={labelBase}>{t.nameLabel}</label>
                  <input id="cf-name" type="text" autoComplete="name" placeholder={t.namePlaceholder} required value={name} onChange={e => setName(e.target.value)}
                    style={{ ...inputBase, borderBottomColor: fieldErrors.name ? "#cc2200" : undefined }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = "var(--ink)"; }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.name ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                    aria-describedby={fieldErrors.name ? "cf-name-error" : undefined} aria-invalid={!!fieldErrors.name}
                  />
                  {fieldErrors.name && <p id="cf-name-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.name}</p>}
                </div>

                <div>
                  <label htmlFor="cf-email" style={labelBase}>{t.emailLabel}</label>
                  <input id="cf-email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required value={email} onChange={e => setEmail(e.target.value)}
                    style={{ ...inputBase, borderBottomColor: fieldErrors.email ? "#cc2200" : undefined }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = "var(--ink)"; }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.email ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                    aria-describedby={fieldErrors.email ? "cf-email-error" : undefined} aria-invalid={!!fieldErrors.email}
                  />
                  {fieldErrors.email && <p id="cf-email-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.email}</p>}
                </div>

                <div>
                  <label htmlFor="cf-message" style={labelBase}>{t.messageLabel}</label>
                  <textarea id="cf-message" rows={4} placeholder={t.messagePlaceholder} required value={message} onChange={e => setMessage(e.target.value)}
                    style={{ ...inputBase, resize: "none", borderBottomColor: fieldErrors.message ? "#cc2200" : undefined }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = "var(--ink)"; }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.message ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                    aria-describedby={fieldErrors.message ? "cf-message-error" : undefined} aria-invalid={!!fieldErrors.message}
                  />
                  {fieldErrors.message && <p id="cf-message-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.message}</p>}
                </div>

                <button type="submit" className="btn btn-fill" disabled={status === "sending"}
                  style={{
                    justifyContent: "center",
                    width: "100%",
                    background: "var(--ink)",
                    color: "var(--paper)",
                    borderColor: "var(--ink)",
                    cursor: "pointer",
                    padding: "1rem 1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#1f1d19";
                    e.currentTarget.style.borderColor = "var(--ink)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "var(--ink)";
                  }}
                >
                  <span>{status === "sending" ? t.sending : t.submit}</span>
                  <span style={{ fontSize: "1rem", lineHeight: 1 }}>&rarr;</span>
                </button>

                {status === "success" && (
                  <div role="status" style={{ padding: "0.85rem", background: "rgba(42, 122, 42, 0.1)", border: "1px solid #2a7a2a", borderRadius: "3px" }}>
                    <p style={{ color: "#1a5a1a", fontSize: "0.82rem", fontFamily: "var(--font-mono)", margin: 0 }}>✓ {t.successMsg}</p>
                  </div>
                )}
                {status === "error" && (
                  <div role="alert" style={{ padding: "0.85rem", background: "rgba(204, 34, 0, 0.08)", border: "1px solid #cc2200", borderRadius: "3px" }}>
                    <p style={{ color: "#cc2200", fontSize: "0.82rem", fontFamily: "var(--font-mono)", marginBottom: "0.6rem" }}>{t.errorMsg}</p>
                    <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill" style={{ display: "inline-flex", fontSize: "0.7rem", padding: "0.4rem 0.8rem" }}>{t.whatsappCta}</a>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Canales directos e Info lateral */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            
            {/* Disponibilidad pill */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 0.85rem",
                background: "rgba(12, 11, 9, 0.06)",
                border: "1px solid rgba(12, 11, 9, 0.12)",
                borderRadius: "3px",
                width: "fit-content",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#16a34a",
                  boxShadow: "0 0 8px rgba(22, 163, 74, 0.6)",
                }}
              />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink)", fontWeight: 600 }}>
                {locale === "es" ? "DISPONIBLE PARA CONTRATACIÓN" : "AVAILABLE FOR CONTRACT"}
              </span>
            </div>

            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.64rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(12,11,9,0.5)", marginTop: "0.5rem" }}>
              {t.orLabel}
            </p>

            {/* Direct contact cards with SVG icons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
              {[
                {
                  label: "WhatsApp",
                  value: "+591 77258517",
                  sub: locale === "es" ? "Respuesta inmediata" : "Instant reply",
                  href: waUrl,
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#16a34a" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.36c0-4.54 3.7-8.24 8.24-8.24zm-3.52 4.43c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.43s1.02 2.82 1.16 3.01c.14.19 1.99 3.12 4.9 4.25 2.42.94 2.91.75 3.44.71.53-.05 1.71-.7 1.95-1.37.24-.67.24-1.25.17-1.37-.07-.12-.26-.19-.55-.34s-1.71-.85-1.98-.95c-.26-.09-.46-.14-.65.14-.19.29-.74.95-.91 1.14-.17.19-.34.22-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.5.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.08-.14-.65-1.63-.91-2.22-.25-.6-.5-.51-.69-.52l-.58-.01z" />
                    </svg>
                  ),
                },
                {
                  label: "Email",
                  value: "elyamilalarcon.111@gmail.com",
                  sub: locale === "es" ? "Propuestas y contratos" : "RFPs & contracts",
                  href: "mailto:elyamilalarcon.111@gmail.com",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  value: "yamil-alarcon-romero",
                  sub: locale === "es" ? "Perfil profesional" : "Professional profile",
                  href: "https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/",
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  ),
                },
              ].map(({ label, value, sub, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "1rem 1.25rem",
                    background: "rgba(255, 255, 255, 0.4)",
                    border: "1px solid rgba(12, 11, 9, 0.1)",
                    textDecoration: "none",
                    color: "inherit",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.borderColor = "var(--ink)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = "rgba(255, 255, 255, 0.4)";
                    e.currentTarget.style.borderColor = "rgba(12, 11, 9, 0.1)";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {icon}
                    </div>
                    <div>
                      <span style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "0.58rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(12,11,9,0.4)" }}>
                        {label} &middot; {sub}
                      </span>
                      <span style={{ display: "block", fontFamily: "var(--font-text)", fontSize: "0.92rem", color: "var(--ink)", fontWeight: 600 }}>
                        {value}
                      </span>
                    </div>
                  </div>
                  <span style={{ color: "var(--ink)", fontSize: "0.9rem" }}>&rarr;</span>
                </a>
              ))}
            </div>

            {/* Location & timezone badge */}
            <div
              style={{
                marginTop: "0.75rem",
                padding: "1rem 1.25rem",
                borderLeft: "2px solid var(--ink)",
                background: "rgba(12,11,9,0.03)",
              }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", margin: 0, fontWeight: 600 }}>
                {t.timezone} &middot; Cochabamba & La Paz
              </p>
              <p style={{ fontFamily: "var(--font-text)", fontSize: "0.82rem", color: "#5a5248", margin: "0.3rem 0 0 0" }}>
                {locale === "es" ? "Llamadas de descubrimiento por Google Meet o Zoom disponibles." : "Discovery calls via Google Meet or Zoom available."}
              </p>
            </div>
          </div>
        </div>
      </div>


      <style>{`
        @media (max-width: 768px) {
          #contacto [style*="grid-template-columns: 3fr"] { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  );
}
