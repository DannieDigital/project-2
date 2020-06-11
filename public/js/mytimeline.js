var postForm = $("#postForm");
var newPost = $("#newpost");
var file = $("#file");
var hashtag = $("#hashtag");
var postAlert = $("#postAlert");
var user = localStorage.getItem('userId')

console.log(moment().format())

postForm.on("submit", function(event){

    event.preventDefault(event);
    if (newPost.val().trim() == "" ){
        postAlert.removeAttr("hidden")
        postAlert.text("Please fill out Post field")
        return;
    }

    var post = {
        userId: user,
        text: newPost.val().trim(),
        image: file[0].files[0],
    }

    $.post("/api/posts", post)
        .then(function() {
          // renderPosts();
        })
        .catch(function(err) {
          console.log(err);
        });
});


// Would want to see what data looks like before finishing this function but for right now we know that it will make a call to the posts api
function renderPosts(){
// On the back end the orm would return the posts of all the users "user" follows. Thats why we need the user in url. This route could be confused with the one to return all posts from a certain user. Maybe we could name that one "/api/posts/user"
    $.get("/api/posts/user", function(data){
        console.log(data);
        data.array.forEach(post => {
          
          var postRow = $(`<div class = "row post">`);
          var profilePic = $(`<div class = "col-1"><img src="${data.User.avatar}" width="50" height="50"></div>`);
          var postDiv = $(`<div class = "col-11">`);
          var postCard = $(`<div class="card">`);
          var popup = $(`<div class="card-body popup">`);
          var cardText = $(`<p class="card-text">${data.text}</p>`);
          var hashtag = $(`<p class="card-text"><small class="text-muted">${data.hashtag}</small></p>`);
          var postImage = $(`<img src="${data.image}" class="card-img-top" alt="..."width="300" height="200">`);
          var footer = $(`<div class="card-footer text-muted mx-auto">
          2 days ago
        </div>`)
        });

        <!-- <div class = "row post">
    <div class = "col-1"><img src="profile.png" width="50" height="50"></div>

    <div class = "col-11">
    <div class="card">
        <div class="card-body popup">
          
          <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p class="card-text"><small class="text-muted">#express #hw</small></p>
        </div>
        <img src="placeholder.png" class="card-img-top" alt="..."width="300" height="200">

        <div class="card-footer text-muted mx-auto">
          2 days ago
        </div>
      </div>
      </div>
  </div> --></div>
        });

}