<?php
require_once 'database.php';
require_once 'jwt.php';

$response = array();
$response['mensaje'] = "";
$response['usuario'] = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $token = $_POST['token'];

    $tokenDescodificado = verifyJwtToken($token);

    if ($tokenDescodificado !== null && isset($tokenDescodificado->usuarioID)) {
        $usuarioID = $tokenDescodificado->usuarioID;

        $stmt = $conn->prepare("SELECT nombre, correo, telefono, direccion FROM `usuarios` WHERE `usuarioID` = ?");
        if (!$stmt) {
            die("Error: " . $conn->error);
        }

        $stmt->bind_param("i", $usuarioID);

        if ($stmt->execute()) {
            $result = $stmt->get_result();

            if ($result->num_rows === 1) {
                $usuario = $result->fetch_assoc();
                $response['mensaje'] = "Usuario encontrado";
                $response['usuario'] = $usuario;
            } else {
                $response['mensaje'] = "usuario no encontrado!";
            }
        } else {
            $response['mensaje'] = "Error al ejecutar la sentencia: " . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['mensaje'] = "Token invalido";
    }
} else {
    $response['mensaje'] = "Método de solicitud no admitido.";
}

echo json_encode($response);
?>
