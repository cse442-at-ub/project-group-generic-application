<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
session_start();
include 'dbconnect.php';
$Attendcode = $data['code'];;
if (!isset($_SESSION['username'])) {
    //header("Location: dashboard.php");
    echo "not connected";
    header("Location: Loginbackend.php");
    $conn->close();
    exit;
}
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_SESSION['username'];
    echo "$username";
    $passwordtocompare4 = "SELECT `class token` FROM userSignup WHERE username = '$username'";
    $result5 = mysqli_query($conn, $passwordtocompare4);
    $row = mysqli_fetch_assoc($result5);
    $classToken = $row['class token'];
    $passwordtocompare = "SELECT username FROM Attendance WHERE `class token` = '$classToken'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_all($result); // array used on frontend hopefully
    print_r($row);
    echo "success3";
}
$conn->close();
?>