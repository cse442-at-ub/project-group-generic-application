<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData, true);
session_start();
include 'dbconnect.php';
if (!isset($_SESSION['username'])) {
    //header("Location: dashboard.php");
    echo "not connected";
  //  header("Location: ".  https://www-student.cse.buffalo.edu/CSE442-542/2023-Fall/cse-442ab/#/login);
    $conn->close();
    exit;
}
$Attendcode = $data['code'];;
$classcode = $data['classcode'];;

if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_SESSION['username'];
    echo "$username";
    $passwordtocompare4 = "SELECT `classtoken` FROM userSignup WHERE username = '$username'";
    $result5 = mysqli_query($conn, $passwordtocompare4);
    $row = mysqli_fetch_assoc($result5);
    $classToken = $row['classtoken'];
    $sql = "INSERT INTO AttendanceCode ( code, `class token`,username) VALUES ('$Attendcode', '$classcode','$username')";
    $result2 = mysqli_query($conn, $sql);
    echo "success2";
    $passwordtocompare = "SELECT username FROM Attendance WHERE `class token` = '$classcode'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_all($result); // array used on frontend hopefully
    print_r($row);
    echo "success3";
}
$conn->close();
?>