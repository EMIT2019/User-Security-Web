let header_section = document.getElementById('header_sec');
let title = document.createElement('h1');
let header_text = "User Security"
let icon =  document.createElement('img');

icon.setAttribute('src', 'resources/images/username-icon.jpg');

header_section.classList.add('header_section');
icon.classList.add('image');
title.classList.add('title');

title.innerHTML = header_text;
header_section.appendChild(title);