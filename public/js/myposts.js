var updateForm = $("#updateForm");
var updatedPost = $("#updatedPost");
var file = $("#file");
var hashtag = $("#hashtag");
var deletePost = $("#deletePost");
var user = localStorage.getItem('user');
var postAlert = $("#postAlert");
var allPosts = $("#posts");
var userId = localStorage.getItem('userId');
var currPost = 0;

$("body").delegate("#deletePost", "click", function(){

  var postToDelete = $(this).attr("data-postId");

  $.ajax({
    method: "DELETE",
    url: "/api/posts"+postToDelete,
    data: post
  })
    .then(function() {
        renderPosts();
    });
});

$("body").delegate("#updateBttn", "click", function(){

  currPost = $(this).attr("data-postId");
});

updateForm.on("submit",function(event){
    if (newPost.val().trim() == "" ){
        postAlert.removeAttr("hidden")
        postAlert.text("Please fill out Post field")
        return;
    } 

    var post = {
        UserId: userId,
        id: currPost,
        text: loginPassword.val().trim(),
    }

    $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: post
      })
        .then(function() {
            renderPosts();
        });
});

function renderPosts(){

  $.get(`/api/users/${userId}`, function(data){
    console.log(data);
    userPosts = data.Posts
    userPosts.forEach(post => {
      var postRow = $(`<div class = "row post">`)
      var profilePic = $(` <div class = "col-1"><img src="${data.avatar}" width="50" height="50"></div>`)
      var postDiv = $(`<div class = "col-11">`);
      var postCard = $(`<div class="card">`);
      var popup = $(`<div class="card-body popup">`);
      var cardText = $(`<p class="card-text">${post.text}</p>`);
      var hashtag = $(`<p class="card-text"><small class="text-muted">${tagname}</small></p>`);
      var postImage = $(`<img src="${post.image}" class="card-img-top" alt="..."width="300" height="200">`);
      var relativeTime = $(`<div class="text-muted mx-auto">${moment(post.updatedAt).fromNow()}</div>`);
      var footer = $(`<div class="card-footer text-muted mx-auto">
        <button class="btn btn-primary" data-toggle="modal" data-target="#updateModal" data-postId=${post.id} id="updateBttn">Update</button>
        <button class="btn btn-danger" data-postId=${post.id} id = "deletePost">Delete</button>
        </div>`)

      postRow.append(profilePic);
      popup.append(cardText);
      popup.append(hashtag);

      if (post.image != 0){
        popup.append(postImage);
      }

      popup.append(relativeTime);
      popup.append(footer);

      postCard.append(popup);
      postDiv.append(postCard);
      postRow.append(postDiv);
      allPosts.append(postRow);
    });
  });
}