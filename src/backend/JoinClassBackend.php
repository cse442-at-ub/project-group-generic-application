<?php
    include 'dbconnect.php';
    session_start();
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $joincode = $_POST["classCode"];
        //$username = $_SESSION['username'];
        $username = "bchow3";
        $sql = "SELECT * FROM class_token WHERE code='$joincode'";
        $result = mysqli_query($conn, $sql);
        $numRows = mysqli_num_rows($result);
        if ($numRows == 1){
            $sql = "SELECT * FROM $joincode WHERE username='$username'";
            $result = mysqli_query($conn, $sql);
            $num = mysqli_num_rows($result);
            if ($num == 0){
                $sql = "INSERT INTO $joincode (username) VALUES ('$username')";
                $result = mysqli_query($conn, $sql);
                echo "Sucessful insertion";
            }
            else{
                echo "already in class";
            }
        }
        else{
            echo "invalid class code";
        }
    }
?>