<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
    session_start();

    if ($_SERVER["REQUEST_METHOD"] == "POST"){
        include 'dbconnect.php';
        $username = "bchow3";//Current username will change when session is saved across pages
        /*if(!isset($_SESSION['username'])){
            header("Location: Loginbackend.php");
            exit();
        }*/
        $sql = "Select * from users  where username='$username'";
        $result = mysqli_query($conn, $sql);
        $row = mysqli_fetch_assoc($result);
        $classToken = $row['class token'];
        $currentDate = date('Y-m-d');
        //$username = $_SESSION['username'];
        $attendanceCode = $_POST["code"];
        mysqli_free_result($result);
        $sql = "Select * from AttendanceCode where code='$attendanceCode'";
        $result = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($result);
        $row = mysqli_fetch_assoc($result);
        $timestamp = $row['date'];
        $class = $row['class token'];
        $dbDate = date("Y-m-d", strtotime($timestamp));
       if($num == 1 && $dbDate === $currentDate && $classToken === $class){
           $sql = "INSERT INTO Attendance (username, `class token`)
             VALUES ('$username', '$classToken')";
            $result = mysqli_query($conn, $sql);
           echo "insertion success";
        } else{
            echo "invalid code";
        }
        //echo "invalid code";
    }
    
?>
