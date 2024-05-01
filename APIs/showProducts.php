<?php
require_once './database.php';

$response = array();
$response['mensaje'] = '';
$response['productos'] = array(); 

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT p.*, GROUP_CONCAT(t.talla SEPARATOR ', ') AS tallas 
                            FROM productos p LEFT JOIN infoProductos ip ON p.productoID = ip.productoID 
                            LEFT JOIN tallas t 
                            ON ip.tallaID = t.tallaID 
                            GROUP BY p.productoID");
    if (!$stmt) {
        die("Sentencia fallo: " . $conn->error);
    }
    if ($stmt->execute()){
        $result = $stmt->get_result();

        while ($row = $result->fetch_assoc()) {
            $response['productos'][] = $row;
        }
        $response['mensaje'] = 'Productos mostrados';
    } else{
        $response['mensaje'] = 'Hubo un error';
    }
    $stmt->close();

}
echo json_encode($response);