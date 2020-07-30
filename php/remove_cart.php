<?php

session_start();
$id = ltrim(rtrim(filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING)));
echo $id;
print_r($_SESSION['cart']);

//if (isset($_SESSION["cart"][$id]) && $_SESSION["cart"][$id] > 0) {
//    $_SESSION["cart"][$id] = $_SESSION["cart"][$id] - 1;
//    if ($_SESSION['cart'][$id] === 0) {
//        unset($_SESSION['cart'][$id]);
//    }
//}


foreach (array_values($_SESSION["cart"]) as $i => $chart) {
    if ($chart === $id) {
        print_r($chart . "= chart , " . $id . "=id");
        // $_SESSION["cart"][$id] = 1

        unset($_SESSION["cart"][array_search($chart, $_SESSION["cart"])]);
        exit();
    }
}
?>