<?php
session_start();
$current_time = date("Y-m-d H:i:s");
$Attendcode = $_POST["attendancecode"];
if ($_SERVER['REQUEST_METHOD'] == 'POST'){
    include 'dbconnect.php';
}
$conn->close();
?>

