<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:5173');

session_start();
include 'dbconnect.php';
ob_end_clean();

$username = $_SESSION['username'];
$user = "SELECT points FROM Points WHERE username = '$username'";
$result = mysqli_query($conn, $user);

$response = ['success' => false, 'data' => null, 'error' => null];

if ($result) {
    $row = mysqli_fetch_assoc($result);
    if ($row) {
        $response['success'] = true;
        $response['data'] = ['points' => $row['points']];
    } else {
        $response['error'] = "No points record found for the user.";
    }
} else {
    $response['error'] = mysqli_error($conn);
}

echo json_encode($response);
mysqli_close($conn);
exit;
?>