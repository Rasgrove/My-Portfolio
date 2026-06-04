<?php
// --- Configuración Dinámica de la URL del Sitio ---
// Esto hace que el sitio sea portable entre diferentes dominios y servidores.
$protocol = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off' || $_SERVER['SERVER_PORT'] == 443) ? "https://" : "http://";
$host = $_SERVER['HTTP_HOST'];
$script_name = str_replace('\\', '/', dirname($_SERVER['SCRIPT_NAME']));

// Si el script está en el directorio raíz, el dirname será solo '\' o '/', lo normalizamos.
if (rtrim($script_name, '/') === '' || $script_name === '/') {
    $base_path = '';
} else {
    $base_path = rtrim($script_name, '/');
}

// Asegurar que la URL termine correctamente
$siteurl = $protocol . $host . $base_path;
if (!empty($base_path) && substr($siteurl, -1) !== '/') {
    $siteurl .= '/';
}

define('SITEURL', rtrim($siteurl, '/'));

// Configuración de zona horaria
date_default_timezone_set('America/La_Paz');

// Configuración de errores (solo para desarrollo)
if ($_SERVER['HTTP_HOST'] === 'localhost' || strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}

// Headers de seguridad
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

?>