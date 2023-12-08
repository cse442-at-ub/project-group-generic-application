<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
session_start();
include 'dbconnect.php';
$classcode = $data['classcode'];;
if (!isset($_SESSION['username'])) {
    //header("Location: dashboard.php");
    echo "not connected";
    header("Location: Loginbackend.php");
    $conn->close();
    exit;
}
//if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_SESSION['username'];
    //echo "$username";
 $results = "SELECT MAX(id) FROM AttendanceCode WHERE username = '$username'";
$resulter = mysqli_query($conn, $results);
   $row10 = mysqli_fetch_all($resulter);
$highest_id = $row10[0][0];
//echo "$row10";
//print_r($highest_id);
$results2 = "SELECT code FROM AttendanceCode WHERE id = '$highest_id'";
$resulter2 = mysqli_query($conn, $results2);
   $row102 = mysqli_fetch_all($resulter2);
$highest_id2 = $row102[0][0];
//print_r($highest_id2);
    $passwordtocompare = "SELECT username FROM Attendance WHERE code = '$highest_id2'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_all($result); // array used on frontend hopefully
    // print_r($row);
    $response = array("usernames" => $row);
    echo json_encode($response);
    // echo "success3";
//}
$conn->close();
?>