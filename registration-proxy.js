// A NodeJS proxy that listens for GET requests on /api/check-registration and forwards them to the registration service

import express from 'express';
import https from 'https';

const app = express();
const port = 3000;

function format_cookies(raw_cookies) {
    // Return just the cookie names and values, separated by semicolons
    const split_cookies = raw_cookies.split(",");
    let formatted_cookies = "";

    for (var i = 0; i < split_cookies.length; i++) {
        formatted_cookies += split_cookies[i].split(";")[0] + ";";
    }

    return formatted_cookies;
}

app.get('/api/check-registration', (req, res) => {
    // Extract the query parameters from the request
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const dob_month = req.query.dob_month;
    const dob_day = req.query.dob_day;
    const dob_year = req.query.dob_year;
    const zip_code = req.query.zip_code;
    const house_number = req.query.house_number;
    const sel_street = req.query.sel_street;

    const postData = new URLSearchParams({
        "Data.FirstName": first_name,
        "Data.LastName": last_name,
        "Data.DobMonth": dob_month,
        "Data.DobDay": dob_day,
        "Data.DobYear": dob_year,
        "Data.ZipCode": zip_code,
        "Data.CountyId": "",
        "Data.HouseNumber": house_number,
        "Data.SelStreet": "{\"fullStreetName\":\"DOGWOOD+RD+\",\"fullStreetNameId\":5915,\"zipCode\":\"55129\",\"streetPreDirectional\":\"\",\"streetPostDirectional\":\"\",\"streetName\":\"DOGWOOD\",\"streetType\":\"RD\",\"countyId\":0}",
        "Data.HouseUnitNumber": "",
        "__RequestVerificationToken": "CfDJ8IBOfpjRjEVGj4kEr%2BdsKH6%2F2piPTelK4FUSB5Mq%2BoAwQHGawt19xPMotDp1OcvEajeVvRvoWMfS2wDnz%2BFxM9Mhwk4v66gjz3040zZf4SDwnZ5qBUEvd%2F49hCN6FyAJOi0kPhtTRWHCFi7yd2VXI8ZSCltP%2Fa8grtmLwcpWDXSC",
        "Data.ChkHouseUnitNumber": "false"
    }).toString();

    const options = {
        hostname: 'mnvotes.sos.mn.gov',
        path: '/VoterStatusCheck/index',
        method: 'POST',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Referer': 'https://mnvotes.sos.mn.gov/VoterStatusCheck/index',
            'Origin': 'https://mnvotes.sos.mn.gov',
            'Cookie': "dtCookiess6bhnrn=v_4_srv_1_sn_1E03368451D8CE61109C9352CC09F84C_perc_100000_ol_0_mul_1_app-3Ac1add6d0627f9983_1_app-3Aea7c4b59f27d43eb_1; .AspNetCore.Antiforgery.PlSpOfmPus8=CfDJ8IBOfpjRjEVGj4kEr-dsKH6ZuEe0U3q49bDPqziQc6w30LsEtoO43XLvDe_J9Iw8icbjouV3FYtbgtUx3fD6jgVZ9n-A2JwadLhctFZh3tjZBdFmJJeHuMyEF_YI386TioAW6j0jK4T2xbI9GeuWLFc; __Secure-OSS_SESSION_ENCRYPTED=!TIrVWEBXBnJI8dKD+4aKgR2TP/ikIioePC0yrIOz0i7nIz2UcZpZW5vYwKUEduLJaq/cDOxKj3pZjGg=; .AspNetCore.Session=CfDJ8IBOfpjRjEVGj4kEr%2BdsKH6%2F2piPTelK4FUSB5Mq%2BoAwQHGawt19xPMotDp1OcvEajeVvRvoWMfS2wDnz%2BFxM9Mhwk4v66gjz3040zZf4SDwnZ5qBUEvd%2F49hCN6FyAJOi0kPhtTRWHCFi7yd2VXI8ZSCltP%2Fa8grtmLwcpWDXSC",
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Priority': 'u=0, i',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Content-Length': postData.length
        }
    };

    const registration_req = https.request(options, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            console.log(data);
        });
    });

    registration_req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    registration_req.write(postData);
    registration_req.end();


    // Fetch the base page, and store cookies
    fetch("https://mnvotes.sos.mn.gov/VoterStatusCheckResult/Index", { "credentials": "include" })
        .then(response => {
            // Store the cookies in a variable
            const cookies = response.headers.get('set-cookie');
            
        });
    }
);

app.listen(port, () => {
    console.log(`Registration proxy listening at http://localhost:${port}`);
});

// await fetch("https://mnvotes.sos.mn.gov/VoterStatusCheck/index", {
//     "credentials": "include",
//     "headers": {
//         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0",
//         "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8",
//         "Accept-Language": "en-US,en;q=0.5",
//         "Content-Type": "application/x-www-form-urlencoded",
//         "Sec-GPC": "1",
//         "Upgrade-Insecure-Requests": "1",
//         "Sec-Fetch-Dest": "document",
//         "Sec-Fetch-Mode": "navigate",
//         "Sec-Fetch-Site": "same-origin",
//         "Sec-Fetch-User": "?1",
//         "Priority": "u=0, i",
//         "Pragma": "no-cache",
//         "Cache-Control": "no-cache"
//     },
//     "referrer": "https://mnvotes.sos.mn.gov/VoterStatusCheck/index",
//     "body": "Data.FirstName=Idrees&Data.LastName=Ahmad&Data.DobMonth=08&Data.DobDay=25&Data.DobYear=2007&Data.ZipCode=55129&Data.CountyId=&Data.HouseNumber=11143&Data.SelStreet=%7B%22fullStreetName%22%3A%22DOGWOOD+RD+%22%2C%22fullStreetNameId%22%3A5915%2C%22zipCode%22%3A%2255129%22%2C%22streetPreDirectional%22%3A%22%22%2C%22streetPostDirectional%22%3A%22%22%2C%22streetName%22%3A%22DOGWOOD%22%2C%22streetType%22%3A%22RD%22%2C%22countyId%22%3A0%7D&Data.HouseUnitNumber=&__RequestVerificationToken=CfDJ8IBOfpjRjEVGj4kEr-dsKH6vBh8QsDiMtV15q5hxUqtcJ0O5OU0hUQH25Z5ZnagST1f8o4SuX2BC7DzW6ddnGNXMX3fPPRQE2L8f0QHBLOoNtd8dim9o_O8iaSiY3e2kThbOPvQzeA0lk3JJWRoBqlM&Data.ChkHouseUnitNumber=false",
//     "method": "POST",
//     "mode": "cors"
// });

// const request_body = new URLSearchParams();
//             request_body.append("Data.FirstName", first_name);
//             request_body.append("Data.LastName", last_name);
//             request_body.append("Data.DobMonth", dob_month);
//             request_body.append("Data.DobDay", dob_day);
//             request_body.append("Data.DobYear", dob_year);
//             request_body.append("Data.ZipCode", zip_code);
//             request_body.append("Data.CountyId", "");
//             request_body.append("Data.HouseNumber", house_number);
//             request_body.append("Data.SelStreet", "{\"fullStreetName\":\"DOGWOOD+RD+\",\"fullStreetNameId\":5915,\"zipCode\":\"55129\",\"streetPreDirectional\":\"\",\"streetPostDirectional\":\"\",\"streetName\":\"DOGWOOD\",\"streetType\":\"RD\",\"countyId\":0}");
//             request_body.append("Data.HouseUnitNumber", "");
//             request_body.append("__RequestVerificationToken", cookies.split(';')[0].split('=')[1]);
//             request_body.append("Data.ChkHouseUnitNumber", "false");