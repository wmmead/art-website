<?php 
	
	if(isset($_POST['name']))
	{
		
		$name = $_POST['name'];
		$email = $_POST['email'];
		$comment = $_POST['comment'];
		
		//print "$name<br>";
		//print "$email<br>";
		//print "$comment<br>";
		if(!empty($name) && !empty($email) && !empty($comment))
		{
			
			$re_email = "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/";
			
			if(preg_match($re_email, $email))
			{
				
$message = "Name: $name, 
Email: $email,  
Comments: $comment";

							
				send_mail($email, $message);
				//echo "<h2>Message sent by llama express!</h2>";
				//echo $message;
			}
			//else { echo "you did not format your email properly"; }
		}
		
		//else { echo "You did not fill in the required fields"; }
	
	}
	
	function send_mail($email, $message)
	{
		$to = "webform@wmmead.com";
		$from = $email;
		$subject = "Mail from webform on wmmead.com";
		$headers = "From: {$email}" . "\r\n" . 'Reply-To:' . $email . "\r\n" . 'X-Mailer: PHP/' . phpversion();
		mail($to, $subject, $message, $headers);
	}

?>