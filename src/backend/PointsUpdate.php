<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');

session_start();
include 'dbconnect.php';
ob_end_clean();

function redeemPoints($username, $pointsToDeduct, $conn) {
    $stmt = mysqli_prepare($conn, "SELECT points FROM Points WHERE username = ?");
    mysqli_stmt_bind_param($stmt, 's', $username);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $userData = mysqli_fetch_assoc($result);

    if ($userData) {
        $currentPoints = $userData['points'];
        if ($currentPoints >= $pointsToDeduct) {
            $newPoints = $currentPoints - $pointsToDeduct;
            $updateStmt = mysqli_prepare($conn, "UPDATE Points SET points = ? WHERE username = ?");
            mysqli_stmt_bind_param($updateStmt, 'is', $newPoints, $username);
            mysqli_stmt_execute($updateStmt);

            if (mysqli_stmt_affected_rows($updateStmt) > 0) {
                return ['success' => true, 'data' => ['newPoints' => $newPoints]];
            } else {
                return ['error' => "Failed to update points"];
            }
        } else {
            return ['error' => "Not enough points"];
        }
    } else {
        return ['error' => "User not found"];
    }
}
$data = json_decode(file_get_contents('php://input'), true);
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $pointsToDeduct = $data['pointsToDeduct'];
    if ($pointsToDeduct === null) {
        $response = ['error' => "Points to deduct not provided"];
    } else {
        $username = $_SESSION['username'];
        $response = redeemPoints($username, $pointsToDeduct, $conn);
    }
} else {
    $response = ['error' => "Invalid request method"];
}

echo json_encode($response);
mysqli_close($conn);
?>