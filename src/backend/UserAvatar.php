<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    include 'dbconnect.php';
    
    $username = $data["username"];
    $avatarId = $data["newAvatar"];
    
    $sql = "SELECT * FROM avatar WHERE username = ?";
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "s", $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    mysqli_stmt_close($stmt);
    
    if (mysqli_num_rows($result) > 0) {
        $sql = "UPDATE avatar SET avatarId = ? WHERE username = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "is", $avatarId, $username);
        $success = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    } else {
        $sql = "INSERT INTO avatar (username, avatarId) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, "si", $username, $avatarId);
        $success = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }
    
    if ($success) {
        echo json_encode(['success' => true, 'message' => 'Avatar updated or inserted successfully']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error processing avatar: ' . mysqli_error($conn)]);
    }
    
    mysqli_close($conn);
}
?>