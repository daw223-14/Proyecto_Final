<?php
require_once 'database.php';
$response = array();
$response['mensaje'] = "Lo siento, algo ha ido mal :/!";
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = $_POST['correo'] ?? '';

    $stmt = $conn->prepare("INSERT INTO subscripciones (correo) VALUES (?)");
    $stmt->bind_param("s", $correo);
    $stmt->execute();

    if ($stmt->affected_rows > 0) {
        $response['mensaje'] = "Gracias por la subscripcion!";
    }else{
        $response['mensaje'] = "Parece que ya estas subscrito al Newsletter!";
    }
    $stmt->close();
}
echo json_encode($response);
$conn->close();
?>
