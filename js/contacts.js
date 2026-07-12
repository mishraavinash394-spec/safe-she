let contacts =
JSON.parse(localStorage.getItem("contacts")) || [];

displayContacts();

function saveContact(){

let name =
document.getElementById("name").value;

let phone =
document.getElementById("phone").value;

if(name=="" || phone==""){

alert("Please fill all fields");

return;

}
if(phone.length != 10){

    alert("Please enter a valid 10-digit phone number");

    return;

}
let exists = contacts.find(contact => contact.phone === phone);

if(exists){

    alert("This contact already exists.");

    return;

}
contacts.push({

name:name,

phone:phone

});

localStorage.setItem("contacts",
JSON.stringify(contacts));

displayContacts();

document.getElementById("name").value="";

document.getElementById("phone").value="";

}

function displayContacts(){

let list =
document.getElementById("contactList");

list.innerHTML="";

contacts.forEach((contact,index)=>{

list.innerHTML +=`

<div class="contact-item">

<div>

<b>${contact.name}</b>

<br>

${contact.phone}

</div>

<button class="delete-btn"

onclick="deleteContact(${index})">

Delete

</button>

</div>

`;

});

}

function deleteContact(index){

contacts.splice(index,1);

localStorage.setItem("contacts",
JSON.stringify(contacts));

displayContacts();

}