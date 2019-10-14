<?php
 
	// Importing DBConfig.php file.
	include 'DBConfig.php';
	 
	// Creating connection.
	 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 
	 // Getting the received JSON into $json variable.
	 $json = file_get_contents('php://input');
	 
	 // decoding the received JSON and store into $obj variable.
	 $obj = json_decode($json,true);
	 $domain_name = "http://192.168.1.111/reactnative/" ;
	
	// Image uploading folder.
	$target_dir = "uploads";
	
	// Generating random image name each time so image name will not be same .
	$target_dir = $target_dir . "/" .rand() . "_" . time() . ".jpeg";
	
	 
	 // Populate product name from JSON $obj array and store into $product_name.
	$id = $_POST['id'];
	$title = $_POST['title'];
	// $id = $_GET['id'];
	 
	// Populate product number from JSON $obj array and store into $product_number.
	$description = $_POST['description'];
	 
	// Populate product details from JSON $obj array and store into $product_details.
	$thoigian = $_POST['thoigian'];
	// echo $id;
	// echo $title;
	// ECHO $description;
	// echo $thoigian;
	 // Creating SQL query and insert the record into MySQL database table.
if(move_uploaded_file($_FILES['image']['tmp_name'], $target_dir)){
		
		// Adding domain name with image random name.
		$target_dir = $domain_name . $target_dir ;		 
 $Sql_Query = "UPDATE work SET title= '$title', description = '$description', thoigian = '$thoigian',image_path='$target_dir' WHERE id = $id";
	 
 
	 if(mysqli_query($con,$Sql_Query)){
	 
			 // If the record inserted successfully then show the message as response. 
			$MSG = 'Sua thanh ccng' ;
			 
			// Converting the message into JSON format.
			$json = json_encode($MSG);
			 
			// Echo the message on screen.
			// We would also show this message on our app.
			 echo $json ;
	 
	 }
	 else{
	 
			echo 'Không sửa được';
	 
	 }
	mysqli_close($con);
	}
?>
