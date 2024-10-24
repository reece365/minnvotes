/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

const axios = require("axios");
const cheerio = require("cheerio");

exports.check_registration = onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Methods', 'GET')

        const initializeResponse = await axios.get('https://mnvotes.sos.mn.gov/VoterStatusCheck/index', { withCredentials: true });
        const cookies = initializeResponse.headers['set-cookie'];

        const $ = cheerio.load(initializeResponse.data);
        const tokenElement = $('input[name="__RequestVerificationToken"]');
        const token = tokenElement.val();

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/png,image/svg+xml,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://mnvotes.sos.mn.gov/VoterStatusCheck/index',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://mnvotes.sos.mn.gov',
            'DNT': '1',
            'Sec-GPC': '1',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            'Priority': 'u=0, i',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Cookie': cookies.join('; ')
        };

        const data = new URLSearchParams({
            'Data.FirstName': req.query.first_name,
            'Data.LastName': req.query.last_name,
            'Data.DobMonth': req.query.dob_month,
            'Data.DobDay': req.query.dob_day,
            'Data.DobYear': req.query.dob_year,
            'Data.ZipCode': req.query.zip_code,
            'Data.CountyId': '',
            'Data.HouseNumber': req.query.house_number,
            'Data.SelStreet': req.query.sel_street,
            'Data.HouseUnitNumber': '',
            '__RequestVerificationToken': token,
            'Data.ChkHouseUnitNumber': 'false',
        });

        const response = await axios.post('https://mnvotes.sos.mn.gov/VoterStatusCheck/index', data, { headers, withCredentials: true });

        const $response = cheerio.load(response.data);

        console.log(response.data);
        const statusElement = $response('.oss_results_header');
        const statusMessage = statusElement.text().trim() || 'Status not found';

        res.json({ status: statusMessage, polling_place: "Not implemented" });
});

exports.streets = onRequest(async (req, res) => {
        res.set('Access-Control-Allow-Origin', "*")
        res.set('Access-Control-Allow-Methods', 'GET')

        const initializeResponse = await axios.get('https://mnvotes.sos.mn.gov/VoterStatusCheck/index');
        const cookies = initializeResponse.headers['set-cookie'];

        const headers = {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Referer': 'https://mnvotes.sos.mn.gov/voterstatuscheck/index',
            'Content-Type': 'application/json',
            'Origin': 'https://mnvotes.sos.mn.gov',
            'DNT': '1',
            'Sec-GPC': '1',
            'Connection': 'keep-alive',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'Priority': 'u=0',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
            'Cookie': cookies.join('; ')
        };

        const data = {
            "countyId": 0,
            "mcdId": 0,
            "zipCode": req.query.zip_code,
        };

        const response = await axios.post('https://mnvotes.sos.mn.gov/api/streets', data, { headers });

        res.json(response.data);
    });