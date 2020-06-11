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
var searchForm = $("#searchForm");
var searchTerm = $("#searchTerm");

renderPosts();

searchForm.on("submit", function(event){
  event.preventDefault(event);
  localStorage.setItem("search", searchTerm.val().trim());
  window.location.replace(`/search.html`);
})

$("body").delegate("#deletePost", "click", function(){

  var postToDelete = $(this).attr("data-postId");

  $.ajax({
    method: "DELETE",
    url: "/api/posts/"+postToDelete,
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
        text: newPost.val().trim()
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

function getImage(photoData){
  var image = localStorage.getItem(`${photoData}`);
  var photo;

  if (image){
    photo = "data:image/png;base64," + image;
  }else{
    photo = photoData;
  }

  return photo;

}

function renderPosts(){

<<<<<<< HEAD
  allPosts.empty();
  
  $.get(`/api/users/${userId}`, function(data){
    console.log(data);
    userPosts = data.Posts
    userPosts.forEach(post => {
      var postRow = $(`<div class = "row post">`)
      var profilePic = $(` <div class = "col-1"><img src="${getImage(data.avatar)}" width="50" height="50"></div>`)
      var postDiv = $(`<div class = "col-11">`);
      var postCard = $(`<div class="card">`);
      var popup = $(`<div class="card-body popup">`);
      var cardText = $(`<p class="card-text">${post.text}</p>`);
      var hashtag = $(`<p class="card-text"><small class="text-muted">${post.tagname||""}</small></p>`);
      var postImage = $(`<img src="${getImage(post.image)}" class="card-img-top" alt="..."width="300" height="200">`);
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
=======
  

}
>>>>>>> Render function built out
