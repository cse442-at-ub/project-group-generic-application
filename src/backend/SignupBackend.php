<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");

$showAlert = false;
$showError = false;
$exists = false;

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);

if($_SERVER["REQUEST_METHOD"] == "POST"){
    include 'dbconnect.php';
    $username = $data["username"];
    $password = $data["password"];
    $cpassword = $data["cpassword"];
    $first_name = $data["firstname"];
    $last_name = $data["lastname"];
    $classToken = $data["classtoken"];
    $role = "Student";
    $sql = "Select * from users where username='$username'";

    $result = mysqli_query($conn, $sql);

    $num = mysqli_num_rows($result);
    
    if($num == 0){
        if(($password == $cpassword) && $exists==false){
            $hash = password_hash($password, PASSWORD_DEFAULT);
            
            $sql = "INSERT INTO users (username, password, firstname, lastname, role, `classtoken`)
             VALUES ('$username', '$hash', '$first_name', '$last_name', '$role', '$classToken')";

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