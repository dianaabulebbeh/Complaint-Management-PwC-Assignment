    

function signinForm(){

  var signupForm = document.getElementsByClassName('signup-container');
  signupForm[0].style.display = 'none'; 

  var signinForm = document.getElementsByClassName('signin-container');
  signinForm[0].style.display = 'inline-block'; 
}

function signupForm(){
  window.location.replace('/');
}

function register(){
  let psw=document.getElementById('confirmPassword').value
  let email=document.getElementById('email').value
  let admin=document.getElementById('admin').checked
  let data={
    email,
    psw,
    admin
  }

data=JSON.stringify(data)
  console.log(data)
debugger
  $.ajax({
    url: "/register",
    type: "POST",
    data: data,  
    contentType: "application/json; charset=utf-8" ,// <- this is what you should add

  success:function(data) {
    var html = '';
    for (var i = 0; i< data.length; i++) {
        html += '<h2>' + (data[i].English) +'-'+(data[i].Arabic)+'</h2>';
    }
    $('#target').html(html); 
   
  }
});
}

function addComplaint(id){
  let complaintMessage=document.getElementById('complaintMessage').value
  complaintMessage=complaintMessage.trim()
  let data={
    complaintMessage,id
  }
   data=JSON.stringify(data)
  $.ajax({
    url: "/addComplaint",
    type: "POST",
    data: data,  
    contentType: 'application/json',
  success:function(data) {
    closeForm()
    let complaintsTable=document.getElementById('complaintsTable')
    if(complaintsTable){
      var html = '';
      html += '<td>'+ (data.message) +'</td>'+'<td>'+(data.status)+'</td>';
  
  $('#AddNewComplaint').html(html);
    }

    
   
  
  }
});
}

function closeForm(){
  document.getElementById('id01').style.display='none'
}

let updatedCompliment=[]
$(document).ready(function() {
  $('.dropdownID').change(function() {
    updatedCompliment.push({id:this.id,status:$(this).val()})
   
  });
});

function updateComplaintStatus(){
let data =JSON.stringify(updatedCompliment)
if(updatedCompliment.length > 0){
$.ajax({
  url: "/updateComplaintStatus",
  type: "PUT",
  data: data,  
  contentType: 'application/json',
success:function(data) {
 console.log(data)
}
});
}

}

function signOut(){
  window.localStorage.clear();
  window.location.reload(true);
  window.location.replace('/');
}






