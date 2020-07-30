let invalid = "1px solid #F78181";
let valid = "1px solid #E6E6E6";
let startingImage = document.getElementById("paymentImage").src;
let secondImage = "../images/modelForm.png";
let firstName;
let secondName;
let address = "";
let city;
let country;
let phone;
let email;
let postcode;
let orderNotes;
let company;
$(function () {
    $("#wizard").steps({
        headerTag: "h4",
        bodyTag: "section",
        transitionEffect: "fade",
        enableAllSteps: false,
        transitionEffectSpeed: 500,

        onStepChanging: function (event, currentIndex, newIndex) {
            if (validateFormPage1() === true) {
                if (newIndex === 1) {
                    document.getElementById("paymentImage").src = startingImage;
                    $('.steps ul').addClass('step-2');

                } else {
                    document.getElementById("paymentImage").src = startingImage;
                    $('.steps ul').removeClass('step-2');
                }
            } else
            {
                newIndex = 0;
                return false;
            }

            if (newIndex === 2) {
                if (validateFormPage2() === true) {

                    document.getElementById("paymentImage").src = secondImage;
                    $('.steps ul').addClass('step-3');
                } else
                {
                    newIndex = 1;
                    return false;
                }
            } else {
                document.getElementById("paymentImage").src = secondImage;
                $('.steps ul').removeClass('step-3');
            }


            if (newIndex === 3) {
                document.getElementById("paymentImage").src = secondImage;
                $('.steps ul').addClass('step-4');
                $('.actions ul').addClass('step-last');
            } else {

                document.getElementById("paymentImage").src = secondImage;
                $('.steps ul').removeClass('step-4');
                $('.actions ul').removeClass('step-last');
            }

            return true;
        },
        labels: {
            finish: "Contiue Shoping",
            next: "Next",
            previous: "Previous"
        }
    }

    );
    // Custom Steps Jquery Steps
    $('.wizard > .steps li a').click(function () {
        $(this).parent().addClass('checked');
        $(this).parent().prevAll().addClass('checked');
        $(this).parent().nextAll().removeClass('checked');
    });
    // Custom Button Jquery Steps
    $('.forward').click(function () {
        $("#wizard").steps('next');
    })
    $('.backward').click(function () {
        $("#wizard").steps('previous');
    })

})
function validateFormPage1() {
    firstName = document.getElementById("firstName").value;
    secondName = document.getElementById("secondName").value;
    address = document.getElementById("address").value + document.getElementById("addressOptional").value;
    city = document.getElementById("city").value;
    country = document.getElementById("country").value;
    company = document.getElementById("company").value;
    if (firstName === "" || secondName === "" || address === "" || city === "")
    {
        if (firstName === "")
        {
            snackBarError("First Name");
            document.getElementById("firstName").style.border = invalid;
        } else
        {
            document.getElementById("firstName").style.border = valid;
        }
        if (secondName === "")
        {
            snackBarError("Second Name");
            document.getElementById("secondName").style.border = invalid;
        } else
        {
            document.getElementById("secondName").style.border = valid;

        }
        if (address === "")
        {
            snackBarError("Address");
            document.getElementById("address").style.border = invalid;
        } else
        {
            document.getElementById("address").style.border = valid;

        }
        if (city === "")
        {
            snackBarError("City");
            document.getElementById("city").style.border = invalid;

        } else
        {
            document.getElementById("city").style.border = valid;
        }
        return false;


    } else
    {
        document.getElementById("firstName").style.border = valid;
        document.getElementById("city").style.border = valid;
        document.getElementById("countryText").value = country;
        return true;
    }

}
//https://stackoverflow.com/questions/4338267/validate-phone-number-with-javascript
function validateFormPage2() {

    phone = document.getElementById("phone").value;
    email = document.getElementById("email").value;
    postcode = document.getElementById("postcode").value;
    orderNotes = document.getElementById("orderNotes").value;
    let nextPage = false;
    let validPhone = phone.match(/^[\+]?\d{2,}?[(]?\d{2,}[)]?[-\s\.]?\d{2,}?[-\s\.]?\d{2,}[-\s\.]?\d{0,9}$/im);
    //https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript#46181//
    let validEmail = email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (!validPhone || !validEmail || nextPage === false)
    {
        // snackBar();
        if (!validPhone)
        {
            snackBarError("Phone");
            document.getElementById("phone").style.border = invalid;
            nextPage = false;
        } else if (validPhone)
        {
            nextPage = true;
            validPhone = true;


            document.getElementById("phone").style.border = valid;
        }
        if (!validEmail)
        {
            snackBarError("Email");
            document.getElementById("email").style.border = invalid;
            nextPage = false;
        } else
        {

            validEmail = true;
            document.getElementById("email").style.border = valid;

            if (validPhone)
            {
                set_payment_details();
                nextPage = true;
            } else {
                nextPage = false;
            }
        }
    }
    set_payment_details();
    return nextPage;



}
async function set_payment_details()
{
    let url = "../php/set_shipping_details.php";
    let urlParameters = "firstName=" + firstName + "&secondName=" + secondName + "&address=" + address + "&city=" + city + "&country=" + country + "&phone=" + phone + "&email=" + email + "&postcode=" + postcode + "&ordernotes=" + orderNotes + "&company=" + company;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        loadCustomerShipping();
        generateInvoice();
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }

}
function snackBarError(text) {
    // Get the snackbar DIV
    var x = document.getElementById("snackBarError");
    document.getElementById("snackBarError").innerText = text + " Is Invalid";
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}

