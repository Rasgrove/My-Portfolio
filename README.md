# Portafolio Profesional — SPA estática (ES/EN)

Este proyecto es un rediseño completo y estable de un portafolio profesional moderno, elegante y multilingüe (Español/Inglés). Incluye una pieza técnica destacada en el Hero: un canvas interactivo con red de partículas y conexiones (sin librerías), efectos de glassmorphism, animaciones sutiles y un sistema simple de i18n.

## Características clave

- SPA estática 100% HTML/CSS/JS (sin build, sin dependencias).
- i18n ES/EN conmutado desde la UI (botones ES/EN).
- Hero con Canvas interactivo: red de partículas con conexiones y reacción al puntero.
- Tiping effect multilenguaje con cancelación segura al cambiar de idioma.
- Proyectos renderizados dinámicamente a partir de un array (fácil de ampliar).
- Estética elegante: esmeralda, café con leche oscuro, negro, blanco y rojo vino.
- Contacto resaltado con fallback inteligente:
  - file:// abre cliente de email (mailto)
  - http(s):// intenta enviar via PHP (opcional)
- Diseño responsivo y moderno.

## Estructura

```
Portfolio/
├── index.html         # Página principal (SPA estática)
├── style.css          # Estilos (paleta, layout, efectos)
├── script.js          # Lógica (i18n, canvas, proyectos, UI)
├── index.php          # Redirección a index.html (por compatibilidad)
├── send_email.php     # Opcional: backend para formulario (si hay servidor PHP)
├── Images/
│   ├── Yamil Alarcon.png
│   └── favicon.ico.png
└── README.md
```

## Uso local

- Abre directamente [index.html](index.html) en tu navegador (doble clic).
- El formulario usará mailto (cliente de correo) en modo file://.
- Para probar envío vía PHP, sirve el directorio con Apache/Nginx/PHP y accede por http://.

## Personalización rápida

1) Foto de perfil  
Reemplaza la imagen en `Images/Yamil Alarcon.png` conservando el nombre y ruta.

2) Proyectos (cards y modal)  
Edita el objeto `projects` en [script.js](script.js), sección superior. Ejemplo de entrada:
```js
{
  title: "Sistema de Orientación Vocacional",
  description: "Plataforma web completa...",
  image: "project1.jpg", // opcional si agregas imágenes
  tech: ["PHP", "MySQL", "JavaScript"],
  liveUrl: "https://ejemplo.com", // enlace en producción (opcional)
  githubUrl: "https://github.com/...", // opcional
  details: "Detalles extendidos que se muestran en el modal..."
}
```
- Añade, quita o reordena elementos en `projects.es` y `projects.en`.  
- Los botones usan etiquetas por idioma (`labels`) para “Ver Proyecto”/“View Project”.

3) Textos del efecto typing  
Edita el array `texts` en [script.js](script.js) (propiedades `es` y `en`).

4) Paleta de colores y estética  
Ajusta variables en `:root` dentro de [style.css](style.css):
```css
:root {
  --primary-color: #2E8B57;   /* Esmeralda */
  --secondary-color: #D2B48C; /* Café con Leche */
  --accent-color: #228B22;    /* Verde Bosque */
  --bg-color: #000000;        /* Negro */
  /* ... */
}
```

## Cambio de idioma (i18n)

- Botones ES/EN en el header alternan `currentLanguage`.
- Los elementos con atributo `data-lang="es"` o `data-lang="en"` conmutan visibilidad.
- Placeholders del formulario y botones también se actualizan.

## Pieza técnica destacada (Hero Canvas)

- Función `initializeHeroCanvas()` en [script.js](script.js) pinta una red de partículas con conexiones y repulsión al puntero.
- Paleta para los nodos:
```js
const palette = [
  [46, 139, 87],  // esmeralda
  [210, 180, 140],// café con leche
  [123, 44, 57]   // rojo vino
];
```
- Rendimiento optimizado: tamaño según DPR, recálculo en resize, animation loop eficiente.

## Formulario de contacto

- Validación básica de nombre/correo/mensaje.
- Si abres por file://, se abrirá tu cliente de correo con `mailto`.
- Si sirves por http(s) y tienes PHP, intentará POST a `send_email.php`.
- Edita `send_email.php` para configurar tu envío real (SMTP/PHPMailer u otro).

## Accesibilidad y SEO

- Meta description y favicon incluidos.
- Contraste y foco visual por diseño.
- Texto alternativo en la imagen principal.

## Deploy

- GitHub Pages / Netlify / cualquier hosting estático:
  - Sube todo el directorio `Portfolio/` y apunta el hosting a `index.html`.
- No requiere build ni dependencias.

## Nota sobre archivos PHP

- El sitio es estático. `index.php` solo redirige a `index.html` por compatibilidad con algunos hostings.
- `send_email.php` es opcional si deseas manejar envío real de emails en servidor.

---
Desarrollado para resaltar habilidades técnicas con una pieza visual interactiva sobria (no lúdica), diseño elegante y contenido bilingüe.