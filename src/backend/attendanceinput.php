<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
    session_start();

    if ($_SERVER['REQUESET_METHOD'] === 'POST'){
        include 'dbconnect.php';
        $username = "default";
        if(!isset($_SESSION['username'])){
            header("Location: Loginbackend.php");
            exit();
        }
        $sql = "Select * from users  where username='$username'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $classToken = $row['class token'];
        $currentDate = date('Y-m-d');
        $username = $_SESSION['username'];
        $attendanceCode = $_POST["code"];
        $sql = "Select * from attendanceCode where code='$attendaceCode'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $timestamp = $row['date'];
        $class = $row['class token']
        $dbDate = date("Y-m-d", strtotime($timestamp));
        $num = mysqli_num_rows($result);

        if($num == 1 && $dbDate === $currentDate && $classToken === $class){
            $sql = "INSERT INTO Attendance (username, `class token`)
                Values ('$username', '$classToken')";
            $result = mysqli_query($conn, $sql);
            echo "insertion success";
        } else{
            echo "invalid code";
        }
    }
    
?>