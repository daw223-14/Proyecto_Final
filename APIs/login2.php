<?php
require_once 'database.php';
require_once 'jwt.php';

$response = array();
$response['mensaje'] = "";
$response['loggedin'] = false;
$response['usuarios'] = null;

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
            $usuarios = $resultado->fetch_assoc();
            if (password_verify($contraseña, $usuarios['contraseña'])) {
                $response['mensaje'] = "Bienvendio " . $usuarios['username'];
                $response['loggedin'] = true;

                $tokenPayload = array(
                    'username' => $usuarios['username'],
                    'nombre' => $usuarios['nombre'],
                    'usuarioID' => $usuarios['usuarioID']
                );
                $jwtToken = generateJwtToken($tokenPayload);

                $response['token'] = $jwtToken;

                // Establecer los datos de los usuarios en la respuesta
                $response['usuarios'] = array(
                    'username' => $usuarios['username'],
                    'nombre' => $usuarios['nombre'],
                );
            } else {
                $response['mensaje'] = "Contraseña incorrecta!";
            }
        } else {
            $response['mensaje'] = "Correo/username incorrecto!";
        }
    } else {
        $response['mensaje'] = "Algo salió mal. Por favor, vuelve a intentarlo.";
    }
    $stmt->close();
}

echo json_encode($response);
