<?php
require_once 'database.php';

$sql = "SELECT * FROM productos WHERE 1=1";

$filters = [];
$marca = $_GET['marca'] ?? '';
$genero = $_GET['genero'] ?? '';
$precio = $_GET['precio'] ?? '';
$nombre = $_GET['nombre'] ?? '';
$cantidadVendido = $_GET['cantidadVendido'] ?? '';
$productId = $_GET['productId'] ?? '';

if (!empty($marca)) {
    $filters[] = "marca = '" . $conn->real_escape_string($marca) . "'";
}
if (!empty($genero)) {
    $filters[] = "genero = '" . $conn->real_escape_string($genero) . "'";
}

if (!empty($precio)) {
    $filters[] = "precio <= " . floatval($precio);
}
if (!empty($productId)) { // Add this block to filter by productId
    $filters[] = "productoID = " . intval($productId);
}
if (!empty($nombre)) {
    $filters[] = "(nombre LIKE '%" . $conn->real_escape_string($nombre) . "%' OR description LIKE '%" . $conn->real_escape_string($nombre) . "%')";
}

if (!empty($cantidadVendido)) {
    $filters[] = "cantidadVendido >= " . intval($cantidadVendido);
}

if (!empty($filters)) {
    $sql .= " AND " . implode(" AND ", $filters);
}

$sort = $_GET['sort'] ?? '';

switch ($sort) {
    case 'cantidadVendido':
        $sql .= " ORDER BY cantidadVendido DESC";
        break;
    case 'fechaAñadido':
        $sql .= " ORDER BY fechaAñadido DESC";
        break;
    case 'descuento':
        $sql .= " AND precio_anterior > precio AND precio_anterior IS NOT NULL ORDER BY (1 - (precio / precio_anterior)) DESC";
        break;
    default:
        $sql .= " ORDER BY productoID DESC";
        break;
}

$limit = isset($_GET['limit']) ? intval($_GET['limit']) : null;

if ($limit !== null) {
    $sql .= " LIMIT " . $limit;
}

$result = $conn->query($sql);

$productos = [];
while ($fila = $result->fetch_assoc()) {
    $productos[] = $fila;
}

$conn->close();

header("Content-type: application/json");
echo json_encode($productos);
?>