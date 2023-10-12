<?php
session_start();
// Check if the user is already logged in
if (isset($_SESSION['username'])) {
    header("Location: dashboard.php");
    exit;
}
// Check if the form is submitted
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Replace these with your actual database credentials
    $db_host = "localhost";
    $db_user = "your_db_username";
    $db_pass = "your_db_password";
    $db_name = "your_db_name";
    // Create a database connection
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
    // Check for connection errors
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    // Retrieve user input
    $username = $_POST['username'];
    $password = $_POST['password'];
    // Query the database for the user
    $sql = "SELECT * FROM users WHERE username = '$username' AND password = '$password'";
    $result = $conn->query($sql);
    // Check if a user with the provided credentials exists
    if ($result->num_rows == 1) {
        // Authentication successful, store user information in the session
        $_SESSION['username'] = $username;
        header("Location: dashboard.php");
        exit;
    } else {
        // Authentication failed
        $error_message = "Invalid username or password";
    }
    // Close the database connection
    $conn->close();
}
?>

<!doctype html>
    
    <html lang="en">
      
    <head>
        
        <!-- Required meta tags --> 
        <meta charset="utf-8"> 
        <meta name="viewport" content=
            "width=device-width, initial-scale=1, 
            shrink-to-fit=no">
        
        <!-- Bootstrap CSS --> 
        <link rel="stylesheet" href=
    "https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity=
    "sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossorigin="anonymous">  
    </head>
        
    <body>
        
    <?php
        
        if($showAlert) {
        
            echo ' <div class="alert alert-success 
                alert-dismissible fade show" role="alert">
        
                <strong>Success!</strong> Your account is 
                now created and you can login. 
                <button type="button" class="close"
                    data-dismiss="alert" aria-label="Close"> 
                    <span aria-hidden="true">×</span> 
                </button> 
            </div> '; 
        }
        
        if($showError) {
        
            echo ' <div class="alert alert-danger 
                alert-dismissible fade show" role="alert"> 
            <strong>Error!</strong> '. $showError.'
        
           <button type="button" class="close" 
                data-dismiss="alert aria-label="Close">
                <span aria-hidden="true">×</span> 
           </button> 
         </div> '; 
       }
            
        if($exists) {
            echo ' <div class="alert alert-danger 
                alert-dismissible fade show" role="alert">
        
            <strong>Error!</strong> '. $exists.'
            <button type="button" class="close" 
                data-dismiss="alert" aria-label="Close"> 
                <span aria-hidden="true">×</span> 
            </button>
           </div> '; 
         }
       
    ?>
        
    <div class="container my-4 ">
        
        <h1 class="text-center">Signup Here</h1> 
        <form action="signup.php" method="post">
        
            <div class="form-group"> 
                <label for="username">Username</label> 
            <input type="text" class="form-control" id="username"
                name="username" aria-describedby="emailHelp">    
            </div>
        
            <div class="form-group"> 
                <label for="password">Password</label> 
                <input type="password" class="form-control"
                id="password" name="password"> 
            </div>
        
            <div class="form-group"> 
                <label for="cpassword">Confirm Password</label> 
                <input type="password" class="form-control"
                    id="cpassword" name="cpassword">
        
                <small id="emailHelp" class="form-text text-muted">
                Make sure to type the same password
                </small> 
            </div>      
        
            <button type="submit" class="btn btn-primary">
            SignUp
            </button> 
        </form> 
    </div>
        
    <!-- Optional JavaScript --> 
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
        
    <script src="
    https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="
    sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous">
    </script>
        
    <script src="
    https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity=
    "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" 
        crossorigin="anonymous">
    </script>
        
    <script src="
    https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" 
        integrity=
    "sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous">
    </script> 
    </body> 
    </html>
