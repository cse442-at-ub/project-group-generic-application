<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header("Content-Type: application/json; charset=UTF-8");
    include 'dbconnect.php';
    session_start();

    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $joincode = $data["classCode"];
        $username = $_SESSION['username'];
        // $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'Not set';
        // $username = "bertli@buffalo.edu";
        $sql = "SELECT * FROM userSignup WHERE username='$username'";
        $result = mysqli_query($conn,$sql);
        $row = mysqli_fetch_assoc($result);
        $role = $row['role'];
        $sql = "SELECT * FROM class_token WHERE code='$joincode'";
        $result = mysqli_query($conn, $sql);
        $numRows = mysqli_num_rows($result);
        if ($numRows != 0){
            $sql = "SELECT * FROM class_token WHERE `username` = \"$username\" AND code = \"$joincode\"";
            $result = mysqli_query($conn, $sql);
            $num = mysqli_num_rows($result);
            // echo $num;
            if ($num == 0){
                $sql = "INSERT INTO class_token (code, username, `role`) VALUES ('$joincode', '$username', '$role')";
                $result = mysqli_query($conn, $sql);
                // echo mysqli_error($result);
                echo json_encode ([
                    "message" =>"Sucessful insertion",
                    "username" => $_SESSION['username']
                ]);
                exit;
            }
            else{
                echo json_encode ([
                    "message" =>"Already in class",
                    "username" => $_SESSION['username']
                ]);
                exit;
            }
        }
        else{
            echo json_encode ([
                "message" =>"Invalid class code",
                "username" => $_SESSION['username']
            ]);
            exit;
        }
    }
?>
