let txt_username = document.getElementById('txt_username');
let txt_password = document.getElementById('txt_password');
let login_button = document.getElementById('check_button');
let timer_bar = document.getElementById('warn_time_bar');
let warn_box = document.getElementById('warn_box');


login_button.addEventListener("click", checkCredentials);

let input_body = {
    username: "",
    password: ""
}

async function checkCredentials(){
    input_body.username = txt_username.value;
    input_body.password = txt_password.value;

    const userAction = async () => {
        const response = await fetch('https://user-security.onrender.com/security/user/login', {
          method: 'POST',
          body: JSON.stringify(input_body),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        if(myJson.status !== 500){
            setSession(myJson);
            location.href = "public/home_dashboard.html";
        } else {
            warn_box.classList.add('warn_box_animation');
            timer_bar.classList.add('warn_timer_bar_animation');

            setTimeout(removeAnimations, 8000);
        }
    };

    userAction();
}

function removeAnimations(){
    warn_box.classList.remove('warn_box_animation');
    timer_bar.classList.remove('warn_timer_bar_animation');
}

function setSession(user){
    localStorage.setItem('user', JSON.stringify(user));
}