<?php
require_once 'database.php';

$sql = "SELECT p.*, GROUP_CONCAT(t.talla SEPARATOR ', ') AS tallas
        FROM productos p
        LEFT JOIN infoProductos ip ON p.productoID = ip.productoID
        LEFT JOIN tallas t ON ip.tallaID = t.tallaID
        WHERE 1=1";

$filters = [];
$marca = $_GET['marca'] ?? '';
$genero = $_GET['genero'] ?? '';
$precio = $_GET['precio'] ?? '';
$nombre = $_GET['nombre'] ?? '';
$cantidadVendido = $_GET['cantidadVendido'] ?? '';
$productoID = $_GET['productoID'] ?? '';

if (!empty($marca)) {
    $filters[] = "p.marca = '" . $conn->real_escape_string($marca) . "'";
}
if (!empty($genero)) {
    $filters[] = "p.genero = '" . $conn->real_escape_string($genero) . "'";
}

if (!empty($precio)) {
    $filters[] = "p.precio <= " . floatval($precio);
}
if (!empty($productoID)) { // Add this block to filter by productoID
    $filters[] = "p.productoID = " . intval($productoID);
}
if (!empty($nombre)) {
    $filters[] = "(p.nombre LIKE '%" . $conn->real_escape_string($nombre) . "%' OR p.descripcion LIKE '%" . $conn->real_escape_string($nombre) . "%')";
}

if (!empty($cantidadVendido)) {
    $filters[] = "p.cantidadVendido >= " . intval($cantidadVendido);
}

if (!empty($filters)) {
    $sql .= " AND " . implode(" AND ", $filters);
}

$sql .= " GROUP BY p.productoID";

$result = $conn->query($sql);

$productos = [];
/* 
while ($fila = $result->fetch_assoc()) {
    $productos[] = $fila;
} */
while ($fila = $result->fetch_assoc()) {
    $productoID = $fila['productoID'];
    $tallas = explode(', ', $fila['tallas']); // Convertimos la cadena de tallas en un array
    unset($fila['tallas']); // Eliminamos la cadena de tallas del array resultante
    $fila['tallas'] = $tallas; // Agregamos el array de tallas al array resultante
    $productos[] = $fila;
}
/* while ($fila = $result->fetch_assoc()) {
    $productoID = $fila['productoID'];
    $fila['tallas'] = explode(',', $fila['tallas']); // Convertimos la cadena de tallas en un array
    $productos[$productoID] = $fila;
} */

$conn->close();

header("Content-type: application/json");
echo json_encode($productos);
