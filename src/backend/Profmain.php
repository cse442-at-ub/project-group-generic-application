<?php
session_start();
$current_time = date("Y-m-d H:i:s");
$Attendcode = $_POST["attendancecode"];
$classToken = $request->session()->get('class token');
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    include 'dbconnect.php';
    $sql = "INSERT INTO 'AttendanceCode' ( 'code', 'classtoken', 'date') VALUES ('$Attendcode', '$classToken', '$current_time')";
    $result = mysqli_query($conn, $sql);
    $passwordtocompare = "SELECT password FROM test WHERE username = '$username'";
    $row = mysqli_fetch_assoc($result);
}
$conn->close();
?>

