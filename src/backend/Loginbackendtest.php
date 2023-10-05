<?php
include 'dbconnect.php';
session_start();
echo "success1";
//echo "success";
 //Check if the user is already logged in
if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    echo "already connected";
    exit;
}
// Check if the form is submitted
//if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    echo "success2";
    echo "success3";
    // Retrieve user input
    $username = "bchow3";
    $password = "123456";
    $hash = password_hash($password, PASSWORD_DEFAULT);
    // Query the database for the user
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    echo "bchow";
    $result = $conn->query($sql);
    // Check if a user with the provided credentials exists
    if ($result->num_rows == 1) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        echo "$id";
        exit;
    } else {
        // Authentication failed
        $error_message = "Invalid username or password";
    }
    // Close the database connection
    $conn->close();
//}
?>
