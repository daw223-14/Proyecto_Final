<?php
require_once 'database.php';

$response = array();
$response['message'] = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'];
    $username = $_POST['username'];
    $correo = $_POST['correo'];
    $contraseña = $_POST['contraseña'];
    $contraseña2 = $_POST['contraseña2'];
    $contraseñaHash = password_hash($contraseña, PASSWORD_DEFAULT);
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {  
      $nombreExpReg = '/^[a-zA-Z\s]+$/';
      $usernameExpReg = '/^[a-zA-Z][a-zA-Z0-9]*$/';
      $correoMaxLength = 70;
      $telefonoMaxLength = 70;
      $direccionMaxLength = 128;
      
      $numero = preg_match('@[0-9]@', $contraseña);
      $uppercase = preg_match('@[A-Z]@', $contraseña);
      $lowercase = preg_match('@[a-z]@', $contraseña);
      $caracEspecial = preg_match('@[^\w]@', $contraseña);
  
      $errores = [];
      if (!isset($_POST['terms'])) {
        $errores[] = 'Tienes que aceptar los términos y condiciones.';
     }
      if (!preg_match($nombreExpReg, $nombre)) {
          $errores[] = 'Invalid nombre. Please enter a nombre without special characters.';
      }
  
      if (!preg_match($usernameExpReg, $username)) {
          $errores[] = 'Nombre no válido. Por favor ingrese un nombre sin caracteres especiales.';
      }
  
      if (strlen($correo) > $correoMaxLength) {
          $errores[] = 'El correo excede ' . $correoMaxLength . ' caracteres.';
      }
  
      if (strlen($telefono) > $telefonoMaxLength) {
          $errores[] = 'El numero supera los ' . $telefonoMaxLength . ' caracteres.';
      }
    
      if ($contraseña != $contraseña2) {
          $errores[] = 'Las contraseñas no coinciden.';
      }
  
      if (strlen($direccion) > $direccionMaxLength) {
          $errores[] = 'La dirección excede los ' . $direccionMaxLength . ' caracteres.';
      }
if (empty($errores)) {
  $checkStmt = $conn->prepare("SELECT * FROM `usuarios` WHERE `correo` = ? OR `username` = ? OR `telefono` = ?");
  if (!$checkStmt) {
      die("Fallo: " . $conn->error);
  }

  $checkStmt->bind_param("sss", $correo, $username, $telefono);

  $checkStmt->execute();

  $checkResult = $checkStmt->get_result();

  if ($checkResult->num_rows > 0) {
      while ($row = $checkResult->fetch_assoc()) {
          if ($row['correo'] === $correo) {
              $errores[] = 'Correo ya usado.';
          }
          if ($row['username'] === $username) {
              $errores[] = 'Username ya está en uso';
          }
          if ($row['telefono'] === $telefono) {
              $errores[] = 'Telefono ya existe.';
          }
      }
  }

  $checkStmt->close();
  $checkResult->close();
}
    if (empty($errores)) {
        $stmt = $conn->prepare("INSERT INTO `usuarios` (`nombre`, `username`, `correo`, `contraseña`, `direccion`, `telefono`) VALUES (?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("ssssss", $nombre, $username, $correo, $contraseñaHash, $direccion, $telefono);

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

} 
echo json_encode($response);
?>