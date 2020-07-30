
async function ajaxGetAccountDetails()
{
    var admin = false;
    var url = "php/get_loginDetails.php";  /* use POST method to send data to ajax_json_search.php */
    var urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(jsonData)
    {

        let logoutString = "";
        if (jsonData.length > 0)
        {
            document.getElementById("userInfo").innerHTML = "<a href='shoping-cart.html' id='accountName' class='flex-c-m trans-04 p-lr-25'>" + jsonData[0].user + "</a>";
            document.getElementById("logout").innerHTML =  "<a class='flex-c-m trans-04 p-lr-25' onclick='ajaxUserLogout()'>Logout</a>";
           
            //admin check\
            if(jsonData[0].access === "1")
            {
                document.getElementById("adminTable").innerHTML = "<a href='table.html' class='flex-c-m trans-04 p-lr-25'>Admin Table</a>";
            }
        } else
        {
            loginForm();
            document.getElementById("userInfo").innerHTML = "<a id='accountName' class='flex-c-m trans-04 p-lr-25' onclick='showModel()'>Login</a>";


        }

    }
    
async function ajaxIsAdmin()
{
    var url = "php/get_access_level.php";  /* use POST method to send data to ajax_json_search.php */
    var urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
 return updateWebpage(await response.text()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
     function updateWebpage(level)
    {
        if(level === "1")
        {
            
            return true;
            
        }
        else 
        {

           return false;
            
        }
    }

    /* use the fetched data to change the content of the webpage */

}
}
function showModel()
{
    document.getElementById("modelContainer").style.visibility = 'visible';

}
function closeModel()
{
    document.getElementById("modelContainer").style.visibility = 'hidden';
    document.getElementById("loginError").style.visibility = "hidden";


}
async function ajaxUserLogout()
{
    var url = "php/user_logout.php";  /* use POST method to send data to ajax_json_search.php */
    var urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    window.location.reload(false);

    /* use the fetched data to change the content of the webpage */

}
async function ajaxUserLogin()
{
    let user = document.getElementById("username").value + "," + document.getElementById("password").value;
    var url = "php/user_login.php";  /* use POST method to send data to ajax_json_search.php */
    var urlParameters = "user=" + user;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.json()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(jsonData)
    {
        if (jsonData.length !== 0)
        {
            document.getElementById("loginError").style.visibility = "hidden";
            closeModel();
            window.location.reload(false);
        } else
        {

            document.getElementById("loginError").style.visibility = "visible";

        }
    }
}
function loginForm()
{
    document.getElementById("modelContainer").innerHTML = "<img src='images/cross.png' alt='close' id='close' onclick='closeModel()'/><div class='loginForm'><div class='loginInfoContainer'><h1><u>Log<span>in</span></u></h1> <form ><label ><b>Email</b></label><input type='text' placeholder='Username...' id = 'username'  required><label ><b>Password</b></label> <input type='password' placeholder='Password...' id = 'password'  required> <h6 id='loginError'>Input Was Incorrect</h6><button type='button' onclick='ajaxUserLogin()'>Login</button></form ><h6>Don't Have An Account? </h6><br><h6 class='registerLink' onclick='registarionForm()'> Register Here &rarr;</h6></div><img src='images/dress.png'alt=''/></div>";

}
function registarionForm()
{
    document.getElementById("modelContainer").innerHTML = "<img src='images/cross.png' alt='close' id='close' onclick='closeModel()'/><div class='loginForm'><img src='images/registraionBackground.png'alt=''/><div class='loginInfoContainer'>\n\
    <h1><u>Regis<span>ter</span></u></h1><label>Name</label><input id='name' type='text'><label>Email</label><input id='email' type='email'><label>Password</label>\n\
    <input id ='password' type='password'><label>Confirm Password</label><input id ='confirmPassword' type='password'><h6 id='loginError'>Input Was Incorrect</h6><button type='button' onclick='ajaxUserRegister()'>Register</button> \n\
    <h6 class='registerLink' onclick='loginForm()'><a> &larr; Back To Login</a></h6></div></div>";
}

async function ajaxUserRegister()
{
    if (validateReg()) {
        document.getElementById("loginError").style.visibility = "hidden";
        let name = document.getElementById("name").value;
        name = name.charAt(0).toUpperCase() + name.slice(1);
        let user = name + "," + document.getElementById("email").value + "," + document.getElementById("password").value;
        var url = "php/user_register.php";  /* use POST method to send data to ajax_json_search.php */
        var urlParameters = "user=" + user;   /* Construct a url parameter string to POST to fileName */
        try
        {
            const response = await fetch(url,
                    {
                        method: "POST",
                        headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                        body: urlParameters
                    });
        } catch (error)
        {
            console.log("Fetch failed: ", error);
        }
        window.location.reload(false);


    } else
    {

    }
}
function validateReg()
{
    let valid = false;
    if (!validateEmail())
    {
        document.getElementById("email").style.borderColor = "red";
        valid = false;
    } else
    {
        document.getElementById("email").style.borderColor = "grey";
        valid = true;
    }

    if (document.getElementById("name").value.length <= 0)
    {
        document.getElementById("name").style.borderColor = "red";
        valid = false;
    } else
    {
        document.getElementById("name").style.borderColor = "grey";
        valid = true;
    }

    if (document.getElementById("confirmPassword").value !== document.getElementById("password").value || document.getElementById("confirmPassword").value <= 0)
    {
        document.getElementById("confirmPassword").style.borderColor = "red";
        valid = false;
    } else
    {
        document.getElementById("confirmPassword").style.borderColor = "grey";
        valid = true;
    }
    if (valid)
    {
        return true;

    } else
    {
        document.getElementById("loginError").style.visibility = "visible";
    }
}
function validateEmail()
{
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(document.getElementById("email").value);
}
