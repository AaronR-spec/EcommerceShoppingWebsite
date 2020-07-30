<?php

session_start();
$_SESSION['firstname'] = ltrim(rtrim(filter_input(INPUT_POST, "firstName", FILTER_SANITIZE_STRING)));
$_SESSION['secondname'] = ltrim(rtrim(filter_input(INPUT_POST, "secondName", FILTER_SANITIZE_STRING)));
$_SESSION['address'] = ltrim(rtrim(filter_input(INPUT_POST, "address", FILTER_SANITIZE_STRING)));
$_SESSION['city'] = ltrim(rtrim(filter_input(INPUT_POST, "city", FILTER_SANITIZE_STRING)));
$_SESSION['country'] = ltrim(rtrim(filter_input(INPUT_POST, "country", FILTER_SANITIZE_STRING)));
$_SESSION['phone'] = ltrim(rtrim(filter_input(INPUT_POST, "phone", FILTER_SANITIZE_STRING)));
$_SESSION['email'] = ltrim(rtrim(filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING)));
$_SESSION['postcode'] = ltrim(rtrim(filter_input(INPUT_POST, "postcode", FILTER_SANITIZE_STRING)));
$_SESSION['ordernotes'] = ltrim(rtrim(filter_input(INPUT_POST, "ordernotes", FILTER_SANITIZE_STRING)));
$_SESSION['company'] = ltrim(rtrim(filter_input(INPUT_POST, "company", FILTER_SANITIZE_STRING)));

if (empty($_SESSION['phone'])) {
    $_SESSION['details'] = false;
} else {
    $_SESSION['details'] = true;
}
?>
