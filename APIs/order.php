<?php
require_once 'database.php';

$response = array();
$response['message'] = "Algo ha salido mal :/!";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $telefono = $_POST['telefono'];
    $direccion = $_POST['direccion'];
    $productoIDyCantidades = $_POST['productoIDyCantidades'];

    $sql = "INSERT INTO pedidos (nombre, correo, telefono, direccion) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        die('Fallo: ' . htmlspecialchars($conn->error));
    }

    if (!$stmt->bind_param('ssss', $nombre, $correo, $telefono, $direccion)) {
        die('Fallo al bindear los parámetros: ' . htmlspecialchars($stmt->error));
    }

    if (!$stmt->execute()) {
        die('Ejecución fallida: ' . htmlspecialchars($stmt->error));
    }

    $pedidoID = $stmt->insert_id;

    foreach ($productoIDyCantidades as $item) {
        $productoID = intval($item['productoID']);
        $cantidad = intval($item['cantidad']);

        $sql = "INSERT INTO productos_pedidos (pedidoID, productoID, cantidad) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            die('Fallo para productos_pedidos: ' . htmlspecialchars($conn->error));
        }

        if (!$stmt->bind_param('iii', $pedidoID, $productoID, $cantidad)) {
            die('Fallo al bindear los parámetros para productos_pedidos: ' . htmlspecialchars($stmt->error));
        }

        if (!$stmt->execute()) {
            die('Ejecución fallida para productos_pedidos: ' . htmlspecialchars($stmt->error));
        }

        $stmt->close();
    }

    $response = [
        "pedidoID" => $pedidoID,
        "message" => "Pedido realizado. Pronto contactaremos contigo...",
    ];
    echo json_encode($response);
} else {
    http_response_code(405); 
    $response = [
        "message" => "Método de solicitud no admitido.",
    ];
    echo json_encode($response);
}
?>
