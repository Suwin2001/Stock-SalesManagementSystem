<?php
$servername = "localhost";
$username = "root"; // default XAMPP username
$password = ""; // default XAMPP password
$dbname = "products_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Prepare and bind
$sql = "INSERT INTO products (product_code, product_name, product_qty, price, product_location) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
}

$stmt->bind_param("ssids", $product_code, $product_name, $product_qty, $price, $product_location);

// Set parameters and execute
$product_code = $_POST['product_code'];
$product_name = $_POST['product_name'];
$product_qty = $_POST['product_qty'];
$price = $_POST['price'];
$product_location = $_POST['product_location'];

if ($stmt->execute() === false) {
    die("Error executing the statement: " . $stmt->error);
}

$stmt->close();
$conn->close();

header("Location: index.html"); // Redirect back to the main page
exit();
?>
