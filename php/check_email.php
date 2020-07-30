<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$user =ltrim(rtrim(filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING)));


$query = "SELECT user FROM users where user = :userName";

$statement = $dbConnection->prepare($query);
$statement->bindParam(":userName", $user, PDO::PARAM_STR);
$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);
if($statement->rowCount() > 0)
{
    echo"true";
}
else
{
    echo "false";
}


?>