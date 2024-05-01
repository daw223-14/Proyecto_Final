<?php
require_once 'database.php';
$response = array();
$response['mensaje'] = "";
$response['loggedin'] = false;
$response['userInfo'] = array();
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correoOusuario = $_POST['login_usuario_correo'];
    $contraseña = $_POST['login_contraseña'];

    $stmt = $conn->prepare("SELECT * FROM `usuarios` WHERE `correo` = ? OR `username` = ?");
    if (!$stmt) {
        die("Fallo: " . $conn->error);
    }

    $stmt->bind_param("ss", $correoOusuario, $correoOusuario);

    if ($stmt->execute()) {
        $resultado = $stmt->get_result();

        if ($resultado->num_rows === 1) {
            $user = $resultado->fetch_assoc();
            if (password_verify($contraseña, $user['contraseña'])) {
                $response['mensaje'] = "Loggedado";
                $response['userInfo']['usuarioID'] = $user['usuarioID'];
                $response['userInfo']['nombre'] = $user['nombre'];
                $response['userInfo']['username'] = $user['username'];
                $response['userInfo']['correo'] = $user['correo'];
                $response['loggedin'] = true;
            } else {
                $response['mensaje'] = "Contraseña incorrecta!";
            }
        } else {
            $response['mensaje'] = "Correo/username incorrectos!";
        }
    } else {
        $response['mensaje'] = "Error ejecutando la sentencia: " . $stmt->error;
    }
    $stmt->close();
}

echo json_encode($response);
?>