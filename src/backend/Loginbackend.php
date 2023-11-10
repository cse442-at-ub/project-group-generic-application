<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
print "success1";
session_start();
include 'dbconnect.php';
echo "success1";
//echo "success";
 //Check if the user is already logged in
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
    echo "already connected";
    exit;
}

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "success2";
    $email = $data["email"];;
    $password = $data["password"];;
    //$password = password_hash($password, PASSWORD_DEFAULT);
    echo "success3";
    // Retrieve user input
    // Query the database for the user
    $sql = "SELECT * FROM userSignup WHERE username = '$email'";
    echo "$sql";
    echo "$password";
    $result = $conn->query($sql);
    $passwordtocompare = "SELECT password FROM userSignup WHERE password = '$password'";
    $row = mysqli_fetch_assoc($result);
       if (mysqli_num_rows($result) == 1 && password_verify($password, $row['password'])) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $email;
        //header("Location: dashboard.php");
        print_r($row);
        echo  "login_success!!!";
       $username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
	echo $row20;
        $conn->close();
        exit;
    } else {
        //Authentication failed
        $error_message = "Invalid username or password";
        print_r($row);
        echo "invalid";
    }
     //Close the database connection
    $conn->close();
}
//{
//    echo "invalid post";
//}
?>