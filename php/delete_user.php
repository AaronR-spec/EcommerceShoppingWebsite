<?php

/* Include "configuration.php" file */
require_once "configuration.php";

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$user_id = ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));

$query = "SELECT access FROM users WHERE id = :id";

$searchQuery = $user_id;
$statement = $dbConnection->prepare($query);
$statement->bindParam(":id", $searchQuery, PDO::PARAM_STR);
$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);
if ($statement->rowCount() > 0) 
{
if( $result[0]->access == 0){
/* Perform query */
$query = "DELETE FROM users WHERE id = :id";

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
?>