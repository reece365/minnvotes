async function get_streets() {
    const response = await fetch(`http://127.0.0.1:5000/api/streets?zip_code=${document.getElementById("zip_code").value}`)
    const data = await response.json()
    
    return data.streets;
}

async function autocomplete_streets() {
    const fuse_options = {
        keys: [
            "fullStreetName"
        ]
    };
    
    const fuse = new Fuse(await get_streets(), fuse_options);
    
    const result = fuse.search(document.getElementById("street_name").value);
    document.getElementById("street_name").value = result[0].item.fullStreetName;

}

async function sel_street_constructor() {
    const fuse_options = {
        keys: [
            "fullStreetName"
        ]
    };
    
    const fuse = new Fuse(await get_streets(), fuse_options);
    
    const results = fuse.search(document.getElementById("street_name").value);

    const top_result = results[0].item;

    return { "fullStreetName": top_result.fullStreetName.replace(" ", "+").trim() + "+", "fullStreetNameId": top_result.fullStreetNameId, "zipCode": top_result.zipCode, "streetPreDirectional": top_result.streetPreDirectional, "streetPostDirectional": top_result.streetPostDirectional, "streetName": top_result.streetName, "streetType": top_result.streetType, "countyId": top_result.countyId };
}

async function check_registration() {
    document.getElementById("registration_spinner").classList.remove("visually-hidden");
    
    const dateOfBirth = new Date(document.getElementById("date_of_birth").value);
    const dob_day = dateOfBirth.getDate() + 1;
    const dob_month = dateOfBirth.getMonth() + 1;
    const dob_year = dateOfBirth.getFullYear();

    const response = await fetch(`http://127.0.0.1:5000/api/check_registration?first_name=${document.getElementById("first_name").value}&last_name=${document.getElementById("last_name").value}&dob_day=${dob_day}&dob_month=${dob_month}&dob_year=${dob_year}&zip_code=${document.getElementById("zip_code").value}&house_number=${document.getElementById("house_number").value}&sel_street=${JSON.stringify(await sel_street_constructor())}`);
    
    const data = await response.json();

    if ((data.status == "Your registration is pending") || data.status == "You are registered to vote") {
        document.getElementById("polling_place").innerHTML = data.polling_place;
        // Save polling place to local storage
        localStorage.setItem("polling_place", data.polling_place);
        document.getElementById("registered").classList.remove("visually-hidden");
        document.getElementById("not_registered").classList.add("visually-hidden");
    } else {
        document.getElementById("not_registered").classList.remove("visually-hidden");
        document.getElementById("registered").classList.add("visually-hidden");
    }

    document.getElementById("registration_spinner").classList.add("visually-hidden");
}
