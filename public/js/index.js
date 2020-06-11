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


login.on("submit", function(event){

    event.preventDefault();

    var username = loginUsername.val().trim();
    var password = loginPassword.val().trim();

    if (username == "" || password == ""){
        loginAlert.removeAttr("hidden")
        loginAlert.text("Please enter your username and or password")
        return;
    }

    loginUser(username, password);
});

signUp.on("submit", function(event){
    event.preventDefault(event);

    var userProfile = {
        avatar: file[0].files[0],
        firstname: firstName.val().trim(),
        lastname: lastName.val().trim(),
        username: signupUsername.val().trim(),
        email: signupEmail.val().trim(),
        password: signupPassword.val().trim()
    }

    console.log(userProfile);
    
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
          // loginUser(userProfile.userName, userProfile.password)
        })
        .catch(function(err) {
          console.log(err);
        });
})


// We still need a login api something that takes the user's username and password and queries the database to see if it's a valid login

function loginUser(username, password){
    // Needs to be tested
    $.post("/api/login", {
        username: username,
        password: password
      })
        .then(function() {
          window.location.replace(`/myprofile/${username}`);
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });

        localStorage.setItem('user', username);

    // Maybe a get to get the users id and save it to local storage

    // $.get(`/api/users/${username}`, function(data){

    // })

}