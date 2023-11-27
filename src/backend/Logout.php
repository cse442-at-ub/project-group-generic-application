<?php
session_start();
include 'dbconnect.php';
echo "success1";
// If the user clicks the sign-out button
// Check if the form is submitted
if (isset($_POST['signout'])) {
    session_destroy();
    $conn->close();
}
//{
//    echo "invalid post";
//}
?>
