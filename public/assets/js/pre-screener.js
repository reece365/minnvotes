function switch_button(element_id, parent_id) {
    const parent = document.getElementById(parent_id);
    const target = parent.childNodes[element_id];
    const neighbour = parent.childNodes[(element_id == 0) ? 1 : 0]
    
    target.classList.remove("btn-secondary");
    target.classList.add("btn-primary");
    neighbour.classList.remove("btn-primary");
    neighbour.classList.add("btn-secondary");
}

function get_group_value(group_element) {
    for (button in group_element.childNodes) {
        if (group_element.childNodes[button].classList.contains("btn-primary")) {
            if ((group_element.childNodes[button].innerText == "Yes") || (group_element.childNodes[button].innerText == "No")) {
                return (group_element.childNodes[button].innerText == "Yes");
            } else  {
                return group_element.childNodes[button].innerText;
            }
        }
    }
}

function check_prescreener() {
    const is_over_eighteen = get_group_value(document.getElementById("is_over_eighteen"))
    const is_over_sixteen = get_group_value(document.getElementById("is_over_sixteen"))
    const is_citizen = get_group_value(document.getElementById("is_citizen"))
    const is_resident = get_group_value(document.getElementById("is_resident"))
    const is_convicted = get_group_value(document.getElementById("is_convicted"))
    
    if (is_over_eighteen && is_citizen && is_resident && !is_convicted) {
        document.getElementById("eligible_vote").classList.remove("visually-hidden");
        document.getElementById("eligible_register").classList.add("visually-hidden");
        document.getElementById("not_eligible").classList.add("visually-hidden");
    } else if (!is_over_eighteen && is_over_sixteen && is_citizen && is_resident && !is_convicted) {
        document.getElementById("eligible_vote").classList.add("visually-hidden");
        document.getElementById("eligible_register").classList.remove("visually-hidden");
        document.getElementById("not_eligible").classList.add("visually-hidden");
    } else if ((!is_over_eighteen && !is_over_sixteen) || !is_resident || is_convicted) {
        document.getElementById("eligible_vote").classList.add("visually-hidden");
        document.getElementById("eligible_register").classList.add("visually-hidden");
        document.getElementById("not_eligible").classList.remove("visually-hidden");
    }
}