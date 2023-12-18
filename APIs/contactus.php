<?php
require_once 'database.php';
$response = array();
$response['mensaje'] = "Lo siento, algo ha salido mal :/";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $mensaje = trim($_POST['mensaje']);

    if (empty($nombre) || empty($correo) || empty($mensaje)) {
        $response['mensaje'] = "Por favor, rellene todos los campos obligatorios.";
    } else {
        $sentencia = "INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)";
        $statement = $conn->prepare($sentencia);
        $statement->bind_param('sss', $nombre, $correo, $mensaje);
        
        if ($statement->execute()) {
            $response['mensaje'] = "Gracias por contactarnos. Nos pondremos en contacto con usted pronto.";
        } else {
            $response['mensaje'] = "Se produjo un error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.";  
        }
  
    }
}
echo json_encode($response);
?>