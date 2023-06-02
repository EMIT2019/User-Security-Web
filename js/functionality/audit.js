let table = document.getElementById('res_data_table');
let tableRows = table.getElementsByTagName('tr');
let rowCount;
let btn_search = document.getElementById('btn_search');
let btn_show_all = document.getElementById('btn_show_all');
let txt_author_search = document.getElementById('txt_author');
let txt_affected_search = document.getElementById('txt_affected_user');
let audit_list = [];

async function getAllAudits(){

    const userAction = async () => {
        const response = await fetch('https://user-security.onrender.com/security/audit/get-all', {
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

async function getAllAuditsByAuthor(){
    let author_name =  txt_author_search.value;

    const userAction = async () => {
        const response = await fetch(`https://user-security.onrender.com/security/audit/author?author-name=${author_name}`, {
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

async function getAllAuditsByAffectedUser(){
    let affected_user =  txt_affected_search.value;

    const userAction = async () => {
        const response = await fetch(`https://user-security.onrender.com/security/audit/affected-user?user=${affected_user}`, {
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

async function getAllAuditsByAffectedAndAuthor(){
    let affected_user =  txt_affected_search.value;
    let author = txt_author_search.value;

    const userAction = async () => {
        const response = await fetch(`https://user-security.onrender.com/security/audit/affected-author?affected=${affected_user}&author=${author}`, {
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

getAllAudits();



function formatResponse(list){
    let audit;
    let colors = {
        white: "#ffffff",
        gray: "#F0F0F0"
    };
    let style;


    for(var x = 0; x < list.length; x++){
        audit = {
            id: list[x].id_user_audit,
            author: list[x].author.username,
            affected_user: list[x].affected_user.username,
            username: list[x].username,
            name: list[x].name, 
            lastname: list[x].lastname,
            email: list[x].email,
            operation: list[x].operation.operation_name, 
            date: list[x].date
        }

        if(x%2 == 0){
            style = colors.white;
        } else {
            style = colors.gray;
        }

        printAudit(audit, style);
    }
};

function printAudit(audit, style){
    let table_row = document.createElement('tr');
    let table_td = document.createElement('td');

    table_td.innerHTML = `${audit.id}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.author}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.affected_user}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.username}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.name}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.lastname}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.email}`;
    table_row.appendChild(table_td);

    table_td = document.createElement('td');

    if(audit.operation == 'CREATE'){
        table_td.classList.add('create_style');
        table_td.innerHTML = `${audit.operation}`;
        table_row.appendChild(table_td);
    } else if(audit.operation == 'UPDATE'){
        table_td.classList.add('update_style');
        table_td.innerHTML = `${audit.operation}`;
        table_row.appendChild(table_td);
    } else if(audit.operation == 'REMOVE'){
        table_td.classList.add('remove_style');
        table_td.innerHTML = `${audit.operation}`;
        table_row.appendChild(table_td);
    }

    table_td = document.createElement('td');

    table_td.innerHTML = `${audit.date}`;
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

btn_show_all.addEventListener("click", getAllAudits);

btn_search.addEventListener("click", () => {
    if(txt_author_search.value !== "" && txt_affected_search.value !== ""){
        getAllAuditsByAffectedAndAuthor();
    } else if(txt_author_search.value !== "" && txt_affected_search.value == ""){
        getAllAuditsByAuthor();
    } else if(txt_author_search.value == "" && txt_affected_search.value !== "") {
        getAllAuditsByAffectedUser();
    }
});