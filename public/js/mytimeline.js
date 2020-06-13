var postForm = $("#postForm");
var newPost = $("#newpost");
var file = $("#file");
var hashtag = $("#hashtag");
var postAlert = $("#postAlert");
var userId = localStorage.getItem('userId');
var stockPhoto = "assets/profile.png";
var allPosts = $("#posts");
var dataImage = localStorage.getItem('avatar');
var hashtagArr = [];

renderPosts();

// Get all the hashtags in the database and save to an array 
$.get(`/api/hastags`, function(data){
  console.log(data);

  data.forEach(hashtag => {
    hashtagArr.push({
      id: hashtag.id,
      hashtag: hashtag.tagname

    });
    })
  });

postForm.on("submit", function(event){

    event.preventDefault(event);
    if (newPost.val().trim() == "" ){
        postAlert.removeAttr("hidden")
        postAlert.text("Please fill out Post field")
        return;
    }

    // Get form data 
    var post = {
        UserId: userId,
        text: newPost.val().trim(),
        HashtagId: null,
        hashtag: hashtag.val().trim()
        // image: file[0].files[0] || null,
    }

    hashtagArr.forEach(hashtag => {

      if (post.hashtag == hashtag.tagline){
        post.HashtagId == hashtag.id;
      }

    });

    if(!post.HashtagId){
      $.post("/api/hashtags", {tagname: post.hashtag})
        .then(function() {
          $.post("/api/posts", post)
            .then(function() {
              renderPosts();
            })
            .catch(function(err) {
              console.log(err);
            });
         })
        .catch(function(err) {
          console.log(err);
        });
    }else{

    $.post("/api/posts", post)
        .then(function() {
          renderPosts();
        })
        .catch(function(err) {
          console.log(err);
        });
    }
});

function makePost(){

  $.get(`/api/users/1`, function(data){
    console.log(data);

    var rowPost = $(`<div class = "row post"></div>`)
    var profilePic = $(`<div class = "col-1"><img src="${"data:image/png;base64," + dataImage}" width="50" height="50"></div>`)
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
  allPosts.empty();
  makePost();
// On the back end the orm would return the posts of all the users "user" follows. Thats why we need the user in url. This route could be confused with the one to return all posts from a certain user. Maybe we could name that one "/api/posts/user"
    $.get("/api/posts", function(data){
        console.log(data);
        data.forEach(post => {
          
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

          if (post.image != 0){
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