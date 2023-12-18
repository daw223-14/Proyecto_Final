<?php
require_once 'database.php';

$response = array();
$response['message'] = "";

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
    
        if (!$checkStmt) {
            $response['message'] = "Error de preparación de la consulta: " . $conn->error;
        } else {
            $checkStmt->bind_param("s", $nombre);
            $checkStmt->execute();
            $checkResult = $checkStmt->get_result();

            if ($checkResult->num_rows > 0) {
                $errores[] = 'Nombre ya utilizado.';
            }

            $checkStmt->close();
            $checkResult->close();
        }  
        if (empty($errores)) {
            $stmt = $conn->prepare("INSERT INTO `productos` (`nombre`, `genero`, `descripcion`, `marca`, `precio`, `cantidadVendido`,`fechaAñadido`, `rutaimg`, `precio_anterior`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
            if (!$stmt) {
                $response['message'] = "Error de preparación de la consulta: " . $conn->error;
            } else {
                $stmt->bind_param("ssssdssss", $nombre, $genero, $descripcion, $marca, $precio, $cantidadVendido, $fechaAñadido, $rutaimg, $precio_anterior);
    
                if ($stmt->execute()) {
                    $response['message'] = "Insert correcto";
                } else {
                    $response['message'] = "Algo ha fallado! Inténtalo de nuevo";
                }
    
                $stmt->close();
            }
        } else {
            $errorString = implode("\n", $errores);
            $response['message'] = $errorString;
        }
} else {
    $response['message'] = "Método no permitido";
}
echo json_encode($response);
?>