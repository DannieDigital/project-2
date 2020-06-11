var postForm = $("#postForm");
var newPost = $("#newpost");
var file = $("#file");
var hashtag = $("#hashtag");
var postAlert = $("#postAlert");
var user = localStorage.getItem('userId');
var stockPhoto = "assets/profile.png";
var allPosts = $("#posts");

renderPosts();

postForm.on("submit", function(event){

    event.preventDefault(event);
    if (newPost.val().trim() == "" ){
        postAlert.removeAttr("hidden")
        postAlert.text("Please fill out Post field")
        return;
    }

    var post = {
        UserId: user,
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

function makePost(){

  $.get(`/api/posts/${userId}`, function(data){
    console.log(data);

    var rowPost = $(`<div class = "row post"></div>`)
    var profilePic = $(`<div class = "col-1"><img src="${data.avatar}" width="50" height="50"></div>`)
    var newPostBttn = $(`<div class = "col-7 mx-auto">
    <div class="card">
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#newPost">New Post</button>
        
      </div>`);

      rowPost.append(profilePic);
      rowPost.append(newPostBttn);
      allPosts.append(rowPost);
    });

  

}

function renderPosts(){
  allPosts.clear();
  makePost();
// On the back end the orm would return the posts of all the users "user" follows. Thats why we need the user in url. This route could be confused with the one to return all posts from a certain user. Maybe we could name that one "/api/posts/user"
    $.get("/api/posts", function(data){
        console.log(data);
        data.array.forEach(post => {
          
          var postRow = $(`<div class = "row post">`);
          var profilePic = $(`<div class = "col-1"><img src="${post.User.avatar || stockPhoto}" width="50" height="50"></div>`);
          var postDiv = $(`<div class = "col-11">`);
          var postCard = $(`<div class="card">`);
          var popup = $(`<div class="card-body popup">`);
          var cardText = $(`<p class="card-text">${post.text}</p>`);
          var hashtag = $(`<p class="card-text"><small class="text-muted">${post.hashtag || " "}</small></p>`);
          var postImage = $(`<img src="${post.image}" class="card-img-top" alt="..."width="300" height="200">`);
          var footer = $(`<div class="card-footer text-muted mx-auto">
          ${moment(post.updatedAt).fromNow()}</div>`);

          postRow.append(profilePic);
          popup.append(cardText);
          popup.append(hashtag);

          if (post.image){
              popup.append(postImage);
          }

          popup.append(footer);

          postCard.append(popup);
          postDiv.append(postCard);
          postRow.append(postDiv);
          allPosts.append(postRow);
        });

        

    });

}