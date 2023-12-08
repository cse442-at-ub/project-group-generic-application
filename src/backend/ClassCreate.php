<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: *");

include 'dbconnect.php';
ob_end_clean();

function sendResponse($success, $message) {
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(false, 'Invalid request method');
}

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if (empty($data['username']) || empty($data['className']) || empty($data['token'])) {
    sendResponse(false, 'Missing required fields');
}

$username = $data['username'];
$className = $data['className'];
$token = $data['token'];

$checkSQL = "SELECT * FROM class_token WHERE classname = '$className'";
$checkResult = mysqli_query($conn, $checkSQL);
if (mysqli_num_rows($checkResult) > 0) {
    sendResponse(false, 'Class name already exists. Please use another one.');
}

try {
	$usernames = $_SESSION['username'];
	$role = 'Professor';
	$classNames = 'sdadadada';
    $insertSQL = "INSERT INTO class_token (classname,code,username,role) VALUES ('$className','$token','$username','$role')";
       $result2 = mysqli_query($conn, $insertSQL);

    sendResponse(true, 'Class and table created successfully');
} catch (PDOException $e) {
    sendResponse(false, 'Error creating class: ' . $e->getMessage());
}
?>