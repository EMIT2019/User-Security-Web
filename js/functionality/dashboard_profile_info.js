let profile_box = document.getElementById('profile_info_container');
let btn_sing_out = document.getElementById('btn_sing_out');

let full_name = () => {
    return `${JSON.parse(localStorage.getItem('user')).name} ${JSON.parse(localStorage.getItem('user')).lastname}`;
};

profile_box.firstElementChild.innerHTML = full_name();

btn_sing_out.addEventListener("click", () => {
    localStorage.removeItem('user');
    location.href = '../login.html';
});