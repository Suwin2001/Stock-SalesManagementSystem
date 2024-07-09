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
$product_code = $_POST['product_code'];
$product_qty = $_POST['product_qty'];
$price = $_POST['price'];

$stmt = $conn->prepare("UPDATE products SET product_qty = ?, price = ? WHERE product_code = ?");
if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
}

$stmt->bind_param("ids", $product_qty, $price, $product_code);

if ($stmt->execute() === false) {
    die("Error executing the statement: " . $stmt->error);
}

$stmt->close();
$conn->close();

header("Location: index.html"); // Redirect back to the main page
exit();
?>
