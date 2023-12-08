<?php
session_start();
include 'dbconnect.php';
if (!isset($_SESSION['username'])) {
    //header("Location: dashboard.php");
    echo "not connected";
    header("Location: Loginbackend.php");
    $conn->close();
    exit;
}
else{
    $username = $_SESSION['username']; // email to be retrieved
    $passwordtocompare = "SELECT firstname FROM userSignup WHERE username = '$username'";
    $result = mysqli_query($conn, $passwordtocompare);
    $row = mysqli_fetch_all($result);
    $row10 = $row[0][0]; // first name to be retrieved
    $passwordtocompare4 = "SELECT lastname FROM userSignup WHERE username = '$username'";
    $result4 = mysqli_query($conn, $passwordtocompare4);
    $row4 = mysqli_fetch_all($result4); 
    $row40 = $row4[0][0];// last name to be retrieved
    $passwordtocompare2 = "SELECT code FROM class_token WHERE username = '$username'";
    $result2 = mysqli_query($conn, $passwordtocompare2);
    $row2 = mysqli_fetch_all($result2); 
    $row20 = $row2[0];// classes to be retrieved
    $passwordtocompare3 = "SELECT * FROM Attendance WHERE username = '$username'";
    $result3 = mysqli_query($conn, $passwordtocompare3);
    $row3 = mysqli_fetch_all($result3); 
 $passwordtocompare3 = "SELECT * FROM Attendance WHERE username = '$username'";
    $result3 = mysqli_query($conn, $passwordtocompare3);
    $row3 = mysqli_fetch_all($result3); 

    $row30 = $row3[0];// attendance to be retrieved
    print_r($row10);
    print_r($row40);
    print_r($row20);
    print_r($row30);
$response = array("usernames" => $username);
    echo json_encode($response); // email to be retrieved
$response1 = array("classes" => $row2);
    echo json_encode($response1); //classes joined   
//return roles
 $username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
	echo $row20;
$response5 = array("role" => $row20);
    echo json_encode($response5); //classes joined   


}
$conn->close();
?>

