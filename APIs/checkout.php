<?php
require_once 'database.php';
// Check if the userData properties are not empty
$response = array();
$response['mensaje'] = "";
$response['productos'] = "";
$response['totalAmount'] = "";
$userData = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $telefono = trim($_POST['telefono']);
    $direccion = trim($_POST['direccion']);
    $productos = $_POST['productoIDyCantidades'];

    // Process and use the data as needed
    // For example, you can create an array with the user data
    $userData = [
        'nombre' => $nombre,
        'correo' => $correo,
        'telefono' => $telefono,
        'direccion' => $direccion
    ];
    $response['mensaje'] = $userData;
    $response['productos'] = $productos;
}

if (
    empty($userData['nombre']) ||
    empty($userData['correo']) ||
    empty($userData['telefono']) ||
    empty($userData['direccion'])
) {
    http_response_code(400);
    $response = [
        "error" => "Invalid user data",
    ];
    header("Content-Type: application/json");
    echo json_encode($response);
    exit();
}

$totalAmount = 0;

foreach ($productos as $product) {
    $productoID = intval($product['productoID']);
    $cantidad = intval($product['cantidad']);

    // Retrieve product price from the database
    $sql = "SELECT precio FROM productos WHERE productoID = $productoID";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $productPrice = $row['precio'];
        $totalAmount += $productPrice * $cantidad;
    }
}

$response['totalAmount'] = $totalAmount;
echo json_encode($response);

$conn->close();

