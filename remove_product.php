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
$stmt = $conn->prepare("DELETE FROM products WHERE product_code = ?");
if ($stmt === false) {
    die("Error preparing the statement: " . $conn->error);
}

$stmt->bind_param("s", $product_code);

if ($stmt->execute() === false) {
    die("Error executing the statement: " . $stmt->error);
}

$stmt->close();
$conn->close();

header("Location: index.html"); // Redirect back to the main page
exit();
?>
