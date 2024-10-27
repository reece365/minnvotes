// Retrieve data from query parameters

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);

    const voting_type = urlParams.get('voting_type');
    const early_voting = urlParams.get('early_voting');
    const vote_during_work = urlParams.get('vote_during_work');

    
    const voting_date = urlParams.get('voting_date');
    const early_voting_location = JSON.parse(urlParams.get('early_voting_location'));
    
    console.error("Failed to parse query parameters");


    document.getElementById("voting_type_display").innerText = voting_type;

    if (early_voting == "Early") {
        const date = new Date(voting_date);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById("voting_date_display").innerText = date.toLocaleDateString(undefined, options);
    } else if (early_voting == "On election day") {
        document.getElementById("voting_date_display").innerText = "November 5, 2024";
    }

    document.getElementById("voting_time_display").innerText = vote_during_work;

    if (early_voting == "Early") {
        document.getElementById("polling_place_display").innerHTML = `<b>${early_voting_location.name}</b><br/>${early_voting_location.address}`;
    } else if (early_voting == "On election day") {
        document.getElementById("polling_place_display").innerText = localStorage.getItem("polling_place");
    }

    if (voting_type == "Absentee") {
        document.getElementById("voting_type_display").innerText = "Absentee";
        document.getElementById("voting_date_display").innerText = "Must be postmarked by November 5, 2024";
        document.getElementById("voting_time_display").innerText = "Not applicable";
        document.getElementById("polling_place_display").innerText = "Not applicable";
    }
});

function text_voting_plan() {    
    const urlParams = new URLSearchParams(window.location.search);

    const early_voting = urlParams.get('early_voting');
    const early_voting_location = JSON.parse(urlParams.get('early_voting_location'));
    const voting_type = document.getElementById("voting_type_display").innerText;
    const voting_date = document.getElementById("voting_date_display").innerText;
    const voting_time = document.getElementById("voting_time_display").innerText;
    const polling_place = document.getElementById("polling_place_display").innerText;

    const polling_place_address = early_voting == "Early" ? early_voting_location.address : undefined;
    const google_maps_link = encodeURIComponent(`https://www.google.com/maps/search/?api=1&query=${polling_place_address}`).replace(" ", "+");
    // Prompt user for phone number
    const phone_number = prompt("Enter your phone number to receive a text message with your voting plan");

    fetch('https://textbelt.com/text', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: phone_number,
          message: `Congratulations! 🎉\n\nYou now have a plan for when, where, and how you'll vote!\n\nType of voting: ${voting_type}\nDate: ${voting_date}\nTime: ${voting_time}\nPolling place: ${polling_place} (Directions: ${google_maps_link})\n\nOne thing left to do: vote!`,
          key: 'e1e5bebc722c01de128bbf83080dc7dd31e75dfeKIkbl1mUdaIjaTSfDQBzrprtF',
        }),
      }).then(response => {
        return response.json();
      }).then(data => {
        console.log(data);
      });
}