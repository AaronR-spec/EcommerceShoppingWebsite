<?php

session_start();
$json = "";
if ($_SESSION['details'] === true) {
    $json .= '{"firstname":"' . $_SESSION['firstname'] . '","secondname":"' . $_SESSION['secondname'] . '","address":"' . $_SESSION['address'] . '","city":"' . $_SESSION['city'] . '","country":"' . $_SESSION['country'] . '","phone":"' . $_SESSION["phone"] . '","email":"' . $_SESSION['email'] . '","postcode":"' . $_SESSION['postcode'] . '","ordernotes":"' . $_SESSION['ordernotes'] . '","company":"' . $_SESSION['company'] . '","symbol":"' . $_SESSION['symbol'] . '","total":"' . $_SESSION["shippingTotal"] . '"}';
}
echo $json;
?>