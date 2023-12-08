<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:5173');

session_start();
include 'dbconnect.php';
ob_end_clean();
$username = $_SESSION['username'];

$user = array("Username" => $username); 
echo json_encode($user);
$conn->close();
exit;
?>