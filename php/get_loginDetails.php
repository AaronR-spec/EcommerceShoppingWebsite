<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();
//session_destroy();
//session_abort();
//session_reset();
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception

if( !isset($_SESSION["login"]) )
{
    echo '[]';
    exit();
}
else{
$query = "SELECT user FROM users WHERE user = :userName";

$searchQuery = $_SESSION["user"];
$statement = $dbConnection->prepare($query);
$statement->bindParam(":userName", $searchQuery, PDO::PARAM_STR);
$statement->execute();
$json = "[";
if ($statement->rowCount() > 0) {
    /* Get field information for all fields */
    $isFirstRecord = true;
    $result = $statement->fetchAll(PDO::FETCH_OBJ);
    foreach ($result as $row) {
        if (!$isFirstRecord) {
            $json .= ",";
        }

        $json .= '{"access":"' . $_SESSION["access"]. '","user":"' . $row->user .  '"}';

        $isFirstRecord = false;
    }
}
$json .= "]";

/* Send the $json string back to the webpage that sent the AJAX request */
echo $json;
}
?>