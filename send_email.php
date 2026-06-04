<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuración de respuesta
$response = array();

try {
    // Verificar que sea una petición POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception('Método no permitido');
    }
    
    // Obtener y validar datos del formulario
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    
    // Validaciones
    if (empty($name)) {
        throw new Exception('El nombre es requerido');
    }
    
    if (empty($email)) {
        throw new Exception('El email es requerido');
    }
    
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        throw new Exception('El email no es válido');
    }
    
    if (empty($message)) {
        throw new Exception('El mensaje es requerido');
    }
    
    // Sanitizar datos
    $name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
    $message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
    
    // Configuración del email
    $to = 'elyamilalarcon.111@gmail.com';
    $subject = 'Nuevo mensaje desde el portfolio - ' . $name;
    
    // Crear el cuerpo del email en HTML
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: bold; color: #555; display: block; margin-bottom: 5px; }
            .value { background: white; padding: 10px; border-radius: 5px; border-left: 4px solid #667eea; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nuevo Mensaje desde Portfolio</h2>
                <p>Has recibido un nuevo mensaje de contacto</p>
            </div>
            <div class='content'>
                <div class='field'>
                    <span class='label'>Nombre:</span>
                    <div class='value'>{$name}</div>
                </div>
                <div class='field'>
                    <span class='label'>Email:</span>
                    <div class='value'>{$email}</div>
                </div>
                <div class='field'>
                    <span class='label'>Mensaje:</span>
                    <div class='value'>" . nl2br($message) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Este mensaje fue enviado desde tu portfolio web</p>
                <p>Fecha: " . date('d/m/Y H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";
    
    // Headers del email
    $headers = array(
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: Portfolio Web <noreply@portfolio.com>',
        'Reply-To: ' . $email,
        'X-Mailer: PHP/' . phpversion()
    );
    
    // Intentar enviar el email
    $mail_sent = mail($to, $subject, $email_body, implode("\r\n", $headers));
    
    if ($mail_sent) {
        // Email enviado exitosamente
        $response['success'] = true;
        $response['message'] = 'Mensaje enviado correctamente';
        
        // Log del mensaje (opcional)
        $log_entry = date('Y-m-d H:i:s') . " - Mensaje de: {$name} ({$email})\n";
        file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
        
        http_response_code(200);
    } else {
        throw new Exception('Error al enviar el email');
    }
    
} catch (Exception $e) {
    // Error en el procesamiento
    $response['success'] = false;
    $response['message'] = $e->getMessage();
    http_response_code(400);
    
    // Log del error
    $error_log = date('Y-m-d H:i:s') . " - Error: " . $e->getMessage() . "\n";
    file_put_contents('error_log.txt', $error_log, FILE_APPEND | LOCK_EX);
}

// Enviar respuesta JSON
echo json_encode($response, JSON_UNESCAPED_UNICODE);
exit;
?>