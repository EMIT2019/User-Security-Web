let profile_box = document.getElementById('profile_info_container');
let full_name = () => {
    return `${JSON.parse(localStorage.getItem('user')).name} ${JSON.parse(localStorage.getItem('user')).lastname}`;
};

profile_box.firstElementChild.innerHTML = full_name();