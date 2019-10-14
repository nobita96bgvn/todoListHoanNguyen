<?php

	include 'DBConfig.php';
	$conn = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);



	// Type your website name or domain name here.
	$domain_name = "http://192.168.1.111/reactnative/" ;
	
	// Image uploading folder.
	$target_dir = "uploads";
	
	// Generating random image name each time so image name will not be same .
	$target_dir = $target_dir . "/" .rand() . "_" . time() . ".jpeg";
	
	// Receiving image tag sent from application.
	$title = $_POST["title"];
	$description = $_POST["description"];
	$thoigian = $_POST["thoigian"];
	
	// Receiving image sent from Application	
	if(move_uploaded_file($_FILES['image']['tmp_name'], $target_dir)){
		
		// Adding domain name with image random name.
		$target_dir = $domain_name . $target_dir ;
		
		// Inserting data into MySQL database.
		$Sql_Query = "insert into work (title,description,thoigian,image_path) values ('$title','$description','$thoigian','$target_dir')";
		
		if(mysqli_query($con,$Sql_Query)){
	 
			 // If the record inserted successfully then show the message as response. 
			$MSG = 'Thêm thành công' ;
			 
			// Converting the message into JSON format.
			$json = json_encode($MSG);
			 
			// Echo the message on screen.
			// We would also show this message on our app.
			 echo $json ;
	 
	 }
	 else{
	 
			echo 'Không thêm được';
	 
	 }
	mysqli_close($con);
	}


?>
