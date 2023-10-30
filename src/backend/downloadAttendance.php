<?php

    include 'dbconnect.php';

    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $classCode = $_POST['class_code'];
        $sql = "SELECT * FROM Attendance WHERE `class token`= $classCode";
        $result = mysqli_query($conn, $sql);
        
        $csvFileName = "attendace_report.csv";
        $csvFile = fopen($csvFileName, "w");
        fputcsv($csvFile, ["Username", "Class Code", "Date"]);

        while ($row = mysqli_fetch_assoc($result)){
            fputcsv($csvFile, [$row['username'], $row['class token'], $row['date']]);
        }

        fclose($csvFile);

        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename="' . $csvFileName . '"');

        readfile($csvFileName);
    }
?>