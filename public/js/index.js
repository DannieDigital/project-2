var login = $("#loginForm");
var loginUsername = $("#loginUsername");
var loginPassword = $("#loginPassword");
var signUp = $("#signupForm");
var file = $("#file");
var firstName = $("#firstName");
var lastName = $("#lastName");
var signupUsername = $("#signupUsername");
var signupEmail = $("#email");
var signupPassword = $("#signupPassword");
var loginAlert = $("#loginAlert");
var signupAlert = $("#signupAlert")
var profilePic = $("#blah");
var fileLoc = $("#fileLoc");

login.on("submit", function(event){

    event.preventDefault();

    var username = loginUsername.val().trim();
    var password = loginPassword.val().trim();

    if (username == "" || password == ""){
        loginAlert.removeAttr("hidden")
        loginAlert.text("Please enter your username and or password")
        return;
    }

    loginUsername.val("");
    loginPassword.val("");

    loginUser(username, password);
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {

      $('#blah')
        .attr('src', e.target.result)
        
    };
    reader.readAsDataURL(input.files[0] );
  }
}

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

signUp.on("submit", function(event){
    event.preventDefault(event);
 
    imgData = getBase64Image(blah);
    

    // console.log(file[0].files[0].name);

    // var avatar = file[0].files[0].name || fileLoc.val().trim() || "assets/profile.png"

    var avatar;

    if (file[0].files[0]){
      avatar = file[0].files[0].name;
      localStorage.setItem(`${avatar}`, imgData);
    }else if (!file[0].files[0]){
      avatar = fileLoc.val().trim()
    }
    
    if(!avatar){
      avatar = "assets/profile.png";
    }

    var userProfile = {
        avatar: avatar ,
        firstname: firstName.val().trim(),
        lastname: lastName.val().trim(),
        username: signupUsername.val().trim(),
        email: signupEmail.val().trim(),
        password: signupPassword.val().trim(),
    }

    firstName.val("");
    lastName.val("");
    signupUsername.val("");
    signupEmail.val("");
    signupPassword.val("");
    file.val("");
    fileLoc.val("");
    $("#blah") .attr('src', "assets/1x1.png");
    // console.log(userProfile);
    
    if (!userProfile.firstname || !userProfile.lastname || !userProfile.username || !userProfile.email || !userProfile.password){
        signupAlert.removeAttr("hidden")
        signupAlert.text("Please complete all required fields")
        return;
    }

    // Works
    $.post("/api/users", userProfile,function(data){
      localStorage.setItem('userId', data.id);
      console.log(data)
    })
        .then(function() {
          loginUser(userProfile.username, userProfile.password);
        })
        .catch(function(err) {
          console.log(err);
        });
})



function loginUser(username, password){

  console.log(username);
  $.get(`/api/users`, function(data){
    data.forEach(user => {
      if (user.username == username){
        localStorage.setItem('userId',user.id);
      }
      
    })

  })
    // Not working
    $.get("/mytimeline", {
        username: username,
        password: password
      })
        .then(function() {
          window.location.replace(`/mytimeline.html`);
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });

}


// }

var localStorageSpace = function(){
  var data = '';

  console.log('Current local storage: ');

  for(var key in window.localStorage){

      if(window.localStorage.hasOwnProperty(key)){
          data += window.localStorage[key];
          console.log( key + " = " + ((window.localStorage[key].length * 16)/(8 * 1024)).toFixed(2) + ' KB' );
      }

  }

  console.log(data ? '\n' + 'Total space used: ' + ((data.length * 16)/(8 * 1024)).toFixed(2) + ' KB' : 'Empty (0 KB)');
  console.log(data ? 'Approx. space remaining: ' + (5120 - ((data.length * 16)/(8 * 1024)).toFixed(2)) + ' KB' : '5 MB');
};

localStorageSpace();