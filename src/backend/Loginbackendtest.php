<?php
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
// Check if the form is submitted
//if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "success2";
    $username = "bchow3";
    $password = "123456";
    echo "success3";
    // Retrieve user input
    // Query the database for the user
    $sql = "SELECT * FROM test WHERE username = '$username'";
    echo "$sql";
    echo "$password";
    $result = $conn->query($sql);
    $row = $result->fetch_all(MYSQLI_ASSOC);  
    //echo "$result";
    // Check if a user with the provided credentials exists
    if ($result->num_rows == 1 /*&& password_verify($password, $password)*/) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $username;
        //header("Location: dashboard.php");
        print_r($row);
        exit;
    } else {
        //Authentication failed
        $error_message = "Invalid username or password";
        print_r($row);
        echo "invalid";
    }
     //Close the database connection
    $conn->close();
//}
//{
//    echo "invalid post";
//}
?>
