
async function ajaxGetAllUsers()
{
ajaxGetAllAdmins();
ajaxGetAllProducts();
        var url = "php/get_admin_table.php";  /* use POST method to send data to ajax_json_search.php */
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
            let htmlString = "";
            for(let i = 0; i < jsonData.length ; i++)
            {
                htmlString += "<tr class='row100 body'><td class='cell100 column2'>"+jsonData[i].id+"</td><td class='cell100 column3'>"+jsonData[i].user+"</td><td class='cell100 column3'>"+jsonData[i].name.charAt(0).toUpperCase() +jsonData[i].name.slice(1)+"</td>\n\
                                <td class='cell100 column3'>"+jsonData[i].access+"</td><td class='cell100 column3' id='deleteUser' onclick='ajaxDeleteUser("+jsonData[i].id+");'>Delete</td></tr>";
                
            }
            //htmlString += "</tbody>";
            document.getElementById("userTable").innerHTML = htmlString;
        }
    
async function ajaxGetAllAdmins()
{

        var url = "php/get_admins.php";  /* use POST method to send data to ajax_json_search.php */
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
            let htmlString = "";
            for(let i = 0; i < jsonData.length ; i++)
            {
                
                htmlString += "<tr class='row100 body'><td class='cell100 column2'>"+jsonData[i].name.charAt(0).toUpperCase() +jsonData[i].name.slice(1)+"</td></tr>";
                
            }
            //htmlString += "</tbody>";
            document.getElementById("allAdmins").innerHTML = htmlString;
        }
    } } 
async function ajaxDeleteUser(id)
{
        var url = "php/delete_user.php";  /* use POST method to send data to ajax_json_search.php */
        var urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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
        }
        
 async function ajaxGetAllProducts()
{
        var url = "php/get_admin_table_products.php";  /* use POST method to send data to ajax_json_search.php */
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
            let htmlString = "";
            for(let i = 0; i < jsonData.length ; i++)
            {
                htmlString += "<tr class='row100 body'><td class='cell100 column2'>"+jsonData[i].id+"</td><td class='cell100 column3'>"+jsonData[i].category+"</td><td class='cell100 column3'>"+jsonData[i].title.charAt(0).toUpperCase() +jsonData[i].title.slice(1)+"</td>\n\
                                <td class='cell100 column3'>&euro;"+jsonData[i].price+"</td><td class='cell100 column3'>"+jsonData[i].image+"</td><td class='cell100 column3'>"+jsonData[i].description+"</td><td class='cell100 column3' id='deleteUser' onclick='ajaxDeleteProduct("+jsonData[i].id+");'>Delete</td></tr>";
                
            }
            //htmlString += "</tbody>";
            document.getElementById("productTable").innerHTML = htmlString;
        }}
    
async function ajaxDeleteProduct(id)
{
        var url = "php/delete_user.php";  /* use POST method to send data to ajax_json_search.php */
        var urlParameters = "id=" + id;   /* Construct a url parameter string to POST to fileName */
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
        }
        