<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0; url=index.html" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Redirigiendo…</title>
  <noscript>
    <meta http-equiv="refresh" content="0;url=index.html" />
  </noscript>
  <style>
    html,body{height:100%}body{display:flex;align-items:center;justify-content:center;background:#0b0b0b;color:#e5e5e5;font-family:system-ui,-apple-system,Segoe UI,Roboto,Inter,Arial,sans-serif}
    a{color:#6ee7b7}
  </style>
  <script>
    // Redirección inmediata por JS (compatible con servidores PHP/Apache/Nginx)
    (function () {
      try { window.location.replace('index.html'); } catch (_) { window.location.href = 'index.html'; }
    })();
  </script>
</head>
<body>
  <p>Redirigiendo a <a href="index.html">index.html</a>…</p>
</body>
</html>