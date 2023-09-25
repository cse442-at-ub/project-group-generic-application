<?php
session_start();
// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    exit;
}
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Replace these with your actual database credentials
    $db_host = "localhost";
    $db_user = "your_db_username";
    $db_pass = "your_db_password";
    $db_name = "your_db_name";
    // Create a database connection
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    // Check for connection errors
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Retrieve user input
    $username = $_POST['username'];
    $password = $_POST['password'];
    // Query the database for the user
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);
    // Check if a user with the provided credentials exists
    if ($result->num_rows == 1) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        exit;
    } else {
        // Authentication failed
        $error_message = "Invalid username or password";
    }
    // Close the database connection
    $conn->close();
}
?>
