<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception

if($_SESSION["access"] == 1){
/* Perform query */
$query = "SELECT name FROM users WHERE access = 1";
$statement = $dbConnection->prepare($query);
$statement->execute();

/* Manipulate the query result */
$json = "[";
if ($statement->rowCount() > 0) {
    /* Get field information for all fields */
    $isFirstRecord = true;
    $result = $statement->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $row) {
        if (!$isFirstRecord) {
            $json .= ",";
        }
       
        $json .= '{"name":"' . $row->name . '"}';

        $isFirstRecord = false;
    }
}
$json .= "]";

/* Send the $json string back to the webpage that sent the AJAX request */
echo $json;
}
else
{
    echo "";
}

