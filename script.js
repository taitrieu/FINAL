// file: script.js
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAFzmOC13xBmUtrl5ufYIOZLKuRh0MiZog",
    authDomain: "project-81145626879328846.firebaseapp.com",
    databaseURL: "https://project-81145626879328846.firebaseio.com",
    projectId: "project-81145626879328846",
    storageBucket: "project-81145626879328846.appspot.com",
    messagingSenderId: "178020861416"
};
firebase.initializeApp(config);

//create firebase database reference
var dbRef = firebase.database();
var contactsRef = dbRef.ref('contacts');

//load older conatcts as well as any newly added one...
contactsRef.on("child_added", function(snap) {
  console.log("added", snap.key, snap.val());
  $('#contacts').append(contactHtmlFromObject(snap.val()));
});

//save contact
$('.addValue').on("click", function( event ) {  
    event.preventDefault();
    if( $('#name').val() != '' || $('#email').val() != '' ){
      contactsRef.push({
        name: $('#name').val().replace(/<[^>]*>/ig, ""),
        email: $('#email').val().replace(/<[^>]*>/ig, ""),
        comment: $('#city').val().replace(/<[^>]*>/ig, "")
      })
      contactForm.reset();
    } else {
      alert('Please fill atlease name or email!');
    }
  });

//prepare conatct object's HTML
function contactHtmlFromObject(contact){
  console.log( contact );
  var html = '';
  html += '<li class="list-group-item contact">';
    html += '<div>';
      html += '<p class="lead">'+contact.name+'</p>';
      html += '<p>'+contact.email+'</p>';
      html += '<p>'+contact.comment'</p>';
    html += '</div>';
  html += '</li>';
  return html;
}
