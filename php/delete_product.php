<?php

/* Include "configuration.php" file */
require_once "configuration.php";

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$user_id = ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));
if($_SESSION["access"] == 1){
if ($statement->rowCount() > 0) 
{
/* Perform query */
$query = "DELETE FROM products WHERE id = :id";

$searchQuery = $user_id;
$statement = $dbConnection->prepare($query);
$statement->bindParam(":id", $searchQuery, PDO::PARAM_STR);
$statement->execute();

/* Send the $json string back to the webpage that sent the AJAX request */

}
else
{
    echo '';
    
}
}
else
{
    echo '';
    
}

/* Provide a link for the user to proceed to a new webpage or automatically redirect to a new webpage */
/* This webpage never actually displays. Instead, it runs in the background on the server. */
/* The data contained in the line of code "echo $json;" is automatically sent back inside the "http_request.responseText" of the calling function. */
/* Therefore, no feedback or way to proceed is necessary. */
?>