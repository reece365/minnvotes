# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app

import requests
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin
import re

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

@app.route('/api/check_registration', methods=['GET'])
@cross_origin()
def check_registration():

    initialize_response = requests.get('https://mnvotes.sos.mn.gov/VoterStatusCheck/index')
    cookies = requests.utils.dict_from_cookiejar(initialize_response.cookies)

    token_match = re.search(r'<input[^>]*name="__RequestVerificationToken"[^>]*value="([^"]*)"', initialize_response.text)
    token = token_match.group(1) if token_match else None

    headers = {
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
    }

    data = {
        'Data.FirstName': request.args.get('first_name'),
        'Data.LastName': request.args.get('last_name'),
        'Data.DobMonth': request.args.get('dob_month'),
        'Data.DobDay': request.args.get('dob_day'),
        'Data.DobYear': request.args.get('dob_year'),
        'Data.ZipCode': request.args.get('zip_code'),
        'Data.CountyId': '',
        'Data.HouseNumber': request.args.get('house_number'),
        'Data.SelStreet': request.args.get('sel_street'),
        'Data.HouseUnitNumber': '',
        '__RequestVerificationToken': token,
        'Data.ChkHouseUnitNumber': 'false',
    }

    response = requests.post('https://mnvotes.sos.mn.gov/VoterStatusCheck/index', cookies=cookies, headers=headers, data=data)

    response_text = response.text

    # Use regular expressions to find the element with class 'oss_results_header'
    status_match = re.search(r'<[^>]*class="oss_results_header"[^>]*>(.*?)</[^>]*>', response_text, re.DOTALL)
    status_message = status_match.group(1).strip() if status_match else 'Status not found'  

    return { "status": status_message, "polling_place": "Not implemented" }

@app.route('/api/streets', methods=['GET'])
@cross_origin()
def streets():

    initialize_response = requests.get('https://mnvotes.sos.mn.gov/VoterStatusCheck/index')
    cookies = requests.utils.dict_from_cookiejar(initialize_response.cookies)

    headers = {
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
    }

    data = {
        "countyId": 0,
        "mcdId": 0,
        "zipCode": request.args.get('zip_code'),
    }

    response = requests.post('https://mnvotes.sos.mn.gov/api/streets', cookies=cookies, headers=headers, json=data)

    streets_response = jsonify(response.json())

    return streets_response

if __name__ == '__main__':
    app.run(debug=True)

@https_fn.on_request()
def minnvotesapis(req: https_fn.Request) -> https_fn.Response:
    with app.request_context(req.environ):
        return app.full_dispatch_request()