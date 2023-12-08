<?php
session_start();
include 'dbconnect.php';
echo "success1";
// If the user clicks the sign-out button
// Check if the form is submitted
$username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
    $response = array("role" => $row20);
    echo json_encode($response);
$conn->close();
?>
