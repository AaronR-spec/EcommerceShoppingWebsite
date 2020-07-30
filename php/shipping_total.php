<?php

session_start();
if (!empty($_SESSION["cart"])) {
    $_SESSION["shippingTotal"] = $_SESSION["totalPrice"];
    if ($_SESSION["symbol"] === "£") {
        $_SESSION["shippingTotal"] = $_SESSION["shippingTotal"] + 10;
    } else {
        $_SESSION["shippingTotal"] = $_SESSION["shippingTotal"] + 5;
    }
    echo $_SESSION["symbol"] . number_format((float) $_SESSION["shippingTotal"], 2, '.', '');
} else {
    echo "";
}
//$_SESSION["symbol"].number_format((float)$_SESSION["totalPrice"], 2, '.', '')
?>