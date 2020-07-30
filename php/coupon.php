<?php

session_start();
$coupon = ltrim(rtrim(filter_input(INPUT_POST, "coupon", FILTER_SANITIZE_STRING)));
if ($_SESSION["discount"] == $_SESSION["CODE24"]) {
    $_SESSION["discount"] = true;
} else {
    $_SESSION["discount"];
}
?>