<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();
/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$user = explode(",",ltrim(rtrim(filter_input(INPUT_POST, "user", FILTER_SANITIZE_STRING))));
$hash = password_hash( $user[2], PASSWORD_DEFAULT);

$query = "INSERT INTO users (name, user, password)"
                . "VALUES ( :name,:email,:password)";

$statement = $dbConnection->prepare($query);
$statement->bindParam(":name", $user[0], PDO::PARAM_STR);
$statement->bindParam(":email", $user[1], PDO::PARAM_STR);
$statement->bindParam(":password", $hash, PDO::PARAM_STR);


$statement->execute();

if ($statement->rowCount() > 0) 
{
    $_SESSION["login"] = true;
$_SESSION["user"] = $user[1];
$to_email = $user[1];
$subject = "Registration";

 $body = '<html>
            <body style="background-color: white; color: black; border-radius: 20px; box-shadow: 3px 3px 2px grey;">
            <div style="width: 100%; text-align: center; margin-bottom: 20px;"><h1 style="margin-bottom: 0px;">Thanks For Registering</h1><br>Hi ' .  $user[0] . '. Thank-you for your sign up we greatly appricate it!</div>
            <table cellspacing="0" style="border:2px; width: 100%; text-align: center;">
            <tr>
            <td><img style="max-width: 100%;" src= "http://localhost/FullStackCa2Website/images/bg-01.jpg" alt="emailImage"></td>
            </tr>
            <tr>
            <td>Name: ' .  $user[0] . '</td>
            </tr>
            <tr>
            <td>Email: ' .  $user[1] . '</td>
            </tr>
            </table>
            <div style="width: 100%; text-align: center; margin-top: 20px; padding-bottom: 20px;">Do Not Forget To Look At Our Products.
            <br> contact us on our website <a style="color: blue;" href="http://localhost/FullStackCa2Website/index.html"</a></div>
            </body>
             </html>';
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
$headers .= "From: cozastore123@gmail.com";

mail($to_email, $subject, $body, $headers);
 
}



?>