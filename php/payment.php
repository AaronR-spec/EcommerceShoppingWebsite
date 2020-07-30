<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Payment</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="author" content="colorlib.com">

        <!--===============================================================================================-->	
        <link rel="icon" type="image/png" href="../images/icons/favicon.png"/>
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../vendor/bootstrap/css/bootstrap.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../fonts/font-awesome-4.7.0/css/font-awesome.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../fonts/iconic/css/material-design-iconic-font.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../fonts/linearicons-v1.0.0/icon-font.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../vendor/animate/animate.css">
        <!--===============================================================================================-->	
        <link rel="stylesheet" type="text/css" href="../vendor/css-hamburgers/hamburgers.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../vendor/animsition/css/animsition.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../vendor/select2/select2.min.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../vendor/perfect-scrollbar/perfect-scrollbar.css">
        <!--===============================================================================================-->
        <link rel="stylesheet" type="text/css" href="../css/util.css">
        <link rel="stylesheet" type="text/css" href="../css/main.css">
        <script src="../js/load_products.js" type="text/javascript"></script>
        <link href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" rel="stylesheet">
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <!-- MATERIAL DESIGN ICONIC FONT -->
        <link href="../fonts/material-design-iconic-font/css/material-design-iconic-font.css" rel="stylesheet" type="text/css"/>
        <!-- STYLE CSS -->
        <link href="../css/style.css" rel="stylesheet" type="text/css"/>
    </head>

    <body  id="paymentPage" class="animsition" onload="ajaxPaymentCart()">
        <?php
        require_once 'configuration.php';
        session_start();
        ?>
        <!-- Header -->
        <div id="snackBarError">Invalid feild</div>
        <header class="header-v4">
            <!-- Header desktop -->
            <div class="container-menu-desktop">
                <!-- Topbar -->
                <div class="top-bar">
                    <div class="content-topbar flex-sb-m h-full container">
                        <div class="left-top-bar">
                            Free shipping for all orders!, Happy holidays from us
                        </div>

                        <div  class="right-top-bar flex-w h-full">
                            <a href="#" class="flex-c-m trans-04 p-lr-25">
                                Help & FAQs
                            </a>

                            <a href="#" class="flex-c-m trans-04 p-lr-25">
                                My Account
                            </a>

                            <a href="payment.html" class="flex-c-m trans-04 p-lr-25" onclick="setCurrency('euro');">
                                <span>EUR</span>
                            </a>

                            <a href="payment.html" class="flex-c-m trans-04 p-lr-25" onclick="setCurrency('pound');">
                                <span>GBP</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="wrap-menu-desktop how-shadow1">
                    <nav class="limiter-menu-desktop container">

                        <!-- Logo desktop -->		
                        <a href="../index.html" class="logo">
                            <img src="../images/icons/logo-01.png" alt="IMG-LOGO">
                        </a>

                        <!-- Menu desktop -->
                        <div class="menu-desktop">
                            <ul class="main-menu">
                                <li>
                                    <a href="../index.html">Home</a>
                                    <ul class="sub-menu">
                                        <li><a href="../index.html">Home</a></li>
                                        <li><a href="../men.html">Men Products</a></li>
                                        <li><a href="../women.html">Women Products</a></li>
                                    </ul>
                                </li>

                                <li>
                                    <a href="../product.html">Shop</a>
                                </li>

                                <li class="label1" data-label1="hot">
                                    <a href="../shoping-cart.html">Features</a>
                                </li>

                                <li>
                                    <a href="../blog.html">Blog</a>
                                </li>

                                <li>
                                    <a href="../about.html">About</a>
                                </li>

                                <li>
                                    <a href="../contact.html">Contact</a>
                                </li>
                            </ul>
                        </div>	

                        <!-- Icon header -->
                    </nav>
                </div>	
            </div>

            <!-- Header Mobile -->
            <div class="wrap-header-mobile">
                <!-- Logo moblie -->		
                <div class="logo-mobile">
                    <a href="../index.html"><img src="../images/icons/logo-01.png" alt="IMG-LOGO"></a>
                </div>

                <!-- Button show menu -->
                <div class="btn-show-menu-mobile hamburger hamburger--squeeze">
                    <span class="hamburger-box">
                        <span class="hamburger-inner"></span>
                    </span>
                </div>
            </div>


            <!-- Menu Mobile -->
            <div class="menu-mobile">
                <ul class="topbar-mobile">
                    <li>
                        <div class="left-top-bar">
                            Free shipping for standard order over $100
                        </div>
                    </li>

                    <li>
                        <div class="right-top-bar flex-w h-full">
                            <a href="#" class="flex-c-m p-lr-10 trans-04">
                                Help & FAQs
                            </a>

                            <a href="#" class="flex-c-m p-lr-10 trans-04">
                                My Account
                            </a>

                            <a href="#" class="flex-c-m p-lr-10 trans-04">
                                EN
                            </a>

                            <a href="#" class="flex-c-m p-lr-10 trans-04">
                                USD
                            </a>
                        </div>
                    </li>
                </ul>

                <ul class="main-menu-m">
                    <li>
                        <a href="index.html">Home</a>
                        <ul class="sub-menu-m">
                            <li><a href="../index.html">Home</a></li>
                            <li><a href="../men.html">Men Products</a></li>
                            <li><a href="../women.html">Women Products</a></li>
                        </ul>
                        <span class="arrow-main-menu-m">
                            <i class="fa fa-angle-right" aria-hidden="true"></i>
                        </span>
                    </li>

                    <li>
                        <a href="../product.html">Shop</a>
                    </li>

                    <li>
                        <a href="../shoping-cart.html" class="label1 rs1" data-label1="hot">Features</a>
                    </li>

                    <li>
                        <a href="../blog.html">Blog</a>
                    </li>

                    <li>
                        <a href="../about.html">About</a>
                    </li>

                    <li>
                        <a href="../contact.html">Contact</a>
                    </li>
                </ul>
            </div>

            <!-- Modal Search -->

        </header>
        <!-- Cart -->


        <!-- breadcrumb -->
        <div class="container">
            <div class="bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg">
                <a href="../index.html" class="stext-109 cl8 hov-cl1 trans-04">
                    Home
                    <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                </a>

                <a href="../shoping-cart.html" class="stext-109 cl8 hov-cl1 trans-04">
                    Shopping Cart
                    <i class="fa fa-angle-right m-l-9 m-r-10" aria-hidden="true"></i>
                </a>
                <span class="stext-109 cl4">
                    Payment
                </span>
            </div>
        </div>

        <div class="wrapper">
            <div class="image-holder">
                <img id = "paymentImage" src="../images/form-wizard.png" alt="">
            </div>
            <div class="christmasLights"></div>
            <!--
            <div class="text-center">
            <!-- Button HTML (to Trigger Modal) -->
            <!--<a href="#myModal" class="trigger-btn" data-toggle="modal">Click to Open Confirm Modal</a>
    </div> -->
            <form name = "payment" action="../index.html">
                <div id="wizard">
                    <!-- SECTION 1 -->
                    <h4></h4>
                    <section>
                        <div class="form-row form-group">
                            <div class="form-holder">
                                <label  for="first-name" >
                                    First Name *
                                </label>
                                <input type="text" class="form-control" id="firstName">
                            </div>
                            <div class="form-holder">
                                <label for="last-name">
                                    Last Name *
                                </label>
                                <input type="text" class="form-control" id="secondName">
                            </div>
                        </div>	
                        <div class="form-row">
                            <label for="company">
                                Company Name
                            </label>
                            <input type="text" class="form-control" id="company">
                        </div>	
                        <div class="form-row">
                            <label for="country">
                                Country *
                            </label>
                            <div class="form-holder" >
                                <select name="country" id="country" class="form-control">
                                    <option value="ireland" class="option">Ireland</option>
                                    <option value="united states" class="option">United States</option>
                                    <option value="united kingdom" class="option">United Kingdom</option>
                                </select>
                                <i class="zmdi zmdi-caret-down"></i>
                            </div>
                        </div>	
                        <div class="form-row">
                            <label for="address">
                                Address *
                            </label>
                            <input required type="text" class="form-control" placeholder="Street address" style="margin-bottom: 20px" id="address">
                            <input type="text" class="form-control" placeholder="Apartment, suite, unit etc. (optional)" id="addressOptional">
                        </div>	
                        <div class="form-row">
                            <label for="city">
                                Town / City *
                            </label>
                            <input type="text" class="form-control" id="city">
                        </div>
                    </section>

                    <!-- SECTION 2 -->
                    <h4></h4>
                    <section>
                        <div class="form-row">
                            <label for="country" >
                                County *
                            </label>
                            <input type="text" class="form-control" id="countryText">
                        </div>
                        <div class="form-row">
                            <label for="postcode">
                                Postcode / Zip 
                            </label>
                            <input type="text" class="form-control" id = "postcode">
                        </div>
                        <div class="form-row form-group">
                            <div class="form-holder">
                                <label for="phone">
                                    Phone *
                                </label>
                                <input type="text" class="form-control" id="phone">
                            </div>
                            <div class="form-holder">
                                <label for="email" >
                                    Email Address *
                                </label>
                                <input type="text" class="form-control" id="email" >
                            </div>
                        </div>	
                        <div class="form-row" style="margin-bottom: 18px">
                            <label for="notes">
                                Order Notes
                            </label>
                            <textarea name="notes"  class="form-control" placeholder="Note about your order, eg. special notes fordelivery." style="height: 149px" id="orderNotes"></textarea>
                        </div>

                    </section>

                    <!-- SECTION 3 -->
                    <h4></h4>

                    <section>
                        <div id="cartDisplay"></div>
                        <div id="customerShipping"></div>
                    </section>

                    <!-- SECTION 4 -->
                    <h4></h4>
                    <section>
                        <div class="checkbox-circle">
                            <div id="invoice"></div>
       <!--                                                 <script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
<script>paypal.Buttons().render('body');</script>-->
                            <script
                                src="https://checkout.stripe.com/checkout.js" class="stripe-button"     

                                data-key="<?php echo $publicStripeKey ?>"
                                data-email= "<?php echo $_SESSION['email'] ?>"
                                data-currency="EUR"
                                data-amount="<?php echo (int) $_SESSION['shippingTotal'] . '00' ?>"
                                data-name="<?php echo $_SESSION['firstname'] . ' ' . $_SESSION['secondname'] ?>"
                                data-description="<?php echo $_SESSION['address'] ?>"
                                data-image="../images/stripe_image.png"
                                data-locale="auto">
                            </script>

                        </div>
                    </section>
                </div>
            </form>
        </div>

        <div id="myModal" class="modal fade">
            <div id='succeded'>
                <div class="modal-dialog modal-confirm">
                    <div class="modal-content">
                        <div class="modal-header">
                            <div class="icon-box">
                                <i class="material-icons">&#xE876;</i>
                            </div>				
                            <h4 class="modal-title">Thank You!</h4>	
                        </div>
                        <div class="modal-body">
                            <p class="text-center">Your Order has been confirmed. We will email you when your order has been processed</p>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-success btn-block" data-dismiss="modal">OK</button>
                        </div>
                    </div>
                </div></div>
        </div>  
        <!--===============================================================================================-->	
        <script src="../vendor/jquery/jquery-3.2.1.min.js"></script>
        <!--===============================================================================================-->
        <script src="../vendor/animsition/js/animsition.min.js"></script>
        <!--===============================================================================================-->
        <script src="../vendor/bootstrap/js/popper.js"></script>
        <script src="../vendor/bootstrap/js/bootstrap.min.js"></script>
        <!--===============================================================================================-->
        <script src="../vendor/select2/select2.min.js"></script>
        <script>
                                $(".js-select2").each(function () {
                                    $(this).select2({
                                        minimumResultsForSearch: 20,
                                        dropdownParent: $(this).next('.dropDownSelect2')
                                    });
                                })
        </script>
        <!--===============================================================================================-->
        <script src="../vendor/MagnificPopup/jquery.magnific-popup.min.js"></script>
        <!--===============================================================================================-->
        <script src="../vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
        <script>
                                $('.js-pscroll').each(function () {
                                    $(this).css('position', 'relative');
                                    $(this).css('overflow', 'hidden');
                                    var ps = new PerfectScrollbar(this, {
                                        wheelSpeed: 1,
                                        scrollingThreshold: 1000,
                                        wheelPropagation: false,
                                    });

                                    $(window).on('resize', function () {
                                        ps.update();
                                    })
                                });
        </script>
        <!--===============================================================================================-->
        <script src="../js/main.js"></script>

        <script src="../js/js-progress/jquery-3.3.1.min.js" type="text/javascript"></script>
        <!-- JQUERY STEP -->
        <script src="../js/js-progress/jquery.steps.js" type="text/javascript"></script>
        <script src="../js/js-progress/main-progress.js" type="text/javascript"></script>
        <!-- Template created and distributed by Colorlib -->
    </body>
</html>