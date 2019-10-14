<?php
 

	include 'DBConfig.php';
	 $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
	 $json = file_get_contents('php://input');
	 $obj = json_decode($json,true);
	$product_name = $obj['product_name'];
	$product_number = $obj['product_number'];
	$product_details = $obj['product_details'];
	$Sql_Query = "insert into Products_Table (product_name,product_number,product_details) values ('$product_name','$product_number','$product_details')";
 
	 if(mysqli_query($con,$Sql_Query)){
			$MSG = 'Thêm thành công' ;
			$json = json_encode($MSG);
			 echo $json ;
	 
	 }
	 else{
	 
			echo 'Thất bại';
	 }
	mysqli_close($con);
	
?>