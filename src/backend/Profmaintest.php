<?php
session_start();
include 'dbconnect.php';
//$current_time = date("Y-m-d H:i:s");
$Attendcode = '12345';
if (!isset($_SESSION['username'])) {
    //header("Location: dashboard.php");
    echo "not connected";
    header("Location: Loginbackend.php");
    $conn->close();
    exit;
}

//if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $username = $_SESSION['username'];
    echo "$username";
    $passwordtocompare4 = "SELECT `class token` FROM users WHERE username = '$username'";
    $result5 = mysqli_query($conn, $passwordtocompare4);
    $row = mysqli_fetch_assoc($result5);
    $classToken = $row['class token'];
    $sql = "INSERT INTO AttendanceCode ( code, `class token`) VALUES ('$Attendcode', '$classToken')";
    $result2 = mysqli_query($conn, $sql);
    echo "success2";
    $passwordtocompare = "SELECT username FROM Attendance WHERE `class token` = '$classToken'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_all($result); // array used on frontend hopefully
    print_r($row);
    echo "success3";
//}
$conn->close();
?>