<footer style="background: var(--gradient-3); padding: 3rem 2rem 1rem; text-align: center; border-top: 1px solid rgba(255, 255, 255, 0.1);">
    <div style="max-width: 1200px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
            <div>
                <h3 style="color: #fff; margin-bottom: 1rem; font-size: 1.2rem;">Yamil Alarcón</h3>
                <p style="color: #ccc; line-height: 1.6;" data-lang="es">Desarrollador Full-Stack apasionado por crear soluciones tecnológicas innovadoras y eficientes.</p>
                <p style="color: #ccc; line-height: 1.6; display: none;" data-lang="en">Full-Stack Developer passionate about creating innovative and efficient technological solutions.</p>
            </div>
            <div>
                <h4 style="color: #fff; margin-bottom: 1rem;" data-lang="es">Enlaces Rápidos</h4>
                <h4 style="color: #fff; margin-bottom: 1rem; display: none;" data-lang="en">Quick Links</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <a href="#about" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;" data-lang="es">Sobre Mí</a>
                    <a href="#about" style="color: #ccc; text-decoration: none; transition: color 0.3s ease; display: none;" data-lang="en">About Me</a>
                    <a href="#skills" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;" data-lang="es">Habilidades</a>
                    <a href="#skills" style="color: #ccc; text-decoration: none; transition: color 0.3s ease; display: none;" data-lang="en">Skills</a>
                    <a href="#projects" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;" data-lang="es">Proyectos</a>
                    <a href="#projects" style="color: #ccc; text-decoration: none; transition: color 0.3s ease; display: none;" data-lang="en">Projects</a>
                    <a href="#contact" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;" data-lang="es">Contacto</a>
                    <a href="#contact" style="color: #ccc; text-decoration: none; transition: color 0.3s ease; display: none;" data-lang="en">Contact</a>
                </div>
            </div>
            <div>
                <h4 style="color: #fff; margin-bottom: 1rem;" data-lang="es">Contacto</h4>
                <h4 style="color: #fff; margin-bottom: 1rem; display: none;" data-lang="en">Contact</h4>
                <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                    <a href="mailto:elyamilalarcon.111@gmail.com" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;">elyamilalarcon.111@gmail.com</a>
                    <a href="tel:+59165655661" style="color: #ccc; text-decoration: none; transition: color 0.3s ease;">+591 65655661</a>
                    <span style="color: #ccc;">La Paz, Bolivia</span>
                </div>
            </div>
        </div>
        
        <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <p style="color: #ccc; margin: 0;">
                <span data-lang="es">&copy; 2024 Yamil Alarcón. Todos los derechos reservados.</span>
                <span data-lang="en" style="display: none;">&copy; 2024 Yamil Alarcón. All rights reserved.</span>
            </p>
            <div style="display: flex; gap: 1rem;">
                <span style="color: #ccc; font-size: 0.9rem;" data-lang="es">Hecho con ❤️ y mucho código</span>
                <span style="color: #ccc; font-size: 0.9rem; display: none;" data-lang="en">Made with ❤️ and lots of code</span>
            </div>
        </div>
    </div>
</footer>

<!-- Scripts -->
<script src="<?php echo SITEURL; ?>script.js?v=<?php echo time(); ?>"></script>

<!-- Estilos adicionales para efectos hover del footer -->
<style>
footer a:hover {
    color: var(--accent-color) !important;
    transform: translateX(5px);
}

@media (max-width: 768px) {
    footer div[style*="justify-content: space-between"] {
        flex-direction: column;
        text-align: center;
    }
}
</style>

</body>
</html>