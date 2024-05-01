<?php
require_once 'database.php';

$response = array();
$response['mensaje'] = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $usuario = $_POST['usuario'];
    $contraseña = $_POST['contraseña'];
    $contraseñaHash = password_hash($contraseña, PASSWORD_DEFAULT);

    if($_SERVER['REQUEST_METHOD'] === 'POST') {
        $errores = [];
        if(empty($errores)){
            $checkStmt = $conn->prepare("SELECT * FROM `admin` WHERE `usuario` = ?");
            if (!$checkStmt){
                die('Error en la preparación de consulta SQL' . $conn->error);
            }

            $checkStmt->bind_param('s', $usuario);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();

            if ($checkResult->num_rows > 0 ){
                while ($row = $checkResult->fetch_assoc()){
                    if ($row['usuario'] === $usuario){
                        $errores[] = 'Usuario ya registrado';
                    }
                }
            }
            $checkStmt->close();
            $checkResult->close();

        }
        if (empty($errores)){
            $stmt = $conn->prepare("INSERT INTO `admin` (`usuario`, `contraseña`) VALUES (?,?)");
            if (!$stmt){
                die('Error con la consulta SQL' . $conn->error);
            }

            $stmt->bind_param("ss", $usuario, $contraseñaHash);
            if($stmt->execute()) {
                $response['mensaje'] = "Registrado correctamente";
            } else{
                $response['mensaje'] = "Algo ha fallado!";
            }
            $stmt->close();
        } else{
            $errorString = "";
            foreach ($errores as $error) {
                $errorString .= $error . "\n";
            }
            $response['mensaje'] = $errorString;
        }
    }
}
echo json_encode($response);