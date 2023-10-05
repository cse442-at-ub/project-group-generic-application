<?php

$showAlert = false;
$showError = false;
$exists = false;

if($_SERVER["REQUEST_METHOD"] == "POST"){
    include 'dbconnect.php';
    $username = $_POST["username"];
    $password = $_POST["password"];
    $cpassword = $_POST["cpassword"];
    $first_name = $_POST["first name"];
    $last_name = $_POST["last name"];
    $role = $_POST["role"];
    $classToken = $_POST["class token"];

    $sql = "Select * from users where username='$username'";

    $result = mysqli_query($conn, $sql);

    $num = mysqli_num_rows($result);

    if($num == 0){
        if(($password == $cpassword) && $exists==false){
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $sql = "INSERT INTO 'users' ( 'username', 'password', 'date', 'first name', 'last name', 'role', 'class token') VALUES ('$username', '$hash', current_timestamp(), '$first_name', '$last_name', '$role', '$classToken')";
            $result = mysqli_query($conn, $sql);
            if($result){
                $showAlert = true;
            }
        }
        else{
            $showError = "Passwords to not match";
        }
    }

    if($num>0){
        $exists="Email already used";
    }
}
?>