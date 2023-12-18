<?php
require_once 'database.php';
require_once 'jwt.php'; 

$response = array();
$response['message'] = "";
$response['loggeado'] = false;
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
                $response['message'] = "Bienvendio " . $usuarios['username'];
                $response['loggeado'] = true;

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
                $response['message'] = "Contraseña incorrecta!";
            }
        } else {
            $response['message'] = "Correo/username incorrecto!";
        }
    } else {
        $response['message'] = "Algo salió mal. Por favor, vuelve a intentarlo.";
    }
    $stmt->close();
}

echo json_encode($response);
?>