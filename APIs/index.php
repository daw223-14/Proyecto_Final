<?php
require_once './database.php';
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$response = array();
$response['mensaje'] = '';
$response['productos'] = array();
$productos = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $stmt = $conn->prepare("SELECT * FROM `productos`");

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
// Agregar un nuevo producto (operación de creación)
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $genero = $_POST['genero'];
    $descripcion = $_POST['descripcion'];
    $marca = $_POST['marca'];
    $precio = $_POST['precio'];
    $cantidadVendido = $_POST['cantidadVendido'];
    $fechaAñadido = $_POST['fechaAñadido'];
    $rutaimg = $_POST['rutaimg'];
    $precio_anterior = $_POST['precio_anterior'];

    $stmt = $conn->prepare("INSERT INTO `productos` (nombre, genero, descripcion, marca, precio, cantidadVendido, fechaAñadido, rutaimg, precio_anterior) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Sentencia fallo: " . $conn->error);
    }
    $stmt->bind_param("ssssdissi", $nombre, $genero, $descripcion, $marca, $precio, $cantidadVendido, $fechaAñadido, $rutaimg, $precio_anterior);
    if ($stmt->execute()){
        $response['mensaje'] = "Insertado correctamente";
    } else{
        $response['mensaje'] = 'Hubo un error';
    }

    if ($stmt->affected_rows > 0) {
        $response['mensaje'] = 'AÑADIDO';
    } else {
        $response['mensaje'] = "ALGO HA IDO MAL :/";
    }

    $stmt->close();
}

// Actualizar un producto (operación de actualización)
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    $data = json_decode(file_get_contents('php://input'), true);
    $productoID = $data['productoID'];
    $nombre = $data['nombre'];
    $genero = $data['genero'];
    $descripcion = $data['descripcion'];
    $marca = $data['marca'];
    $precio = $data['precio'];
    $cantidadVendido = $data['cantidadVendido'];
    $fechaAñadido = $data['fechaAñadido'];
    $rutaimg = $data['rutaimg'];
    $precio_anterior = $data['precio_anterior'];

    $stmt = $conn->prepare("UPDATE `productos` SET `nombre`=?, `genero`=?, `descripcion`=?, `marca`=?, `precio`=?, `cantidadVendido`=?, `fechaAñadido`=?, `rutaimg`=?, `precio_anterior`=? WHERE `productoID`=?");
    $stmt->bind_param("ssssdissii", $nombre, $genero, $descripcion, $marca, $precio, $cantidadVendido, $fechaAñadido, $rutaimg, $precio_anterior, $productoID);

    if ($stmt->execute()) {
        // Producto actualizado correctamente
        $response = array("mensaje" => "Producto actualizado correctamente");
        http_response_code(200); // OK
    } else {
        // Error al actualizar el producto
        $response = array("mensaje" => "Error al actualizar el producto: " . $conn->error);
        http_response_code(500); // Internal Server Error
    }
    $stmt->close();
}

// Eliminar un producto (operación de eliminación)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    $productoID = $data['productoID'];

    $sql = "DELETE FROM productos WHERE productoID=$productoID";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(array("mensaje" => "Producto eliminado correctamente"));
    } else {
        echo json_encode(array("mensaje" => "Error al eliminar el producto: " . $conn->error));
    }
}
$conn->close();
echo json_encode($response);
