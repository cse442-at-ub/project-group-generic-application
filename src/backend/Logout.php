<?php
session_start();
include 'dbconnect.php';
echo "success1";
// If the user clicks the sign-out button
// Check if the form is submitted
//if (isset($_POST['signout'])) {
    //unset all session variables
    $_SESSION = array();	
    session_destroy();
    $conn->close();
//} else {
//    echo json_encode(['error' => 'Invalid request']);
//}
?>