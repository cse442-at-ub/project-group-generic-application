<?php
session_start();
include 'dbconnect.php';
//$current_time = date("Y-m-d H:i:s");
$Attendcode = '12345';
$classToken = '123456';
//if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $sql = "INSERT INTO AttendanceCode ( code, `class token`) VALUES ('$Attendcode', '$classToken')";
    $result2 = mysqli_query($conn, $sql);
    echo "success2";
    $passwordtocompare = "SELECT username FROM Attendance WHERE 'classtoken' = '$classToken'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_assoc($result); // array used on frontend hopefully
    print_r($row);
    echo "success3";
//}
$conn->close();
?>

