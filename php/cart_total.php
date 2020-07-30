<?php

/* Include "configuration.php" file */
session_start();
if (empty($_SESSION["cart"])) {
    echo"No Items";
} else {
    echo $_SESSION["symbol"] . number_format((float) $_SESSION["totalPrice"], 2, '.', '');
}
?>