var index = 0;
var catergory = "all";
var load = true;
var category = "";
var htmlString = "<div class='row isotope-grid'>";
var nextpage = false;
var productLimit = 12;
var fullList = false;
var min;
var max;
var colour;
var productid;
var price;

async function ajaxListAllProducts()
{

    document.getElementById("loadMore").style.visibility = "visible";
    var htmlString = "<div class='row isotope-grid'>";
    load = true;
    if (index < 12 && load) {
        var url = "php/get_products.php";  /* use POST method to send data to ajax_json_search.php */
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
            let length = productLimit;
            if (jsonData.length > productLimit && !fullList)
            {
                length = productLimit;
            }
            for (let i = 0; i < length; i++)
            {
                //MAKE THIS += TO DISPLAY ALL//
                htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
                htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                index++;

            }
            document.getElementById('productsDisplay').innerHTML = htmlString;
            ajaxCart();
        }
    } else
    {
        return;
    }
}
async function ajaxListMoreProducts()
{
    if (load) {
        let url = "php/get_products.php";   /* use POST method to send data to ajax_json_search.php */
        let urlParameters = "";   /* Construct a url parameter string to POST to fileName */

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
            if (index < jsonData.length) {
                let length = productLimit;
                if (jsonData.length > productLimit && !fullList)
                {
                    length = productLimit;
                    productLimit = productLimit + 4;
                } else if (fullList)
                {
                    productLimit = jsonData.length;
                }
                htmlString = "<div class='row isotope-grid'>";
                for (let i = length; i < productLimit; i++)
                {
                    //MAKE THIS += TO DISPLAY ALL//
                    htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
                    htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                    htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                    index++;
                }
                load = false;
                document.getElementById("loadMore").style.visibility = "hidden";
                document.getElementById('productsDisplay').innerHTML += htmlString;
            } else
            {
                return;
            }
        }
    }
}
async function ajaxListCategoryProducts()
{

    document.getElementById("loadMore").style.visibility = "hidden";
    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let url = "php/get_women_products.php";
    if (category === "women")
    {
        url = "php/get_women_products.php"; /* use POST method to send data to ajax_json_search.php */

    } else if (category === "men")
    {
        url = "php/get_men_products.php"; /* use POST method to send data to ajax_json_search.php */

    } else if (category === "accessories")
    {
        url = "php/get_accessories_products.php"; /* use POST method to send data to ajax_json_search.php */

    } else
    {
        return;
    }
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        let length;
        if (category === "accessories")
        {
            length = jsonData.length;

        } else if (category === "men" && !fullList || category === "women" && !fullList)
        {
            length = jsonData.length / 2;

        } else if (fullList)
        {
            length = jsonData.length;

        }
        for (let i = 0; i < length; i++)
        {
            //MAKE THIS += TO DISPLAY ALL//
            htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
            htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
            htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";

        }
        document.getElementById('productsDisplay').innerHTML = htmlString;
        index = 0;





    }
}
async function ajaxListMenProducts()
{

    document.getElementById("loadMore").style.visibility = "hidden";
    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let productList;
    let display = false;
    let displayAll = false;
    let url = "php/get_men_products.php";
    if (category === "new")
    {
        productList = [12, 19, 17, 11, 2, 5, 0];
    } else if (category === "featured")
    {
        productList = [7, 1, 2, 3];
    } else if (category === "bestSellers")
    {
        productList = [7, 19, 5, 0];
    } else
    {
        displayAll = true;
    }
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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

        for (let i = 0; i < jsonData.length; i++)
        {
            if (!displayAll)
            {
                for (let j = 0; j < productList.length; j++)
                {
                    if (productList[j] === Number(jsonData[i].id))
                    {
                        display = true;

                    }
                }
            }
            if (display || displayAll) {
                //MAKE THIS += TO DISPLAY ALL//
                htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='menProduct' class='block2'><div class='block2-pic hov-img0' >";
                htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                index++;
                display = false;
            }
        }
        index = 0;
        document.getElementById('productsDisplay').innerHTML = htmlString;

    }
}
async function ajaxListWomenProducts()
{

    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let productList;
    let display = false;
    let displayAll = false;
    let url = "php/get_women_products.php";
    if (category === "new")
    {
        document.getElementById("nextPage").style.visibility = "hidden";
        productList = [21, 9, 8, 6, 10, 4];
    } else if (category === "featured")
    {
        document.getElementById("nextPage").style.visibility = "hidden";
        productList = [4, 18, 20];
    } else if (category === "bestSellers")
    {
        document.getElementById("nextPage").style.visibility = "hidden";
        productList = [21, 9, 18, 20];
    } else
    {
        document.getElementById("nextPage").style.visibility = "visible";
        displayAll = true;
    }
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        if (jsonData.length > 8)
        {
            nextpage = true;

        }
        for (let i = 0; i < 8; i++)
        {
            if (!displayAll)
            {
                for (let j = 0; j < productList.length; j++)
                {
                    if (productList[j] === Number(jsonData[i].id))
                    {
                        display = true;

                    }
                }
            }
            if (display || displayAll) {
                //MAKE THIS += TO DISPLAY ALL//
                htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='womenProduct' class='block2'><div class='block2-pic hov-img0' >";
                htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                index++;
                display = false;
            }
        }
        index = 0;
        document.getElementById('productsDisplay').innerHTML = htmlString;

    }
}
async function ajaxListWomenProductsNextPage()
{

    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let url = "../php/get_women_products.php";
    {
        document.getElementById("nextPage").style.visibility = "visible";
        displayAll = true;
    }
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        for (let i = 8; i < jsonData.length; i++)
        {
            //MAKE THIS += TO DISPLAY ALL//
            htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
            htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
            htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
            index++;
        }
        index = 0;
        document.getElementById('productsDisplay').innerHTML = htmlString;

    }
}
async function ajaxProductPriceRange()
{

    document.getElementById("loadMore").style.visibility = "hidden";
    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let url = "php/get_products.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        for (let i = 0; i < jsonData.length; i++)
        {
            if (jsonData[i].price > min && jsonData[i].price < max) {
                //MAKE THIS += TO DISPLAY ALL//
                htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
                htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                index++;
            }
        }
        document.getElementById('productsDisplay').innerHTML = htmlString;
        index = 0;





    }
}
async function ajaxProductColour(search)
{

    document.getElementById("loadMore").style.visibility = "hidden";
    let htmlString = "<div class='row isotope-grid'>";
    load = false;
    let url = "php/search.php";
    let urlParameters = "search=" + search;   /* Construct a url parameter string to POST to fileName */
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

        for (let i = 0; i < jsonData.length; i++)
        {
            //MAKE THIS += TO DISPLAY ALL//
            htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
            htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
            htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
            index++;
        }
        document.getElementById('productsDisplay').innerHTML = htmlString;
        index = 0;





    }
}
async function ajaxCart()
{
    let url = "php/get_cart.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        htmlString = "<ul class='header-cart-wrapitem w-full'>";

        for (let i = 0; i < jsonData.length; i++)
        {
            htmlString += "<li class='header-cart-item flex-w flex-t m-b-12'><div onclick = 'removeCart(" + jsonData[i].id + ")'  class='header-cart-item-img'><img src='images/" + jsonData[i].image + "' alt='IMG'></div>\n\
                       <div class='header-cart-item-txt p-t-8'><a onclick = 'setProductId(" + jsonData[i].id + ")' href='product-detail.html' class='header-cart-item-name m-b-18 hov-cl1 trans-04'>" + jsonData[i].title + "</a><span class='header-cart-item-info'>" + jsonData[i].amount + " x " + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></li>";

        }

        htmlString += "</u>";
        document.getElementById('cart').innerHTML = htmlString;
        cartTotal();
    }
}
async function setProductId(id)
{

    let url = "php/set_product_id.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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

}
async function ajaxCartPage()
{
    let url = "php/get_cart.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        htmlString = "<table class='table-shopping-cart'>";
        for (let i = 0; i < jsonData.length; i++)
        {
            htmlString += "<tr class='table_row'><td class='column-1'><div class='how-itemcart1'><img src='images/" + jsonData[i].image + "' alt='IMG'></div></td><td class='column-2'>" + jsonData[i].title + "</td><td class='column-3'></td>\n\
            <td class='column-4'><div class='wrap-num-product flex-w m-l-auto m-r-0'><div onclick='removeCartButton(" + jsonData[i].id + ");' class='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'><i class='fs-16 zmdi zmdi-minus'></i></div><input class='mtext-104 cl3 txt-center num-product' type='number' value='" + jsonData[i].amount + "'>\n\
             <div onclick='addCartButton(" + jsonData[i].id + ")' class='btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'><i class='fs-16 zmdi zmdi-plus'></i></div></div></td><td class='column-5'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</td></tr>";
        }
        htmlString += "</table>";
        document.getElementById('cartDisplay').innerHTML = htmlString;
        subTotal();
    }
}
async function ajaxProductLiveSearch(search)
{
    if (search.length === 0)
    {
        ajaxListAllProducts();
        return;
    } else {
        document.getElementById("loadMore").style.visibility = "hidden";
        let htmlString = "<div class='row isotope-grid'>";
        load = false;
        let url = "php/search.php";
        let urlParameters = "search=" + search;   /* Construct a url parameter string to POST to fileName */
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

            for (let i = 0; i < jsonData.length; i++)
            {
                //MAKE THIS += TO DISPLAY ALL//
                htmlString += "<div  class='col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women' ><div id='product' class='block2'><div class='block2-pic hov-img0' >";
                htmlString += "<a onclick='setProductId(" + jsonData[i].id + ")' href='product-detail.html'><img src='images/" + jsonData[i].image + "' alt='IMG-PRODUCT' ></a><a onclick = 'addCart(" + jsonData[i].id + ")' class='block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1' >Add</a></div>";
                htmlString += "<div class='block2-txt flex-w flex-t p-t-14'><div class='block2-txt-child1 flex-col-l '> <a href='product-detail.html' class='stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6' onclick='setProductId(" + jsonData[i].id + ")'>" + jsonData[i].title + " </a>\n\
                <span class='stext-105 cl3'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div></div></div></div>";
                index++;
            }
            document.getElementById('productsDisplay').innerHTML = htmlString;
            index = 0;
        }
    }
}
async function ajaxPaymentCart()
{
    loadCustomerData();
    let url = "../php/get_cart.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        for (let i = 0; i < jsonData.length; i++)
        {
            htmlString += "<div class='product'><div class='item'><div class='left'><a onclick='setProductId(" + jsonData[i].id + ")' href='../product-detail.html' class='thumb'><img src='../images/" + jsonData[i].image + "' alt=''></a><div class='purchase'><h6><a onclick='setProductId(" + jsonData[i].id + ")' href='../product-detail.html'>" + jsonData[i].title + "</a></h6><span>x" + jsonData[i].amount + "</span></div></div><span class='price'>" + jsonData[i].currency + parseFloat(jsonData[i].price).toFixed(2) + "</span></div>";
        }
        document.getElementById('cartDisplay').innerHTML = htmlString;

    }
}
async function ajaxSingleProduct()
{
    let url = "php/get_product_detail.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        displayBreadCrumb(jsonData.category, jsonData.title);
        htmlString = "<div class='row'><div class='col-md-6 col-lg-7 p-b-30'><div class='p-l-25 p-r-30 p-lr-0-lg'><div class='wrap-slick3 flex-sb flex-w'></div></div>\n\
            <div class='wrap-pic-w pos-relative'><img  src='images/" + jsonData.image + "' alt='IMG-PRODUCT' id = 'snowCanvas'></div></div></div></div></div></div>\n\
            <div id='selectSection' class='col-md-6 col-lg-5 p-b-30'><div class='p-r-50 p-t-5 p-lr-0-lg'><h4 class='mtext-105 cl2 js-name-detail p-b-14'>" + jsonData.title + "</h4><span class='mtext-106 cl2'>" + jsonData.currency + parseFloat(jsonData.price).toFixed(2) + "</span>\n\
            <p class='stext-102 cl3 p-t-23'>" + jsonData.description + "</p><div class='p-t-33'><div class='flex-w flex-r-m p-b-10'><div class='size-203 flex-c-m respon6'>Size</div>\n\
            <div class='size-204 respon6-next'><select class='js-select2' name='time'><option>Size Small</option><option>Size Medium</option><option>Size Large</option>\n\
            <option>Size XL</option></select><div class='dropDownSelect2'></div></div></div><div class='flex-w flex-r-m p-b-10'><div class='size-204 flex-w flex-m respon6-next'><div class='wrap-num-product flex-w m-r-20 m-tb-10'>\n\
            <div class='btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m'><i class='fs-16 zmdi zmdi-minus'></i></div><input class='mtext-104 cl3 txt-center num-product' type='number' name='num-product' value='1'>\n\
            <div class='btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m'><i class='fs-16 zmdi zmdi-plus'></i></div></div><button onclick = 'addCart(" + jsonData.id + ")' class='flex-c-m stext-101 cl0 size-101 bg1 bor1 hov-btn1 p-lr-15 trans-04 js-addcart-detail'>\n\
            Add to cart</button></div></div></div><div class='flex-w flex-m p-l-100 p-t-40 respon7'><div class='flex-m bor9 p-r-10 m-r-11'>\n\
          <a href='' class='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 js-addwish-detail tooltip100' data-tooltip='Add to Wishlist'><i class='zmdi zmdi-favorite'></i></a></div>\n\
            <a href='' class='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100' data-tooltip='Facebook'><i class='fa fa-facebook'></i></a><a href='#' class='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100' data-tooltip='Twitter'>\n\
            <i class='fa fa-twitter'></i></a><a href='' class='fs-14 cl3 hov-cl1 trans-04 lh-10 p-lr-5 p-tb-2 m-r-8 tooltip100' data-tooltip='Google Plus'><i class='fa fa-google-plus'></i></a></div></div></div></div>";

        document.getElementById('productDisplay').innerHTML = htmlString;

    }

    function displayBreadCrumb(category, title)
    {
        breadCrumbString = "<div class='container'><div class='bread-crumb flex-w p-l-25 p-r-15 p-t-30 p-lr-0-lg'><a href='index.html' class='stext-109 cl8 hov-cl1 trans-04'>Home<i class='fa fa-angle-right m-l-9 m-r-10' aria-hidden='true'></i>\n\
        </a><a href='" + category + ".html' class='stext-109 cl8 hov-cl1 trans-04'>" + category + "<i class='fa fa-angle-right m-l-9 m-r-10' aria-hidden='true'></i></a><span class='stext-109 cl4'>" + title + "</span></div></div>";
        document.getElementById('breadCrumb').innerHTML = breadCrumbString;
    }
}
async function setCurrency(currency)
{

    let url = "php/setCurrency.php";
    let urlParameters = "currency=" + currency;   /* Construct a url parameter string to POST to fileName */
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

}
async function addCart(id)
{
    let url = "php/add_cart.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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
    snackBar();
}
async function addCartButton(id)
{
    let url = "php/add_cart.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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
    ajaxCartPage();
}
function snackBar()
{
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 3000);
}
async function cartTotal()
{
    let url = "php/cart_total.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.text());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage(total)
    {
        htmlString = "<div class='header-cart-total w-full p-tb-40'>Total: " + total + "</div>";
        document.getElementById('totalPrice').innerHTML = htmlString;
    }
}
async function removeCartButton(id)
{
    let url = "php/remove_cart.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage();
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage()
    {
        ajaxCartPage();
    }

}
async function removeCart(id)
{

    let url = "php/remove_cart.php";
    let urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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
    ajaxCart();
}
async function subTotal()
{
    let url = "php/cart_total.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.text());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage(total)
    {
        htmlString = "<div class='size-209'><span class='mtext-110 cl2'>" + total + "</span></div>";
        document.getElementById('subTotal').innerHTML = htmlString;
        shippingTotal(total);
    }
}
async function shippingTotal()
{
    let url = "php/shipping_total.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });
        updateWebpage(await response.text());
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }
    function updateWebpage(shippingTotal)
    {
        htmlString = "<div class='flex-w flex-t p-t-27 p-b-33'><div class='size-208'><span class='mtext-101 cl2'>Total:</span></div><div class='size-209 p-t-1'><span class='mtext-110 cl2'>" + shippingTotal + "</span></div></div>";
        document.getElementById('shippingTotal').innerHTML = htmlString;
        checkCart();
    }
}
//https://stackoverflow.com/questions/3487263/how-to-use-onclick-or-onselect-on-option-tag-in-a-jsp-page#3487274
function changeFunc() {
    var selectBox = document.getElementById("selectBox");
    var currency = selectBox.options[selectBox.selectedIndex].value;
    setCurrency(currency);
    ajaxCartPage();

}
//https://supunkavinda.blog/php/live-search-with-ajax-php-mysql//
function searchBar()
{
    var textBox = document.getElementById('search_text');
    var search = "";
    textBox.onkeyup = function () {
        search = this.value;

        search = search.replace(/^\s|\s $/, "");
        ajaxProductLiveSearch(search);
    };

}
async function checkCart()
{
    let url = "php/shipping_total.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
    try
    {
        const response = await fetch(url,
                {
                    method: "POST",
                    headers: {'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'},
                    body: urlParameters
                });

        updateWebpage(await response.text()); // return a JSON string
    } catch (error)
    {
        console.log("Fetch failed: ", error);
    }


    /* use the fetched data to change the content of the webpage */
    function updateWebpage(text)
    {
        if (text === "")
        {
            htmlString = "";
        } else
        {
            htmlString = "<button  class='flex-c-m stext-101 cl0 size-116 bg3 bor14 hov-btn3 p-lr-15 trans-04 pointer'><a id='paymentButton' href='php/payment.php' >Proceed to Checkout</a></button>";
        }
        document.getElementById('paymentButton').innerHTML = htmlString;
    }

}
async function loadCustomerData()
{
    let url = "../php/get_customer_details.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        document.getElementById("firstName").value = jsonData.firstname;
        document.getElementById("secondName").value = jsonData.secondname;
        document.getElementById("address").value = jsonData.address;
        document.getElementById("city").value = jsonData.city;
        document.getElementById("country").value = jsonData.country;
        document.getElementById("phone").value = jsonData.phone;
        document.getElementById("email").value = jsonData.email;
        document.getElementById("postcode").value = jsonData.postcode;
        document.getElementById("orderNotes").value = jsonData.ordernotes;
        document.getElementById("company").value = jsonData.company;

    }

}

async function loadCustomerShipping()
{
    let url = "../php/get_customer_details.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        htmlString = "<div id='cartDisplay'></div><div class='checkout'><p class='shipping'><span class='heading'>Shipping</span> Order Shipping To " + jsonData.firstname + " " + jsonData.secondname + ",<br>Company: " + jsonData.company + "<br> Address: " + jsonData.address + "," + jsonData.city + "," + jsonData.country + "," + jsonData.postcode + " <br>Contact: " + jsonData.phone + ", <br>Email : " + jsonData.email + "<br>Order Notes: " + jsonData.ordernotes + "</p><div class='total'><span class='heading'>Subtotal</span><span class='total-price'>" + jsonData.symbol + jsonData.total + "</span>\n\
       </div></div>";
        document.getElementById('customerShipping').innerHTML = htmlString;

    }

}
async function generateInvoice()
{
    let url = "../php/get_customer_details.php";
    let urlParameters = "";   /* Construct a url parameter string to POST to fileName */
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
        let invoiceId = parseInt(jsonData.total * 3 / 2) * 10 + 555;
        htmlString = "<div>Invoice ID: IV" + invoiceId + "DTC</div><div id='details'><div id='line'></div><br><div>Name: " + jsonData.firstname + " " + jsonData.secondname + "</div><br><div id='line'></div><div>Contact: " + jsonData.phone + "</div><br><div id='line'></div><br><div>Email: " + jsonData.email + "</div>\n\
        <br><div id='line'></div><br><div>Address: " + jsonData.address + "</div><br><div id='line'></div><br><br><div>Total: " + jsonData.total + "</div></div>";
        document.getElementById('invoice').innerHTML = htmlString;
    }


}