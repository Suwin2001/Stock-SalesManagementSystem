<?php
// Enable error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// checkout.php

header('Content-Type: application/json');

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode(['success' => false, 'message' => 'No data received']);
    exit;
}

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "products_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]);
    exit;
}

foreach ($data as $item) {
    $productId = $item['id'];
    $qty = $item['qty'];
    $price = $item['price'];
    $productCode = $item['code'];
    $productName = $item['name'];
    $date = date('Y-m-d'); // Get the current date

    // Update the product quantity in the database
    $stmt = $conn->prepare("UPDATE products SET product_qty = product_qty - ? WHERE id = ?");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare statement failed: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param("ii", $qty, $productId);

    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Database update failed: ' . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit;
    }

    $stmt->close();

    // Insert the sale into the daily_sales table
    $stmt = $conn->prepare("INSERT INTO daily_sales (date, product_code, product_name, product_qty, price) VALUES (?, ?, ?, ?, ?)");
    if (!$stmt) {
        echo json_encode(['success' => false, 'message' => 'Prepare statement failed: ' . $conn->error]);
        $conn->close();
        exit;
    }
    $stmt->bind_param("sssii", $date, $productCode, $productName, $qty, $price);

    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'message' => 'Insert failed: ' . $stmt->error]);
        $stmt->close();
        $conn->close();
        exit;
    }

    $stmt->close();
}

$conn->close();
echo json_encode(['success' => true]);
?>
