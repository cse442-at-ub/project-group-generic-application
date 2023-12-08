<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');

session_start();
include 'dbconnect.php';
//echo "success";
 //Check if the user is already logged in
if (isset($_SESSION['username'])) {
    $username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
    echo json_encode(array("status" => "already connected"));
    ob_end_clean();
    $conn->close();
    exit;
}

$jsonData = file_get_contents('php://input');

$data = json_decode($jsonData, true);
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $data["email"];;
    $password = $data["password"];;
    //$password = password_hash($password, PASSWORD_DEFAULT);
    // Retrieve user input
    // Query the database for the user
    $sql = "SELECT * FROM userSignup WHERE username = '$email'";
    echo "$sql";
    echo "$password";
    $result = $conn->query($sql);
    $passwordtocompare = "SELECT password FROM userSignup WHERE password = '$password'";
    $row = mysqli_fetch_assoc($result);
       if (mysqli_num_rows($result) == 1 && password_verify($password, $row['password'])) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $email;
        //header("Location: dashboard.php");
        print_r($row);
        echo  "login_success!!!";
       $username = $_SESSION['username']; // email to be retrieved
	$passwordtocompare10 = "SELECT role FROM userSignup WHERE username = '$username'";
	$result10 = mysqli_query($conn, $passwordtocompare10);
	$row10 = mysqli_fetch_all($result10);
	$row20 = $row10[0][0]; // returns student or teacher or whatever is in row
	echo $row20;
	$passwordtocompare2 = "SELECT code FROM class_token WHERE username = '$username'";
   	 $result2 = mysqli_query($conn, $passwordtocompare2);
  	  $row2 = mysqli_fetch_all($result2); 
  	  $row20 = $row2[0];// classes to be retrieved
	$JoinedClass = array("JoinedClass" => $row2);
    echo json_encode($JoinedClass); //classes joined   
        $conn->close();
        exit;
    } else {
        //Authentication failed
        $error_message = "Invalid username or password";
        print_r($row);
        echo "invalid";
    }
     //Close the database connection
    $conn->close();
}
//{
//    echo "invalid post";
//}
?>