<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
    session_start();
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);

    if ($_SERVER["REQUEST_METHOD"] == 'POST'){
        include 'dbconnect.php';
        //$username = "bertli@buffalo.edu";//Current username will change when session is saved across pages
       	//$attendanceCode = $_POST['code'];
	$attendanceCode = $data['code'];
	date_default_timezone_set("America/New_York");
        $currentDate = date('Y-m-d');
        $username = $_SESSION['username'];
        //$attendanceCode = 'UN3M7';
	//echo "hello world";
	//date_default_timezone_set("America/New_York");
	//echo date("h:i:sa");



	//echo $attendanceCode;
        $sql = "Select * from AttendanceCode where code='$attendanceCode'";
	//echo '$attendanceCode';
        $result = mysqli_query($conn, $sql);
        $num = mysqli_num_rows($result);
        $row = mysqli_fetch_assoc($result);
	//echo $num;
        $timestamp = $row['date'];
        $class = $row['class token']; // class for attendance code
	echo $class;
        $dbDate = date("Y-m-d", strtotime($timestamp));
	mysqli_free_result($result);



        $sql = "Select * from class_token where username='$username' AND code = '$class'";
        $result = mysqli_query($conn, $sql);
	echo mysqli_error($conn);
        $row2 = mysqli_fetch_assoc($result);
	$num2 = mysqli_num_rows($result);
	$userClass = $row2['code']; //class that user is in
	echo $userClass;

	$sql = "Select * from Attendance where code='$attendanceCode' AND username = '$username'";
	$result = mysqli_query($conn,$sql);
	$num3 = mysqli_num_rows($result);
	echo mysqli_error($conn);

	echo $num3;
	echo $num;
	//echo $dbDate;
	echo $currentDate;
		

       if($num == 1 && $dbDate === $currentDate && $userClass === $class && $num3 == 0){
           $sql = "INSERT INTO Attendance (username, `class token`, code)
             VALUES ('$username', '$class', '$attendanceCode')";
            $result = mysqli_query($conn, $sql);
            $passwordtocompare3 = "SELECT points FROM Points WHERE username = '$username'";
            $result3 = mysqli_query($conn, $passwordtocompare3);
	$row3 = mysqli_fetch_all($result3); 
	$row4 = $row3[0][0];
            $result4 = $row4 + 10;
            $sql3 = "UPDATE Points SET points = '$result4' WHERE username = '$username'";
            $result9 = mysqli_query($conn, $sql3);
		echo mysqli_error($conn);

                // echo "insertion success";
                http_response_code(200);
        } else{
                // echo "invalid code";
                http_response_code(500);
        }
        //echo "invalid code";
    }
    
?>