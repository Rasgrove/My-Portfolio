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
        body: JSON.stringify({ _subject: `Portfolio — ${safeName}`, _captcha: "false", name: safeName, email: safeEmail, message: safeMessage }),
      });
      if (res.ok) { setStatus("success"); setName(""); setEmail(""); setMessage(""); }
      else throw new Error("Failed");
    } catch { setStatus("error"); }
  };

  return (
    <section id="contacto" style={{ background: "var(--paper)", color: "var(--fg-dark)" }}>
      <div className="section-pad" style={{ maxWidth: 1400, marginLeft: "auto", marginRight: "auto" }}>
        <span className="kicker" style={{ color: "var(--ink)" }}>{t.sectionTag}</span>

        {/* Heading grande */}
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontWeight: 900,
          fontSize: "clamp(2.8rem, 9vw, 8rem)",
          letterSpacing: "-0.04em",
          textTransform: "uppercase",
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: "3rem",
        }}>
          {t.heading}
        </h2>

        <p style={{ fontFamily: "var(--font-text)", fontSize: "1rem", color: "#5a5248", lineHeight: 1.7, maxWidth: "48ch", marginBottom: "clamp(3rem, 6vw, 5rem)" }}>
          {t.sub}
        </p>

        {/* Dos columnas: form izq, contacto directo der */}
        <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: "clamp(3rem, 8vw, 8rem)", alignItems: "flex-start" }}>

          {/* Formulario — sin bordes en campos, solo linea de fondo */}
          <form
            onSubmit={handleSubmit}
            noValidate
            aria-label={locale === "es" ? "Formulario de contacto" : "Contact form"}
          >
            <div aria-hidden="true" style={{ display: "none" }}>
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" value={honey} onChange={e => setHoney(e.target.value)} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <label htmlFor="cf-name" style={labelBase}>{t.nameLabel}</label>
                <input id="cf-name" type="text" autoComplete="name" placeholder={t.namePlaceholder} required value={name} onChange={e => setName(e.target.value)}
                  style={{ ...inputBase, borderBottomColor: fieldErrors.name ? "#ff3d00" : undefined }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = "rgba(12,11,9,0.65)"; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.name ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                  aria-describedby={fieldErrors.name ? "cf-name-error" : undefined} aria-invalid={!!fieldErrors.name}
                />
                {fieldErrors.name && <p id="cf-name-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.name}</p>}
              </div>

              <div>
                <label htmlFor="cf-email" style={labelBase}>{t.emailLabel}</label>
                <input id="cf-email" type="email" autoComplete="email" placeholder={t.emailPlaceholder} required value={email} onChange={e => setEmail(e.target.value)}
                  style={{ ...inputBase, borderBottomColor: fieldErrors.email ? "#ff3d00" : undefined }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = "rgba(12,11,9,0.65)"; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.email ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                  aria-describedby={fieldErrors.email ? "cf-email-error" : undefined} aria-invalid={!!fieldErrors.email}
                />
                {fieldErrors.email && <p id="cf-email-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.email}</p>}
              </div>

              <div>
                <label htmlFor="cf-message" style={labelBase}>{t.messageLabel}</label>
                <textarea id="cf-message" rows={4} placeholder={t.messagePlaceholder} required value={message} onChange={e => setMessage(e.target.value)}
                  style={{ ...inputBase, resize: "none", borderBottomColor: fieldErrors.message ? "#ff3d00" : undefined }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = "rgba(12,11,9,0.65)"; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = fieldErrors.message ? "#cc2200" : "rgba(12,11,9,0.2)"; }}
                  aria-describedby={fieldErrors.message ? "cf-message-error" : undefined} aria-invalid={!!fieldErrors.message}
                />
                {fieldErrors.message && <p id="cf-message-error" role="alert" style={{ color: "#cc2200", fontSize: "0.72rem", marginTop: "0.3rem", fontFamily: "var(--font-mono)" }}>{fieldErrors.message}</p>}
              </div>

              <button type="submit" className="btn" disabled={status === "sending"}
                style={{ justifyContent: "flex-start", width: "fit-content", background: "var(--ink)", color: "var(--fg)", borderColor: "var(--ink)" }}>
                {status === "sending" ? t.sending : t.submit} &rarr;
              </button>

              {status === "success" && <p role="status" style={{ color: "#2a7a2a", fontSize: "0.82rem", fontFamily: "var(--font-mono)" }}>{t.successMsg}</p>}
              {status === "error" && (
                <div role="alert">
                  <p style={{ color: "#ff3d00", fontSize: "0.82rem", fontFamily: "var(--font-mono)", marginBottom: "0.75rem" }}>{t.errorMsg}</p>
                  <a href={waUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill" style={{ display: "inline-flex" }}>{t.whatsappCta}</a>
                </div>
              )}
            </div>
          </form>

          {/* Canales directos */}
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(12,11,9,0.4)", marginBottom: "2rem" }}>
              {t.orLabel}
            </p>
            {[
              { label: "WhatsApp", value: "+591 77258517", href: waUrl },
              { label: "Email", value: "elyamilalarcon.111@gmail.com", href: "mailto:elyamilalarcon.111@gmail.com" },
              { label: "LinkedIn", value: "yamil-alarcon-romero", href: "https://www.linkedin.com/in/yamil-alarcon-romero-95560926a/" },
            ].map(({ label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  padding: "1.25rem 0",
                  borderBottom: "1px solid rgba(12,11,9,0.12)",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = "0.6")}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = "1")}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(12,11,9,0.35)", marginBottom: "0.3rem" }}>{label}</span>
                <span style={{ fontFamily: "var(--font-text)", fontSize: "0.95rem", color: "var(--ink)", fontWeight: 500 }}>{value}</span>
              </a>
            ))}
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", color: "rgba(12,11,9,0.3)", letterSpacing: "0.1em", marginTop: "1.5rem" }}>{t.timezone}</p>
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
