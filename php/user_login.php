<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();

/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$user = explode(",",ltrim(rtrim(filter_input(INPUT_POST, "user", FILTER_SANITIZE_STRING))));


$query = "SELECT * FROM users where user = :userName";

$searchQuery = "$user[0]";
$statement = $dbConnection->prepare($query);
$statement->bindParam(":userName", $searchQuery, PDO::PARAM_STR);
$statement->execute();
$result = $statement->fetchAll(PDO::FETCH_OBJ);

if ($statement->rowCount() > 0) 
{

if(password_verify($user[1], $result[0]->password))
{
    $_SESSION["login"] = true;
    $_SESSION["user"] = $user[0];
    $_SESSION["access"] =  $result[0]->access;
$json = "[";

    $isFirstRecord = true;
    foreach ($result as $row) {

        $json .= '{"id":"' . $row->id . '","user":"' . $row->user . '","password":"' . $row->password  . '"}';

        $isFirstRecord = false;
    }
    $json .= "]";
    
echo $json;
}
else
{

    echo"[]";
}

}
else
{

    echo"[]";
}
?>