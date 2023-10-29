<?php
session_start();
include 'dbconnect.php';
$current_time = date("Y-m-d H:i:s");
$Attendcode = $_POST["attendancecode"];
$classToken = $request->session()->get('class token');
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    $sql = "INSERT INTO 'AttendanceCode' ( 'code', 'classtoken', 'date') VALUES ('$Attendcode', '$classToken', '$current_time')";
    $result2 = mysqli_query($conn, $sql);
    $passwordtocompare = "SELECT username FROM Attendance WHERE 'classtoken' = '$classToken'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_assoc($result); // array used on frontend hopefully
    print_r($row);
}
$conn->close();
?>

