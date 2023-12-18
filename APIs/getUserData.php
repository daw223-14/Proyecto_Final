<?php
require_once 'database.php';
require_once 'jwt.php';

$response = array();
$response['message'] = "";
$response['user'] = null;

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
                $user = $result->fetch_assoc();
                $response['message'] = "Usuario encontrado";
                $response['user'] = $user;
            } else {
                $response['message'] = "user no encontrado!";
            }
        } else {
            $response['message'] = "Error al ejecutar la sentencia: " . $stmt->error;
        }
        $stmt->close();
    } else {
        $response['message'] = "Token invalido";
    }
} else {
    $response['message'] = "Método de solicitud no admitido.";
}

echo json_encode($response);
?>
