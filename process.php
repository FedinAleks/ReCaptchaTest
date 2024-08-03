<?php
$secretKey = '6LdzRB0qAAAAAGQdrqjHzM6rtnl4wvoiSlhZXq7G';
$token = $_POST['recaptcha_response'];

$response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=$secretKey&response=$token");
$responseKeys = json_decode($response, true);

if(intval($responseKeys["success"]) !== 1) {
    echo 'reCAPTCHA validation failed.';
} else {
    echo 'reCAPTCHA validation successful.';
}
?>


