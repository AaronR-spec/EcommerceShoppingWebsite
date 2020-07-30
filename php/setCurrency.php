<?php

session_start();
$currency = ltrim(rtrim(filter_input(INPUT_POST, "currency", FILTER_SANITIZE_STRING)));
$_SESSION["currency"] = $currency;
if ($_SESSION["currency"] === "pound") {
    $_SESSION["symbol"] = "£";
} else {
    $_SESSION["symbol"] = "€";
}
?>