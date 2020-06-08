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
        nameFirst: firstName.val().trim(),
        nameLast: lastName.val().trim(),
        userName: signupUsername.val().trim(),
        email: signupEmail.val().trim(),
        password: signupPassword.val().trim()
    }
    
    if (!userProfile.nameFirst || !userProfile.nameLast || !userProfile.userName || !userProfile.email || !userProfile.password){
        signupAlert.removeAttr("hidden")
        signupAlert.text("Please complete all required fields")
        return;
    }

    // Needs to be tested
    $.post("/api/signup", userProfile)
        .then(function() {
          loginUser(userProfile.userName, userProfile.password)
        })
        .catch(function(err) {
          console.log(err);
        });
})

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