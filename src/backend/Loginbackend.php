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
    //header("Location: dashboard.php");
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
    $sql = "SELECT * FROM userLogin WHERE username = '$email'";
    echo "$sql";
    echo "$password";
    $result = $conn->query($sql);
    //$row = $result->fetch_all(MYSQLI_ASSOC);
    $passwordtocompare = "SELECT password FROM userLogin WHERE password = '$password'";
    $row = mysqli_fetch_assoc($result);

    // Check if a user with the provided credentials exists
    if ($result->num_rows == 1 && password_verify($password, $row['password'])) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $username;
        //header("Location: dashboard.php");
        print_r($row);
        echo  "login_success!!!";
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