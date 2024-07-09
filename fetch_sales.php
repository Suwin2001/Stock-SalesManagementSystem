<?php
// This PHP file is to fetch the daily sales from daily_sales table
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

// Get the raw POST data
$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['date'])) {
    echo json_encode(['success' => false, 'message' => 'No date received']);
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

$date = $conn->real_escape_string($data['date']);

$sql = "SELECT product_code, product_name, product_qty, price FROM daily_sales WHERE date = '$date'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $sales = [];
    while($row = $result->fetch_assoc()) {
        $sales[] = $row;
    }
    echo json_encode(['success' => true, 'sales' => $sales]);
} else {
    echo json_encode(['success' => false, 'message' => 'No sales found for the selected date']);
}

$conn->close();
?>
