<?php

/* Include "configuration.php" file */
require_once "configuration.php";
session_start();
/* Connect to the database */
$dbConnection = new PDO("mysql:host=$dbHost;dbname=$dbName", $dbUsername, $dbPassword);
$dbConnection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);   // set the PDO error mode to exception
$chartSearch = "";
$total = 0;
$_SESSION["duplicate"] = array_count_values($_SESSION["cart"]);
foreach (array_values($_SESSION["cart"]) as $i => $chart) {
    if ($i === 0) {
        $chartSearch = $chart . " ";
    }
    $chartSearch = $chartSearch . "OR id = " . $chart . " ";
}


if ($chartSearch != "") {
    $query = "SELECT  DISTINCT * FROM products WHERE id = " . $chartSearch;
} else {
    echo "[]";
    exit();
}

/* Perform query */
$query = "SELECT  DISTINCT * FROM products WHERE id = " . $chartSearch;


$statement = $dbConnection->prepare($query);
$statement->execute();

$symbol = "€";
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
        if ($_SESSION["currency"] === "pound") {
            $row->price = $row->price * 0.855926;
            $symbol = "£";
        }
        $total += $row->price * current($_SESSION["duplicate"]);
        /* NOTE: json strings MUST have double quotes around the attribute names, as shown below */
        $json .= '{"id":"' . $row->id . '","title":"' . $row->title . '","price":"' . $row->price . '","image":"' . $row->image . '","description":"' . $row->description . '","currency":"' . $_SESSION["symbol"] . '","amount":"' . current($_SESSION["duplicate"]) . '"}';
        next($_SESSION["duplicate"]);

        $isFirstRecord = false;
    }
}
$json .= "]";
$_SESSION["totalPrice"] = $total;
/* Send the $json string back to the webpage that sent the AJAX request */
echo $json;




/* Provide a link for the user to proceed to a new webpage or automatically redirect to a new webpage */
/* This webpage never actually displays. Instead, it runs in the background on the server. */
/* The data contained in the line of code "echo $json;" is automatically sent back inside the "http_request.responseText" of the calling function. */
/* Therefore, no feedback or way to proceed is necessary. */
?>