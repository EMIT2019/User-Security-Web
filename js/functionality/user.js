let table = document.getElementById('res_data_table');
let tableRows = table.getElementsByTagName('tr');
let rowCount;
let txt_username = document.getElementById('txt_username');
let btn_search = document.getElementById('btn_search');
let btn_show_all = document.getElementById('btn_show_all');


async function getAllUsers(){

    const userAction = async () => {
        const response = await fetch('https://user-security.onrender.com/security/user/get-all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        if(myJson.status !== 500){
            clearTable();
            audit_list = myJson;
            formatResponse(audit_list);
        } else {
            
        }
    };
    userAction();
    rowCount = tableRows.length;
}

async function getAllUsersByUsername(){
    let username =  txt_username.value;

    const userAction = async () => {
        const response = await fetch(`https://user-security.onrender.com/security/user/user-search?parameter=${username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const myJson = await response.json();
        if(myJson.status !== 500){
            clearTable();
            audit_list = myJson;
            formatResponse(audit_list);
        } else {
            
        }
    };
    userAction();
    rowCount = tableRows.length;
}

function formatResponse(list){
    let user;
    let colors = {
        white: "#ffffff",
        gray: "#F0F0F0"
    };
    let style;


    for(var x = 0; x < list.length; x++){
        user = {
            id: list[x].id_user,
            username: list[x].username,
            name: list[x].name, 
            lastname: list[x].lastname,
            email: list[x].email,
            state: list[x].state
        }

        if(x%2 == 0){
            style = colors.white;
        } else {
            style = colors.gray;
        }

        printAudit(user, style);
    }
};

function printAudit(user, style){
    let table_row = document.createElement('tr');
    let table_td = document.createElement('td');

    table_td.innerHTML = `${user.id}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${user.username}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${user.name}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${user.lastname}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${user.email}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    if(user.state == 1){
        table_td = document.createElement('td');
        table_td.innerHTML = `CREATE`;
        table_td.classList.add('create_style');
    } else if(user.state == 2){
        table_td = document.createElement('td');
        table_td.innerHTML = `UPDATE`;        
        table_td.classList.add('update_style');
    };
    
    table_row.style.backgroundColor = style;
    table_row.appendChild(table_td);

    table.appendChild(table_row);
}

function clearTable(){
    for(var x = 1; x < rowCount; x++){
        if(table.hasChildNodes){
            table.removeChild(table.lastChild);
        }
    }
}

getAllUsers();

btn_search.addEventListener("click", () => {
    if(txt_username.value !== ""){
        getAllUsersByUsername();
    }
});

btn_show_all.addEventListener("click", getAllUsers);