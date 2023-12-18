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
    $rutaimghover = $_POST['rutaimghover'];
    $precio_anterior = $_POST['precio_anterior'];

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {  
      $nombreExpReg = '/^[a-zA-Z\s]+$/';
      $correoMaxLength = 70;
      $telefonoMaxLength = 70;
      $direccionMaxLength = 128;
      
      $numero = preg_match('@[0-9]@', $fechaAñadido);
  
      $errores = [];
        
    }
      if (!preg_match($nombreExpReg, $nombre)) {
          $errores[] = 'Invalid nombre. Please enter a nombre without special characters.';
      }
  
      if (!preg_match($usernameExpReg, $genero)) {
          $errores[] = 'Nombre no válido. Por favor ingrese un nombre sin caracteres especiales.';
      }
  
if (empty($errores)) {
  $checkStmt = $conn->prepare("SELECT * FROM `productos` WHERE `nombre` = ?");
  if (!$checkStmt) {
      die("Fallo: " . $conn->error);
  }

  $checkStmt->bind_param("sss", $nombre);

  $checkStmt->execute();

  $checkResult = $checkStmt->get_result();

  if ($checkResult->num_rows > 0) {
      while ($row = $checkResult->fetch_assoc()) {
          if ($row['nombre'] === $nombre) {
              $errores[] = 'nombre ya usado.';
          }
      }
  }

  $checkStmt->close();
  $checkResult->close();
}
      if (empty($errores)) {
    $stmt = $conn->prepare("INSERT INTO `productos` (`nombre`, `genero`, `descripcion`, `marca`, `cantidadVendido`, `fechaAñadido`) VALUES (?, ?, ?, ?, ?, ?)");
    if (!$stmt) {
        die("Prepare failed: " . $conn->error);
    }

    $stmt->bind_param("ssssss", $nombre, $genero, $descripcion, $contraseñaHash, $cantidadVendido, $fechaAñadido);

    if ($stmt->execute()) {
        $response['message'] = "Registro correcto";
    } else {
        $response['message'] = "Algo ha fallado! Intentalo de nuevo";
    }

    $stmt->close();
  
      } else {
        $errorString = "";
        foreach ($errores as $error) {
            $errorString .= $error . "\n";
        }
        $response['message'] = $errorString;;
      }
  }
echo json_encode($response);
?>