<?php
/* header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Origin: http://localhost:5173');

session_start();
include 'dbconnect.php';
ob_end_clean();
$username = $_SESSION['username'];

$passwordtocompare2 = "SELECT code FROM class_token WHERE username = '$username'";
$result2 = mysqli_query($conn, $passwordtocompare2);
$row2 = mysqli_fetch_all($result2); 
$row20 = $row2[0];// classes to be retrieved
$JoinedClass = array("JoinedClass" => $row2);
echo json_encode($JoinedClass); //classes joined  

/* $user = array("Username" => $username); 
echo json_encode($user); */
/* $conn->close();
exit; */


/* // $username = "ABC";
// echo $username;
$JoinedClass = array("ABCD", "EFGH", "IJKL");
$response = array("JoinedClass" => $JoinedClass);
echo json_encode($response);
// echo $username; */
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Credentials: true');

session_start();
include 'dbconnect.php';
ob_end_clean();

$response = array("JoinedClass" => []);
if (isset($_SESSION['username'])) {
    $username = mysqli_real_escape_string($conn, $_SESSION['username']);
    $stmt = $conn->prepare("SELECT code FROM class_token WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    while ($row = $result->fetch_assoc()) {
        $response['JoinedClass'][] = array($row['code']);
    }
    $stmt->close();
} else {
    $response['JoinedClass'] = [];
}

echo json_encode($response);
$conn->close();
exit;
?>