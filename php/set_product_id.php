<?php

session_start();
$id = ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));
$_SESSION["product_id"] = $id;
?>