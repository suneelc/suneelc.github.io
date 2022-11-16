$(document).ready(function () {
  $("button").click(function async() {
    const ISBN = document.getElementById("isbn").value;
    const institution = document.getElementById("institution").value;
    const Currency = document.getElementById("curr").value;
    const region = document.getElementById("region").value;
    const host =
      "https://api.cni4f-cengagele1-s2-public.model-t.cc.commerce.ondemand.com";
    const getDetailsUrl = `${host}/occ/v2/cengage-b2c-emea/cngproducts/${ISBN}?fields=FULL&curr=${Currency}&priceReferenceIds=${region},${institution}`;
    const client_id = "STOR-1DL6-DEE5-35NT-EXZD";
    const client_secret = "VAL-1NL6-DEE5-1NM9-Z55N";
    const username = "7981b6b87e67467c:-88a5f4:18073b79bba:76c7";
    const grant_type = "password";

    var tokenHeaders = new Headers();
    tokenHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    tokenHeaders.append(
      "Cookie",
      "JSESSIONID=87D2FBC6144749F0D89C9F43EE03AC85.api-7d6fbfc9ff-rfgfz; ROUTE=.api-7d6fbfc9ff-rfgfz"
    );

    var urlencoded = new URLSearchParams();
    urlencoded.append("client_id", client_id);
    urlencoded.append("client_secret", client_secret);
    urlencoded.append("grant_type", grant_type);
    urlencoded.append("username", username);

    var requestOptions = {
      method: "POST",
      headers: tokenHeaders,
      body: urlencoded,
      redirect: "follow",
    };

    //to get access token and on success fetch product details using user token
    fetch(
      "https://api.cni4f-cengagele1-s2-public.model-t.cc.commerce.ondemand.com/authorizationserver/oauth/token",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        const response = JSON.parse(result);
        let accesstoken = response?.access_token;
        var getDetailsHeaders = new Headers();
        getDetailsHeaders.append("Authorization", `Bearer ${accesstoken}`);
        // getDetailsHeaders.append("Cookie", "ROUTE=.api-78dc565756-p9pqv");
        // getDetailsHeaders.append("Access-Control-Allow-Origin", "*");
        // getDetailsHeaders.append("Access-Control-Allow-Origin", "*");
        // getDetailsHeaders.append("Access-Control-Allow-Credentials", "true");
      

        var requestOptions = {
          method: "GET",
          headers: getDetailsHeaders,
          redirect: "follow",
          // mode: "no-cors",
        };

        fetch(
          `${getDetailsUrl}`,
          requestOptions
        )
          .then((response) => response.text())
          .then((result) => console.log(result))
          .catch((error) => console.log("error", error));
      })
      .catch((error) => console.log("error", error));

    return false;
  });
});
