<?php
require_once 'database.php';
require_once 'jwt.php'; 

$response = array();
$response['mensaje'] = "";
$response['loggedin'] = false;
$response['token'] = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];

    $stmt = $conn->prepare("SELECT * FROM `admin` WHERE `usuario` = ?");

    if (!$stmt) {
        die("Error en la consulta SQL: " . $conn->error);
    }

    $stmt->bind_param("s", $usuario);

    if ($stmt->execute()) {
        $resultado = $stmt->get_result();
        if ($resultado->num_rows === 1) {
            $usuariosBD = $resultado->fetch_assoc();
            if (password_verify($contraseña, $usuariosBD['contraseña'])) {
                $response['mensaje'] = "Bienvendio " . $usuariosBD['usuario'];
                $response['loggedin'] = true;

                $tokenPayload = array(
                    'usuario' => $usuariosBD['usuario'],
                    'adminID' => $usuariosBD['adminID']
                );
                $jwtToken = generateJwtToken($tokenPayload);

                $response['token'] = $jwtToken;
            } else {
                $response['mensaje'] = "Contraseña incorrecta!";
            }
        } else {
            $response['mensaje'] = "Usuario incorrecto!";
        }
    } else {
        $response['mensaje'] = "Algo salió mal. Por favor, vuelve a intentarlo.";
    }
    $stmt->close();
}
echo json_encode($response);
