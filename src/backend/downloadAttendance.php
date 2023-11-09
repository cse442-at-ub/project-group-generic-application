<?php
    ob_start();
    include 'dbconnect.php';
    ob_end_clean();
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $classCode = $_POST['class_code'];
        //$classCode = "ABCD";
        $sql = $sql = "SELECT * FROM `Attendance` WHERE `class token`= \"$classCode\"";
        $result = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($result);
        if ($num > 1){
            $csvFileName = "attendance_report.csv";
            $data = array("username", "class code", "date");
            header('Content-Type: application/csv');
            header('Content-Disposition: attachment; filename="' . $csvFileName . '"');
            $csvFile = fopen("php://output", "w");
            fputcsv($csvFile, $data);
            while ($row = mysqli_fetch_assoc($result)){
                fputcsv($csvFile, [$row['username'], $row['class token'], $row['date']]);
            }
            fclose($csvFile);
        }

        //readfile($csvFileName);
    }
?>