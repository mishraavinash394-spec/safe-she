// ===============================
// FIREBASE CONTACTS
// ===============================

let currentUser = null;

// User Login Check
auth.onAuthStateChanged(function(user){

    if(user){

        currentUser = user;

        loadContacts();

    }else{

        window.location.href = "login.html";

    }

});

// Save Contact
function saveContact(){

    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if(name === "" || phone === ""){

        alert("Please fill all fields.");
        return;

    }

    if(phone.length != 10){

        alert("Enter a valid 10 digit phone number.");
        return;

    }

    db.collection("users")
      .doc(currentUser.uid)
      .collection("contacts")
      .add({

          name: name,
          phone: phone,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()

      })

      .then(function(){

          alert("✅ Contact Saved");

          document.getElementById("name").value = "";
          document.getElementById("phone").value = "";

          loadContacts();

      })

      .catch(function(error){

          alert(error.message);

      });

}

// Load Contacts
function loadContacts(){

    let list = document.getElementById("contactList");

    list.innerHTML = "";

    db.collection("users")
      .doc(currentUser.uid)
      .collection("contacts")
      .get()

      .then(function(snapshot){

          snapshot.forEach(function(doc){

              let contact = doc.data();

              list.innerHTML += `

              <div class="contact-item">

                  <div>

                      <b>${contact.name}</b><br>

                      ${contact.phone}

                  </div>

                  <button
                      class="delete-btn"
                      onclick="deleteContact('${doc.id}')">

                      Delete

                  </button>

              </div>

              `;

          });

      });

}

// ===============================
// Delete Contact
// ===============================

function deleteContact(id){

    let confirmDelete = confirm(
        "Are you sure you want to delete this contact?"
    );

    if(!confirmDelete){

        return;

    }

    db.collection("users")
      .doc(currentUser.uid)
      .collection("contacts")
      .doc(id)
      .delete()

      .then(function(){

          alert("✅ Contact Deleted Successfully");

          loadContacts();

      })

      .catch(function(error){

          alert(error.message);

      });

}