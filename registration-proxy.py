import requests
from flask import Flask, jsonify, request
from bs4 import BeautifulSoup

app = Flask(__name__)

@app.route('/api/check_registration', methods=['GET'])
def check_registration():
    initialize_response = requests.get('https://mnvotes.sos.mn.gov/VoterStatusCheck/index')
    cookies = requests.utils.dict_from_cookiejar(initialize_response.cookies)

    soup = BeautifulSoup(initialize_response.text, 'html.parser')
    token_element = soup.find('input', {'name': '__RequestVerificationToken'})
    token = token_element['value'] if token_element else None

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

    soup = BeautifulSoup(response.text, 'html.parser')
    status_element = soup.find(class_='oss_results_header')
    status_message = status_element.get_text(strip=True) if status_element else 'Status not found'

    polling_place_element = soup.find_all(class_='oss_text-data')[1] if len(soup.find_all(class_='oss_text-data')) > 1 else None
    polling_place = str(polling_place_element) if polling_place_element else 'Polling place not found'

    return { "status": status_message, "polling_place": polling_place }

@app.route('/api/streets', methods=['GET'])
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
    streets_response.headers.add('Access-Control-Allow-Origin', '*')

    return streets_response

if __name__ == '__main__':
    app.run(debug=True)
