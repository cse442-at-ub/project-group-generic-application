<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

session_start();
include 'dbconnect.php';
ob_end_clean();

$username = $_SESSION['username'];

if (empty($username)) {
    echo json_encode(['error' => 'Username is required']);
    exit;
}

$sql = "SELECT avatarId FROM avatar WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$stmt->close();

if ($row = $result->fetch_assoc()) {
    echo json_encode(['avatarId' => $row['avatarId']]);
} else {
    echo json_encode(['error' => 'Avatar not found']);
}

$conn->close();

/* header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

session_start();
include 'dbconnect.php';
ob_end_clean();

$response = array("avatarId" => []);
if (isset($_SESSION['username'])) {
    $username = mysqli_real_escape_string($conn, $_SESSION['username']);
    $stmt = $conn->prepare("
        SELECT avatarId 
        FROM avatar 
        WHERE username = ?
    ");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($row = $result->fetch_assoc()) {
        $response['avatarId'] = array(
            'avatarId' => $row['avatarId']
        );
    } else {
        $response['avatarId'] = 'Avatar not found.';
    }
    $stmt->close();
} else {
    $response['error'] = 'User is not logged in.';
}

echo json_encode($response);
$conn->close();
exit; */
?>