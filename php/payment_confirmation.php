<?php

session_start();
$stripeToken = ltrim(rtrim(filter_input(INPUT_POST, "stripeToken", FILTER_SANITIZE_STRING)));
if (empty($stripeToken)) {
    header("location: index.html"); // deal with invalid input
    exit();
}


require_once 'configuration.php';
// make stripe payment
require_once('./Stripe/init.php');
\Stripe\Stripe::setApiKey($privateStripeKey);
try {
    $charge = \Stripe\Charge::create(array(
                "amount" => $_SESSION["shippingTotal"] . "00",
                "currency" => "eur",
                "card" => $stripeToken,
                "description" => "Stripe")
    );
} catch (Stripe_CardError $e) {
    echo("Your card has been declined.<br>Error Details: " . $e . "<br><br><a href='index.html'>Click here to continue</a>");
    die();
} catch (Exception $e) {
    echo("Your card has been declined.<br>Error Details: " . $e . "<br><br><a href='index.html'>Click here to continue</a>");
    die();
}
// end of Stripe payment code
?>