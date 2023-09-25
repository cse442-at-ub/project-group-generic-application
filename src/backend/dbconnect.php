<?php
    $servername = "oceanus.cse.buffalo.edu";
    $username = "bchow3";
    $password = "50405819";

    $database = "cse442_2023_fall_team_ab_db";

    $conn = mysqli_connect($servername, $username, $password, $database);

    if ($conn){
        echo "success";
    }
    else {
        die("Error". mysqli_connect_error())
    }
?>

