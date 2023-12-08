<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: Content-Type");
    header('Content-Type: application/json');
    session_start();
    ob_start();
    include 'dbconnect.php';
    ob_end_clean();
    if($_SERVER["REQUEST_METHOD"] == "POST"){
	$data = json_decode(file_get_contents('php://input'), true);
	$classCode = $data['class_code'];
        //$classCode = $_POST['class_code'];
        //$classCode = "ABDF";
	$username = $_SESSION['username'];
	//$username = $_POST['username'];
	//$username = "bertli@buffalo.edu";
	//$classCode = classCode[];

	$sql = "Select * from class_token where username=\"$username\" AND code = \"$classCode\"";
	$result = mysqli_query($conn, $sql);
	echo mysqli_error($conn);
	$row = mysqli_fetch_assoc($result);
	$role = $row['role'];




	/*$csvFileName = "attendance_reports.csv";
            $data = array("username", "class code", "date", $username, $classCode);
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="' . $csvFileName . '"');
            $csvFile = fopen("php://output", "w");
            fputcsv($csvFile, $data);
		fputcsv($csvFile, $username);
	 fclose($csvFile);*/






	//echo $role;
	if( $role == "Professor"){
	  $sql = "SELECT * FROM `Attendance` WHERE `class token`= \"$classCode\" ORDER BY date DESC";
	} else{
		$sql = "SELECT * FROM `Attendance` WHERE `class token` = \"$classCode\" AND `username`  = \"$username\" ORDER BY date DESC";	    
        }
        //$sql = "SELECT * FROM `Attendance` WHERE `class token`= \"$classCode\" ORDER BY date ASC";
        $result = mysqli_query($conn, $sql);
	echo mysqli_error($conn);
        $num = mysqli_num_rows($result);
        if ($num > 0){
            $csvFileName = "attendance_reports.csv";
            $data = array("username", "class code", "date");
            header('Content-Type: text/csv');
            header('Content-Disposition: attachment; filename="' . $csvFileName . '"');
            $csvFile = fopen("php://output", "w");
            fputcsv($csvFile, $data);
            while ($row = mysqli_fetch_assoc($result)){
                fputcsv($csvFile, [$row['username'], $row['class token'], $row['date']]);
            }
            fclose($csvFile);
	    //echo "sucessful download";
        }

        readfile($csvFileName);
    }
    else{
	echo "did not reach post";
	}
?>
