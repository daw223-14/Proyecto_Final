<?php
$host = "localhost";
$dbname = "dbEcommerce";
$username = "root";
$password = "";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_errno) {
    die("Connection error: " . $conn->connect_error);
}

return $conn;