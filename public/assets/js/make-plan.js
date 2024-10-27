function show_in_person_options() {
    document.getElementById("in_person_div").classList.remove("visually-hidden");
    document.getElementById("finish-plan-button").classList.remove("visually-hidden");
    document.getElementById("absentee-button").classList.add("visually-hidden");
}

function hide_in_person_options() {
    document.getElementById("in_person_div").classList.add("visually-hidden");
    document.getElementById("finish-plan-button").classList.add("visually-hidden");
    document.getElementById("absentee-button").classList.remove("visually-hidden");
}

function show_early_voting_options() {
    document.getElementById("early_voting_div").classList.remove("visually-hidden");
}

function hide_early_voting_options() {
    document.getElementById("early_voting_div").classList.add("visually-hidden");
}

function verify_voting_plan() {
    const early_voting = get_group_value(document.getElementById("early_voting"));

    if (early_voting == "Early") {
        const voting_date = document.getElementById("voting_date").value;

        const today = new Date();
        const voting_date_obj = new Date(voting_date);
        const election_day = new Date(today.getFullYear(), 10, 5); 

        if (window.early_voting_location == undefined) {

            document.getElementById("map").classList.remove("border-0");
            document.getElementById("map").classList.add("border-3");
            document.getElementById("map").classList.add("border-danger");
            return false;
        }
        if (voting_date == "" || voting_date_obj <= today || voting_date_obj > election_day) {
            
            document.getElementById("voting_date").classList.remove("border-0");
            document.getElementById("voting_date").classList.add("border-3");
            document.getElementById("voting_date").classList.add("border-danger");
            return false;
        }
    }

    document.getElementById("map").classList.add("border-0");
    document.getElementById("voting_date").classList.add("border-0");
    document.getElementById("map").classList.add("border-3");
    document.getElementById("map").classList.add("border-danger");
    document.getElementById("voting_date").classList.remove("border-3");
    document.getElementById("voting_date").classList.remove("border-danger");

    return true;
}

function submit_voting_plan() {
    if (verify_voting_plan()) {
        const voting_type = get_group_value(document.getElementById("voting_type"));
        const early_voting = get_group_value(document.getElementById("early_voting"));
        const voting_date = document.getElementById("voting_date").value;
        const early_voting_location = JSON.stringify(window.early_voting_location);
        const vote_during_work = get_group_value(document.getElementById("vote_during_work"));

        // Construct a query string linking to /finish-plan.html
        const query_string = `?voting_type=${voting_type}&early_voting=${early_voting}&voting_date=${voting_date}&early_voting_location=${early_voting_location}&vote_during_work=${vote_during_work}`;
        window.location.href = `/finish-plan.html${query_string}`;
    }
}

// On DOM load
document.addEventListener("DOMContentLoaded", async function() {
    document.getElementById("voting_date").min = new Date().toISOString().split("T")[0];
});