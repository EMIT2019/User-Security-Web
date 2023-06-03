let txt_username = document.getElementById('txt_user');
let txt_name = document.getElementById('txt_name');
let txt_lastname = document.getElementById('txt_lastname');
let txt_password = document.getElementById('txt_password');
let txt_confirm_password = document.getElementById('txt_password_confirm');
let txt_email = document.getElementById('txt_email');
let btn_save = document.getElementById('btn_save');

async function saveNewUser(){
    let user;
    let password = txt_password.value;
    let confirm_password = txt_confirm_password.value;


    if(checkPasswords(password, confirm_password)){
        if(checkAllFields()){
            user = {
                username: `${txt_username.value}`,
                name: `${txt_name.value}`,
                lastname: `${txt_lastname.value}`,
                password: `${txt_password.value}`,
                email: `${txt_email.value}`,
                state: 1
            }
            console.log(JSON.stringify(user));
        }
    }

    const userAction = async () => {
        const response = await fetch(`https://user-security.onrender.com/security/user/save-user?id=${JSON.parse(localStorage.getItem('user')).id_user}`, {
          method: 'POST',
          body: JSON.stringify(user),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        console.log(myJson);
        if(myJson.status !== 500){
            location.href = "user_table.html";
        } else {
            alert('Something went wrong!')
        }
    };

    userAction();
}

function checkAllFields(){
    if(txt_username.value !== "" && txt_name.value !== "" && txt_lastname.value !== "" && txt_password.value !== "" && txt_confirm_password.value !== "" && txt_email.value !== ""){
        return true;
    }

    return false;
}

function checkPasswords(password, confirm_password){
    if(password == confirm_password){
        return true;
    }
    return false;
}

btn_save.addEventListener("click", saveNewUser);