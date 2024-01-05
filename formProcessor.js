(function () {

	"use strict";

	document.getElementById('contactform').addEventListener('submit', validateForm);

	//Messages to be put in the message element when there is an error or success...
	// The last element in this array loads the preloader css. Looks really cool...
	const feedBackMessage = [

		'<div class="error"><h3>Ooops!</h3><p>The name field is reqired, that\'s how I know who you are. Please fix that and try again!</p></div>',
		'<div class="error"><h3>Ooops!</h3><p>You forgot to give me a valid email address. Please fix that and try again!</p></div>',
		'<div class="error"><h3>Ooops!</h3><p>Somehow you forgot to type in your comment. Please type in your comment and try again!</p></div>',
		'<div class="success"><h3>Thanks!</h3><p>Your thoughts have been sent, and I look forward to reading them.</p></div>',
		'<div class="preloader"><div class="loading-dot"></div></div>'

	];

	// The actual form validation function. Kicks off the ajax submission at the bottom.	
	function validateForm(event) {
		event.preventDefault();
		const reName = /^[a-zA-Z]+(([\'\- ][a-zA-Z])?[a-zA-Z]*)*$/;
		const reEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

		let counter = 0;

		if (!reName.test(document.getElementById('name').value)) {
			displayMessage(document.getElementById('name'), feedBackMessage[0]);
			counter++;
		}

		else if (!reEmail.test(document.getElementById('email').value)) {
			displayMessage(document.getElementById('email'), feedBackMessage[1]);
			counter++;
		}

		else if (document.getElementById('comment').value == "") {
			displayMessage(document.getElementById('comment'), feedBackMessage[2]);
			counter++;
		}

		else if (counter === 0) {

			const nameValue = encodeURIComponent(document.getElementById('name').value);
			const emailValue = encodeURIComponent(document.getElementById('email').value);
			const commentValue = encodeURIComponent(document.getElementById('comment').value);
			const parameters = "name=" + nameValue + "&email=" + emailValue + "&comment=" + commentValue;
			//console.log(parameters);
			// Submit form via ajax...
			sendData(parameters);
		}
	}

	// This displays error messages if the fields are not filled out...
	function displayMessage(field, message) {
		document.getElementById('message').setAttribute("class", "show-message");
		document.getElementById('message').innerHTML = message;
		setTimeout(function () {

			document.getElementById('message').setAttribute("class", "show-message fadeOutElement");
			setTimeout(function () {

				document.getElementById('message').setAttribute("class", "hide-message");
				document.getElementById(field.id).focus();

			}, 2000);

		}, 2000);
	}

	// A slightly modified function for the success message. I would like to combine these two functions into one.
	function displaySuccess(message) {
		document.getElementById('message').setAttribute("class", "show-message");
		document.getElementById('message').innerHTML = message;
		setTimeout(function () {

			document.getElementById('message').setAttribute("class", "show-message fadeOutElement");
			setTimeout(function () {

				document.getElementById('message').setAttribute("class", "hide-message");
				document.getElementById('name').value = '';
				document.getElementById('email').value = '';
				document.getElementById('comment').value = '';

			}, 2000);

		}, 2000);
	}

	// AJAX function for sending data to the processor file.
	function sendData(data) {
		const req = new XMLHttpRequest();
		const url = "emailprocessor.php";

		req.onreadystatechange = function () {
			useResponse(req);
		};

		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		req.send(data);
	}

	// AJAX function that runs when data is successfully sent.
	function useResponse(req) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				document.getElementById('message').setAttribute("class", "show-message");
				document.getElementById('message').innerHTML = feedBackMessage[4];
				//console.log(req.responseText);

				setTimeout(function () {

					displaySuccess(feedBackMessage[3]);

				}, 2000);
			}
		}
		else {
			document.getElementById('message').setAttribute("class", "show-message");
			document.getElementById('message').innerHTML = feedBackMessage[4];
		}
	}

}());
