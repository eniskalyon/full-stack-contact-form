<?php

$dotenv = parse_ini_file(__DIR__ . '/../.env');
$db_host = $dotenv['DB_HOST'];
$db_username = $dotenv['DB_USERNAME'];
$db_password = $dotenv['DB_PASSWORD'];
$db_name = $dotenv['DB_NAME'];


// Create connection
$conn = new mysqli($db_host, $db_username, $db_password, $db_name);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Check if the database exists and create if not
$createDBQuery = "CREATE DATABASE IF NOT EXISTS $db_name";
$conn->query($createDBQuery);

// Switch to the database
$conn->select_db($db_name);

// Check if table exists and create if not
$createTableQuery = "
    CREATE TABLE IF NOT EXISTS submissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(255) NOT NULL,
        message TEXT NOT NULL
    )";
$conn->query($createTableQuery);

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

// Check for POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    // Capture POST data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    //SQL Query
    $stmt = $conn->prepare("INSERT INTO submissions (name, email, subject, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $subject, $message);

    //Execute query
    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Thank you for contacting us!"]);
    } else {
        echo json_encode(["success" => false, "message" => "Error: " . $stmt->error]);
    }
}

?>

