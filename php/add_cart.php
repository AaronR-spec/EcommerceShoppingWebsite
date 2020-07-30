<?php

session_start();
$id = ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));
if (empty($_SESSION["cart"])) {
    $_SESSION["cart"] = array(0 => $id);
    exit();
}

array_push($_SESSION["cart"], $id);
exit();
?>