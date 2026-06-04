// Variables globales
let currentLanguage = 'en';

// =====================
// AVAILABILITY CONFIG — editar aquí fácilmente
// =====================
const AVAILABILITY_CONFIG = {
    timezone: 'America/La_Paz', // UTC-4
    days: [
        { key: 'lun', es: 'Lun', en: 'Mon', available: true, hours: { es: '09:00 – 16:00', en: '9am – 4pm' } },
        { key: 'mar', es: 'Mar', en: 'Tue', available: true, hours: { es: '09:00 – 16:00', en: '9am – 4pm' } },
        { key: 'mie', es: 'Mié', en: 'Wed', available: true, hours: { es: '09:00 – 16:00', en: '9am – 4pm' } },
        { key: 'jue', es: 'Jue', en: 'Thu', available: true, hours: { es: '09:00 – 16:00', en: '9am – 4pm' } },
        { key: 'vie', es: 'Vie', en: 'Fri', available: true, hours: { es: '09:00 – 16:00', en: '9am – 4pm' } },
        { key: 'sab', es: 'Sáb', en: 'Sat', available: true, hours: { es: 'Todo el día', en: 'All day' } },
        { key: 'dom', es: 'Dom', en: 'Sun', available: true, hours: { es: 'Todo el día', en: 'All day' } }
    ]
};
let typingToken = 0;
const texts = {
    es: [
        "Desarrollo web full-stack con IA",
        "¡Sistemas en producción!",
        "PHP · MySQL · JavaScript · Bootstrap · CSS",
        "Arquitectura de software sólida",
        "Automatización · Calidad · Valor real"
    ],
    en: [
        "Full-stack web development with AI",
        "Systems in production!",
        "PHP · MySQL · JavaScript · Bootstrap · CSS",
        "Solid software architecture",
        "Automation · Quality · Real value"
    ]
};
// Etiquetas según idioma
const labels = {
    es: { viewProject: 'Ver Proyecto', github: 'GitHub' },
    en: { viewProject: 'View Project', github: 'GitHub' }
};

const projects = {
    es: [
        {
            title: "Sistema de Orientación Vocacional y Pruebas de Aptitud (⭐)",
            description: "Plataforma web diseñada, desarrollada e implementada para la Universidad Real. Combina evaluación vocacional con gestión de pruebas de aptitud. Reemplazó un proceso 100% manual.",
            image: "project1.jpg",
            tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5", "CSS3"],
            liveUrl: "https://test.ureal.academia.bo/",
            details: "Sistema completo desarrollado bajo arquitectura cliente-servidor con metodología XP:\n\n• Documentación UML completa\n• Base de datos normalizada (3FN/4FN)\n• Evaluación vocacional asistida por IA simbólica\n• Panel administrativo para gestión de pruebas\n\nImpacto: Herramienta operativa clave para la captación estudiantil de la universidad.",
            caseStudy: `
                <div style="text-align:left; color:#ccc; line-height:1.6; margin-top:2rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
                    <h3 style="color:var(--primary-color); margin-bottom:1rem;">Transformación Digital del Proceso de Orientación y Admisión Universitaria</h3>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">El Problema: Ineficiencia y Deserción Académica</h4>
                    <p style="margin-bottom:1rem;">La Universidad Real enfrentaba un proceso de captación basado en métodos manuales (formularios de Google), proyectando poca profesionalidad y resultando en datos propensos a errores. Esto provocaba elecciones académicas mal informadas, culminando en problemas críticos como deserción y cambios de carrera (8 casos solo en 2023).</p>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">La Solución: Ecosistema Web Integral con IA Simbólica</h4>
                    <p style="margin-bottom:1rem;">Diseñé e implementé una solución Fullstack única que integra dos pilares:<br>
                    <strong>1. Sistema Experto de Orientación:</strong> Motor de inferencia (metodología RIASEC) que actúa como orientador virtual, brindando recomendaciones con base científica.<br>
                    <strong>2. Sistema Web de Pruebas (PAD):</strong> Plataforma robusta para evaluaciones automáticas y visualización en tiempo real para admisiones.</p>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">El Proceso: Agilidad, Seguridad y Stack Moderno</h4>
                    <p style="margin-bottom:1rem;">Desarrollo bajo metodología <strong>Extreme Programming (XP)</strong> en 6 meses.<br>
                    <strong>Stack:</strong> PHP, MySQL, HTML5, CSS3, JavaScript. Arquitectura OPA (One Page App) con Fetch API nativo.<br>
                    <strong>Desafíos Superados:</strong> Blindaje SQL y hashing de contraseñas, aleatorización anti-fraudes, Sistema de roles RBAC estricto.</p>

                    <h4 style="color:#fff; margin-bottom:0.5rem;">El Impacto: Inteligencia Operativa</h4>
                    <p style="margin-bottom:1rem;"><strong>Automatización Total:</strong> Procesamiento exitoso de los primeros 45 estudiantes para la gestión 2025, automatizando becas.<br>
                    <strong>Calidad ISO/IEC 9126:</strong> Usabilidad (80%) y portabilidad (88.8%) garantizando experiencia óptima.<br>
                    <strong>Valor Institucional:</strong> Captación estudiantil más estratégica, mejorando la competitividad mercantil de la universidad.</p>
                </div>
            `,
            testimonial: {
                quote: "El sistema desarrollado por Yamil cumplió con nuestras expectativas técnicas. Logramos reemplazar un proceso completamente manual por una plataforma funcional, estable y fácil de administrar. Supo entender el contexto institucional y traducirlo en soluciones concretas.",
                name: "Ing. Franco Céspedes",
                role: "Jefe de TIC's — Universidad Real · Cámara Nacional de Comercio",
                linkedin: "https://www.linkedin.com/in/franco-cespedes-19062ba9/"
            }
        },
        {
            title: "Portafolio Profesional",
            description: "Sitio personal con enfoque en presentación de capacidades técnicas y conversión. Diseño responsive premium, barra de progreso Scroll y animaciones Reveal Observer.",
            image: "project2.jpg",
            tech: ["HTML5", "CSS3", "JavaScript", "AJAX", "Netlify"],
            githubUrl: "https://github.com/yamilalarcon/portafolio-web",
            details: "El portafolio que estás viendo ahora mismo es mi carta de presentación interactiva:\n\n• Interfaz 'Reveal on Scroll' y animaciones CSS3/JS avanzadas (Glassmorphism).\n• Motor 3D ASCII hecho sin librerías pesadas para ilustrar computación creativa.\n• Sistema de Contacto Híbrido (AJAX asíncrono con Fallback Modal UI a WhatsApp/Gmail).\n• Arquitectura responsive adaptativa para cualquier dispositivo."
        },
        {
            title: "Proyectos Académicos",
            description: "Sistemas de gestión y aplicaciones de base de datos desarrollados durante la carrera universitaria, demostrando capacidad de análisis e implementación.",
            image: "project3.jpg",
            tech: ["Java", "MySQL", "PHP", "JavaScript"],
            githubUrl: "https://github.com/yamilalarcon/academic-projects",
            details: "A lo largo de mi formación, he consolidado la lógica de programación y la integración de arquitecturas limpias:\n\n• Desarrollo de software de escritorio con Java (Inventarios, Facturación).\n• Análisis y diseño de Bases de Datos Relacionales complejas con MySQL.\n• Herramientas web experimentales aplicando patrones de diseño MVC."
        }
    ],
    en: [
        {
            title: "Vocational Guidance and Aptitude Tests System (⭐)",
            description: "Web platform designed, developed and implemented for Universidad Real. Combines vocational evaluation with aptitude test management. Replaced a 100% manual process.",
            image: "project1.jpg",
            tech: ["PHP", "MySQL", "JavaScript", "Bootstrap", "HTML5", "CSS3"],
            liveUrl: "https://test.ureal.academia.bo/",
            details: "Complete system developed under client-server architecture with XP methodology:\n\n• Full UML documentation (class, ER, component diagrams)\n• Normalized database (3NF/4NF)\n• Symbolic AI Assisted Vocational Evaluation\n• Complete administrative test panel\n\nImpact: Operational key tool for student enrollment.",
            caseStudy: `
                <div style="text-align:left; color:#ccc; line-height:1.6; margin-top:2rem; border-top:1px solid rgba(255,255,255,0.1); padding-top:1.5rem;">
                    <h3 style="color:var(--primary-color); margin-bottom:1rem;">Digital Transformation of the Vocational Guidance and Admissions Process</h3>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">The Problem: Inefficiency and Academic Dropout</h4>
                    <p style="margin-bottom:1rem;">Universidad Real faced a recruitment process based on manual methods, projecting unprofessionalism and resulting in error-prone data. This led to poorly informed academic choices, culminating in critical issues such as dropout and career changes.</p>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">The Solution: Integral Web Ecosystem with Symbolic AI</h4>
                    <p style="margin-bottom:1rem;">I designed and implemented a unique Fullstack solution integrating two pillars:<br>
                    <strong>1. Expert Guidance System:</strong> Inference engine acting as a virtual counselor.<br>
                    <strong>2. Web Testing System (PAD):</strong> Robust platform for automatic assessments and real-time visualization.</p>
                    
                    <h4 style="color:#fff; margin-bottom:0.5rem;">The Process: Agility, Security and Modern Stack</h4>
                    <p style="margin-bottom:1rem;">Developed under <strong>Extreme Programming (XP)</strong> in 6 months.<br>
                    <strong>Stack:</strong> PHP, MySQL, HTML5, CSS3, JavaScript. OPA Architecture with native Fetch API.<br>
                    <strong>Technical Challenges:</strong> SQL shielding, password hashing, fraud-prevention randomization, strict RBAC system.</p>

                    <h4 style="color:#fff; margin-bottom:0.5rem;">The Impact: Operational Intelligence</h4>
                    <p style="margin-bottom:1rem;"><strong>Total Automation:</strong> Successful processing of students for the 2025 management, automating scholarships.<br>
                    <strong>Quality ISO/IEC 9126:</strong> Usability (80%) and portability (88.8%) guaranteeing optimal experience.<br>
                    <strong>Institutional Value:</strong> More strategic student recruitment, improving the educational market competitiveness.</p>
                </div>
            `,
            testimonial: {
                quote: "The system developed by Yamil accomplished our technical expectations. We successfully replaced a fully manual process with a functional, stable, and easy-to-manage platform. He demonstrated ability to understand our institutional context and translate it into concrete solutions.",
                name: "Eng. Franco Céspedes",
                role: "Head of IT — Universidad Real · National Chamber of Commerce",
                linkedin: "https://www.linkedin.com/in/franco-cespedes-19062ba9/"
            }
        },
        {
            title: "Professional Portfolio",
            description: "Personal site focused on showcasing technical capabilities and conversion. Premium responsive design, Scroll progress bar and Reveal Observer animations.",
            image: "project2.jpg",
            tech: ["HTML5", "CSS3", "JavaScript", "AJAX", "Netlify"],
            githubUrl: "https://github.com/yamilalarcon/portafolio-web",
            details: "The portfolio you are viewing right now is my interactive presentation letter:\n\n• 'Reveal on Scroll' UI and advanced CSS3/JS animations (Glassmorphism).\n• 3D ASCII engine made without heavy libraries to illustrate creative computing.\n• Hybrid Contact System (Asynchronous AJAX with Fallback Modal UI to WhatsApp/Gmail).\n• Adaptive responsive architecture for any device."
        },
        {
            title: "Academic Projects",
            description: "Management systems and database applications developed during university, demonstrating analysis and implementation capabilities.",
            image: "project3.jpg",
            tech: ["Java", "MySQL", "PHP", "JavaScript"],
            githubUrl: "https://github.com/yamilalarcon/academic-projects",
            details: "Throughout my education, I have consolidated programming logic and clean architecture integration:\n\n• Desktop software development with Java (Inventories, Billing).\n• Analysis and design of complex Relational Databases with MySQL.\n• Experimental web tools applying MVC design patterns."
        }
    ]
};

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function () {
    initializePortfolio();
});

function initializePortfolio() {
    createLoader();
    createCustomCursor();
    createAnimatedBackground();
    createFloatingParticles();
    initializeHeroCanvas();
    initializeTypingEffect();
    initializeScrollAnimations();
    initializeSkillBars();
    initializeCounters();
    initializeLanguageSwitcher();
    initializeContactForm();
    initializeProjects();
    initializeHeaderScroll();
    renderAvailability();

    // Establecer inglés por defecto
    switchLanguage('en');

    // Remover loader después de que todo esté cargado
    setTimeout(() => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }
    }, 2000);
}

// Crear loader
function createLoader() {
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerHTML = `
        <div class="loader-content">
            <div class="loader-spinner"></div>
            <div class="loader-text">Cargando Portfolio...</div>
        </div>
    `;
    document.body.appendChild(loader);
}

// Cursor personalizado
function createCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Efectos hover
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-category, .contact-method');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// Fondo animado
function createAnimatedBackground() {
    const bg = document.createElement('div');
    bg.className = 'animated-bg';
    document.body.appendChild(bg);
}

// Partículas flotantes
function createFloatingParticles() {
    const container = document.createElement('div');
    container.className = 'floating-particles';
    document.body.appendChild(container);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 20) + 's';
        container.appendChild(particle);
    }
}

// Canvas interactivo en Hero (red de partículas elegante)
function initializeHeroCanvas() {
    const canvas = document.getElementById('hero-canvas');
    const hero = document.getElementById('hero');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w, h, particles = [];
    const mouse = { x: 0, y: 0, active: false };

    // Paleta: esmeralda, café con leche, rojo vino
    const palette = [
        [46, 139, 87],
        [210, 180, 140],
        [123, 44, 57]
    ];

    function resize() {
        const rect = hero.getBoundingClientRect();
        w = rect.width;
        h = rect.height;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';
        canvas.width = Math.floor(w * dpr);
        canvas.height = Math.floor(h * dpr);
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        initParticles();
    }

    function initParticles() {
        const count = Math.max(60, Math.floor((w * h) / 18000));
        particles = new Array(count).fill(0).map(() => ({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.6,
            vy: (Math.random() - 0.5) * 0.6,
            r: Math.random() * 2 + 0.6,
            c: palette[Math.floor(Math.random() * palette.length)]
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        // Nodos
        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            if (mouse.active) {
                const dx = p.x - mouse.x;
                const dy = p.y - mouse.y;
                const dist2 = dx * dx + dy * dy;
                const rad = 120;
                if (dist2 < rad * rad) {
                    const d = Math.sqrt(dist2) + 0.0001;
                    const f = (rad - d) / rad;
                    p.vx += (dx / d) * f * 0.6;
                    p.vy += (dy / d) * f * 0.6;
                }
            }

            p.x += p.vx;
            p.y += p.vy;

            // Deriva suave
            p.vx += (Math.random() - 0.5) * 0.02;
            p.vy += (Math.random() - 0.5) * 0.02;

            // Bordes con wrap
            if (p.x < -20) p.x = w + 20; else if (p.x > w + 20) p.x = -20;
            if (p.y < -20) p.y = h + 20; else if (p.y > h + 20) p.y = -20;

            ctx.beginPath();
            ctx.fillStyle = `rgba(${p.c[0]}, ${p.c[1]}, ${p.c[2]}, 0.85)`;
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Conexiones
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const a = particles[i], b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const d2 = dx * dx + dy * dy;
                const maxDist = 120;
                if (d2 < maxDist * maxDist) {
                    const alpha = 1 - Math.sqrt(d2) / maxDist;
                    ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.25})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    function onMouseMove(e) {
        const rect = hero.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
    }

    function onMouseLeave() {
        mouse.active = false;
    }

    resize();
    draw();
    window.addEventListener('resize', resize);
    hero.addEventListener('mousemove', onMouseMove);
    hero.addEventListener('mouseleave', onMouseLeave);
}
// Efecto de escritura (con cancelación segura al cambiar idioma)
function initializeTypingEffect() {
    const dynamicText = document.getElementById('dynamic-text');
    if (!dynamicText) return;

    const token = ++typingToken;

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        if (token !== typingToken) return; // cancelar instancia anterior si cambió idioma

        const currentTexts = texts[currentLanguage] || [];
        const currentText = currentTexts[textIndex] || '';

        if (isDeleting) {
            dynamicText.textContent = currentText.substring(0, Math.max(0, charIndex - 1));
            charIndex--;
        } else {
            dynamicText.textContent = currentText.substring(0, Math.min(currentText.length, charIndex + 1));
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex >= currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex <= 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % (currentTexts.length || 1);
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    dynamicText.textContent = '';
    typeText();
}

// Animaciones de scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos para animaciones
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .achievement-item, .contact-method');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// Barras de habilidades
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.progress');

    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const targetWidth = progress.getAttribute('data-progress') + '%';
                setTimeout(() => {
                    progress.style.width = targetWidth;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => skillObserver.observe(bar));
}

// Contadores animados
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 100;

                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target;
                    }
                };

                updateCounter();
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// Cambio de idioma
function initializeLanguageSwitcher() {
    const langButtons = document.querySelectorAll('.lang-btn');

    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            if (lang !== currentLanguage) {
                switchLanguage(lang);
            }
        });
    });
}

function switchLanguage(lang) {
    currentLanguage = lang;

    // Actualizar botones activos
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Mostrar/ocultar elementos según idioma (excluir los botones de cambio de idioma)
    document.querySelectorAll('[data-lang]:not(.lang-btn)').forEach(el => {
        if (el.getAttribute('data-lang') === lang) {
            el.style.display = '';
            el.style.visibility = 'visible';
            el.style.opacity = '1';
        } else {
            el.style.display = 'none';
            el.style.visibility = 'hidden';
            el.style.opacity = '0';
        }
    });

    // Actualizar placeholders del formulario
    updateFormPlaceholders(lang);

    // Actualizar proyectos
    updateProjects();

    // Re-render availability in new language
    renderAvailability();

    // Reiniciar efecto de escritura con nuevo idioma
    initializeTypingEffect();

    // Forzar reflow para asegurar cambios
    document.body.offsetHeight;
}

// Función para actualizar placeholders del formulario
function updateFormPlaceholders(lang) {
    const placeholders = {
        es: {
            name: 'Tu nombre',
            email: 'Tu correo electrónico',
            message: 'Tu mensaje',
            submit: 'Enviar Mensaje'
        },
        en: {
            name: 'Your name',
            email: 'Your email',
            message: 'Your message',
            submit: 'Send Message'
        }
    };

    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitText = document.getElementById('submit-text');

    if (nameInput) nameInput.placeholder = placeholders[lang].name;
    if (emailInput) emailInput.placeholder = placeholders[lang].email;
    if (messageInput) messageInput.placeholder = placeholders[lang].message;
    if (submitText) submitText.textContent = placeholders[lang].submit;
}

// Formulario de contacto (Integración Directa con FormSubmit)
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;

        // Validaciones básicas
        const name = (form.querySelector('#contact-name')?.value || '').trim();
        const email = (form.querySelector('#contact-email')?.value || '').trim();
        const message = (form.querySelector('#contact-message')?.value || '').trim();
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

        if (!name || !emailOk || !message) {
            showNotification(currentLanguage === 'en' ? 'Please fill the form correctly.' : 'Completa el formulario correctamente.', 'error');
            return;
        }

        // Animación de envío
        submitBtn.innerHTML = '<span>' + (currentLanguage === 'en' ? 'Sending...' : 'Enviando...') + '</span>';
        submitBtn.disabled = true;

        try {
            const response = await fetch("https://formsubmit.co/ajax/elyamilalarcon.111@gmail.com", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Contacto desde Portafolio - ${name}`,
                    name: name,
                    email: email,
                    message: message
                })
            });

            if (response.ok) {
                showNotification(currentLanguage === 'en' ? 'Message sent! Please check your email to verify (first time only)' : '¡Mensaje enviado (Si es tu primera prueba, confirma en tu correo)!', 'success');
                form.reset();
            } else {
                throw new Error("FormSubmit failed");
            }
        } catch (error) {
            console.error('Error con el servidor de correos:', error);
            showFallbackModal(name, email, message);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });
}

function showFallbackModal(name, email, message) {
    const isEn = currentLanguage === 'en';
    const subject = encodeURIComponent('Contacto desde Portafolio - ' + name);
    const body = encodeURIComponent(`Hola Yamil,\n\nMi nombre es ${name} (Correo: ${email}).\n\n${message}`);

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=elyamilalarcon.111@gmail.com&su=${subject}&body=${body}`;
    const wappUrl = `https://wa.me/59165655661?text=${encodeURIComponent(`Hola Yamil, soy ${name}. ` + message)}`;

    const modalHtml = `
        <div class="modal-content" style="text-align: center; max-width: 400px;">
            <button class="close-modal" onclick="closeModal()">&times;</button>
            <div style="font-size: 3rem; margin-bottom: 1rem;">❌</div>
            <h3 style="margin-bottom: 1rem; color: #fff;">${isEn ? 'Server Unavailable' : 'Servidor Ocupado'}</h3>
            <p style="color: #ccc; margin-bottom: 2rem; font-size: 0.95rem;">
                ${isEn
            ? 'The standard mail server failed. Use one of these backup methods to reach me directly:'
            : 'El servidor de correos estándar no responde. Por favor usa una de estas alternativas para conectarnos:'}
            </p>
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <a href="${gmailUrl}" target="_blank" onclick="closeModal()" class="project-link" style="text-align: center; display: flex; justify-content: center; align-items: center; gap: 0.5rem; background: rgba(234, 67, 53, 0.1); border-color: #ea4335;">
                    <span>📧</span> Gmail
                </a>
                <a href="${wappUrl}" target="_blank" onclick="closeModal()" class="project-link" style="background: rgba(37, 211, 102, 0.2); border: 1px solid #25D366; color: #25D366; text-align: center; display: flex; justify-content: center; align-items: center; gap: 0.5rem;">
                    <span>💬</span> WhatsApp
                </a>
            </div>
        </div>
    `;

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = modalHtml;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.display = 'block', 10);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}



// Proyectos
function initializeProjects() {
    updateProjects();
}

function updateProjects() {
    const projectGrid = document.querySelector('.project-grid');
    if (!projectGrid) return;

    const currentProjects = projects[currentLanguage];

    projectGrid.innerHTML = currentProjects.map(project => `
        <div class="project-card reveal" onclick="openProjectModal('${project.title}')">
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    ${project.liveUrl ? `<button class="project-link" onclick="event.stopPropagation(); openProjectModal('${project.title}')">${labels[currentLanguage].viewProject}</button>` : ''}
                    ${project.githubUrl ? `<button class="project-link" onclick="event.stopPropagation(); openProjectModal('${project.title}')">${labels[currentLanguage].github}</button>` : ''}
                </div>
            </div>
        </div>
    `).join('');
}

// Modal de proyectos
function openProjectModal(projectTitle) {
    const project = projects[currentLanguage].find(p => p.title === projectTitle);
    if (!project) return;

    const testimonialHtml = project.testimonial ? `
        <div class="modal-testimonial">
            <div class="testimonial-quote-icon">❝</div>
            <blockquote class="testimonial-quote">${project.testimonial.quote}</blockquote>
            <div class="testimonial-author">
                <div class="testimonial-author-info">
                    <span class="testimonial-name">${project.testimonial.name}</span>
                    <span class="testimonial-role">${project.testimonial.role}</span>
                </div>
                <a href="${project.testimonial.linkedin}" target="_blank" rel="noopener" class="testimonial-linkedin" title="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
            </div>
        </div>
    ` : '';

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="close-modal" onclick="closeModal()">&times;</button>
            <h2>${project.title}</h2>
            <p>${project.description}</p>
            <div class="project-tech" style="margin: 1rem 0;">
                ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            <div style="white-space: pre-line; margin: 1rem 0; color: #ccc;">
                ${project.details}
            </div>
            <div class="project-links">
                ${project.caseStudy ? `<button class="project-link" style="background:var(--secondary-color); color:#fff;" onclick="toggleCaseStudy(this)">📖 Case Study</button>` : ''}
                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank" class="project-link">${labels[currentLanguage].viewProject}</a>` : ''}
                ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="project-link">${labels[currentLanguage].github}</a>` : ''}
            </div>
            <div class="case-study-container" style="display:none; text-align:left;">
                ${project.caseStudy || ''}
            </div>
            ${testimonialHtml}
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.style.display = 'block', 10);

    // Cerrar modal al hacer clic fuera
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 300);
    }
}

function toggleCaseStudy(btn) {
    const container = btn.parentElement.nextElementSibling;
    if (container.style.display === 'none') {
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// Modal de Habilidades Adicionales
function openAdditionalSkillsModal() {
    const overlay = document.getElementById('additional-skills-modal');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

// Degree Modal
function openDegreeModal() {
    const overlay = document.getElementById('degree-modal');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeDegreeModal(event) {
    const overlay = document.getElementById('degree-modal');
    if (!overlay) return;
    if (event && event.target !== overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}


// English Modal
function openEnglishModal() {
    const overlay = document.getElementById('english-modal');
    if (!overlay) return;
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeEnglishModal(event) {
    const overlay = document.getElementById('english-modal');
    if (!overlay) return;
    if (event && event.target !== overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}


// Availability Section Renderer
function renderAvailability() {
    const grid = document.getElementById('availability-grid');
    if (!grid) return;
    const lang = currentLanguage;
    grid.innerHTML = AVAILABILITY_CONFIG.days.map(day => {
        const isWeekend = day.key === 'sab' || day.key === 'dom';
        return `
        <div class="avail-day ${day.available ? 'avail-yes' : 'avail-no'} ${isWeekend ? 'avail-weekend' : ''}">
            <span class="avail-day-name">${day[lang] || day.es}</span>
            <span class="avail-icon">${day.available ? '&#10003;' : '&#10007;'}</span>
            <span class="avail-hours">${day.available ? day.hours[lang] || day.hours.es : (lang === 'en' ? 'Unavailable' : 'No disponible')}</span>
        </div>`;
    }).join('');
}

function closeAdditionalSkillsModal(event) {
    const overlay = document.getElementById('additional-skills-modal');
    if (!overlay) return;
    // Close only if clicking the overlay background itself (not the modal content)
    if (event && event.target !== overlay) return;
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

// Also close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const addSkillsOverlay = document.getElementById('additional-skills-modal');
        if (addSkillsOverlay) { addSkillsOverlay.classList.remove('open'); document.body.style.overflow = ''; }
        const degreeOverlay = document.getElementById('degree-modal');
        if (degreeOverlay) { degreeOverlay.classList.remove('open'); document.body.style.overflow = ''; }
        const projectModal = document.getElementById('project-modal');
        if (projectModal) closeModal();
        else closeModal();
    }
});

// Header scroll
function initializeHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navegación suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Notificaciones
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'var(--gradient-1)' : 'var(--gradient-2)'};
        color: white;
        border-radius: 10px;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: var(--shadow);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Efectos adicionales para elementos interactivos
document.addEventListener('click', (e) => {
    // Efecto ripple para botones
    if (e.target.classList.contains('submit-btn')) {
        const ripple = e.target.querySelector('.btn-ripple');
        if (ripple) {
            ripple.style.width = '0';
            ripple.style.height = '0';
            setTimeout(() => {
                ripple.style.width = '300px';
                ripple.style.height = '300px';
            }, 10);
        }
    }
});

// Optimización de rendimiento y nuevos efectos Scroll
let ticking = false;

function updateOnScroll() {
    // 1. Barra de progreso de lectura superior
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    const progressEl = document.getElementById("scroll-progress");
    if (progressEl) {
        progressEl.style.width = scrolled + "%";
    }

    // 2. Botón "Volver a Arriba"
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        if (winScroll > 300) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    }

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// Comportamiento de "Volver Arriba"
document.addEventListener("DOMContentLoaded", () => {
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});

// Lógica de Aparición al Scrollear (IntersectionObserver)
function initScrollReveal() {
    // Aplicar clase reveal automáticamente a elementos grandes (si no la tienen por HTML)
    const elementsToReveal = document.querySelectorAll('.achievement-item, .skill-category, .section-title, .about-content');
    elementsToReveal.forEach(el => el.classList.add('reveal'));

    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar la primera vez
            }
        });
    }, {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    });

    reveals.forEach(el => revealObserver.observe(el));
}

// Manejo de errores global
window.addEventListener('error', (e) => {
    console.error('Error en el portfolio:', e.error);
});

// Precargar imágenes importantes
function preloadImages() {
    const images = ['Images/Yamil Alarcon.png'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Inicializar Reveal on Scroll
document.addEventListener('DOMContentLoaded', initScrollReveal);

preloadImages();