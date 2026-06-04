<?php include_once(__DIR__ . '/../config.php'); ?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yamil Alarcon - Portafolio Profesional</title>
    <link rel="icon" type="image/png" href="<?php echo SITEURL; ?>/Images/favicon.ico.png">
    <link rel="stylesheet" href="<?php echo SITEURL; ?>/style.css?v=<?php echo time(); ?>">
</head>
<body>
    <header>
        <nav>
            <div class="logo">
                <a href="<?php echo SITEURL; ?>">Y.A.</a>
            </div>
            <ul class="nav-links">
                <li><a href="#hero" data-lang="es">Inicio</a><a href="#hero" data-lang="en" style="display:none;">Home</a></li>
                <li><a href="#about" data-lang="es">Sobre Mí</a><a href="#about" data-lang="en" style="display:none;">About Me</a></li>
                <li><a href="#skills" data-lang="es">Habilidades</a><a href="#skills" data-lang="en" style="display:none;">Skills</a></li>
                <li><a href="#projects" data-lang="es">Proyectos</a><a href="#projects" data-lang="en" style="display:none;">Projects</a></li>
                <li><a href="#contact" data-lang="es">Contacto</a><a href="#contact" data-lang="en" style="display:none;">Contact</a></li>
            </ul>
            <div class="language-switcher">
                <button class="lang-btn active" data-lang="es">ES</button>
                <button class="lang-btn" data-lang="en">EN</button>
            </div>
        </nav>
    </header>
    <main>