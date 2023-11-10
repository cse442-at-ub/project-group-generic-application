<?php
session_start();
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
    $row = mysqli_fetch_all($result); // first name to be retrieved
    $passwordtocompare4 = "SELECT lastname FROM userSignup WHERE username = '$username'";
    $result4 = mysqli_query($conn, $passwordtocompare4);
    $row4 = mysqli_fetch_all($result); // last name to be retrieved
    $passwordtocompare2 = "SELECT code FROM class_token WHERE username = '$username'";
    $result2 = mysqli_query($conn, $passwordtocompare2);
    $row2 = mysqli_fetch_all($result2); // classes to be retrieved
    $passwordtocompare3 = "SELECT * FROM Attendance WHERE username = '$username'";
    $result3 = mysqli_query($conn, $passwordtocompare3);
    $row3 = mysqli_fetch_all($result3); // attendance to be retrieved
    print_r($row);
    print_r($row4);
    print_r($row2);
    print_r($row3);
}
$conn->close();
?>

